import os
import torch
import torchvision.transforms.functional as F
import torchvision.models.detection as det
from PIL import Image, ImageFilter
import numpy as np
import cv2

print("Loading Mask R-CNN model...")
model = det.maskrcnn_resnet50_fpn_v2(weights=det.MaskRCNN_ResNet50_FPN_V2_Weights.DEFAULT)
model.eval()

def segment_and_save(img_path, out_path, target_labels, min_score=0.4, blur_radius=7, shadow_spread=25):
    img = Image.open(img_path).convert('RGB')
    w, h = img.size
    t = F.to_tensor(img).unsqueeze(0)
    
    with torch.no_grad():
        preds = model(t)[0]
    
    combined_mask = np.zeros((h, w), dtype=np.float32)
    
    for mask, label, score in zip(preds['masks'], preds['labels'], preds['scores']):
        lbl = label.item()
        scr = score.item()
        if lbl in target_labels and scr >= min_score:
            m_np = mask[0].cpu().numpy()
            combined_mask = np.maximum(combined_mask, m_np)
            print(f"  Included label {lbl} with score {scr:.3f}")
            
    # Threshold mask
    binary_mask = (combined_mask > 0.5).astype(np.uint8) * 255
    
    # Smooth edges with GaussianBlur
    smooth_mask = cv2.GaussianBlur(binary_mask, (blur_radius, blur_radius), 0)
    
    # Extract object RGB
    img_np = np.array(img)
    r, g, b = img_np[:, :, 0], img_np[:, :, 1], img_np[:, :, 2]
    
    # Build RGBA
    rgba = np.dstack([r, g, b, smooth_mask])
    out_img = Image.fromarray(rgba, 'RGBA')
    
    # Make contact shadow underneath
    # We create a realistic soft contact shadow by dilating and blurring the bottom of the mask
    kernel = np.ones((5, 5), np.uint8)
    shadow_mask = cv2.dilate(binary_mask, kernel, iterations=3)
    # Only keep the lower portion for ground contact shadow
    # Find bounding box of object
    y_indices, x_indices = np.where(binary_mask > 0)
    if len(y_indices) > 0:
        y_max = np.max(y_indices)
        y_min = np.min(y_indices)
        obj_height = y_max - y_min
        
        # Ground shadow layer
        ground_shadow = np.zeros((h, w), dtype=np.float32)
        # Elliptical contact shadow directly below object base
        center_x = int(np.mean(x_indices))
        base_y = int(y_max)
        radius_x = int((np.max(x_indices) - np.min(x_indices)) * 0.45)
        radius_y = int(obj_height * 0.12)
        cv2.ellipse(ground_shadow, (center_x + 15, base_y + 8), (radius_x + 20, radius_y + 10), 0, 0, 360, 0.45, -1)
        cv2.ellipse(ground_shadow, (center_x + 10, base_y + 4), (radius_x, radius_y), 0, 0, 360, 0.75, -1)
        ground_shadow = cv2.GaussianBlur(ground_shadow, (31, 31), 0)
        
        # Combine object with contact shadow
        shadow_rgba = np.zeros((h, w, 4), dtype=np.uint8)
        # Deep warm brown shadow: rgb(25, 18, 14)
        shadow_rgba[:, :, 0] = 25
        shadow_rgba[:, :, 1] = 18
        shadow_rgba[:, :, 2] = 14
        shadow_rgba[:, :, 3] = (ground_shadow * 255).astype(np.uint8)
        
        shadow_layer = Image.fromarray(shadow_rgba, 'RGBA')
        final_composite = Image.alpha_composite(shadow_layer, out_img)
        final_composite.save(out_path, 'PNG')
    else:
        out_img.save(out_path, 'PNG')
    print(f"Saved: {out_path}")

print("Processing drinks...")
# 1. Cappuccino (label 47: cup)
segment_and_save('public/assets/images/counter-cappuccino.jpg', 'public/assets/images/product-cappuccino.png', [47])

# 2. Latte (label 47: cup)
segment_and_save('public/assets/images/counter-latte.jpg', 'public/assets/images/product-latte.png', [47])

# 3. Espresso (label 47: cup, 51: bowl, 67: dining table / saucer)
# For espresso let's check what labels give cup + saucer
segment_and_save('public/assets/images/counter-espresso.jpg', 'public/assets/images/product-espresso.png', [47, 51, 67])

# 4. Filter (label 44: bottle, 47: cup, 72: refrigerator / glass)
segment_and_save('public/assets/images/counter-filter.jpg', 'public/assets/images/product-filter.png', [44, 47, 72])

import os
import torch
import torchvision.transforms.functional as F
import torchvision.models.detection as det
from PIL import Image, ImageFilter
import numpy as np
import cv2

print("Loading Mask R-CNN v2...")
model = det.maskrcnn_resnet50_fpn_v2(weights=det.MaskRCNN_ResNet50_FPN_V2_Weights.DEFAULT)
model.eval()

# -------------------------------------------------------------
# 1. CAPPUCCINO
# -------------------------------------------------------------
print("Processing 01 Cappuccino...")
img_cap = Image.open('public/assets/images/counter-cappuccino.jpg').convert('RGB')
w, h = img_cap.size
t_cap = F.to_tensor(img_cap).unsqueeze(0)
with torch.no_grad():
    preds_cap = model(t_cap)[0]

cup_idx = (preds_cap['labels'] == 47).nonzero(as_tuple=True)[0][0]
mask_cap = (preds_cap['masks'][cup_idx, 0].cpu().numpy() > 0.5).astype(np.uint8) * 255

# Hollow out handle hole: exactly between x: 715..765, y: 550..625
arr_cap = np.array(img_cap)
# Find background inside handle hole:
# The wall inside the hole has low blue variance and matches wall color
for y in range(540, 635):
    for x in range(710, 775):
        # Elliptical hole centered around (742, 585)
        if ((x - 742) / 18.0) ** 2 + ((y - 588) / 36.0) ** 2 <= 1.0:
            mask_cap[y, x] = 0

smooth_cap = cv2.GaussianBlur(mask_cap, (5, 5), 0)
rgba_cap = np.dstack([arr_cap, smooth_cap])
Image.fromarray(rgba_cap, 'RGBA').save('public/assets/images/isolated-cappuccino.png')
print("Saved isolated-cappuccino.png")

# -------------------------------------------------------------
# 2. LATTE
# -------------------------------------------------------------
print("Processing 02 Latte...")
img_latte = Image.open('public/assets/images/counter-latte.jpg').convert('RGB')
w_lat, h_lat = img_latte.size
t_latte = F.to_tensor(img_latte).unsqueeze(0)
with torch.no_grad():
    preds_lat = model(t_latte)[0]

lat_cup_idx = (preds_lat['labels'] == 47).nonzero(as_tuple=True)[0][0]
mask_lat = (preds_lat['masks'][lat_cup_idx, 0].cpu().numpy() > 0.5).astype(np.uint8) * 255

# In counter-latte.jpg, find handle hole
# Let's inspect where handle hole is for latte:
# Mug is from x: 290 to 820. Handle is on right around x: 670..790, y: 480..630
arr_lat = np.array(img_latte)
# In counter-latte.jpg, handle hole is around x: 685..750, y: 490..610
for y in range(485, 620):
    for x in range(680, 755):
        if ((x - 718) / 22.0) ** 2 + ((y - 550) / 45.0) ** 2 <= 1.0:
            mask_lat[y, x] = 0

smooth_lat = cv2.GaussianBlur(mask_lat, (5, 5), 0)
rgba_lat = np.dstack([arr_lat, smooth_lat])
Image.fromarray(rgba_lat, 'RGBA').save('public/assets/images/isolated-latte.png')
print("Saved isolated-latte.png")

# -------------------------------------------------------------
# 3. ESPRESSO
# -------------------------------------------------------------
print("Processing 03 Espresso...")
# In counter-espresso.jpg, we want the espresso cup + saucer + slate surface softly melting into dark background
# The slate surface is beautiful and dark!
img_esp = Image.open('public/assets/images/counter-espresso.jpg').convert('RGB')
w_esp, h_esp = img_esp.size
arr_esp = np.array(img_esp)

# Detect cup
t_esp = F.to_tensor(img_esp).unsqueeze(0)
with torch.no_grad():
    preds_esp = model(t_esp)[0]

esp_cup_idx = (preds_esp['labels'] == 47).nonzero(as_tuple=True)[0][0]
mask_esp_cup = (preds_esp['masks'][esp_cup_idx, 0].cpu().numpy() > 0.5).astype(np.uint8) * 255

# Cup + Saucer + Slate:
# The slate slab has rounded corners and sits at bottom y: 550 to 950, x: 0 to 1024
# If we keep cup + saucer completely, and let slate slab fade softly at bottom and sides:
Y, X = np.ogrid[:h_esp, :w_esp]
slate_mask = np.zeros((h_esp, w_esp), dtype=np.float32)
# Keep cup + saucer 100%
# Find saucer (around y: 540..780, x: 240..760)
saucer_dist = ((X - 495) / 250.0) ** 2 + ((Y - 670) / 115.0) ** 2
slate_mask[saucer_dist <= 1.0] = 1.0
slate_mask[mask_esp_cup > 0] = 1.0

# Also include the slate plate with soft feathered edge
plate_dist = ((X - 512) / 480.0) ** 4 + ((Y - 760) / 220.0) ** 4
feathered_plate = np.clip(1.0 - (plate_dist - 0.4) / 0.6, 0.0, 1.0)
feathered_plate = feathered_plate * feathered_plate * (3 - 2 * feathered_plate)

combined_esp_alpha = np.maximum(slate_mask, feathered_plate * 0.95)
# Also handle hole in espresso cup (x: 655..705, y: 535..605)
for y in range(530, 615):
    for x in range(650, 715):
        if ((x - 682) / 14.0) ** 2 + ((y - 572) / 26.0) ** 2 <= 1.0:
            combined_esp_alpha[y, x] = 0

smooth_esp = cv2.GaussianBlur((combined_esp_alpha * 255).astype(np.uint8), (7, 7), 0)
rgba_esp = np.dstack([arr_esp, smooth_esp])
Image.fromarray(rgba_esp, 'RGBA').save('public/assets/images/isolated-espresso.png')
print("Saved isolated-espresso.png")

# -------------------------------------------------------------
# 4. FILTER COFFEE (Carafe + Tasting Cup)
# -------------------------------------------------------------
print("Processing 04 Filter...")
img_flt = Image.open('public/assets/images/counter-filter.jpg').convert('RGB')
w_flt, h_flt = img_flt.size
arr_flt = np.array(img_flt)

# Detect objects in filter image
t_flt = F.to_tensor(img_flt).unsqueeze(0)
with torch.no_grad():
    preds_flt = model(t_flt)[0]

mask_flt = np.zeros((h_flt, w_flt), dtype=np.float32)
for mask, label, score in zip(preds_flt['masks'], preds_flt['labels'], preds_flt['scores']):
    lbl = label.item()
    scr = score.item()
    # 44: bottle/carafe, 47: cup
    if lbl in [44, 47] and scr > 0.5:
        m_np = mask[0].cpu().numpy()
        mask_flt = np.maximum(mask_flt, m_np)

# In counter-filter.jpg: the glass carafe is on left (x: 190..580, y: 290..770)
# and tasting cup is on right (x: 590..840, y: 590..810)
# Feather the travertine counter gently below the two objects
counter_shadow = np.zeros((h_flt, w_flt), dtype=float)
# Shadow below carafe
cv2.ellipse(counter_shadow, (400, 765), (200, 60), 0, 0, 360, 0.7, -1)
# Shadow below cup
cv2.ellipse(counter_shadow, (720, 805), (120, 45), 0, 0, 360, 0.7, -1)
counter_shadow = cv2.GaussianBlur(counter_shadow, (31, 31), 0)

combined_flt = np.maximum(mask_flt, counter_shadow * 0.8)
# Handle hole in carafe handle (around x: 215..265, y: 430..570)
for y in range(410, 580):
    for x in range(215, 270):
        if ((x - 240) / 16.0) ** 2 + ((y - 495) / 65.0) ** 2 <= 1.0:
            combined_flt[y, x] = 0

smooth_flt = cv2.GaussianBlur((combined_flt * 255).astype(np.uint8), (5, 5), 0)
rgba_flt = np.dstack([arr_flt, smooth_flt])
Image.fromarray(rgba_flt, 'RGBA').save('public/assets/images/isolated-filter.png')
print("Saved isolated-filter.png")

# -------------------------------------------------------------
# 5. SPICED MASALA CHAI
# -------------------------------------------------------------
print("Processing 05 Chai...")
img_chai = Image.open('public/assets/images/spiced-chai.jpg').convert('RGB')
w_ch, h_ch = img_chai.size
arr_chai = np.array(img_chai)

# In chai image, the mug is at (428.8, 427.9, 952.7, 771.1)
# We isolate the mug + handle + cinnamon stick!
t_chai = F.to_tensor(img_chai).unsqueeze(0)
with torch.no_grad():
    preds_chai = model(t_chai)[0]

cup_indices = (preds_chai['labels'] == 47).nonzero(as_tuple=True)[0]
best_idx = cup_indices[preds_chai['scores'][cup_indices].argmax()]
mask_chai_cup = (preds_chai['masks'][best_idx, 0].cpu().numpy() > 0.5).astype(np.float32)

# Also include cinnamon sticks & star anise (x: 180..420, y: 680..880)
# Use color segmentation in that small ROI for dark cinnamon sticks
roi = arr_chai[680:880, 180:420]
# Cinnamon is warm brown, darker than wood
cinnamon_mask = np.zeros((h_ch, w_ch), dtype=np.float32)
for y in range(680, 880):
    for x in range(180, 420):
        # Cinnamon stick line
        if ((x - 290) + (y - 780)*0.7)**2 < 45**2 and (x - 290)**2 + (y - 780)**2 < 120**2:
            cinnamon_mask[y, x] = 1.0

combined_chai = np.maximum(mask_chai_cup, cinnamon_mask)

# Handle hole in chai mug (x: 700..760, y: 580..670)
for y in range(580, 680):
    for x in range(700, 765):
        if ((x - 730) / 16.0) ** 2 + ((y - 630) / 35.0) ** 2 <= 1.0:
            combined_chai[y, x] = 0

smooth_chai = cv2.GaussianBlur((combined_chai * 255).astype(np.uint8), (5, 5), 0)
rgba_chai = np.dstack([arr_chai, smooth_chai])
Image.fromarray(rgba_chai, 'RGBA').save('public/assets/images/isolated-chai.png')
print("Saved isolated-chai.png")

print("All 5 drinks successfully extracted into transparent PNGs!")

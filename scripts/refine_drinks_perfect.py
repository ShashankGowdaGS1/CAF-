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
print("Polishing Cappuccino...")
img_cap = Image.open('public/assets/images/counter-cappuccino.jpg').convert('RGB')
w, h = img_cap.size
t_cap = F.to_tensor(img_cap).unsqueeze(0)
with torch.no_grad():
    preds_cap = model(t_cap)[0]

cup_idx = (preds_cap['labels'] == 47).nonzero(as_tuple=True)[0][0]
mask_cap = (preds_cap['masks'][cup_idx, 0].cpu().numpy() > 0.5).astype(np.uint8) * 255

# Clean handle hole:
# Handle inner hole:
for y in range(548, 626):
    for x in range(718, 762):
        if ((x - 738) / 16.0) ** 2 + ((y - 586) / 34.0) ** 2 <= 1.0:
            mask_cap[y, x] = 0

smooth_cap = cv2.GaussianBlur(mask_cap, (5, 5), 0)
rgba_cap = np.dstack([np.array(img_cap), smooth_cap])
Image.fromarray(rgba_cap, 'RGBA').save('public/assets/images/counter-cappuccino-obj.png')
print("Saved counter-cappuccino-obj.png")

# -------------------------------------------------------------
# 2. LATTE
# -------------------------------------------------------------
print("Polishing Latte...")
img_latte = Image.open('public/assets/images/counter-latte.jpg').convert('RGB')
w_lat, h_lat = img_latte.size
t_latte = F.to_tensor(img_latte).unsqueeze(0)
with torch.no_grad():
    preds_lat = model(t_latte)[0]

lat_cup_idx = (preds_lat['labels'] == 47).nonzero(as_tuple=True)[0][0]
mask_lat = (preds_lat['masks'][lat_cup_idx, 0].cpu().numpy() > 0.5).astype(np.uint8) * 255

# Clean handle hole and remove any stray area on right
# In counter-latte.jpg: cup body x: 290..680, handle x: 670..820, y: 460..690
# Hole: x: 690..745, y: 500..600
for y in range(495, 605):
    for x in range(690, 748):
        if ((x - 718) / 20.0) ** 2 + ((y - 550) / 45.0) ** 2 <= 1.0:
            mask_lat[y, x] = 0

# Zero out anything outside the mug and handle
mask_lat[:, 830:] = 0
mask_lat[:330, :] = 0
mask_lat[830:, :] = 0

smooth_lat = cv2.GaussianBlur(mask_lat, (5, 5), 0)
rgba_lat = np.dstack([np.array(img_latte), smooth_lat])
Image.fromarray(rgba_lat, 'RGBA').save('public/assets/images/counter-latte-obj.png')
print("Saved counter-latte-obj.png")

# -------------------------------------------------------------
# 3. ESPRESSO
# -------------------------------------------------------------
print("Polishing Espresso...")
# Our previous isolated-espresso.png was already gorgeous!
# Let's save it directly as counter-espresso-obj.png
img_esp = Image.open('public/assets/images/isolated-espresso.png')
img_esp.save('public/assets/images/counter-espresso-obj.png')
print("Saved counter-espresso-obj.png")

# -------------------------------------------------------------
# 4. FILTER COFFEE
# -------------------------------------------------------------
print("Polishing Filter...")
img_flt = Image.open('public/assets/images/isolated-filter.png')
img_flt.save('public/assets/images/counter-filter-obj.png')
print("Saved counter-filter-obj.png")

# -------------------------------------------------------------
# 5. CHAI
# -------------------------------------------------------------
print("Polishing Chai...")
img_chai = Image.open('public/assets/images/spiced-chai.jpg').convert('RGB')
w_ch, h_ch = img_chai.size
arr_chai = np.array(img_chai)

t_chai = F.to_tensor(img_chai).unsqueeze(0)
with torch.no_grad():
    preds_chai = model(t_chai)[0]

cup_indices = (preds_chai['labels'] == 47).nonzero(as_tuple=True)[0]
best_idx = cup_indices[preds_chai['scores'][cup_indices].argmax()]
mask_chai_cup = (preds_chai['masks'][best_idx, 0].cpu().numpy() > 0.5).astype(np.uint8) * 255

# Clean handle hole for chai:
# In spiced-chai.jpg:
# The mug handle is from x: 685 to 795, y: 540 to 740.
# The hole inside the handle is at x: 700 to 745, y: 580 to 680
for y in range(580, 680):
    for x in range(700, 745):
        if ((x - 722) / 16.0) ** 2 + ((y - 630) / 42.0) ** 2 <= 1.0:
            mask_chai_cup[y, x] = 0

# Include cinnamon stick & star anise cleanly on the left (x: 180..390, y: 690..860)
# Extract with GrabCut inside that small region
roi_mask = np.zeros((h_ch, w_ch), dtype=np.uint8)
cv2.rectangle(roi_mask, (190, 690), (410, 870), 1, -1)
# Cinnamon stick pixels are warm dark brown (R > 90, G in 40..80, B in 20..50)
for y in range(690, 870):
    for x in range(190, 410):
        r, g, b = arr_chai[y, x]
        # Dark brown cinnamon stick & star anise
        if (r > 60 and g < 100 and b < 70 and (int(r) - int(b)) > 30):
            mask_chai_cup[y, x] = 255

smooth_chai = cv2.GaussianBlur(mask_chai_cup, (5, 5), 0)
rgba_chai = np.dstack([arr_chai, smooth_chai])
Image.fromarray(rgba_chai, 'RGBA').save('public/assets/images/counter-chai-obj.png')
print("Saved counter-chai-obj.png")

print("All 5 beverage objects polished and saved with -obj.png suffix!")


import os
from PIL import Image
import shutil

SOURCE_DIR = r"c:\Users\isaac.MEHRMEDIA\Documents\Coding Projects\Repos\ArcBlueprintTracker-main\public\images\Temp"
TARGET_DIR = r"c:\Users\isaac.MEHRMEDIA\Documents\Coding Projects\Repos\ArcBlueprintTracker-main\public\images\tutorial"

if not os.path.exists(TARGET_DIR):
    os.makedirs(TARGET_DIR)

for filename in os.listdir(SOURCE_DIR):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        # Normalize name
        name_part = os.path.splitext(filename)[0]
        new_name = name_part.lower().replace(' ', '_').replace('.', '') + ".webp"
        
        source_path = os.path.join(SOURCE_DIR, filename)
        target_path = os.path.join(TARGET_DIR, new_name)
        
        try:
            with Image.open(source_path) as im:
                im.save(target_path, "WEBP", quality=85)
            print(f"Converted {filename} -> {new_name}")
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")

# Remove Temp dir and PNGs as requested? User said "remove the pngs".
# I'll just remove the PNGs from the source for now, or maybe the whole Temp folder after verification.
# For safety, I will NOT delete in this script, I'll do it via command later.

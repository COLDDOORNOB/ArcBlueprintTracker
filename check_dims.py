import os
from PIL import Image

image_dir = r"c:\Users\isaac.MEHRMEDIA\Documents\Coding Projects\Repos\ArcBlueprintTracker-main\public\images\maps"

for filename in os.listdir(image_dir):
    if filename.lower().endswith('.png'):
        path = os.path.join(image_dir, filename)
        try:
            with Image.open(path) as img:
                print(f"{filename}: {img.width}x{img.height}")
        except Exception as e:
            print(f"Error reading {filename}: {e}")

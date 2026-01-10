from PIL import Image
import os

input_path = r"public/images/maps/dam_battlegrounds.png"
output_path = r"public/images/maps/dam_battlegrounds.webp"

if os.path.exists(input_path):
    print(f"Converting {input_path}...")
    img = Image.open(input_path)
    img.save(output_path, "WEBP", quality=80)
    
    orig_size = os.path.getsize(input_path)
    new_size = os.path.getsize(output_path)
    
    print(f"Original Size: {orig_size / 1024 / 1024:.2f} MB")
    print(f"WebP Size: {new_size / 1024 / 1024:.2f} MB")
    print(f"Reduction: {(1 - new_size/orig_size)*100:.1f}%")
else:
    print("Input file not found.")

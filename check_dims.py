from PIL import Image
import os

path = "public/images/maps/the_blue_gate_underground.webp"

try:
    with Image.open(path) as img:
        print(f"Dimensions: {img.width}x{img.height}")
        ratio = img.height / img.width
        print(f"Ratio: {ratio}")
        print(f"Calculated Bounds Y (assuming X=1000): {1000 * ratio:.2f}")
except Exception as e:
    print(f"Error: {e}")

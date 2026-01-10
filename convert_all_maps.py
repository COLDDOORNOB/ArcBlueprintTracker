from PIL import Image
import os

image_dir = r"public/images/maps"

total_orig_size = 0
total_new_size = 0

print(f"Processing maps in {image_dir}...")

for filename in os.listdir(image_dir):
    if filename.lower().endswith('.png'):
        path = os.path.join(image_dir, filename)
        webp_path = os.path.splitext(path)[0] + ".webp"
        
        try:
            # Open and convert
            with Image.open(path) as img:
                print(f"Converting {filename}...")
                img.save(webp_path, "WEBP", quality=80)
            
            # Calculate savings
            orig_size = os.path.getsize(path)
            new_size = os.path.getsize(webp_path)
            total_orig_size += orig_size
            total_new_size += new_size
            
            # Remove original
            os.remove(path)
            print(f"  Converted & Removed. Saved {(1 - new_size/orig_size)*100:.1f}%")
            
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print("-" * 30)
print(f"Total Original: {total_orig_size / 1024 / 1024:.2f} MB")
print(f"Total WebP: {total_new_size / 1024 / 1024:.2f} MB")
print(f"Total Savings: {(1 - total_new_size/total_orig_size)*100:.1f}%")

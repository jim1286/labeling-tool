# save_image_to_npy.py
import sys
import numpy as np
from PIL import Image
import json


def main(image_path, output_path):
    # Load image using PIL
    image = Image.open(image_path)
    image_data = np.array(image)
    # Save image data to .npy file
    np.save(output_path, image_data)
    print(output_path)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python save_image_to_npy.py <image_path> <output_path>")
    else:
        image_path = sys.argv[1]
        output_path = sys.argv[2]
        main(image_path, output_path)
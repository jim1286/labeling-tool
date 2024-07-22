# save_image_to_npy.py
import sys
import numpy as np
from PIL import Image

def main(image_path, output_path):
   # Load image using PIL
    image = Image.open(image_path)
    
    # Resize image to the expected dimensions (e.g., 256x256)
    expected_size = (256, 256)  # Adjust based on SAM's expected dimensions
    image = image.resize(expected_size)
    
    # Convert image to numpy array
    image_data = np.array(image)
    
    # Ensure the array has the correct number of channels (e.g., 3 for RGB)
    if image_data.ndim == 2:  # Grayscale image
        image_data = np.stack((image_data,)*3, axis=-1)
    elif image_data.shape[2] == 4:  # RGBA image, discard the alpha channel
        image_data = image_data[:, :, :3]
    
    # Add batch dimension
    image_data = np.expand_dims(image_data, axis=0)
    
    # Ensure the shape is (batch_size, channels, height, width)
    image_data = np.transpose(image_data, (0, 3, 1, 2))
    
    # Save image data to .npy file
    np.save(output_path, image_data)
    print(f"Image saved to {output_path}")
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python save_image_to_npy.py <image_path> <output_path>")
    else:
        image_path = sys.argv[1]
        output_path = sys.argv[2]
        main(image_path, output_path)
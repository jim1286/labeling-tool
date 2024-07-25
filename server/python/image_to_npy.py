from PIL import Image
import numpy as np

def main(image_path, output_path):
    # Load image using PIL
    image = Image.open(image_path)

    # Convert image to RGB if it's not already
    image = image.convert('RGB')

    # Resize image to the expected dimensions
    image = image.resize((64, 64))

    # Convert image to numpy array
    image_data = np.array(image)

    # Normalize image data if required (optional)
    # image_data = image_data / 255.0  # Example normalization, adjust as needed

    # Create an array with 256 channels
    # Initialize an empty array with 256 channels
    image_data_expanded = np.zeros((64, 64, 256))

    # Fill in the expanded array with the original image data
    # For demonstration, we repeat the same RGB image data across all 256 channels
    for i in range(256):
        image_data_expanded[..., i] = image_data[..., 0]  # Using R channel for demonstration

    # Reshape image data to match model's input shape
    image_data_expanded = image_data_expanded.reshape(1, 256, 64, 64)

    # Save image data to .npy file
    np.save(output_path, image_data_expanded)

    print("Saved image data with shape:", image_data_expanded.shape)


if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python image_to_npy.py <image_path> <model_path> <output_path>")
        sys.exit(1)
    image_path = sys.argv[1]
    output_path = sys.argv[2]
    main(image_path, output_path)

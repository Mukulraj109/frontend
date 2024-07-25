import axios from 'axios';

export const uploadImage = async (file) => {
  try {
    // Get the upload URL from the backend using the environment variable
    const response = await axios.get(`${process.env.VITE_SERVER_DOMAIN}/generate-upload-url`);
    const uploadUrl = response.data.uploadUrl;

    if (!uploadUrl) {
      throw new Error('Failed to get upload URL');
    }

    // Create FormData to upload the image to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Use the preset you configured in Cloudinary

    // Upload the image directly to Cloudinary
    const uploadResponse = await axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return uploadResponse.data.secure_url; // Return the image URL
  } catch (error) {
    console.error('Error uploading image:', error.response ? error.response.data : error.message);
    throw error; // Rethrow error to be caught in the component
  }
};

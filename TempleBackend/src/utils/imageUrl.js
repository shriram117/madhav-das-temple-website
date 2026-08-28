import { SERVER_URL } from "../config/api";

export const getImageUrl = (imageUrl) => {

    if (!imageUrl) {
        return "";
    }

    // Cloudinary / external URL
    if (
        imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://")
    ) {
        return imageUrl;
    }

    // Local uploaded image
    return `${SERVER_URL}${imageUrl}`;

};
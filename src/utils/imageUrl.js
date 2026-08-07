import { SERVER_URL } from "../config/api";

export const getImageUrl = (path) => {

    if (!path) {

        return "/no-image.png";

    }

    if (path.startsWith("http")) {

        return path;

    }

    return `${SERVER_URL}${path}`;

};
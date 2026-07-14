import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "PatchRoot",
        short_name: "PatchRoot",
        description: "Development and Penetration Testing",
        start_url: "/",
        display: "standalone",
        background_color: "#080808",
        theme_color: "#E6007E",
        icons: [
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
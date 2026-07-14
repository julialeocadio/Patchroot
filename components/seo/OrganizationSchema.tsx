import { desc } from "framer-motion/client";

export default function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",

        name: "PatchRoot",
        url: "https://patchrot.com",
        logo: "https://patchroot.com/images/logo.png",
        description: "Cybersecurity company specializing in penetration testing and secure web devebelopment",
        email: "patchroot.tech@gmail.com",
        areaServed: "Worldwide",
        knowsAbout: [
            "Penetration Testing",
            "Web Application Security",
            "Vulnerability Assesment",
            "Secure Software Development",
            "Teste de Penetração",
            "Desenvolvimento Web"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />        
    );
}
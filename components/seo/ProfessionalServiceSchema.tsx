export default function ProfessionalServiceSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",

        name: "PatchRoot",
        image: "https://patchroot.com/images/logo.jpeg",
        url: "https://patchroot.com",
        logo: "https://patchroot.com/images/logo/jpeg",
        description: "PatchRoot provides professional penetration testing, vulnerability assessments and secure web development.",
        areaServed: {
            "@type": "Place",
            name: "Worldwide",
        },
        availableLanguage: [
            "English",
            "Portuguese",
            "Spanish",
        ],
        serviceType: [
            "Penetration Testing",
            "Vulnerability Assessment",
            "Security Consulting",
            "Web Application Development",
            "Application Security",
            "Network Security",
            "Ethical Hacking",
        ],
        knowsAbout: [
            "OWASP Top 10",
            "Ethical Hacking",
            "Cybersecurity",
            "Secure Software Development",
            "Web Security",
        ],
        provider: {
            "@type": "Organization",
            name: "PatchRoot",
            url: "https://patchroot.com",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    );
};
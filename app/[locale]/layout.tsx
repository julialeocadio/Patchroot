import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import { Metadata } from "next";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import ProfessionalServiceSchema from "@/components/seo/ProfessionalServiceSchema";

export async function generateMetadata({
    params,
}: {
    params: Promise<{locale: string}>;
}): Promise<Metadata> {
    const {locale} = await params;

    const descriptions = {
        en: "Professional penetration testing and secure web development services.",
        pt: "Serviços profissionais de teste de penetração e desenvolvimento seguro de websites.",
        es: "Servicios profesionales de pruebas de penetración y desarrollo web."
    };

    return {
        metadataBase: new URL("https://patchroot.com"),

        title: {
            default: "PatchRoot | Development & Security",
            template: "%s | PatchRoot",
        },

        description: descriptions[locale as keyof typeof descriptions],

        keywords: [
            "PatchRoot",
            "PatchRoot Tech",
            "Cybersecurity",
            "Penetration Testing",
            "Web Development",
            "Security Assessments",
            "Tech Company",
            "Information Security",
            "Vulnerability Assessment",
            "Network Security",
            "Application Security",
            "Ethical Hacking",
            "Security Consulting",
            "Digital Security",
            "Cyber Threats",
            "Data Protection",
            "Cyber Defense",
            "Security Solutions",
            "IT Security",
            "Cybersecurity Services",
            "Segurança Cibernética",
            "Teste de Penetração",
            "Desenvolvimento Web",
            "Avaliações de Segurança",
            "Empresa de Tecnologia",
            "Segurança da Informação",
            "Avaliação de Vulnerabilidades",
            "Segurança de Rede",
            "Segurança de Aplicações",
            "Hacking Ético",
            "Consultoria de Segurança",
            "Segurança Digital",
            "Ameaças Cibernéticas",
            "Proteção de Dados",
            "Defesa Cibernética",
            "Soluções de Segurança",
            "Segurança de TI",
            "Servicios de Ciberseguridad",
            "Pruebas de Penetración",
            "Desarrollo Web",
            "Evaluaciones de Seguridad",
            "Empresa de Tecnología",
            "Seguridad de la Información",
            "Evaluación de Vulnerabilidades",
            "Seguridad de Redes",
            "Seguridad de Aplicaciones",
            "Hacking Ético",
            "Consultoría de Seguridad",
            "Seguridad Digital",
            "Amenazas Cibernéticas",
            "Protección de Datos",
            "Defensa Cibernética",
            "Soluciones de Seguridad",
            "Seguridad Informática"
        ],

        openGraph: {
            title: "PatchRoot",
            description: descriptions[locale as keyof typeof descriptions],
            url: `https://patchroot.com/${locale}`,
            siteName: "PatchRoot",
            locale,
            type: "website",
            images: [
                {
                    url: "/images/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: "PatchRoot Logo",
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: "PatchRoot",
            description: descriptions[locale as keyof typeof descriptions],
            images: ["/images/og-image.png"],
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}
export default async function LocaleLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const messages = await getMessages();

    return (
        <html>
            <body>
                <OrganizationSchema />

                <ProfessionalServiceSchema />

                <NextIntlClientProvider
                    messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
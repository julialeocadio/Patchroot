export type TeamMember = {
    id: string;
    name: string;
    image?: string;
    roleKey: string;
    bioKey: string;
    skills: string[];
};

export const team: TeamMember[] = [
    {
        id: "julia",
        name: "Julia Leocadio",
        image: "/images/julia.png",
        roleKey: "julia.role",
        bioKey: "julia.bio",
        skills: ["Cybersecurity", "Next.js", "React", "Python"]
    },
    {
        id: "paula",
        name: "Paula Juvenal",
        image: "/images/Paula.png",
        roleKey: "paula.role",
        bioKey: "paula.bio",
        skills: ["Legal Expertise", "Operations", "Coordination", "Leadership"]
    },
    {
        id: "juan",
        name: "Juan Pires Da Silva",
        image: "/images/juan.png",
        roleKey: "juan.role",
        bioKey: "juan.bio",
        skills: ["Cybersecurity", "Python", "SQL", "React"]
    }
]
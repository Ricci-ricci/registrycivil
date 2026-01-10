import { NextResponse } from "next/server";

const deces = [
    {
        id: 1,
        annee: 2023,
        code_fokontany: 301,
        village: "Mahamasina",
        nom_defunt: "Rasoazanany",
        prenom_defunt: "Claudine",
        sexe: 2,
        date_naissance: "1975-04-10",
        date_deces: "2023-09-07",
        cause_deces: 1,
        lieu_deces: 2,
        milieu: 1,
        declare: 1,
        date_declaration: "2023-09-10",
    },
    {
        id: 2,
        annee: 2024,
        code_fokontany: 302,
        village: "Ankadifotsy",
        nom_defunt: "Rakoto",
        prenom_defunt: "Paul",
        sexe: 1,
        date_naissance: "1968-02-18",
        date_deces: "2024-03-02",
        cause_deces: 2,
        lieu_deces: 1,
        milieu: 2,
        declare: 1,
        date_declaration: "2024-03-05",
    },
];

export async function GET() {
    return NextResponse.json(deces);
}

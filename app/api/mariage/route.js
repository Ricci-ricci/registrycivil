import { NextResponse } from "next/server";

const mariages = [
    {
        id: 1,
        annee: 2023,
        code_fokontany: 201,
        village: "Mahamasina",
        nom_epoux: "Randria",
        prenom_epoux: "Lucas",
        age_epoux: 29,
        niveau_epoux: 4,
        nom_epouse: "Rakoto",
        prenom_epouse: "Anna",
        age_epouse: 27,
        niveau_epouse: 5,
        date_mariage: "2023-12-10",
        lieu_mariage: 1,
        milieu: 1,
        declare: 1,
        date_declaration: "2023-12-12",
    },
    {
        id: 2,
        annee: 2024,
        code_fokontany: 202,
        village: "Ambohijatovo",
        nom_epoux: "Rasoanaivo",
        prenom_epoux: "Jean",
        age_epoux: 34,
        niveau_epoux: 3,
        nom_epouse: "Ramanantsoa",
        prenom_epouse: "Lea",
        age_epouse: 30,
        niveau_epouse: 4,
        date_mariage: "2024-01-25",
        lieu_mariage: 2,
        milieu: 2,
        declare: 1,
        date_declaration: "2024-01-27",
    },
];

export async function GET() {
    return NextResponse.json(mariages);
}

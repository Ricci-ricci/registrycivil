"use client";
import React from "react";
import NaissanceTable from "@/components/screen/naissanceTable";
const naissances = [
    {
        id: 1,
        annee: 2023,
        code_fokontany: 401,
        village: "Ambohijatovo",
        nom_enfant: "Randria",
        prenom_enfant: "Lucas",
        sexe: 1,
        date_naissance: "2023-11-02",
        nom_mere: "Rakoto",
        prenom_mere: "Anna",
        age_mere: 28,
        niveau_mere: 4,
        nom_pere: "Randria",
        prenom_pere: "Paul",
        age_pere: 31,
        niveau_pere: 5,
        lieu_naissance: 1,
        assistance: 1,
        poids: 3.2,
        taille: 49.5,
        rang: 1,
        milieu: 1,
        declare: 1,
        date_declaration: "2023-11-04",
    },
    {
        id: 2,
        annee: 2024,
        code_fokontany: 402,
        village: "67Ha",
        nom_enfant: "Rasoanaivo",
        prenom_enfant: "Mia",
        sexe: 2,
        date_naissance: "2024-02-20",
        nom_mere: "Ramanantsoa",
        prenom_mere: "Lea",
        age_mere: 26,
        niveau_mere: 3,
        nom_pere: "Rasoanaivo",
        prenom_pere: "Jean",
        age_pere: 30,
        niveau_pere: 4,
        lieu_naissance: 2,
        assistance: 1,
        poids: 3.0,
        taille: 48.0,
        rang: 2,
        milieu: 2,
        declare: 1,
        date_declaration: "2024-02-22",
    },
];
const Naissance = () => {
    const [data, setData] = React.useState(naissances);

    const handleAdd = (newItem) => setData((prev) => [newItem, ...prev]);
    const handleDelete = (id) =>
        setData((prev) => prev.filter((item) => item.id !== id));
    return (
        <NaissanceTable data={data} onAdd={handleAdd} onDelete={handleDelete} />
    );
};
export default Naissance;

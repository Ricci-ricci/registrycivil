"use client";
import React from "react";
import DivorceTable from "@/components/screen/divorcesTable";
const divorces = [
    {
        id: 1,
        annee: 2024,
        code_fokontany: 101,
        village: "67Ha",
        nom_homme: "Rakoto",
        prenom_homme: "Daniel",
        age_homme: 35,
        niveau_homme: 3,
        nom_femme: "Rasoanaivo",
        prenom_femme: "Elise",
        age_femme: 32,
        niveau_femme: 4,
        date_mariage: "2015-06-12",
        date_divorce: "2024-02-15",
        motif: 1,
        lieu_divorce: 2,
        milieu: 1,
        declare: 1,
        date_declaration: "2024-02-20",
    },
    {
        id: 2,
        annee: 2023,
        code_fokontany: 102,
        village: "Anosy",
        nom_homme: "Randria",
        prenom_homme: "Alex",
        age_homme: 40,
        niveau_homme: 2,
        nom_femme: "Rasoazanany",
        prenom_femme: "Claire",
        age_femme: 38,
        niveau_femme: 3,
        date_mariage: "2010-09-18",
        date_divorce: "2023-11-10",
        motif: 2,
        lieu_divorce: 1,
        milieu: 2,
        declare: 1,
        date_declaration: "2023-11-15",
    },
];
const Divorces = () => {
    const [data, setData] = React.useState(divorces);
    return (
        <DivorceTable
            data={data}
            onAdd={(item) => setData((prev) => [item, ...prev])}
            onDelete={(id) =>
                setData((prev) => prev.filter((item) => item.id !== id))
            }
        />
    );
};
export default Divorces;

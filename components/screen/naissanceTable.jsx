"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function NaissanceTable({ data, onAdd, onDelete }) {
    const [search, setSearch] = React.useState("");

    const filteredData = React.useMemo(() => {
        return data.filter((item) =>
            [
                item.nom_enfant,
                item.prenom_enfant,
                item.village,
                item.nom_mere,
                item.nom_pere,
            ]
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase()),
        );
    }, [search, data]);

    return (
        <div className="p-4 space-y-4 overflow-hidden">
            {/* Top actions */}
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Rechercher (enfant, parents, village...)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Ajouter une naissance</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nouvelle naissance</DialogTitle>
                        </DialogHeader>

                        <form
                            className="space-y-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const f = new FormData(e.currentTarget);

                                onAdd({
                                    id_naissance: Date.now(),
                                    annee: Number(f.get("annee")),
                                    code_fokontany: Number(
                                        f.get("code_fokontany"),
                                    ),
                                    village: f.get("village"),
                                    nom_enfant: f.get("nom_enfant"),
                                    prenom_enfant: f.get("prenom_enfant"),
                                    sexe: Number(f.get("sexe")),
                                    date_naissance: f.get("date_naissance"),
                                    nom_mere: f.get("nom_mere"),
                                    prenom_mere: f.get("prenom_mere"),
                                    nom_pere: f.get("nom_pere"),
                                    prenom_pere: f.get("prenom_pere"),
                                });

                                e.currentTarget.reset();
                            }}
                        >
                            <Input name="annee" placeholder="Année" required />
                            <Input
                                name="code_fokontany"
                                placeholder="Code fokontany"
                                required
                            />
                            <Input
                                name="village"
                                placeholder="Village"
                                required
                            />

                            <Input
                                name="nom_enfant"
                                placeholder="Nom enfant"
                                required
                            />
                            <Input
                                name="prenom_enfant"
                                placeholder="Prénom enfant"
                                required
                            />

                            <Input
                                name="sexe"
                                placeholder="Sexe (1=M, 2=F)"
                                required
                            />
                            <Input type="date" name="date_naissance" required />

                            <Input
                                name="nom_mere"
                                placeholder="Nom mère"
                                required
                            />
                            <Input
                                name="prenom_mere"
                                placeholder="Prénom mère"
                                required
                            />

                            <Input
                                name="nom_pere"
                                placeholder="Nom père"
                                required
                            />
                            <Input
                                name="prenom_pere"
                                placeholder="Prénom père"
                                required
                            />

                            <Button type="submit" className="w-full">
                                Ajouter
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Année</TableHead>
                        <TableHead>code fokontany</TableHead>
                        <TableHead>village</TableHead>
                        <TableHead>nom enfant</TableHead>
                        <TableHead>prenom enfant</TableHead>
                        <TableHead>sexe</TableHead>
                        <TableHead>date de naissance</TableHead>
                        <TableHead>nom du mere</TableHead>
                        <TableHead>prenom du mere</TableHead>
                        <TableHead>age mere</TableHead>
                        <TableHead>niveau mere</TableHead>
                        <TableHead>nom pere</TableHead>
                        <TableHead> prenom pere</TableHead>
                        <TableHead>Age pere</TableHead>
                        <TableHead>niveau pere</TableHead>
                        <TableHead>Lieu de naissance</TableHead>
                        <TableHead>Assistance</TableHead>
                        <TableHead>Poids</TableHead>
                        <TableHead>Taille</TableHead>
                        <TableHead>Rang</TableHead>
                        <TableHead>Milieu</TableHead>
                        <TableHead>declare</TableHead>
                        <TableHead>date de declaration</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.annee}</TableCell>
                            <TableCell>{row.code_fokontany}</TableCell>
                            <TableCell>{row.village}</TableCell>
                            <TableCell>{row.nom_enfant}</TableCell>
                            <TableCell>{row.prenom_enfant}</TableCell>
                            <TableCell>{row.sexe === 1 ? "M" : "F"}</TableCell>
                            <TableCell>{row.date_naissance}</TableCell>
                            <TableCell>{row.nom_mere}</TableCell>
                            <TableCell>{row.prenom_mere}</TableCell>
                            <TableCell>{row.age_mere}</TableCell>
                            <TableCell>{row.niveau_mere}</TableCell>
                            <TableCell>{row.nom_pere}</TableCell>
                            <TableCell>{row.prenom_pere}</TableCell>
                            <TableCell>{row.age_pere}</TableCell>
                            <TableCell>{row.niveau_pere}</TableCell>
                            <TableCell>{row.lieu_naissance}</TableCell>
                            <TableCell>{row.assistance}</TableCell>
                            <TableCell>{row.poids}</TableCell>
                            <TableCell>{row.taille}</TableCell>
                            <TableCell>{row.rang}</TableCell>
                            <TableCell>{row.milieu}</TableCell>
                            <TableCell>{row.declare}</TableCell>
                            <TableCell>{row.date_declaration}</TableCell>
                            <TableCell className="text-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(row.id_naissance)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

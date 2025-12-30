"use client";

import * as React from "react";
import { Trash2, Plus } from "lucide-react";

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

export default function MariageTable({ data, onAdd, onDelete }) {
    const [search, setSearch] = React.useState("");

    const filteredData = React.useMemo(() => {
        return data.filter((item) =>
            [item.nom_epoux, item.nom_epouse, item.village]
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
                    placeholder="Rechercher (époux, épouse, village...)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="icon">
                            <Plus className="h-5 w-5" />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Nouveau mariage</DialogTitle>
                        </DialogHeader>

                        <form
                            className="grid grid-cols-2 gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const f = new FormData(e.currentTarget);

                                onAdd({
                                    id: Date.now(),
                                    annee: Number(f.get("annee")),
                                    code_fokontany: f.get("code_fokontany"),
                                    village: f.get("village"),

                                    nom_epoux: f.get("nom_epoux"),
                                    prenom_epoux: f.get("prenom_epoux"),
                                    age_epoux: f.get("age_epoux"),
                                    niveau_epoux: f.get("niveau_epoux"),

                                    nom_epouse: f.get("nom_epouse"),
                                    prenom_epouse: f.get("prenom_epouse"),
                                    age_epouse: f.get("age_epouse"),
                                    niveau_epouse: f.get("niveau_epouse"),

                                    date_mariage: f.get("date_mariage"),
                                    lieu_mariage: f.get("lieu_mariage"),
                                    milieu: f.get("milieu"),
                                    declare: f.get("declare"),
                                    date_declaration: f.get("date_declaration"),
                                });

                                e.currentTarget.reset();
                            }}
                        >
                            {/* Infos générales */}
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

                            {/* Epoux */}
                            <Input
                                name="nom_epoux"
                                placeholder="Nom époux"
                                required
                            />
                            <Input
                                name="prenom_epoux"
                                placeholder="Prénom époux"
                                required
                            />
                            <Input
                                type="number"
                                name="age_epoux"
                                placeholder="Âge époux"
                            />
                            <Input
                                name="niveau_epoux"
                                placeholder="Niveau époux"
                            />

                            {/* Epouse */}
                            <Input
                                name="nom_epouse"
                                placeholder="Nom épouse"
                                required
                            />
                            <Input
                                name="prenom_epouse"
                                placeholder="Prénom épouse"
                                required
                            />
                            <Input
                                type="number"
                                name="age_epouse"
                                placeholder="Âge épouse"
                            />
                            <Input
                                name="niveau_epouse"
                                placeholder="Niveau épouse"
                            />

                            {/* Mariage */}
                            <Input type="date" name="date_mariage" required />
                            <Input
                                name="lieu_mariage"
                                placeholder="Lieu de mariage"
                            />

                            <select
                                name="milieu"
                                className="border rounded px-2 py-1"
                            >
                                <option value="">Milieu</option>
                                <option value="Urbain">Urbain</option>
                                <option value="Rural">Rural</option>
                            </select>

                            <select
                                name="declare"
                                className="border rounded px-2 py-1"
                            >
                                <option value="">Déclaré ?</option>
                                <option value="Oui">Oui</option>
                                <option value="Non">Non</option>
                            </select>

                            <Input type="date" name="date_declaration" />

                            <Button type="submit" className="col-span-2">
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
                        <TableHead>Code</TableHead>
                        <TableHead>Village</TableHead>
                        <TableHead>Nom époux</TableHead>
                        <TableHead>Prénom époux</TableHead>
                        <TableHead>Âge</TableHead>
                        <TableHead>Niveau</TableHead>
                        <TableHead>Nom épouse</TableHead>
                        <TableHead>Prénom épouse</TableHead>
                        <TableHead>Âge</TableHead>
                        <TableHead>Niveau</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Lieu</TableHead>
                        <TableHead>Milieu</TableHead>
                        <TableHead>Déclaré</TableHead>
                        <TableHead>Date déclaration</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.annee}</TableCell>
                            <TableCell>{row.code_fokontany}</TableCell>
                            <TableCell>{row.village}</TableCell>
                            <TableCell>{row.nom_epoux}</TableCell>
                            <TableCell>{row.prenom_epoux}</TableCell>
                            <TableCell>{row.age_epoux}</TableCell>
                            <TableCell>{row.niveau_epoux}</TableCell>
                            <TableCell>{row.nom_epouse}</TableCell>
                            <TableCell>{row.prenom_epouse}</TableCell>
                            <TableCell>{row.age_epouse}</TableCell>
                            <TableCell>{row.niveau_epouse}</TableCell>
                            <TableCell>{row.date_mariage}</TableCell>
                            <TableCell>{row.lieu_mariage}</TableCell>
                            <TableCell>{row.milieu}</TableCell>
                            <TableCell>{row.declare}</TableCell>
                            <TableCell>{row.date_declaration}</TableCell>
                            <TableCell className="text-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(row.id)}
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

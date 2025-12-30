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

export default function DivorceTable({ data, onAdd, onDelete }) {
    const [search, setSearch] = React.useState("");

    const filteredData = React.useMemo(() => {
        return data.filter((item) =>
            [item.nom_homme, item.nom_femme, item.village, item.motif]
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
                    placeholder="Rechercher (homme, femme, village, motif...)"
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
                            <DialogTitle>Nouveau divorce</DialogTitle>
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

                                    nom_homme: f.get("nom_homme"),
                                    prenom_homme: f.get("prenom_homme"),
                                    age_homme: f.get("age_homme"),
                                    niveau_homme: f.get("niveau_homme"),

                                    nom_femme: f.get("nom_femme"),
                                    prenom_femme: f.get("prenom_femme"),
                                    age_femme: f.get("age_femme"),
                                    niveau_femme: f.get("niveau_femme"),

                                    date_mariage: f.get("date_mariage"),
                                    date_divorce: f.get("date_divorce"),
                                    motif: f.get("motif"),
                                    lieu_divorce: f.get("lieu_divorce"),
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

                            {/* Homme */}
                            <Input
                                name="nom_homme"
                                placeholder="Nom homme"
                                required
                            />
                            <Input
                                name="prenom_homme"
                                placeholder="Prénom homme"
                                required
                            />
                            <Input
                                type="number"
                                name="age_homme"
                                placeholder="Âge homme"
                            />
                            <Input
                                name="niveau_homme"
                                placeholder="Niveau homme"
                            />

                            {/* Femme */}
                            <Input
                                name="nom_femme"
                                placeholder="Nom femme"
                                required
                            />
                            <Input
                                name="prenom_femme"
                                placeholder="Prénom femme"
                                required
                            />
                            <Input
                                type="number"
                                name="age_femme"
                                placeholder="Âge femme"
                            />
                            <Input
                                name="niveau_femme"
                                placeholder="Niveau femme"
                            />

                            {/* Dates */}
                            <Input type="date" name="date_mariage" />
                            <Input type="date" name="date_divorce" required />

                            <Input
                                name="motif"
                                placeholder="Motif du divorce"
                            />
                            <Input
                                name="lieu_divorce"
                                placeholder="Lieu du divorce"
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
                        <TableHead>Nom homme</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Âge</TableHead>
                        <TableHead>Niveau</TableHead>
                        <TableHead>Nom femme</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Âge</TableHead>
                        <TableHead>Niveau</TableHead>
                        <TableHead>Date mariage</TableHead>
                        <TableHead>Date divorce</TableHead>
                        <TableHead>Motif</TableHead>
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
                            <TableCell>{row.nom_homme}</TableCell>
                            <TableCell>{row.prenom_homme}</TableCell>
                            <TableCell>{row.age_homme}</TableCell>
                            <TableCell>{row.niveau_homme}</TableCell>
                            <TableCell>{row.nom_femme}</TableCell>
                            <TableCell>{row.prenom_femme}</TableCell>
                            <TableCell>{row.age_femme}</TableCell>
                            <TableCell>{row.niveau_femme}</TableCell>
                            <TableCell>{row.date_mariage}</TableCell>
                            <TableCell>{row.date_divorce}</TableCell>
                            <TableCell>{row.motif}</TableCell>
                            <TableCell>{row.lieu_divorce}</TableCell>
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

                    {filteredData.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={19}
                                className="text-center text-muted-foreground"
                            >
                                Aucun divorce trouvé
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

"use client";

import * as React from "react";
import { Trash2, Plus, Pencil } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

export default function DecesTable({ data, onAdd, onUpdate, onDelete }) {
    const [search, setSearch] = React.useState("");

    const filteredData = React.useMemo(() => {
        return data.filter((item) =>
            [
                item.nom_defunt,
                item.prenom_defunt,
                item.village,
                item.cause_deces,
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
                    placeholder="Rechercher (nom, village, cause...)"
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
                            <DialogTitle>Nouveau décès</DialogTitle>
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

                                    nom_defunt: f.get("nom_defunt"),
                                    prenom_defunt: f.get("prenom_defunt"),
                                    sexe: f.get("sexe"),

                                    date_naissance: f.get("date_naissance"),
                                    date_deces: f.get("date_deces"),

                                    cause_deces: f.get("cause_deces"),
                                    lieu_deces: f.get("lieu_deces"),
                                    milieu: f.get("milieu"),
                                    declare: f.get("declare"),
                                    date_declaration: f.get("date_declaration"),
                                });

                                e.currentTarget.reset();
                            }}
                        >
                            {/* Général */}
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

                            {/* Identité */}
                            <Input
                                name="nom_defunt"
                                placeholder="Nom du défunt"
                                required
                            />
                            <Input
                                name="prenom_defunt"
                                placeholder="Prénom du défunt"
                                required
                            />

                            <select
                                name="sexe"
                                className="border rounded px-2 py-1"
                                required
                            >
                                <option value="">Sexe</option>
                                <option value="M">Masculin</option>
                                <option value="F">Féminin</option>
                            </select>

                            <Input type="date" name="date_naissance" />
                            <Input type="date" name="date_deces" required />

                            <Input
                                name="cause_deces"
                                placeholder="Cause du décès"
                            />
                            <Input
                                name="lieu_deces"
                                placeholder="Lieu du décès"
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
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Sexe</TableHead>
                        <TableHead>Date naissance</TableHead>
                        <TableHead>Date décès</TableHead>
                        <TableHead>Lieu</TableHead>
                        <TableHead>Cause</TableHead>
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
                            <TableCell>{row.nom_defunt}</TableCell>
                            <TableCell>{row.prenom_defunt}</TableCell>
                            <TableCell>{row.sexe}</TableCell>
                            <TableCell>{row.date_naissance}</TableCell>
                            <TableCell>{row.date_deces}</TableCell>
                            <TableCell>{row.lieu_deces}</TableCell>
                            <TableCell>{row.cause_deces}</TableCell>
                            <TableCell>{row.milieu}</TableCell>
                            <TableCell>{row.declare}</TableCell>
                            <TableCell>{row.date_declaration}</TableCell>
                            <TableCell className="text-center flex items-center justify-center gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Modifier décès
                                            </DialogTitle>
                                        </DialogHeader>

                                        <form
                                            className="grid grid-cols-2 gap-2"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const f = new FormData(
                                                    e.currentTarget,
                                                );

                                                onUpdate({
                                                    ...row,
                                                    annee: Number(
                                                        f.get("annee"),
                                                    ),
                                                    code_fokontany:
                                                        f.get("code_fokontany"),
                                                    village: f.get("village"),

                                                    nom_defunt:
                                                        f.get("nom_defunt"),
                                                    prenom_defunt:
                                                        f.get("prenom_defunt"),
                                                    sexe: f.get("sexe"),

                                                    date_naissance:
                                                        f.get("date_naissance"),
                                                    date_deces:
                                                        f.get("date_deces"),

                                                    cause_deces:
                                                        f.get("cause_deces"),
                                                    lieu_deces:
                                                        f.get("lieu_deces"),
                                                    milieu: f.get("milieu"),
                                                    declare: f.get("declare"),
                                                    date_declaration:
                                                        f.get(
                                                            "date_declaration",
                                                        ),
                                                });
                                            }}
                                        >
                                            {/* Général */}
                                            <Input
                                                name="annee"
                                                placeholder="Année"
                                                defaultValue={row.annee}
                                                required
                                            />
                                            <Input
                                                name="code_fokontany"
                                                placeholder="Code fokontany"
                                                defaultValue={
                                                    row.code_fokontany
                                                }
                                                required
                                            />
                                            <Input
                                                name="village"
                                                placeholder="Village"
                                                defaultValue={row.village}
                                                required
                                            />

                                            {/* Identité */}
                                            <Input
                                                name="nom_defunt"
                                                placeholder="Nom du défunt"
                                                defaultValue={row.nom_defunt}
                                                required
                                            />
                                            <Input
                                                name="prenom_defunt"
                                                placeholder="Prénom du défunt"
                                                defaultValue={row.prenom_defunt}
                                                required
                                            />

                                            <select
                                                name="sexe"
                                                className="border rounded px-2 py-1"
                                                defaultValue={row.sexe}
                                                required
                                            >
                                                <option value="">Sexe</option>
                                                <option value="M">
                                                    Masculin
                                                </option>
                                                <option value="F">
                                                    Féminin
                                                </option>
                                            </select>

                                            <Input
                                                type="date"
                                                name="date_naissance"
                                                defaultValue={
                                                    row.date_naissance
                                                }
                                            />
                                            <Input
                                                type="date"
                                                name="date_deces"
                                                defaultValue={row.date_deces}
                                                required
                                            />

                                            <Input
                                                name="cause_deces"
                                                placeholder="Cause du décès"
                                                defaultValue={row.cause_deces}
                                            />
                                            <Input
                                                name="lieu_deces"
                                                placeholder="Lieu du décès"
                                                defaultValue={row.lieu_deces}
                                            />

                                            <select
                                                name="milieu"
                                                className="border rounded px-2 py-1"
                                                defaultValue={row.milieu}
                                            >
                                                <option value="">Milieu</option>
                                                <option value="Urbain">
                                                    Urbain
                                                </option>
                                                <option value="Rural">
                                                    Rural
                                                </option>
                                            </select>

                                            <select
                                                name="declare"
                                                className="border rounded px-2 py-1"
                                                defaultValue={row.declare}
                                            >
                                                <option value="">
                                                    Déclaré ?
                                                </option>
                                                <option value="Oui">Oui</option>
                                                <option value="Non">Non</option>
                                            </select>

                                            <Input
                                                type="date"
                                                name="date_declaration"
                                                defaultValue={
                                                    row.date_declaration
                                                }
                                            />

                                            <Button
                                                type="submit"
                                                className="col-span-2"
                                            >
                                                Modifier
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>

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
                                colSpan={14}
                                className="text-center text-muted-foreground"
                            >
                                Aucun décès trouvé
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

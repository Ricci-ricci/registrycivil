"use client";
import { Trash2 } from "lucide-react";
import { Plus } from "lucide-react";

import * as React from "react";
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

export default function DecesTable({ data, onAdd, onDelete }) {
    const [search, setSearch] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(data);

    React.useEffect(() => {
        setFilteredData(
            data.filter(
                (item) =>
                    item.nom_defunt
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.prenom_defunt
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.village.toLowerCase().includes(search.toLowerCase()) ||
                    item.cause.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    }, [search, data]);

    return (
        <div className="p-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <Input
                    placeholder="Search décès..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-xs"
                />

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="default"
                            size="icon"
                            aria-label="Add Naissance"
                        >
                            <Plus className="h-5 w-5" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Décès</DialogTitle>
                        </DialogHeader>

                        {/* Form */}
                        <form
                            className="space-y-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);

                                onAdd({
                                    id: Date.now(),
                                    annee: Number(formData.get("annee")),
                                    village: formData.get("village"),
                                    nom: formData.get("nom"),
                                    prenom: formData.get("prenom"),
                                    sexe: formData.get("sexe"),
                                    date_deces: formData.get("date_deces"),
                                    cause: formData.get("cause"),
                                });

                                e.currentTarget.reset();
                            }}
                        >
                            <Input name="annee" placeholder="Année" required />
                            <Input
                                name="village"
                                placeholder="Village"
                                required
                            />
                            <Input name="nom" placeholder="Nom" required />
                            <Input
                                name="prenom"
                                placeholder="Prénom"
                                required
                            />
                            <Input
                                name="sexe"
                                placeholder="Sexe (M/F)"
                                required
                            />
                            <Input name="date_deces" type="date" required />
                            <Input
                                name="cause"
                                placeholder="Cause du décès"
                                required
                            />

                            <Button type="submit" className="w-full">
                                Add
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
                        <TableHead>Code fokotany</TableHead>
                        <TableHead>Village</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Sexe</TableHead>
                        <TableHead>date de naissance</TableHead>
                        <TableHead>Date Décès</TableHead>
                        <TableHead>lieu deces</TableHead>
                        <TableHead>Cause</TableHead>
                        <TableHead>Milieu</TableHead>
                        <TableHead>Declare</TableHead>
                        <TableHead>Date de declaration</TableHead>
                        <TableHead>Action</TableHead>
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
                            <TableCell>{row.cause_deces}</TableCell>
                            <TableCell>{row.lieu_deces}</TableCell>
                            <TableCell>{row.milieu}</TableCell>
                            <TableCell>{row.declare}</TableCell>
                            <TableCell>{row.date_declaration}</TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(row.id)}
                                    aria-label="Delete"
                                >
                                    <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                    {filteredData.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="text-center text-muted-foreground"
                            >
                                No décès found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

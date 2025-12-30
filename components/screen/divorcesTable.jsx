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

export default function DivorceTable({ data, onAdd, onDelete }) {
    const [search, setSearch] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(data);

    React.useEffect(() => {
        setFilteredData(
            data.filter(
                (item) =>
                    item.nom_homme
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.nom_femme
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.village.toLowerCase().includes(search.toLowerCase()) ||
                    item.motif.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    }, [search, data]);

    return (
        <div className="p-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 ">
                <Input
                    placeholder="Search divorce..."
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
                            <DialogTitle>Add New Divorce</DialogTitle>
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
                                    homme: formData.get("homme"),
                                    femme: formData.get("femme"),
                                    date_divorce: formData.get("date_divorce"),
                                    motif: formData.get("motif"),
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
                            <Input
                                name="homme"
                                placeholder="Nom de l'homme"
                                required
                            />
                            <Input
                                name="femme"
                                placeholder="Nom de la femme"
                                required
                            />
                            <Input name="date_divorce" type="date" required />
                            <Input
                                name="motif"
                                placeholder="Motif du divorce"
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
            <Table className="overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead>Année</TableHead>
                        <TableHead>Code Fokontany</TableHead>
                        <TableHead>Village</TableHead>
                        <TableHead>Nom Homme</TableHead>
                        <TableHead>Prenom Homme</TableHead>
                        <TableHead>Age Homme</TableHead>
                        <TableHead>Niveau Homme</TableHead>
                        <TableHead>Nom Femme</TableHead>
                        <TableHead>Prenom Femme</TableHead>
                        <TableHead>Age Femme</TableHead>
                        <TableHead>Niveau femme</TableHead>
                        <TableHead>Date Mariage</TableHead>
                        <TableHead>Date Divorce</TableHead>
                        <TableHead>Motif</TableHead>
                        <TableHead>Lieu divorce</TableHead>
                        <TableHead>Milieu</TableHead>
                        <TableHead>Declare</TableHead>
                        <TableHead>Date declaration</TableHead>
                        <TableHead>Action</TableHead>
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
                                colSpan={7}
                                className="text-center text-muted-foreground"
                            >
                                No divorce found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

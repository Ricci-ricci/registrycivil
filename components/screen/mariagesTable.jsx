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

export default function MariageTable({ data, onAdd, onDelete }) {
    const [search, setSearch] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(data);

    React.useEffect(() => {
        setFilteredData(
            data.filter(
                (item) =>
                    item.nom_epoux
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.nom_epouse
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.village.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    }, [search, data]);

    return (
        <div className="p-4 overflow-hidden">
            <div className="flex justify-between mb-4">
                <Input
                    placeholder="Search..."
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
                            <DialogTitle>Add New Mariage</DialogTitle>
                        </DialogHeader>
                        {/* Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                onAdd({
                                    id: Date.now(),
                                    annee: formData.get("annee"),
                                    village: formData.get("village"),
                                    nom_epoux: formData.get("epoux"),
                                    nom_epouse: formData.get("epouse"),
                                    date_mariage: formData.get("date_mariage"),
                                    lieu: formData.get("lieu"),
                                });
                                e.currentTarget.reset();
                            }}
                        >
                            <Input
                                name="annee"
                                placeholder="Année"
                                required
                                className="mb-2"
                            />
                            <Input
                                name="village"
                                placeholder="Village"
                                required
                                className="mb-2"
                            />
                            <Input
                                name="epoux"
                                placeholder="Nom Epoux"
                                required
                                className="mb-2"
                            />
                            <Input
                                name="epouse"
                                placeholder="Nom Epouse"
                                required
                                className="mb-2"
                            />
                            <Input
                                name="date_mariage"
                                type="date"
                                placeholder="Date Mariage"
                                required
                                className="mb-2"
                            />
                            <Input
                                name="lieu"
                                placeholder="Lieu"
                                required
                                className="mb-2"
                            />
                            <Button type="submit">Add</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Année</TableHead>
                        <TableHead>Code fokotany</TableHead>
                        <TableHead>Village</TableHead>
                        <TableHead>Nom Epoux</TableHead>
                        <TableHead>Prenom Epoux</TableHead>
                        <TableHead>Age Epoux</TableHead>
                        <TableHead>Niveaux Epoux</TableHead>
                        <TableHead>Nom Epouse</TableHead>
                        <TableHead>Prenom Epouse</TableHead>
                        <TableHead>Age epouse</TableHead>
                        <TableHead>Niveau epouse</TableHead>
                        <TableHead>Date de mariage</TableHead>
                        <TableHead>Lieu de mariage</TableHead>
                        <TableHead>Milieu</TableHead>
                        <TableHead>declare</TableHead>
                        <TableHead>date de declaration</TableHead>
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
                </TableBody>
            </Table>
        </div>
    );
}

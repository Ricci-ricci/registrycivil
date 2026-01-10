"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f97316",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#eab308",
    "#ec4899",
    "#14b8a6",
];

export function DistributionPieChart({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Répartition des événements</CardTitle>
            </CardHeader>
            <CardContent className="h-75">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

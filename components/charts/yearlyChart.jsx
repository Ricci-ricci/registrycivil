"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function YearlyBarChart({ data }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Événements par année</CardTitle>
            </CardHeader>
            <CardContent className="h-75">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="naissance" fill="#22c55e" />
                        <Bar dataKey="mariage" fill="#3b82f6" />
                        <Bar dataKey="divorce" fill="#f97316" />
                        <Bar dataKey="deces" fill="#ef4444" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

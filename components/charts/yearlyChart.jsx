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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
                        <Bar dataKey="naissance" />
                        <Bar dataKey="mariage" />
                        <Bar dataKey="divorce" />
                        <Bar dataKey="deces" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

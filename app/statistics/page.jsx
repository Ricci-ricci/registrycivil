"use client";
import React, { useEffect, useState } from "react";
import { YearlyBarChart } from "../../components/charts/yearlyChart";
import { DistributionPieChart } from "../../components/charts/distributionPieCharts";

export default function StatisticsPage() {
    const [yearlyStats, setYearlyStats] = useState([]);
    const [distributionStats, setDistributionStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch data from API endpoints
                const [naissancesRes, decesRes, dashboardRes] =
                    await Promise.all([
                        fetch("/api/statistiques/naissances-par-annee"),
                        fetch("/api/statistiques/deces-par-annee"),
                        fetch("/api/statistiques/dashboard"),
                    ]);

                const naissancesData = naissancesRes.ok
                    ? await naissancesRes.json()
                    : [];
                const decesData = decesRes.ok ? await decesRes.json() : [];
                const dashboardData = dashboardRes.ok
                    ? await dashboardRes.json()
                    : {};

                // --- Process Yearly Stats ---
                const yearsMap = new Map();

                // Helper function to process yearly data arrays
                const processYearlyData = (data, key) => {
                    const list = Array.isArray(data) ? data : data.data || [];
                    list.forEach((item) => {
                        // API usually returns { year: 2023, count: 10 } or { annee: 2023, total: 10 }
                        const year = item.year || item.annee;
                        const count =
                            item.count || item.total || item.value || 0;

                        if (year) {
                            if (!yearsMap.has(year)) {
                                yearsMap.set(year, {
                                    year,
                                    naissance: 0,
                                    mariage: 0,
                                    divorce: 0,
                                    deces: 0,
                                });
                            }
                            yearsMap.get(year)[key] = Number(count);
                        }
                    });
                };

                processYearlyData(naissancesData, "naissance");
                processYearlyData(decesData, "deces");
                // Note: Mariage and Divorce endpoints are not currently in the route list,
                // so they remain 0 unless added later.

                const mergedYearlyStats = Array.from(yearsMap.values()).sort(
                    (a, b) => a.year - b.year,
                );
                setYearlyStats(mergedYearlyStats);

                // --- Process Distribution Stats ---
                // Mapping dashboard response to pie chart format
                const distData = [
                    {
                        name: "Naissances",
                        value: Number(
                            dashboardData.total_naissances ||
                                dashboardData.naissances ||
                                0,
                        ),
                    },
                    {
                        name: "Décès",
                        value: Number(
                            dashboardData.total_deces ||
                                dashboardData.deces ||
                                0,
                        ),
                    },
                    // Include placeholders for Mariages/Divorces if the dashboard endpoint provides them
                    {
                        name: "Mariages",
                        value: Number(
                            dashboardData.total_mariages ||
                                dashboardData.mariages ||
                                0,
                        ),
                    },
                    {
                        name: "Divorces",
                        value: Number(
                            dashboardData.total_divorces ||
                                dashboardData.divorces ||
                                0,
                        ),
                    },
                ].filter((item) => item.value > 0); // Hide empty segments

                setDistributionStats(distData);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="text-lg">Chargement des statistiques...</div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 w-screen">
            <h1 className="text-2xl font-bold">Statistiques</h1>

            <div className="grid gap-6 md:grid-cols-2">
                {yearlyStats.length > 0 ? (
                    <YearlyBarChart data={yearlyStats} />
                ) : (
                    <div className="flex items-center justify-center h-64 border rounded-lg bg-gray-50 text-gray-500">
                        Aucune donnée annuelle disponible
                    </div>
                )}

                {distributionStats.length > 0 ? (
                    <DistributionPieChart data={distributionStats} />
                ) : (
                    <div className="flex items-center justify-center h-64 border rounded-lg bg-gray-50 text-gray-500">
                        Aucune donnée de distribution disponible
                    </div>
                )}
            </div>
        </div>
    );
}

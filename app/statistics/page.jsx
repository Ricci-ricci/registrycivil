import { yearlyStats, distributionStats } from "@/components/data/statistics";
import { YearlyBarChart } from "@/components/charts/yearlyChart";
import { DistributionPieChart } from "@/components/charts/distributionPieCharts";
export default function StatisticsPage() {
    return (
        <div className="p-6 space-y-6 w-screen">
            <h1 className="text-2xl font-bold">Statistiques</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <YearlyBarChart data={yearlyStats} />
                <DistributionPieChart data={distributionStats} />
            </div>
        </div>
    );
}

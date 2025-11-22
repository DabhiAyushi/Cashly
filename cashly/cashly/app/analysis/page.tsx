import type { Metadata } from "next";
import { Suspense } from "react";
import {
  getSpendingByCategory,
  getSpendingOverTime,
  getTotalSpending,
} from "@/lib/db/queries";
import { StatsCards } from "@/components/analytics/stats-cards";
import { CategoryChart } from "@/components/analytics/category-chart";
import { TimeChart } from "@/components/analytics/time-chart";
import { DateFilter } from "@/components/analytics/date-filter";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Spending Analysis",
  description: "Analyze your spending patterns with interactive charts and detailed breakdowns by category. Track your financial trends over time.",
};

function getDateRange(range?: string) {
  if (!range || range === "all") return undefined;

  const now = new Date();
  const from = new Date();

  switch (range) {
    case "7d":
      from.setDate(now.getDate() - 7);
      break;
    case "30d":
      from.setDate(now.getDate() - 30);
      break;
    case "90d":
      from.setDate(now.getDate() - 90);
      break;
    case "1y":
      from.setFullYear(now.getFullYear() - 1);
      break;
    default:
      return undefined;
  }

  return { from, to: now };
}

async function AnalyticsContent({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const params = await searchParams;
  const dateRange = getDateRange(params.range);

  const [categoryData, timeData, totals] = await Promise.all([
    getSpendingByCategory(dateRange),
    getSpendingOverTime(dateRange),
    getTotalSpending(dateRange),
  ]);

  const hasData = totals.count > 0;

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-light mb-2">No Data Yet</h2>
        <p className="text-muted-foreground mb-6">
          Start tracking your expenses by uploading your first receipt!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatsCards
        total={totals.total}
        count={totals.count}
        average={totals.average}
      />

      <CategoryChart data={categoryData} />

      <TimeChart data={timeData} />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border bg-card text-card-foreground shadow-sm p-6"
          >
            <div className="pb-2">
              <Skeleton className="h-4 w-32" />
            </div>
            <div>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        ))}
      </div>

      {/* Category Chart */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <div className="mb-6">
          <Skeleton className="h-3 w-40 mb-2" />
          <Skeleton className="h-7 w-48 mb-1" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="mb-4">
          <Skeleton className="mx-auto aspect-square max-h-[250px] rounded-full" />
        </div>
        <div className="text-center mb-6">
          <Skeleton className="h-9 w-32 mx-auto mb-1" />
          <Skeleton className="h-3 w-24 mx-auto" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Time Chart */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <div className="mb-6">
          <Skeleton className="h-3 w-32 mb-2" />
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
          <Skeleton className="h-4 w-72 mb-4" />
          <Skeleton className="h-10 w-60 rounded-lg" />
        </div>
        <div>
          <Skeleton className="h-[300px] rounded" />
        </div>
      </div>
    </div>
  );
}

export default function AnalysisPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  return (
    <div className="container mx-auto p-3 max-w-7xl pb-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-light">Spending Analysis</h1>
          <p className="text-muted-foreground">
            Track and analyze your expenses
          </p>
        </div>
        <Suspense fallback={<div className="w-[180px] h-10" />}>
          <DateFilter />
        </Suspense>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <AnalyticsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

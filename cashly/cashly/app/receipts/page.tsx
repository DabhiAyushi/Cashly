import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllReceipts } from "@/lib/db/queries";
import { ReceiptsList } from "@/components/receipts/receipts-list";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Receipt History",
  description: "View all your uploaded receipts and transactions in one place. Access detailed information about each expense.",
};

async function ReceiptsContent() {
  const receipts = await getAllReceipts();

  return <ReceiptsList receipts={receipts} />;
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg px-4"
        >
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          <Skeleton className="h-5 w-24" />
        </div>
      ))}
    </div>
  );
}

export default function ReceiptsPage() {
  return (
    <div className="container mx-auto p-3 max-w-7xl pb-24">
      <div className="mb-6">
        <h1 className="text-3xl font-light">Receipt History</h1>
        <p className="text-muted-foreground">View all your uploaded receipts</p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <ReceiptsContent />
      </Suspense>
    </div>
  );
}

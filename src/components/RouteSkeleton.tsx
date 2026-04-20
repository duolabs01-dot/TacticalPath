import { Skeleton } from "@/components/ui/skeleton";

export function RouteSkeleton() {
  return (
    <div className="tp-page min-h-screen px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-3 w-28 rounded-full" />
            <Skeleton className="h-10 w-72 rounded-2xl" />
          </div>
          <Skeleton className="h-12 w-12 rounded-2xl" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Skeleton className="h-[320px] rounded-[2rem]" />
          <div className="grid gap-4">
            <Skeleton className="h-32 rounded-[2rem]" />
            <Skeleton className="h-44 rounded-[2rem]" />
            <Skeleton className="h-24 rounded-[2rem]" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-40 rounded-[2rem]" />
          <Skeleton className="h-40 rounded-[2rem]" />
          <Skeleton className="h-40 rounded-[2rem]" />
        </div>
      </div>
    </div>
  );
}

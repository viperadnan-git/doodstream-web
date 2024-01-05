import { useMemo } from "react";

export const DOTS = "...";

const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

export default function usePagination({
    total,
    siblings,
    current,
}: {
    total: number;
    siblings: number;
    current: number;
}) {
    const paginationRange = useMemo(() => {
        const totalNumbers = siblings + 5;

        if (totalNumbers >= total) {
            return range(1, total);
        }

        const leftsiblingIndex = Math.max(current - siblings, 1);
        const rightsiblingIndex = Math.min(current + siblings, total);

        const shouldShowLeftDots = leftsiblingIndex > 2;
        const shouldShowRightDots = rightsiblingIndex < total - 2;

        const firstPageIndex = 1;
        const lastPageIndex = total;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblings;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, total];
        } else if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblings;
            let rightRange = range(total - rightItemCount + 1, total);
            return [firstPageIndex, DOTS, ...rightRange];
        } else {
            let middleRange = range(leftsiblingIndex, rightsiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [total, siblings, current]);

    return paginationRange;
}

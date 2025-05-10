import { useEffect, useState, useRef, RefObject } from "react";

export default function useOnScreen(ref: RefObject<HTMLElement>, threshold: number = 0.1) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isOnScreen, setIsOnScreen] = useState(false);

    useEffect(() => {
        if (ref.current) {
            observerRef.current = new IntersectionObserver(
                ([entry]) => setIsOnScreen(entry.isIntersecting),
                {
                    threshold,  // Tùy chỉnh threshold nếu cần
                }
            );
            observerRef.current.observe(ref.current);

            return () => {
                observerRef.current!.disconnect();
            };
        }
    }, [ref, threshold]);

    return isOnScreen;
}

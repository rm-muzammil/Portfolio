"use client";
import { useEffect} from "react";
import Lenis from "lenis";

export default function LenisWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number;

    async function init() {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
import dynamic from "next/dynamic";
import { Suspense } from "react";

const OxmoseLogoAnimation = dynamic(() => import("./oxmoseLogoAnimation"), {
  ssr: false,
});

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Suspense fallback={null}>
        <OxmoseLogoAnimation />
      </Suspense>
    </div>
  );
}

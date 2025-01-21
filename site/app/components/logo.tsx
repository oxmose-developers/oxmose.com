import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";

const LogoAnimation = dynamic(() => import("./logo-animation"), { ssr: false });

export function OxmoseAnimatedLogo() {
  return (
    <div className="relative -m-1 size-14 invert dark:invert-0">
      <ErrorBoundary fallback={<OxmoseStillLogo />}>
        <LogoAnimation />
      </ErrorBoundary>
    </div>
  );
}

export const OxmoseStillLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 192 192"
    style={{
      width: "100%",
      height: "100%",
      contentVisibility: "visible",
    }}
  >
    <defs>
      <clipPath id="a">
        <path d="M0 0h192v192H0z" />
      </clipPath>
      <clipPath id="b">
        <path d="M0 0h1500v1500H0z" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <g
        clipPath="url(#b)"
        style={{
          display: "block",
        }}
        transform="matrix(.13 0 0 .13 -1.5 -1.5)"
      >
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="none"
            stroke="#FFF"
            strokeLinecap="square"
            strokeWidth={35}
            d="M744.002 753.998S1167.882 336.105 1167 335c-79-99-480-333-829.001-11-253.785 234.151-223.999 642-4 851.999 254.774 243.193 683.711 215.199 895.001-88C1429 801 1306 520 1228 412"
          />
          <path
            fill="none"
            stroke="#FFF"
            strokeWidth={32}
            d="m128 1364 444.644-444.268"
            opacity={0.99}
          />
          <path
            fill="#FFF"
            d="M606 831.4c28.478 0 51.6 23.122 51.6 51.6s-23.122 51.6-51.6 51.6-51.6-23.122-51.6-51.6 23.122-51.6 51.6-51.6z"
          />
          <path
            fill="none"
            stroke="#FFF"
            strokeWidth={32}
            d="m196 1309-71-136 218 159-158-278 293 217-206-369 363 264-105-205"
          />
        </g>
      </g>
    </g>
  </svg>
);

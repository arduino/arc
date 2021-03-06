import * as React from 'react';

export function AvatarPirate(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg width="1em" height="1em" viewBox="0 0 300 300" {...props}>
      <defs>
        <clipPath id="clip-path">
          <path fill="none" d="M0 0h300v300H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-path)">
        <path fill="#23a6a6" d="M-7.794-5.211H305.58v314.717H-7.794z" />
        <path
          d="M79.17 266.27l26.35-140.44s-28.15.69-22.66-38.11c0 0-17.16-8.92-.34-15.1 0 0-1.37-33 19.91-41.54s61.79-6.86 70.72 27.81-3.78 48.75-3.78 48.75l62.57 156.83"
          fill="#374146"
        />
        <path fill="none" d="M9.13 212.63a154.77 154.77 0 00288.32-24.16" />
        <path
          d="M307.32 196.406c-5.9 20.539-.952 108.476-.952 108.476s-246.683 15.8-308.3-1.9c0 0-7.612-26.643-.951-70.414 6.4-14.51 36.012-71.315 53.3-77.935C68.5 147.77 102 144.55 102 144.55l37 118.25 42.66-119.79v-.21l46.1-2.06h.25s17-5.66 36.56 14.41c11.16 11.42 33.77 32.226 42.75 41.256z"
          fill="#fe866f"
        />
        <path
          d="M86.9 47.77c2.13 1.8 4.8 5 8.55 7.59a115.018 115.018 0 0021.18 11.86c9.43 4 26.35 7.19 38.1 7.24"
          strokeWidth="2.94"
          strokeMiterlimit="10"
          stroke="#f45914"
          fill="none"
        />
        <path d="M95.48 55.28s-5.06 21.12 3.17 26.95 19.68 3 21.63-7.89v-5.15s-11.41-6.01-24.8-13.91z" fill="#f45914" />
        <path
          d="M82.72 91.31c1-.35 3.85-2.64 11.68 4.72 6.38 6 16.08-1.25 16.08-1.25"
          strokeLinecap="round"
          stroke="#f1c40f"
          strokeWidth="5.88"
          strokeMiterlimit="10"
          fill="none"
        />
        <path
          fill="#f1c40f"
          d="M82.17 107.01s15.51-1.77 19.22-1.72c4.92.06 6.09 10.77.65 19.61-1.8 2.92-9.89 4.72-13.35 3.05-4.69-2.32-5.15-9.31-6.52-20.94z"
        />
        <path
          d="M157 92.87s6.18 4.81 5.15 11.68-13.39 6.86-11.67-4.81"
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="2.94"
          strokeMiterlimit="10"
          fill="none"
        />
        <path
          fill="#f1c40f"
          d="M96.51 33.91s45.06 39.74 57.76 43.17c0 0 9.89-4.65 14.07 1 4 5.43 1 12.7-5.15 18.2l27.81 70.4 38.79-20.94s-3.43-14.76-18.88-17.85-7.55-16.48-25.4-16.13c0 0 14.76-28.5-1-55.62s-48.99-44.03-88-22.23z"
        />
        <circle fill="#fff" cx="139.32" cy="278.59" r="4.81" />
        <circle fill="#fff" cx="139.32" cy="295.76" r="4.81" />
      </g>
    </svg>
  );
}

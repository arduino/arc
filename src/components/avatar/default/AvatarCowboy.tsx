import * as React from 'react';

export function AvatarCowboy(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg width="1em" height="1em" viewBox="0 0 300 300" {...props}>
      <defs>
        <clipPath id="clip-path">
          <path fill="none" d="M0 0h300v300H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-path)">
        <path fill="#f1c40f" d="M-7.794-5.211H305.58v314.717H-7.794z" />
        <path
          d="M106.23 167.63l12.45-20s-15.34 1.33-13.67-19c0 0-10 .67-6.34-6 0 0 7.67-1.34 1-10.34s3-18 3-18 35.31-12.37 38.31-11.7 18.34 16 18.34 16l2.71 45.41 24 18.67L145.98 187l-44.68-8.67z"
          fill="#fe866f"
        />
        <path
          d="M114.98 113.6s-9.67 13 2.33 23"
          strokeMiterlimit="10"
          stroke="#374146"
          strokeLinecap="round"
          strokeWidth="3.22"
          fill="none"
        />
        <path
          d="M138.44 281l-25.2.27-60.72.66a163.9 163.9 0 0068.8 29.59l3.41.56a165 165 0 00126.42-32.32zm122.29-117.7a47.113 47.113 0 00-9.23-4.16c-12.39-4.26-28-5.29-40.85-5.24-6.35 0-12.07.32-16.36.64-5.13.34-8.25.76-8.25.76-.88.75-1.75 1.49-2.62 2.18-.67.55-1.35 1.08-2 1.56-23.08 17.92-42.3 17.78-55.14 13.79l-.58-.16a46.587 46.587 0 01-16.72-9.45l-.3-.27s-6.8 1.3-16.43 3.39c-.27.06-.53.11-.8.19-2.54.55-5.29 1.16-8.15 1.8-16.39 3.78-36.56 8.92-47 13.74a8.5 8.5 0 00-1.27.58c-11.49 5.61-30.424 42.772-36.644 60.382 2.31 4.07-8.83 62.6-6.18 66.474 7.62 11.09 32.279-12.513 42.339-3.673l10.15-1.268h12.052c20.343 15.041 39.694 2.524 64.6 6.945l1.6-.47 1.81 1c44.791 7.054 132.445-4.3 132.445-4.3 20.82-17.37 36.018 21.864 46.309-3.806.82-2-2.244-100.01-1.534-102.15C289.58 188.33 275.21 172 260.73 163.3z"
          fill="#374146"
        />
        <path
          stroke="#f1c40f"
          strokeWidth="3.24"
          strokeMiterlimit="10"
          fill="none"
          d="M184.15 181v.03L140 204.79l-8.21-17.82-5.2-11.32-.27-.55-.32.38-7.59 8.9-13.12 15.41-12.76-30.63-2.24-5.38"
        />
        <path
          fill="#23a6a6"
          d="M113.24 281.25l8.08 30.25c-24.909-4.421-52.477 8.74-72.819-6.3l-6.978 2.537-10.15-5.709L44.68 244.99l-8.36-62.92 47-13.74zM269.258 303.3l-17.128 3.172c-35.909 27.686-82.629 12.646-127.42 5.592L138.44 281l43.68-98.83 1.72-3.89v-.06l8-18.15 2.4-5.48 9.55-.91c5.35 0 5.81-.09 9-.19 12.86-.05 26.23 1.44 38.62 5.7L235.75 235z"
        />
        <path
          fill="#fff"
          d="M93.33 64.92s4.34-4 15.68-17.34 15.67-21.68 30.68-22.35 19-4.67 26.34 2 22 28.79 35.68 38c0 0 18.68-2.67 27.35 7.67s7.33 32-23.35 45.35-35.68 7.12-35.68 7.12 15-9.79 6.34-30.46-19.34-27.35-50-15.67c-.02.02-18.7-4.32-33.04-14.32z"
        />
        <path
          d="M112.43 94.88s48.72 31 49.7 46.26c0 0 36.91-17.71 17.72-45.27s-23.63-15.75-23.63-15.75z"
          fill="#f45914"
        />
        <path
          fill="#fff"
          d="M56.64 92c10.41 4.43 54.93 19.58 113.39-14.74l13.12-10.12s-34.46 9.78-61.8 3.11-45.9-17.89-60.7-9.67C49.5 66.78 42.98 80.17 51.98 89a15.1 15.1 0 004.66 3z"
        />
        <path
          fill="#23a6a6"
          d="M136.85 65.56l-8.24-4.01-7.98 4.51 1.27-9.07-6.76-6.19 9.02-1.6 3.8-8.34 4.31 8.08 9.1 1.04-6.35 6.6 1.83 8.98zM83.28 168.33s-35.1 5.87-47 13.74"
        />
      </g>
    </svg>
  );
}

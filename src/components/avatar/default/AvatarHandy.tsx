import * as React from 'react';

export function AvatarHandy(props): React.ReactElement {
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
          d="M104.65 183.87l16.42-35s-13.38-17.64-10-31 49.56-45.3 64.46-43.78S198.3 100.87 191 118.5c0 0 19.15 7 2.13 14.9 0 0 11.25 21.89-10.95 30.41l18.24 24.62-42.87 24-50.77-14.29z"
          fill="#374146"
        />
        <path
          fill="#fff"
          d="M22.66 237.6s6.53-56.17 45.4-57.48 40.17-4.25 40.17-4.25 34.58 42.47 84.22 1c0 0 5.27 7.51 42.5 3.91s49.01 16.243 53.89 31c7.416 22.427 17.845 92.785 17.845 92.785l-86.273 1.268s-91.972 1.327-92.952 1.327-114.483-6.4-114.483-6.4z"
        />
        <path
          d="M92.23 176.53L104 235l-23.2 65.193s100.92 42.78 159.05-13.391l-33.31-56.712 3.59-54.54-15.35-3.92-3.92 56.83h-68.59L105 172.94z"
          fill="#fe866f"
        />
        <path
          d="M178.23 121.24s14.29 13.68 0 26.75"
          strokeWidth="2.85"
          stroke="#f1c40f"
          strokeLinecap="round"
          strokeMiterlimit="10"
          fill="none"
        />
        <path
          d="M184.66 85.83s-21.33 16.86-18 30.24c0 0-4.25.91-7.9-6.39 0 0-16.72 18.55-7.3 31 0 0-12.16-1.22-16.11-9.43 0 0-.31 10.64 3.65 13.68 0 0-11.25-2.73-14-8.21 0 0-.91 4.26 5.47 10 0 0-26.76-1.83-21.28-26.45 0 0 43.48-29.19 44.39-29.19s31.08-5.25 31.08-5.25z"
          fill="#f45914"
        />
        <path
          strokeWidth="2.83"
          stroke="#f1c40f"
          strokeLinecap="round"
          strokeMiterlimit="10"
          fill="none"
          d="M126.52 245.44h59.12"
        />
        <circle fill="#f1c40f" cx="115.02" cy="242.67" r="6.7" />
        <circle fill="#f1c40f" cx="198.37" cy="242.67" r="6.7" />
        <path
          fill="#fff"
          d="M109.21 120.33l80.27-36.49-1.22-36.49-29.79 17.64-32.54-14.9-10.03 38.92L94 94.18l15.21 26.15z"
        />
        <path
          fill="none"
          stroke="#f1c40f"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2.64px"
          d="M120.15 90.22s66-12.46 64.77-11.25M134.14 82.32l18.55-15.2"
        />
      </g>
    </svg>
  );
}

import * as React from 'react';

export function AvatarAstronaut(props): React.ReactElement {
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
          fill="#fff"
          d="M13.68 213.38s5.58-19.51 31-24.39 47.38-5.57 51.91-9.41 49.12 39 107.3-3.83c0 0 26.82 8.71 57.48 6.27 0 0 31 1.463 42.144 14.7l3.806 108.48s-113.573-2.862-153.515-1.269l-159.859.635s8.881-75.49 19.734-91.186z"
        />
        <circle fill="#fff" cx="149.92" cy="103.6" r="81.17" />
        <path
          d="M98.42 174.92l15.42-33.21 48.62-83s33.21 11.86 34 13a39.829 39.829 0 015.93 36.37s15.42 4.75-1.58 11.07c0 0 10.67 29.25-17.79 29.65l17 30.44s-45.02 28.49-101.6-4.32z"
          fill="#374146"
        />
        <path
          d="M193 106.57s7.91 11.46-2 22.53"
          strokeWidth="3.09"
          strokeMiterlimit="10"
          strokeLinecap="round"
          stroke="#f45914"
          fill="none"
        />
        <path
          strokeMiterlimit="10"
          fill="none"
          strokeWidth="3.09px"
          stroke="#23a6a6"
          d="M44.46 189c13.33 13.36 31.13 40.43 15.73 81.27M262.54 249.64c-19.72-32.5-16.82-55.61-12.86-67.18M148.15 300.5V196.65"
        />
        <circle
          strokeMiterlimit="10"
          fill="none"
          strokeWidth="3.09px"
          stroke="#23a6a6"
          cx="216.8"
          cy="240.18"
          r="16.55"
        />
        <path
          strokeMiterlimit="10"
          fill="none"
          stroke="#fff"
          strokeWidth=".77px"
          strokeLinecap="round"
          d="M84.4 74.72s11.15-31.7 38-38M98 66s2.44-11.84 16.37-17.42"
        />
        <path
          d="M95.9 168.25s-10.45 9.05-7.66 14.63 79.08 42.15 123-6.62a65.132 65.132 0 00-7.66-12.19c-4.21-4.88-28.58 45.28-107.68 4.18z"
          fill="#f45914"
        />
        <path
          fill="#fe866f"
          d="M102 112.7s5.66 21.24 30.44 15.58 75.05-44.6 65.84-59.47-35-27.26-65.84-16.29C113.37 59.33 91.42 90.05 102 112.7z"
        />
        <circle fill="#fe866f" cx="158.14" cy="44.2" r="6.55" />
        <circle fill="#fe866f" cx="188.23" cy="53.41" r="6.55" />
        <circle fill="#fe866f" cx="128.51" cy="49.16" r="6.55" />
        <circle fill="#fe866f" cx="105.93" cy="67.74" r="6.55" />
        <circle fill="#fe866f" cx="95.67" cy="92.88" r="6.55" />
        <circle fill="#fe866f" cx="102.39" cy="120.84" r="6.55" />
      </g>
    </svg>
  );
}

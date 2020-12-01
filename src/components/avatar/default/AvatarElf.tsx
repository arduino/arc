import * as React from 'react';

export function AvatarElf(props): React.ReactElement {
  return (
    <svg width="1em" height="1em" viewBox="0 0 300 300" {...props}>
      <defs>
        <clipPath id="clip-path">
          <path fill="none" d="M0 0h300v300H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-path)">
        <path fill="#374146" d="M-7.794-5.211H305.58v314.717H-7.794z" />
        <path
          d="M104.56 82.42S91.94 94.2 99.93 110.6c0 0-22.71 5.47-2.1 12.62 0 0-9.68 16 8.83 23.13l-3.79 24.39s62.25 27.76 75.71-10.51c0 0-20.19-12.2-9.68-30.7 0 0 13.88-14.72 8-20.61s-36.59-35.75-36.59-35.75z"
          fill="#fe866f"
        />
        <path
          fill="#f1c40f"
          d="M175.58 168.22l10.46-1 25.87 2.68 38.16 5.48s20.25 2.7 39.26 22a91.424 91.424 0 016.6 7.46c20.61 26.03 8.218 98.456 8.218 98.456L175.64 305.7l-97.58-2.1-84.114.33L-14 217s2.58-3.14 6.43-7.57c8-9.27 21.63-24.07 28.48-26.93 6.05-2.51 30.35-5.78 48.86-8C82.16 173 92 172 92 172l11.25-3.36 4.3-1.26 8.83 17z"
        />
        <path
          d="M104.35 162s-38.07 13-50.68 18.84l26.49 8.83-.84 42.9L113 212l22.29 27.76 33.64-31.13 26.5 20.19 10.94-37L240 176.21l-64.66-18.45S143 188.51 104.35 162z"
          fill="#f45914"
        />
        <circle fill="#fff" cx="140.1" cy="255.49" r="6.94" />
        <circle fill="#fff" cx="140.1" cy="277.78" r="6.94" />
        <circle
          fill="none"
          stroke="#374146"
          strokeMiterlimit="10"
          strokeWidth="2.85px"
          cx="107.72"
          cy="109.13"
          r="7.36"
        />
        <path fill="none" stroke="#374146" strokeMiterlimit="10" strokeWidth="2.85px" d="M136.53 103.87l-21.45 3.36" />
        <path
          fill="#f1c40f"
          d="M130.21 82s-9.67 13 2.95 17.24c0 0-9.26 21.87 9.67 18.93 0 0 3.36 21.45 19.35 8 0 0 8.41 13.46 15.56 1.26s2.1-34.48 2.1-34.48l-26.08-21.88z"
        />
        <path
          d="M107.92 69s24.39-29.86 47.53-30.28 37.43 0 50.89 29.86S224 94.2 217.27 106.39s-2.1 18.09-2.1 18.09l-8.41 4.63s0-4.21-6.31-10.52-.84-9.67-7.57-10.09-9.26.42-9.26.42z"
          fill="#23a6a6"
        />
        <circle fill="#fff" cx="211.9" cy="130.04" r="7.89" />
        <path
          fill="#fff"
          d="M102.3 84.89s32.54-13.82 75.44 42.53l20.6-22.29-16.4-3.78 7.15-17.25-26.91-7.57-8.84-26.07L114.23 66l-6.73-8z"
        />
      </g>
    </svg>
  );
}

import * as React from 'react';

export function AvatarHipster(props): React.ReactElement {
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
          d="M-1.4 205.63s29.52-29.94 56.14-29.94 46.57-2.07 46.57-2.07l110.19-.84s29.53.42 52.81 8.74a167 167 0 0139.51 20.37l1.6 102.992s-104.214-.972-153.8 1.008c0-.03-158.309-3.863-158.309-3.863s2.855-67.559 5.289-96.397z"
          fill="#fe866f"
        />
        <path
          d="M101.2 182.93s43.16 51.15 89.52-3.73c0 0-9.77-17.77-5.15-42.28 0 0 9.59-13.14 9.23-24.15s-6-33.39-33-43-57.58-7.77-59.71 5.34c0 0-7.46 9.24-2.13 19.9 0 0-26.64 3.9-3.91 21.31 0 0-14.21 26.29 13.14 39.08 0 0-5.32 24.51-7.99 27.53z"
          fill="#fff"
        />
        <path
          d="M113.41 135.58s-16.34-15.28-.36-32.33"
          strokeWidth="3.16"
          strokeLinecap="round"
          strokeMiterlimit="10"
          stroke="#f45914"
          fill="none"
        />
        <path
          fill="none"
          stroke="#f45914"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="6.7px"
          d="M146 107.5s-9.22-7.69-9.22-23.83M159 112.88s-9.22-7.69-9.22-23.83M202.83 126.71s-9.22-7.68-9.22-23.83M113.09 76.92s-10.29 6.18-25.53.86M124.12 78.49S117 88.12 100.83 89M187.89 122.15s-10.18-6.36-12.37-22.35"
        />
        <path
          d="M89 70.85l113.31 43.34s7.46-.36 11.37-11.72 2.84-12.08-8.53-16.7c0 0-21.66-72.46-92.35-35.52 0 0-13.15-5.68-16-.71S84 64.81 89 70.85z"
          fill="#23a6a6"
        />
        <path
          stroke="#f1c40f"
          strokeWidth="2.86"
          strokeLinecap="round"
          strokeMiterlimit="10"
          fill="none"
          d="M124.83 55.23l70.33 28.06"
        />
        <circle cx="172.52" cy="37.55" r="7.1" fill="#f1c40f" />
      </g>
    </svg>
  );
}

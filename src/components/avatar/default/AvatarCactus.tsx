import * as React from 'react';

export function AvatarCactus(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg width="1em" height="1em" viewBox="0 0 300 300" {...props}>
      <defs>
        <clipPath id="clip-path">
          <path fill="none" d="M0 0h300v300H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-path)">
        <path fill="#f45914" d="M-7.794-5.211H305.58v314.717H-7.794z" />
        <path
          fill="#f1c40f"
          d="M84.9 314.275l1.68-202.985s-3.35-74.69 65.77-73 56.29 55.32 58.38 75.11c1.6 15.14-.41 153.42-.41 153.42l-.56 56.775z"
        />
        <path
          fill="#f1c40f"
          d="M102.88 194.34s-36.79 8.92-36.79-16.72 1.4-44.17-10.45-45c-11.17-.8-19.64 2.08-15.74 48.9s24 49.61 55.73 49.61 8.37-47.38 7.25-36.79zM206.83 192.67s51.28 6.13 50.72-42.36 2.93-57.41-11.7-59.09c-14.91-1.7-17.28 16.73-16.72 34s3.34 35.39-20.63 32.32c-15.02-1.91-1.67 35.13-1.67 35.13z"
        />
        <path
          d="M153.88 151.84c6.27-.84 31.35-13.38 22.88-36.79 0 0 13.79-6.27 0-10.87 0 0 3-26.33-27.9-27.59-29.71-1.2-52 54.85-9.61 71.91 3.75 1.5 10 3.96 14.63 3.34z"
          fill="#374146"
        />
        <path
          d="M160.87 102.51s19.23 12.12 1.25 28"
          strokeLinecap="round"
          strokeMiterlimit="10"
          stroke="#fff"
          strokeWidth="2.94"
          fill="none"
        />
        <path
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
          stroke="#374146"
          strokeWidth="3.65px"
          d="M200.28 245.06l15.89-16.72M86.095 307.862l15.89-16.72M53.87 202.8L37.07 187M128 226.76l-16.8-15.79M119.09 267.45l-16.81-15.79M185.97 216.17l-16.8-15.79M158.058 303.712l-16.8-15.79M157.24 255.42l6.85-22.02M55.8 163.45l6.84-22.02M243.21 120.99l-9.03-21.22M117.97 153.75l-16.81-15.8M109.61 66.79L92.8 51M126.71 189.05l15.88-16.73M188.243 290.548l15.88-16.73M189.13 150.03l15.89-16.72M149 64.75l15.89-16.72M196.94 63.08l15.88-16.72M250.31 155.6l15.88-16.72"
        />
      </g>
    </svg>
  );
}

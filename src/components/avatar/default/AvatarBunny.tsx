import * as React from 'react';

export function AvatarBunny(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement {
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
          d="M-2.768 213.978S18.66 166.27 60.07 172.65c0 0 10.75-31.06 54.15-22.3 0 0-21.9-22.3-4.78-53 0 0-23.1-54.15-3.19-59.32s13.94 49.77 33.05 47 34.24 6.37 38.22-4.78 6.77-38.62 17.92-41.81 17.12 9.16 11.15 31.06-11.15 30.66-11.15 30.66 16.33 28.67 0 53.75c0 0 30.26-10.75 52.56 18.72 0 0 29.06-7.17 52.95 6.76s3.832 125.175 3.832 125.175S211.72 313.21 202.61 316 96.3 334.7 90.33 325.54-1.761 326.7-4.151 305.2s2.583-58.571 2.583-62.121-1.2-29.101-1.2-29.101z"
          fill="#fe866f"
        />
        <path
          d="M154.55 96.37c5.42.33 27.82 3 23 24.09 0 0 10.53 1.13.33 6.48 0 0 4.05 10.36 0 17.49-3.69 6.49-12.63 12.31-27.21 11.34s-27.86-17.66-26.56-30.45c1.27-12.57 10.36-25.61 28.33-28.83a8.984 8.984 0 012.11-.12z"
          fill="#374146"
        />
        <path
          d="M164.08 119.32s12.47 8.75.65 21.22"
          stroke="#fff"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2.82"
          fill="none"
        />
        <ellipse fill="#fff" cx="113.987" cy="74.616" rx="3.14" ry="16.95" transform="rotate(-14.81 113.989 74.616)" />
        <ellipse fill="#fff" cx="191.484" cy="74.367" rx="16.95" ry="3.14" transform="rotate(-75.16 191.484 74.367)" />
      </g>
    </svg>
  );
}

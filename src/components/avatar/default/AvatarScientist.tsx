import * as React from 'react';

export function AvatarScientist(props): React.ReactElement {
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
          d="M104.36 184.61l5.45-24.36s-22.18-2.54-15.63-34.54c0 0-24.36-9.09 0-19.63 0 0-4-18.54 4-27.27s49.44-12.72 49.44-12.72 35.63 20 36.72 21.08-6.18 56-6.18 56l-2.91 5.09L192 181s-42.92 48.7-87.64 3.61z"
          fill="#f45914"
        />
        <path
          d="M-2.882 205.6s46.512-23.87 107.952-29.32c0 0 37.09 38.18 84.72 1.09 0 0 87.9 6.643 113.724 44.093l2.537 83.736s-102.631-1.124-152.621.511c-77.23 2.526-155.678-3.049-155.678-3.049s2.096-90.775-.634-97.061z"
          fill="#fff"
        />
        <circle fill="none" stroke="#fff" strokeWidth="3.04px" strokeMiterlimit="10" cx="111.81" cy="102.63" r="8.18" />
        <path fill="none" stroke="#fff" strokeWidth="3.04px" strokeMiterlimit="10" d="M153.81 103.17l-33.45-3.63" />
        <path
          d="M103.27 45S74.18 34.46 77.82 68.27c0 0 6.18 14.54 24 8.72 0 0 11.64 8.37 21.09-1.45 0 0 5.45 9.09 14.18 7.64 0 0-1.46 8.72 5.09 10.54 0 0 2 11 8.18 12.09s7.82-8.46 11.81-8.46 10.91 2.91 2.91 23.27 1.46 29.45 10.18 27.64 15.27-9.46 17.45-16.73S208 125 208.34 112.62s0-10.54 3.27-14.17 13.09-13.82 2.18-28.36c0 0-2.54-19.27-20.36-19.64 0 0-1.09-16-18.9-13.45 0 0-8-7.27-21.45-6.91 0 0-15.64-13.45-33.09 4.73.01 0-13.09-.73-16.72 10.18z"
          fill="#f1c40f"
        />
        <path fill="none" stroke="#fff" strokeWidth="3.04px" strokeMiterlimit="10" d="M93 104s2.14-7.34 10.62-1.56" />
        <path
          fill="none"
          strokeMiterlimit="10"
          stroke="#23a6a6"
          strokeLinecap="round"
          strokeWidth="6.07px"
          d="M105.08 176.25s33.63 35 84.72 1.09M146.9 302.69V193.91"
        />
      </g>
    </svg>
  );
}

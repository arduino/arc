import * as React from 'react';

export function AvatarClown(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement {
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
          d="M17.417 227.807c-5.565 19.053-20.3 76.758-20.3 76.758s247.1 2.591 298.783-1.9c14.59-1.268 15.626-38.438-4.44-80.563 0 0-3.8-16.488-34.981-31.258S38.881 154.323 17.417 227.807z"
          fill="#374146"
        />
        <path
          fill="#fe866f"
          d="M102.6 76.71s-9.12-5.11-13.13 2.55c0 0-10.94-2.55-16.41 3.28 0 0-12.76 1.82-13.86 6.2 0 0-14.22 1.82-14.22 9.84s8 11.31 10.21 11.31c0 0 5.83 8 15.68 5.47 0 0 8.39 8 15.32 3.64 0 0 8.38 4.75 15 1.1s19-21.52 19-21.52z"
        />
        <path
          d="M101.68 167.32l13.13-19.14S92.39 144.89 99 112.62l7.11-20.78s-9.85-15.86 6.56-29 66.19 6 68.92 30.63-7.11 41.57-7.11 41.57l20.24 35s-52.56 39.96-93.04-2.72z"
          fill="#fff"
        />
        <path
          d="M106.06 162.4s47.59 37.19 83.69.55l68.92 14.76s3.28 6.57-8.76 17.51-22.42 10.39-25.7 20.78-26.26 0-39.93 11.49-22.43-4.38-39.39 3.83-31.72-8.21-36.64-7.66-21.88 10.39-29.54-8.21-17 6-29-23L42.61 181z"
          fill="#f45914"
        />
        <circle cx="101.95" cy="101.41" r="10.12" fill="#23a6a6" />
        <path
          fill="#fe866f"
          d="M107.34 56.28s4 9.49 13.12 4.74c0 0 2.19 10.94 16.41 7.3 0 0 1.1 6.2 10.94 11.67 0 0 1.1 17.5 14.22 15.31 0 0 .73 18.23 20.79 13.49 0 0 5.1 11.67 16.77 4.74 0 0 16 6.2 22.61-2.91 0 0 16.78 1.82 21.15-5.11 0 0 25.16-11.67 6.93-23.7 0 0-5.84-17.14-23.7-13.86 0 0-7.3-12.76-24.07-5.47 0 0-6.2-12-20.42-3.28 0 0 2.55-8.75-10.58-11.3 0 0-2.91-15.32-18.59-9.85 0 0-14.95-12.76-27.35.37 0 0-8.39-3.65-13.49 3.64 0 0-13.08 2.94-4.74 14.22z"
        />
        <path
          strokeLinecap="round"
          strokeMiterlimit="10"
          stroke="#23a6a6"
          strokeWidth="3"
          fill="none"
          d="M125.2 99.67v9.49"
        />
        <path
          fill="none"
          strokeLinecap="round"
          strokeMiterlimit="10"
          stroke="#fff"
          strokeWidth="2px"
          d="M61.75 195.58l39.02-17.51M95.66 218.55l21.88-29.17M140.15 194.85l1.82 31.72M170.05 190.84l14.59 28.8M194.12 181.72l29.17 21.88M207.61 173.33l41.57 9.85"
        />
      </g>
    </svg>
  );
}

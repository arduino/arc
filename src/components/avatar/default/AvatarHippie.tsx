import * as React from 'react';

export function AvatarHippie(props): React.ReactElement {
  return (
    <svg width="1em" height="1em" viewBox="0 0 300 300" {...props}>
      <defs>
        <clipPath id="clip-path">
          <path fill="none" d="M0 0h300v300H0z" />
        </clipPath>
        <clipPath id="clip-path-2">
          <path
            fill="none"
            d="M300.86 182.17s-18.19-35.48-46.52-45.92-64.72-2.39-64.72-2.39-37.87 86.49-48.31 86.78c-.01 0-13.31 15.96-25.21-90.8 0 0-1.94 4-22.81 6.41 0 0-45.93-3.58-60.24 25.65s-34.981 71.616-34.981 71.616l-4.758 70.414s137.009 2 140.289 2.3 168.01-.4 168.01-.4"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-path)">
        <path fill="#fe866f" d="M-7.794-5.211H305.58v314.717H-7.794z" />
        <ellipse fill="#f1c40f" cx="102.99" cy="68.86" rx="1.79" ry="5.22" />
        <path
          d="M117.25 37.54s-17.9 8-10.74 33.8c0 0-18 8.55.5 10.34 0 0-8.35 23.55 14 28.33l-9.54 42.64 20.58 74.55 47.72 1.8s8.35-107.35 8.35-108.25-30.42-62-30.42-62-.1-23.89-40.45-21.21z"
          fill="#374146"
        />
        <g clipPath="url(#clip-path-2)">
          <path
            fill="#f1c40f"
            d="M116.1 129.84s-1.94 4-22.81 6.41c0 0-45.93-3.58-60.24 25.65s-36.884 73.519-36.884 73.519l-2.855 67.56S130.32 305.93 133.6 306.23s168.01-.4 168.01-.4l4.758-75.171-5.508-48.489s-18.19-35.48-46.52-45.92-64.72-2.39-64.72-2.39-37.87 86.49-48.31 86.78c-.01 0-13.31 15.96-25.21-90.8z"
          />
          <path
            fill="#23a6a6"
            d="M45.28 139.23S55.42 243 52.14 271.64l78.13 31-30.42-176.23zM243.89 123.72S243 227.2 262.08 254.94l-86.073 52.8 14.243-188.49z"
          />
        </g>
        <path
          d="M114.56 38.8a.57.57 0 00.12 1.08c3.9.71 12.54 3.32 12.31 12.57-.3 11.93-2.39 14 4.77 26.24s-6 16.11-.9 28.33 15.21 17.6 7.46 30.72-6 14.91-1.19 23 1.19 17-2.09 21.77-2.41 10.32 1.16 15 0 4.1 2.42 13.94H223s-6-6.26-.89-13.12.89-12.23-5.67-18.49 11.63-8.35 4.77-24.46-10.73-13.41-7.15-30.12-8.06-23.9-15.8-34.34 8.05-18.19-15.21-44.43C160.31 20.83 140 26.81 114.56 38.8z"
          fill="#fff"
        />
        <path
          d="M108.8 43.21s29.2 23.55 76.94 6.26"
          strokeWidth="2.6"
          stroke="#f1c40f"
          strokeLinecap="round"
          strokeMiterlimit="10"
          fill="none"
        />
        <path d="M163.37 52.45s1.19-21.77 20.88-31.31c0 0 2.08 23.26-20.88 31.31z" fill="#f45914" />
        <circle fill="#f1c40f" cx="117.37" cy="68.05" r="8.35" />
        <path
          d="M103.43 68.85s.43-6.09 5.58-.81"
          strokeWidth="1.95"
          stroke="#f1c40f"
          strokeLinecap="round"
          strokeMiterlimit="10"
          fill="none"
        />
      </g>
    </svg>
  );
}

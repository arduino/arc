import * as React from 'react';

export function AvatarSuperHero(props): React.ReactElement {
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
          d="M306.368 195.455c-25.74-47.71-64.409-54.825-92.079-55.375-12.63-.27-25.39 3.36-35.84 7.56a140.517 140.517 0 00-23.76 12.29h-9.63a234.543 234.543 0 00-38.86-13.24c-9.56-2.23-19.75-3.8-29.18-3.62-23.21.47-64.281 36.543-79.9 51.433 4.46 12.34-11.077 41.655-3.807 52.335C21.541 288.358 94.9 294.61 148.9 294.61c63.284 0 136.836-21.75 161.275-80.125z"
        />
        <path
          fill="#fff"
          d="M97.479 160.94s20.88-32.51 22.48-42.95-18.9-26.9 6.83-53.39 53 .4 53 .4 12 6.83 10 31.31c0 0 9.23-2 9.23 5.62s-4 6.83-8 6.83c0 0 4 23.68-17.26 23.28l10 33.31-24.89 66.24s-67-50.18-67-51.38 5.61-19.27 5.61-19.27z"
        />
        <path
          d="M148.412 303.93c-45.308 0-122.077 28.853-152.246-7.612-5.787-7 .952-43.771 1.9-57.093 11.79-22.05 60.37-81.765 83.77-80.5 4.33.24 10-1 16 .09 3.38.61 6.64 3.43 10.52 4a144.372 144.372 0 0037.13 1.52c1.24-.11 2.5-.26 3.76-.45s2.6-.34 3.94-.57 2.78-.5 4.17-.79a111.717 111.717 0 0016.57-4.78c2.21-.81 4.49-1.58 6.85-2.29a110.419 110.419 0 0118.49-3.75c32.93-3.89 80.653 14.122 103.293 54.222-7.175 17.14 12.136 81.021 0 94.2-29.19 31.703-109.449 3.796-154.147 3.803z"
          fill="#23a6a6"
        />
        <path strokeMiterlimit="10" strokeWidth="2.97" stroke="#374146" fill="none" d="M112.859 87.69l41.8 2.37" />
        <path
          fill="#374146"
          d="M156.889 81.87s-10.44 6.83-1.6 16.46 20.07-1.2 29.3 0 5.62-10 5.62-10l-.4-5.61s-11.23 0-16.06-2.41c-4.01-2.06-11.64-2.06-16.86 1.56z"
        />
        <path stroke="#f1c40f" strokeMiterlimit="10" strokeWidth="2.97" fill="none" d="M116.369 79.39v-.02" />
        <circle fill="#f1c40f" cx="151.979" cy="166.86" r="6.92" />
        <path
          fill="#f1c40f"
          d="M150.059 192.65s4.81 18.06 10.84 19.27c0 0 8-29.71-7.23-44.56 0 0-10 0-12.84 15.66s2 18.86 2 18.86z"
        />
        <path fill="#f1c40f" d="M86.059 157.14s50.58 13.63 63.22 13v-8.43s-22.27 3.61-44.55-14.45z" />
        <path
          fill="#f1c40f"
          d="M158.9 166.87l40.94-15.35-4.78-8.44a436.714 436.714 0 01-41 19.87c-22.86 9.63 4.84 3.92 4.84 3.92z"
        />
        <ellipse fill="#fff" cx="178.289" cy="90.58" rx="6.47" ry="4.11" />
        <path
          fill="#f1c40f"
          d="M101.159 71.17s-5.21 6.7.37 10c0 0-4.47 8.94 4.84 10.8s10.06-4.1 10.06-4.1 11.54 4.47 14.89-2.6c0 0 7.07 3 8.94-3.73 0 0 10.79 3 13-6.33 0 0 11.82 5.23 15.91-2.22l-5.11-7.78s-30.16 1.86-34.26 2.23-28.64 3.73-28.64 3.73z"
        />
        <path fill="#374146" d="M92.489 61.62h116.01v11.44H92.489z" />
        <path
          fill="#374146"
          d="M114.579 73.07a35.325 35.325 0 01-.5-5.78v-1c.6-19.38 18-34.9 39.31-34.9s38.76 15.48 39.36 34.85v1a35.435 35.435 0 01-.5 5.78"
        />
      </g>
    </svg>
  );
}
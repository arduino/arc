import * as React from 'react';

export function AvatarPartyPerson(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>): React.ReactElement {
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
          d="M107.929 191s13.75-30.22 16.64-52.83c0 0 14.91 1 17.32-22.13s55.8-51 55.8-51 26.94 7.7 16.84 39.45c0 0-3.09 7.7 8.17 6.25 8.65-1.11 6.74 9.62-6.25 14.43 0 0 .48 28.38-22.61 30.31l9.16 57.44"
          fill="#fe866f"
        />
        <path
          d="M204.1 109.791s13.15 12.51-.64 26.62"
          strokeMiterlimit="10"
          stroke="#374146"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M307.32 231.613c-5.99 15.249-3.806 71.048-3.806 71.048-12.688 5.075-109.861 5.075-152.247 5.075-41.67 0-123.066-1.268-153.515-5.075 0 0-1.269-21.568-1.269-40.6 4.53-14.68 44.136-87.631 62.666-90.211 2.79-.4 5.66-.71 8.56-1 12.1-1.17 24.59-1.48 33.4-1.53 7.19 0 14.83.14 14.83.14 2.06 2.6 40.95 53.49 81.27 1.92 0 0 1.18-.19 3.21-.42 7.72-.9 27.69-2.52 41 2.81s58.411 48.943 65.901 57.843z"
          fill="#f1c40f"
        />
        <path
          fill="none"
          strokeMiterlimit="10"
          stroke="#fff"
          strokeWidth="2.81px"
          d="M105.639 33.151l16.04 6.72 5.46-17.04M113.379 24.551l8.3 15.32"
        />
        <path
          d="M119.4 90.761s-26.65 9.46-32.67 30.1 23.09 44.48 40.41 22.35 43.85 8.6 46.43-24.07 26.65-6.88 47.29-17.2 24.08-26.66 6.88-30.09-10.2-22.25-31.81-19.78c-30.1 3.44-34.4 21.49-34.4 21.49z"
          fill="#374146"
        />
        <path fill="#fff" d="M117.509 101.771l62.22-39.13-58.05-22.77-4.17 61.9z" />
        <path
          fill="none"
          strokeMiterlimit="10"
          stroke="#fff"
          strokeWidth="2.81px"
          d="M141.889 82.211s-9.54 57.55 29.46 84.67a19.005 19.005 0 0011.93 3.48c6.55-.36 15.58-3.3 18.9-16"
        />
      </g>
    </svg>
  );
}

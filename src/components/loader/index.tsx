import * as React from 'react';
import classnames from 'classnames';

import style from './loader.module.scss';
import { useProgressBar } from 'react-aria';

export type LoaderProps = {
  /**
   * When tiny, the loader is not absolute, but a standard div. This is useful to use it inside other elements.
   * If not tiny, the loader is meant to be used as a "global" laoder for the entire page
   */
  tiny?: boolean;
  /**
   * hexadecimal color string, used for the line. Ex: #CCCCCC
   */
  linecolor?: string;
  /**
   * hexadecimal color string, used for the background. Ex: #FFFFFF.
   * This is particularly usefult when the loader cannot inherit the background color from a parent.
   */
  bgcolor?: string;
};

/**
 * A generic loader with a rotational animation.
 *
 * If used with the tiny flag is meant to be included in other components (such as Buttons).
 *
 * The background is inherited from the containing div
 *
 * Accessibility provided via [React Aria](https://react-spectrum.adobe.com/react-aria/useProgressBar.html).
 *
 */
export function Loader({ tiny = false, linecolor, bgcolor = 'inherit' }: LoaderProps): React.ReactElement {
  const { progressBarProps } = useProgressBar({
    isIndeterminate: true,
    'aria-label': 'Loading...',
  });

  let color = tiny ? '#FFFFFF' : '#008184';
  if (linecolor) {
    color = linecolor;
  }

  return (
    <div
      {...progressBarProps}
      className={classnames({ [`${style['tiny-loader']}`]: tiny, [`${style.loader}`]: !tiny })}
      style={{ backgroundColor: bgcolor }}
    >
      <div className={style['loader--spinner']} style={{ color }} />
    </div>
  );
}

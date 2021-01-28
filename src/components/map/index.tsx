import * as React from 'react';
import classnames from 'classnames';

import style from './map.module.scss';

export type MapProps = {};

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
export function Map({}: MapProps): React.ReactElement {
  return <div></div>;
}

import * as React from 'react';
import classnames from 'classnames';

import style from './loader.module.scss';

export type LoaderProps = {
  /**
   * When tiny, the loader is not absolute, but a standard div. This is useful to use it inside other elements.
   * If not tiny, the loader is meant to be used as a "global" laoder for the entire page
   */
  tiny?: boolean;
};

/**
 * A generic loader with a rotational animation.
 *
 * If used with the tiny flag is meant to be included in other components (such as Buttons).
 *
 * The background is inherited from the containing div
 *
 */
export function Loader({ tiny = false }: LoaderProps): React.ReactElement {
  return (
    <div className={classnames({ [`${style['tiny-loader']}`]: tiny, [`${style.loader}`]: !tiny })}>
      <div className={style['loader--spinner']} />
    </div>
  );
}

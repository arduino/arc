import * as React from 'react';
import classnames from 'classnames';

import style from './loader.module.scss';

export type LoaderProps = {
  tiny?: boolean;
};

export function Loader({ tiny = false }: LoaderProps): React.ReactElement {
  return (
    <div className={classnames({ [`${style['tiny-loader']}`]: tiny, [`${style.loader}`]: !tiny })}>
      <div className={style['loader--spinner']} />
    </div>
  );
}

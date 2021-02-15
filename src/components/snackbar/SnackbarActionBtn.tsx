import React from 'react';
import classNames from 'classnames';

import { usePress } from 'react-aria';

import style from './snackbar.module.scss';
import { SnackbarProps } from './Snackbar';

type SnackbarActionBtnProps = Pick<SnackbarProps, 'ActionElement' | 'onClose'>;

export function SnackbarActionBtn({ ActionElement, onClose }: SnackbarActionBtnProps): React.ReactElement {
  // extract children and other props from trigger element
  const { children: actionChildren, className, onClick: actionOnClick, ...otherActionProps } = ActionElement.props;

  const { pressProps } = usePress({
    onPress: (): void => {
      if (actionOnClick) {
        actionOnClick();
      }
      onClose();
    },
  });

  return (
    <ActionElement.type
      {...otherActionProps}
      {...pressProps}
      className={classNames(style['snackbar-action'], className)}
      tabIndex={1}
    >
      {actionChildren}
    </ActionElement.type>
  );
}

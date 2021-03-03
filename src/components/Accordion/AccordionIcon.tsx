import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { WithBemClasses } from '../utils';

import style from './accordion.module.scss';

export interface AccordionIconProps extends WithBemClasses {
  /** true if the panel is visible */
  expanded: boolean;
  /** the position of the icon on the button */
  iconPosition: 'left' | 'right';
}
const _AccordionIcon = ({ expanded, iconPosition, className }: AccordionIconProps): React.ReactElement => {
  const accordionIconClasses = classnames(style.accordionicon, {
    [style.accordioniconexpanded]: expanded,
    [`${className}__accordion-icon`]: !!className,
    [`${className}__accordion-icon--expanded`]: !!className && expanded,
  });

  return (
    <span className={accordionIconClasses}>
      {iconPosition === 'left' && (
        <svg width="16" height="9" viewBox="0 0 16 9" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 9C7.86839 9.00076 7.73793 8.97554 7.61609 8.92577C7.49426 8.87601 7.38344 8.80268 7.29 8.71L1.29 2.71C1.1017 2.5217 0.995909 2.2663 0.995909 2C0.995909 1.7337 1.1017 1.47831 1.29 1.29C1.4783 1.1017 1.7337 0.995911 2 0.995911C2.2663 0.995911 2.5217 1.1017 2.71 1.29L8 6.59L13.29 1.29C13.4783 1.1017 13.7337 0.995911 14 0.995911C14.2663 0.995911 14.5217 1.1017 14.71 1.29C14.8983 1.47831 15.0041 1.7337 15.0041 2C15.0041 2.2663 14.8983 2.5217 14.71 2.71L8.71 8.71C8.61656 8.80268 8.50574 8.87601 8.38391 8.92577C8.26207 8.97554 8.13161 9.00076 8 9Z" />
        </svg>
      )}
      {iconPosition === 'right' &&
        (expanded ? (
          <svg width="18" height="2" viewBox="0 0 18 2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1C18 1.26522 17.8946 1.51957 17.7071 1.70711C17.5196 1.89464 17.2652 2 17 2Z" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 10C19.9992 10.265 19.8936 10.5189 19.7063 10.7063C19.5189 10.8936 19.265 10.9992 19 11H11V19C11 19.2652 10.8946 19.5196 10.7071 19.7071C10.5196 19.8946 10.2652 20 10 20C9.73478 20 9.48043 19.8946 9.29289 19.7071C9.10536 19.5196 9 19.2652 9 19V11H1C0.734784 11 0.48043 10.8946 0.292893 10.7071C0.105357 10.5196 0 10.2652 0 10C0 9.73478 0.105357 9.48043 0.292893 9.29289C0.48043 9.10536 0.734784 9 1 9H9V1C9 0.734784 9.10536 0.48043 9.29289 0.292893C9.48043 0.105357 9.73478 0 10 0C10.2652 0 10.5196 0.105357 10.7071 0.292893C10.8946 0.48043 11 0.734784 11 1V9H19C19.265 9.00076 19.5189 9.10637 19.7063 9.29374C19.8936 9.48111 19.9992 9.73502 20 10Z" />
          </svg>
        ))}
    </span>
  );
};

export const AccordionIcon = React.memo(_AccordionIcon);

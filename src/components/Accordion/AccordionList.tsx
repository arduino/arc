import React from 'react';
import classnames from 'classnames';

import { WithBemClasses } from '../utils';

import style from './accordion.module.scss';
import { Accordion, AccordionProps } from './Accordion';

export interface AccordionListProps extends WithBemClasses {
  accordions: AccordionProps[];
}

/**
 * AccordionList
 */
export function AccordionList({ accordions, className }: AccordionListProps): React.ReactElement {
  const AccordionListClasses = classnames(style.accordionlist, { [`${className}__accordionlist`]: !!className });

  // Remove null elements
  accordions = accordions.filter((element) => !!element);

  return (
    <div className={AccordionListClasses}>
      {accordions.map((accordion) => {
        return <Accordion key={accordion.id} {...accordion} className={className} />;
      })}
    </div>
  );
}

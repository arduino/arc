import React from 'react';
import { WithChildren } from '../utils';

export interface TextWithLinkProps extends WithChildren {
  /**
   * the text to parse. Takes precedence over child element
   */
  text?: string;
  /**
   * target attribute of the resulting links
   */
  target?: string;
}

/**
 * Takes an input string which contains standard markdown links,
 * such as `[link label](http://example.com)`,
 * and renders a component with proper html links
 *
 * This is inspired by [react-string-replace](https://github.com/iansinnott/react-string-replace) but adds
 * the regexp group(s) capabilities to correctly handle links.
 *
 * As React already provides safe string escaping functionalities, standard string replacement combined with dangerouslySetInnerHTML was out of the question.
 */
export function TextWithLink({ text, target = '_blank', children }: TextWithLinkProps): React.ReactElement {
  const input = text || (children && children.toString()) || '';
  const allMatches = input.matchAll(/\[([^\]]+)\]\(([^)"]+)(?: \"([^\"]+)\")?\)/gi);

  let ret: any = [input];

  // iterate the matches
  for (const match of allMatches) {
    const [fullMatch, group1, group2] = match;

    // for every match, iterate the array of already-splitted tokens
    for (let i = 0; i < ret.length; i++) {
      // skip already replaced elements
      if (typeof ret[i] !== 'string') continue;

      const arr = ret[i].split(fullMatch);
      // if a token get split, put the substitution between every pieces
      for (let j = 1; j < arr.length; j = j + 2) {
        arr.splice(
          j,
          0,
          <a href={group2} target={target} rel="noreferrer" key={`${i}-${j}`}>
            {group1}
          </a>
        );
      }

      ret[i] = arr;
      // flatten the resulting array
      ret = ret.flat();
    }
  }
  // need to wrap with span to preserve space chars
  return <span>{ret}</span>;
}

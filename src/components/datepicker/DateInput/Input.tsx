import React from 'react';
import { GenericFieldPropsEvents } from '../../utils';
import updateInputWidth, { getFontShorthand } from 'update-input-width';

import style from '../datepicker.module.scss';

type CSSOMString = string;
type FontFaceLoadStatus = 'unloaded' | 'loading' | 'loaded' | 'error';
type FontFaceSetStatus = 'loading' | 'loaded';

interface FontFace {
  family: CSSOMString;
  style: CSSOMString;
  weight: CSSOMString;
  stretch: CSSOMString;
  unicodeRange: CSSOMString;
  variant: CSSOMString;
  featureSettings: CSSOMString;
  variationSettings: CSSOMString;
  display: CSSOMString;
  readonly status: FontFaceLoadStatus;
  readonly loaded: Promise<FontFace>;
  load(): Promise<FontFace>;
}

interface FontFaceSet {
  readonly status: FontFaceSetStatus;
  readonly ready: Promise<FontFaceSet>;
  check(font: string, text?: string): boolean;
  load(font: string, text?: string): Promise<FontFace[]>;
  addEventListener(event: string, fn: Function);
}

declare global {
  interface Document {
    fonts: FontFaceSet;
  }
}

function onFocus(event) {
  const { target } = event;

  requestAnimationFrame(() => target.select());
}

function updateInputWidthOnFontLoad(element) {
  if (!document.fonts) {
    return;
  }

  const font = getFontShorthand(element);

  if (!font) {
    return;
  }

  const isFontLoaded = document.fonts.check(font);

  if (isFontLoaded) {
    return;
  }

  function onLoadingDone() {
    updateInputWidth(element);
  }

  document.fonts.addEventListener('loadingdone', onLoadingDone);
}

function getSelectionString() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.getSelection().toString();
}

function makeOnKeyPress(maxLength: number) {
  return function onKeyPress(event) {
    const { key, target: input } = event;
    const { value } = input;

    const isNumberKey = !isNaN(parseInt(key, 10));
    const selection = getSelectionString();

    if (isNumberKey && (selection || value.length < maxLength)) {
      return;
    }

    event.preventDefault();
  };
}

function valueChecker(value: any): string {
  if (value === undefined || value === null) {
    return '';
  }

  return value;
}

export interface InputProps extends GenericFieldPropsEvents<HTMLInputElement> {
  autoFocus?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
  readOnly?: boolean;
  itemRef?: Function;
  max?: number;
  min?: number;
  maxLength?: number;
  required?: boolean;
  step?: number;
  value?: number;
  placeholder?: string;
  name?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
}

export default function Input({
  name,
  ariaLabel,
  value,
  disabled,
  readOnly,
  max,
  min,
  maxLength,
  placeholder,
  step,
  required,
  itemRef,
  onChange,
  onKeyDown,
  onKeyUp,
}: InputProps): React.ReactElement {
  const defaultMaxLength = maxLength || max.toString().length;

  return (
    <input
      key="input"
      aria-label={ariaLabel}
      autoComplete="off"
      autoFocus={false}
      className={style['datepicker-input']}
      data-input="true"
      disabled={disabled}
      readOnly={readOnly}
      max={max}
      min={min}
      maxLength={defaultMaxLength}
      name={name}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onKeyPress={makeOnKeyPress(defaultMaxLength)}
      onKeyUp={(event) => {
        updateInputWidth(event.target);

        if (onKeyUp) {
          onKeyUp(event);
        }
      }}
      placeholder={placeholder}
      ref={(ref) => {
        if (ref) {
          updateInputWidth(ref);
          updateInputWidthOnFontLoad(ref);
        }

        if (itemRef) {
          itemRef(ref, name);
        }
      }}
      required={required}
      step={step}
      type="number"
      value={valueChecker(value)}
    />
  );
}

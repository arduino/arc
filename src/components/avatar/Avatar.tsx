import React, { useState, useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { usePress } from '@react-aria/interactions';
import { IconUserProfileOutline } from '@arduino/react-icons';

import style from './avatar.module.scss';

export interface AvatarProps {
  gap?: number;
  icon?: string | React.ReactNode;
  srcSet?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  size?: 'large' | 'small' | 'medium' | number;
  style?: React.CSSProperties;
}

export function Avatar({
  icon,
  srcSet,
  className,
  alt,
  children,
  gap = 4,
  size,
  ...otherProps
}: AvatarProps): React.ReactElement {
  const [scale, setScale] = useState(1);
  const [isImgExist, setIsImgExist] = useState(true);

  const avatarNodeRef = useRef<HTMLElement>();
  const avatarChildrenRef = useRef<HTMLElement>();

  const handleImgLoadError = (): void => {
    setIsImgExist(false);
  };

  const setScaleParam = useCallback((): void => {
    if (!avatarChildrenRef.current || !avatarNodeRef.current) {
      return;
    }
    const childrenWidth = avatarChildrenRef.current.offsetWidth; // offsetWidth avoid affecting be transform scale
    const nodeWidth = avatarNodeRef.current.offsetWidth;
    // denominator is 0 is no meaning
    if (childrenWidth !== 0 && nodeWidth !== 0) {
      if (gap * 2 < nodeWidth) {
        setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1);
      }
    }
  }, [gap]);

  const isString = typeof children === 'string';

  useEffect(() => {
    setIsImgExist(true);
    setScale(1);
  }, [icon]);

  useEffect(() => {
    setScaleParam();
  }, [gap, setScaleParam]);

  const renderChildren = (): React.ReactNode => {
    // if children is string make view as string
    if (isString) {
      const transformString = `scale(${scale})`;

      const childrenStyle: React.CSSProperties = {
        msTransform: transformString,
        WebkitTransform: transformString,
        transform: transformString,
      };

      const sizeChildrenStyle: React.CSSProperties =
        typeof size === 'number'
          ? {
              lineHeight: `${size}px`,
            }
          : {};

      return (
        <span
          className={classnames(style['zh-avatar__string'], { [`${className}__string`]: className })}
          ref={(node: HTMLElement): void => {
            avatarChildrenRef.current = node;
          }}
          style={{ ...sizeChildrenStyle, ...childrenStyle }}
        >
          {children}
        </span>
      );
    }

    // return children
    return children;
  };

  const renderAvatar = (): React.ReactNode => {
    if (icon && typeof icon === 'string' && isImgExist) {
      return (
        <>
          <img src={icon} srcSet={srcSet} onError={handleImgLoadError} alt={alt} />
          {renderChildren()}
        </>
      );
    }

    if (icon && typeof icon === 'function') {
      return (
        <>
          {icon()}
          {renderChildren()}
        </>
      );
    }

    if (icon && React.isValidElement(icon)) {
      return (
        <>
          {icon}
          {renderChildren()}
        </>
      );
    }

    if (icon === null) {
      return (
        <>
          <IconUserProfileOutline
            className={classnames(style['zh-avatar__default'], { [`${className}__default`]: className })}
          />
          {renderChildren()}
        </>
      );
    }

    // set default icon
    if (!children) {
      return (
        <IconUserProfileOutline
          className={classnames(style['zh-avatar__default'], { [`${className}__default`]: className })}
        />
      );
    }

    // if children is string make view as string
    return renderChildren();
  };

  const avatarClassName = classnames(style['zh-avatar'], className, {
    [style['isString']]: isString,
    [style['isClickable']]: otherProps.onClick,
    [style['zh-avatar__medium']]: size === 'medium',
    [style['zh-avatar__small']]: size === 'small',
  });

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
          fontSize: icon ? size / 2 : 18,
        }
      : {};

  const { pressProps } = usePress({
    onPress: (): void => {
      if (otherProps.onClick) {
        otherProps.onClick();
      }
    },
  });

  const generateProps = (): Record<string, any> => {
    if (!otherProps.onClick) {
      return {};
    }

    return {
      tabIndex: 1,
      ...pressProps,
    };
  };

  return (
    <span
      {...otherProps}
      {...generateProps()}
      style={{ ...sizeStyle, ...otherProps.style }}
      className={avatarClassName}
      ref={(node: HTMLElement): void => {
        avatarNodeRef.current = node;
      }}
    >
      {renderAvatar()}
    </span>
  );
}

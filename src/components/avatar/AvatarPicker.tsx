import React, { useState } from 'react';
import classnames from 'classnames';
import { IconNavigationCheckmarkOutlineFilled } from '@arduino/react-icons';
import { OverlayProvider } from 'react-aria';

import { Avatar } from './Avatar';
import { Button } from '../button';
import { Modal } from '../dialogs/modal/Modal';

import * as Avatars from './default';
import style from './avatar.module.scss';

const defaultAvatars: AvatarInfo[] = [
  { name: 'astronaut', avatar: Avatars.AvatarAstronaut },
  { name: 'bear', avatar: Avatars.AvatarBear },
  { name: 'bunny', avatar: Avatars.AvatarBunny },
  { name: 'cactus', avatar: Avatars.AvatarCactus },
  { name: 'chef', avatar: Avatars.AvatarChef },
  { name: 'handy', avatar: Avatars.AvatarHandy },
  { name: 'hippie', avatar: Avatars.AvatarHippie },
  { name: 'hipster', avatar: Avatars.AvatarHipster },
  { name: 'partyhat', avatar: Avatars.AvatarPartyPerson },
  { name: 'pirate', avatar: Avatars.AvatarPirate },
  { name: 'clown', avatar: Avatars.AvatarClown },
  { name: 'scientist', avatar: Avatars.AvatarScientist },
  { name: 'cowboy', avatar: Avatars.AvatarCowboy },
  { name: 'dentist', avatar: Avatars.AvatarDentist },
  { name: 'elf', avatar: Avatars.AvatarElf },
  { name: 'royal', avatar: Avatars.AvatarRoyal },
  { name: 'sultan', avatar: Avatars.AvatarSultan },
  { name: 'superhero', avatar: Avatars.AvatarSuperHero },
  { name: 'tennisperson', avatar: Avatars.AvatarTennisPerson },
  { name: 'wizard', avatar: Avatars.AvatarWizard },
];

function getSelected(avatar: string, avatars: AvatarInfo[]): AvatarInfo {
  const avatarInfo = avatars.find((item) => item.name === avatar);
  if (avatarInfo) {
    return avatarInfo;
  }
  return null;
}

export interface AvatarInfo {
  name: string;
  avatar: string | React.ReactElement | React.FunctionComponent;
}

export interface AvatarPickerProps {
  avatar: string;
  avatarList?: AvatarInfo[];
  onSelect?: (avatar: string) => void;
  className?: string;
  isDisabled?: boolean;
  isEdit?: boolean;
  modal?: React.ReactElement;
  onModalClose?: () => void;
  modalTitle?: string;
  avatarView?: (avatar: AvatarInfo, isSelected: boolean) => React.ReactElement;
  avatarSize?: 'large' | 'small' | 'medium' | number;
}

export function AvatarPicker({
  className,
  isDisabled,
  isEdit = true,
  modal: ContentModal,
  onModalClose,
  modalTitle = 'Choose an avatar',
  avatar = '',
  avatarList = defaultAvatars,
  avatarView = null,
  onSelect,
  avatarSize,
}: AvatarPickerProps): React.ReactElement {
  const [selected, setSelected] = useState<AvatarInfo>(getSelected(avatar, avatarList));
  const [isOpen, setOpen] = useState(false);

  const handlerOnClick = (): void => {
    setOpen(true);
  };

  const handlerOnClose = (): void => {
    if (onModalClose) {
      onModalClose();
    }

    setOpen(false);
  };

  const handlerSelect = (selected: AvatarInfo): void => {
    setSelected(selected);
    if (onSelect) {
      onSelect(selected ? selected.name : '');
    }
    handlerOnClose();
  };

  const getAvatarProps = (): Record<string, any> => {
    const props = {};

    if (!isDisabled && isEdit) {
      props['onClick'] = handlerOnClick;
    }

    return props;
  };

  const renderControls = (id: string): React.ReactElement[] => {
    return [
      <div
        key={`${id}-select`}
        className={classnames(style['zh-avatar-picker__avatar-selected'], {
          [`${className}__avatar-selected`]: className,
        })}
      >
        <IconNavigationCheckmarkOutlineFilled />
      </div>,
      <div
        key={`${id}-hover`}
        className={classnames(style['zh-avatar-picker__avatar-hover'], {
          [`${className}__avatar-hover`]: className,
        })}
      >
        Select
      </div>,
    ];
  };

  const renderAvatarList = React.useCallback((): React.ReactElement[] => {
    return avatarList.map((item: AvatarInfo, index: number) => {
      if (!item) {
        return null;
      }

      const avatarClassName = classnames(style['zh-avatar-picker__avatar-item'], {
        [`${className}__avatar-item`]: className,
        [style['isSelected']]: selected && item.name === selected.name,
      });
      if (avatarView) {
        const View = avatarView(item, selected && selected.name === item.name);
        return (
          <View.type
            size={avatarSize}
            key={`${item.name}-${index}`}
            {...View.props}
            onClick={(): void => {
              handlerSelect(item);
              if (View.props.onClick) {
                View.props.onClick();
              }
            }}
            className={classnames(avatarClassName, View.props.className)}
          >
            {View.props.children}
          </View.type>
        );
      }

      return (
        <Avatar
          size={avatarSize}
          key={`${item.name}-${index}`}
          icon={item.avatar}
          onClick={(): void => handlerSelect(item)}
          className={avatarClassName}
        >
          {renderControls(item.name)}
        </Avatar>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarList, selected, avatarSize]);

  const renderSelectElement = (): React.ReactElement => {
    const additionalProps = {
      mobileFull: true,
      isOpen,
      onClose: handlerOnClose,
      title: modalTitle,
    };

    const renderAvatars = (
      <div className={classnames(style['zh-avatar-picker__content'], { [`${className}__content`]: className })}>
        {renderAvatarList()}
      </div>
    );

    if (ContentModal) {
      return (
        <OverlayProvider>
          <ContentModal.type
            {...additionalProps}
            {...ContentModal.props}
            className={classnames(style['zh-avatar-picker__modal'], ContentModal.props.className, {
              [`${className}__modal`]: className,
            })}
          >
            {renderAvatars}
          </ContentModal.type>
        </OverlayProvider>
      );
    }

    return (
      <OverlayProvider>
        <Modal
          title="Choose an avatar"
          {...additionalProps}
          className={classnames(style['zh-avatar-picker__modal'], { [`${className}__modal`]: className })}
        >
          {renderAvatars}
        </Modal>
      </OverlayProvider>
    );
  };

  return (
    <div className={classnames(style['zh-avatar-picker-wrapper'], className)}>
      <Avatar
        {...getAvatarProps()}
        size={avatarSize}
        icon={selected && selected.avatar}
        className={classnames(style['zh-avatar-picker'])}
      >
        {isDisabled && (
          <div className={classnames(style['zh-avatar-picker__disabled'], { [`${className}__disabled`]: className })} />
        )}
        {isOpen && renderSelectElement()}
      </Avatar>
      {isEdit && !isDisabled && (
        <Button variant="tertiary" className={classnames(style['zh-avatar-picker-button'])} onPress={handlerOnClick}>
          Change Avatar
        </Button>
      )}
    </div>
  );
}

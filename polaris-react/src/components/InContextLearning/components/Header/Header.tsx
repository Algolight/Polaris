import React from 'react';

import {DisplayText} from '../../../DisplayText';
import {CloseButton} from '../CloseButton';

import styles from './Header.scss';

export interface HeaderProps {
  id?: string;
  titleHidden?: boolean;
  children?: React.ReactNode;
  onClose(): void;
}

export function Header({id, titleHidden, children, onClose}: HeaderProps) {
  return (
    <div
      className={titleHidden || !children ? styles.titleHidden : styles.Header}
    >
      <div id={id} className={styles.Title}>
        <DisplayText element="h3" size="large">
          {children}
        </DisplayText>
      </div>
      <CloseButton onClick={onClose} />
    </div>
  );
}

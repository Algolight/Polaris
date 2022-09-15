import React from 'react';
import type {spacing} from '@shopify/polaris-tokens';

import {elementChildren} from '../../utilities/components';

import styles from './Inline.scss';

type SpacingTokenGroup = typeof spacing;
type SpacingTokenName = keyof SpacingTokenGroup;

// TODO: Bring this logic into tokens
type Spacing = SpacingTokenName extends `space-${infer Scale}` ? Scale : never;

const AlignY = {
  top: 'start',
  center: 'center',
  bottom: 'end',
  baseline: 'baseline',
};

type Align = 'start' | 'center' | 'end';

export interface InlineProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
  wrap?: boolean;
  /** Adjust spacing between elements */
  spacing?: Spacing;
  /** Adjust vertical alignment of elements */
  alignY?: keyof typeof AlignY;
  /** Adjust horizontal alignment of elements */
  align?: Align;
}

export const Inline = function Inline({
  children,
  spacing = '1',
  align,
  alignY,
  wrap,
}: InlineProps) {
  const style = {
    '--pc-inline-align': align,
    '--pc-inline-align-y': alignY,
    '--pc-inline-wrap': wrap ? 'wrap' : 'nowrap',
    '--pc-inline-spacing': `var(--p-space-${spacing})`,
  } as React.CSSProperties;

  const itemMarkup = elementChildren(children).map((child, index) => {
    return <div key={index}>{child}</div>;
  });

  return (
    <div className={styles.Inline} style={style}>
      {itemMarkup}
    </div>
  );
};
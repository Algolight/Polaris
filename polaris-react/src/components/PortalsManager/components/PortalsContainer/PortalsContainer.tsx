import React, {forwardRef} from 'react';
import type {RefObject} from 'react';

export interface PolarisContainerProps {}

function PortalsContainerComponent(
  _props: PolarisContainerProps,
  ref: RefObject<HTMLDivElement>,
) {
  return <div id="PolarisPortalsContainer" ref={ref} />;
}

export const PortalsContainer = forwardRef(PortalsContainerComponent);

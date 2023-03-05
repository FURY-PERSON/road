import { memo, FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode
  element?: HTMLElement
}

const defaultRoot = document.querySelector('.app') ?? document.body;

export const Portal:FC<PortalProps> = memo((props) => {
  const { children, element = defaultRoot } = props;

  return createPortal(children, element)
});

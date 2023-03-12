import {
  memo, FC, ReactNode, useRef, useState, useEffect, 
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode
}

const defaultRoot = (document.querySelector('.app') ?? document.body)as HTMLDivElement;

export const Portal:FC<PortalProps> = memo((props) => {
  const { children } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = defaultRoot;
    setMounted(true);
  }, []);

  return mounted && ref.current ? createPortal(children, ref.current) : null; // to load chunk async
});

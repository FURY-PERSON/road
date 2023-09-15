import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import popupCls from '../../styles/popup.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import { DropdownDirection } from '../../types/popup';

import cls from './Popover.module.scss';

interface PopoverProps {
  className?: string;
  panelClassName?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
  children: ReactNode;
}

/** 
 * old design. Use from redesign folder
  @deprecated  
*/
export function Popover(props: PopoverProps) {
  const { className, trigger, direction = 'bottom right', children, panelClassName } = props;

  const menuClasses = mapDirectionClass[direction];

  return (
    <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
      <HPopover.Button as="div" className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, [menuClasses, panelClassName])}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
}

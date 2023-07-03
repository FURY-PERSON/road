import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import { DropdownDirection } from '../../types/popup';

interface PopoverProps {
    className?: string;
    panelClassName?: string;
    direction?: DropdownDirection;
    trigger: ReactNode;
    children: ReactNode;
}

export function Popover(props: PopoverProps) {
  const {
    className, trigger, direction = 'bottom right', children, panelClassName,
  } = props;

  const menuClasses = mapDirectionClass[direction];

  return (
    <HPopover
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <HPopover.Button className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel
        className={classNames(cls.panel, {}, [menuClasses, panelClassName])}
      >
        {children}
      </HPopover.Panel>
    </HPopover>
  );
}

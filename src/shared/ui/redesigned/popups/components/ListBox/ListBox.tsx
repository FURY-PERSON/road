import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

import { Button } from '../../../Button/Button';
import popupCls from '../../styles/popup.module.scss';
import { DropdownDirection } from '../../types/types';
import { HStack } from '../../../Stack/HStack/HStack';
import { mapDirectionClass } from '../../styles/constants';

import cls from './ListBox.module.scss';

export interface ListBoxItem<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange?: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string | null;
  labelClassName?: string;
  listClassName?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom right',
    label,
    labelClassName,
    listClassName
  } = props;

  const optionsClasses = [mapDirectionClass[direction], popupCls.menu, listClassName];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

  return (
    <HStack gap={8} align="center">
      {label && <span className={labelClassName}>{label}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button
          as={Button}
          variant="filled"
          /*           disabled={readonly} */
          className={cls.trigger}
          addonRight={<ArrowIcon className={cls.arrow} />}
        >
          {selectedItem?.content ?? defaultValue}
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                    [popupCls.selected]: selected
                  })}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}

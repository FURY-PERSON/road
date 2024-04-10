import React, { ReactNode, useState } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './CheckBox.module.scss';

interface CheckboxItem<T extends string> {
  value: T;
  content: ReactNode;
}

interface CheckboxProps<T extends string> {
  items: CheckboxItem<T>[];
  className?: string;
  values?: T[];
  onChange?: (values: T[]) => void;
  label?: string | null;
}

export function CheckBox<T extends string>(props: CheckboxProps<T>) {
  const { className, items, values, onChange, label } = props;

  const [checkedValues, setCheckedValues] = useState(values || []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const triggeredItem = items?.find((item) => item.value === event.target.value)?.value;
    const newValues =
      event.target.checked && triggeredItem
        ? [...checkedValues, triggeredItem]
        : checkedValues.filter((value) => value !== event.target.value);
    setCheckedValues(newValues);
    onChange?.(newValues);
  };

  return (
    <fieldset className={classNames(cls.checkbox, {}, [className])}>
      {label && <legend>{`${label}`}</legend>}
      {items.map((item) => (
        <div key={item.value}>
          <label htmlFor={item.value} className={cls.label}>
            <input
              type="checkbox"
              id={item.value}
              value={item.value}
              checked={checkedValues.includes(item.value)}
              onChange={handleChange}
              className={cls.checkboxInput}
            />
            {item.content}
          </label>
        </div>
      ))}
    </fieldset>
  );
}

import {
  memo, FC, InputHTMLAttributes, ChangeEvent, 
} from 'react';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import cls from './TextInput.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder'>

interface TextInputProps extends HTMLInputProps {
  className?: string;
  value?: string,
  onChange?: (value: string) => void,
  placeholder?: string | null,
  label?: string | null
}

export const TextInput:FC<TextInputProps> = memo((props) => {
  const { 
    className,
    value,
    onChange,
    readOnly,
    placeholder,
    label,
    type,
    ...otherProps
  } = props;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const mods: Mods = {
    [cls.readOnly]: readOnly,
  };

  return (
    <div className={classNames(cls.TextInput, mods, [className])}>
      {label
        ? <div className={cls.label}>{label}</div>
        : null}
      <input {...otherProps} type={type || 'text'} value={value} readOnly={readOnly} placeholder={placeholder || ''} onChange={onChangeHandler} />
    </div>
  );
});

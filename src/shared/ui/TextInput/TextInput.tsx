import {
  memo, FC, InputHTMLAttributes, ChangeEvent, 
} from 'react';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import cls from './TextInput.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder'>

interface TextInputProps extends HTMLInputProps {
  className?: string;
  value?: string,
  onChange?: (value: string) => void,
  placeholder?: string | null,
  label?: string | null,
  multiline?: boolean
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
    multiline,
    ...otherProps
  } = props;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

      {multiline
        ? <textarea {...otherProps as any} rows={8} className={classNames(cls.input, {}, [])} value={value} readOnly={readOnly} placeholder={placeholder || ''} onChange={onChangeHandler} />
        : <input {...otherProps} className={classNames(cls.input, {}, [])} type={type || 'text'} value={value} readOnly={readOnly} placeholder={placeholder || ''} onChange={onChangeHandler} />}
    </div>
  );
});

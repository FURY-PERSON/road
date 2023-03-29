import {
  memo, FC, InputHTMLAttributes, ChangeEvent, 
} from 'react';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import cls from './TextInput.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface TextInputProps extends HTMLInputProps {
  className?: string;
  value?: string,
  onChange?: (value: string) => void
}

export const TextInput:FC<TextInputProps> = memo((props) => {
  const { 
    className,
    value,
    onChange,
    readOnly,
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
      <input {...otherProps} type="text" value={value} readOnly={readOnly} onChange={onChangeHandler} />
    </div>
  );
});

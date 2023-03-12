import {
  memo, FC, InputHTMLAttributes, ChangeEvent, 
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
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
    ...otherProps
  } = props;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={classNames(cls.TextInput, {}, [className])}>
      <input {...otherProps} type="text" value={value} onChange={onChangeHandler} />
    </div>
  );
});

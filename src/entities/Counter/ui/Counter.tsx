/* eslint-disable i18next/no-literal-string */
import { memo, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counter.slice';
import cls from './Counter.module.scss';

interface CounterProps {
  className?: string;
}

export const Counter:FC<CounterProps> = memo((props) => {
  const { className } = props;
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div className={classNames(cls.Counter, {}, [className])}>
      <div data-testid="value">{counterValue}</div>
      <Button data-testid="increment-btn" onClick={increment}>increment</Button>
      <Button data-testid="decrement-btn" onClick={decrement}>decrement</Button>
    </div>
  );
});

import { memo, FC, useCallback } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy_2.svg';

import { Button } from '../Button/Button';

import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  children: string;
}

export const Code: FC<CodeProps> = memo((props) => {
  const { className, children } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(children);
  }, [children]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button onClick={onCopy} variant="clear" className={cls.copy}>
        <CopyIcon className={cls.icon} />
      </Button>

      <code className={cls.text}>{children}</code>
    </pre>
  );
});

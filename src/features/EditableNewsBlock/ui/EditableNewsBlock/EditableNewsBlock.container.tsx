import { memo, FC } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/helpers/features';

import cls from './EditableNewsBlock.module.scss';
import { EditableNewsBlockComponent, EditableNewsBlockComponentProps } from './EditableNewsBlock';

interface EditableNewsBlockContainerProps extends EditableNewsBlockComponentProps {
  className?: string;
}

export const EditableNewsBlockContainer: FC<EditableNewsBlockContainerProps> = memo((props) => {
  const { className, ...otherProps } = props;

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames(cls.EditableNewsBlock, {}, [className])}>
          <EditableNewsBlockComponent {...otherProps} />
        </div>
      }
      on={<EditableNewsBlockComponent {...otherProps} />}
    />
  );
});

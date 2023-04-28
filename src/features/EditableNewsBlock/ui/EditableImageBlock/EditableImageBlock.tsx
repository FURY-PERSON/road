import {
  memo, FC, useState, ChangeEvent, 
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import cls from './EditableImageBlock.module.scss';
import { EditableNewsBlockImage, EditableNewsBlockImageHandlers } from '../../model/types/editableNewsBlock';

interface EditableImageBlockProps extends EditableNewsBlockImageHandlers {
  className?: string;
  item: EditableNewsBlockImage
}

export const EditableImageBlock:FC<EditableImageBlockProps> = memo((props) => {
  const {
    className, item, onImageChange, onRemoveImage, onTitleChange, 
  } = props;

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onImageChange?.(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className={classNames(cls.EditableImageBlock, {}, [className])}>
      {item.image && (
        <div className={cls.imageWrapper}>
          <img
            alt="not found"
            width="250px"
            src={item.image}
          />

          <button onClick={onRemoveImage}>Remove</button>
        </div>
      )}

      <input
        type="file"
        name="myImage"
        onChange={onInputChange}
      />

      <TextInput value={item.title} onChange={onTitleChange} />
    </div>
  );
});

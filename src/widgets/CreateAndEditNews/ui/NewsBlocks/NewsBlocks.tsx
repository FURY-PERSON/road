import { memo, FC, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
  EditableNewsBlockCodeHandlers,
  EditableNewsBlockComponent,
  EditableNewsBlockImageHandlers,
  EditableNewsBlockTextHandlers
} from '@/features/EditableNewsBlock';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  createAndEditNewsActions,
  getCreateAndEditNews
} from '../../model/slice/createAndEditNews.slice';

import cls from './NewsBlocks.module.scss';

interface NewsBlocksProps {
  className?: string;
  blockClassName?: string;
}

export const NewsBlocks: FC<NewsBlocksProps> = memo((props) => {
  const { className, blockClassName } = props;

  const dispatch = useAppDispatch();

  const newsBlocks = useSelector(getCreateAndEditNews.selectAll);

  const sortedNewsBlocks = useMemo(
    () => [...newsBlocks].sort((a, b) => a.sequenceNumber - b.sequenceNumber),
    [newsBlocks]
  );
  // TODO create sequence map to avoid sort

  const onBlockSequenceChange = useCallback(
    (localBlockId: string) => (sequenceNum: number) => {
      dispatch(createAndEditNewsActions.updateBlockSequenceNum({ localBlockId, num: sequenceNum }));
    },
    [dispatch]
  );

  const onCodeBlockChange = useCallback(
    (localBlockId: string) => (code: string) => {
      dispatch(createAndEditNewsActions.updateBlockCode({ localBlockId, code }));
    },
    [dispatch]
  );

  const onImageBlockImageChange = useCallback(
    (localBlockId: string) => (image?: string) => {
      dispatch(
        createAndEditNewsActions.updateImageBlockImage({ localBlockId, image: image || '' })
      );
    },
    [dispatch]
  );
  const onImageBlockImageRemove = useCallback(
    (localBlockId: string) => () => {
      dispatch(createAndEditNewsActions.updateImageBlockImage({ localBlockId, image: '' }));
    },
    [dispatch]
  );
  const onImageBlockTitleChange = useCallback(
    (localBlockId: string) => (title: string) => {
      dispatch(createAndEditNewsActions.updateImageBlockTitle({ localBlockId, title }));
    },
    [dispatch]
  );

  const onTextBlockParagraphAdd = useCallback(
    (localBlockId: string) => () => {
      dispatch(createAndEditNewsActions.addParagraphToParagraphsBlock({ localBlockId }));
    },
    [dispatch]
  );
  const onTextBlockParagraphChange = useCallback(
    (localBlockId: string) => (paragraphId: string, text: string) => {
      dispatch(
        createAndEditNewsActions.updateTextBlockParagraphText({ localBlockId, paragraphId, text })
      );
    },
    [dispatch]
  );
  const onTextBlockTitleChange = useCallback(
    (localBlockId: string) => (title: string) => {
      dispatch(createAndEditNewsActions.updateTextBlockTitle({ localBlockId, title }));
    },
    [dispatch]
  );

  const codeBlockHandlers: (localBlockId: string) => EditableNewsBlockCodeHandlers = useCallback(
    (localBlockId: string) => ({
      onCodeChange: onCodeBlockChange(localBlockId),
      onSequenceNumberChange: onBlockSequenceChange(localBlockId)
    }),
    [onCodeBlockChange, onBlockSequenceChange]
  );

  const imageBlockHandlers: (localBlockId: string) => EditableNewsBlockImageHandlers = useCallback(
    (localBlockId: string) => ({
      onImageChange: onImageBlockImageChange(localBlockId),
      onRemoveImage: onImageBlockImageRemove(localBlockId),
      onTitleChange: onImageBlockTitleChange(localBlockId),
      onSequenceNumberChange: onBlockSequenceChange(localBlockId)
    }),
    [
      onImageBlockImageChange,
      onImageBlockImageRemove,
      onImageBlockTitleChange,
      onBlockSequenceChange
    ]
  );

  const textBlockHandlers: (localBlockId: string) => EditableNewsBlockTextHandlers = useCallback(
    (localBlockId: string) => ({
      onAddParagraph: onTextBlockParagraphAdd(localBlockId),
      onParagraphChange: onTextBlockParagraphChange(localBlockId),
      onTitleChange: onTextBlockTitleChange(localBlockId),
      onSequenceNumberChange: onBlockSequenceChange(localBlockId)
    }),
    [
      onTextBlockParagraphAdd,
      onTextBlockParagraphChange,
      onTextBlockTitleChange,
      onBlockSequenceChange
    ]
  );

  return (
    <div className={classNames(cls.NewsBlocks, {}, [className])}>
      {sortedNewsBlocks.map((block) => (
        <EditableNewsBlockComponent
          item={block}
          key={block.localId}
          className={blockClassName}
          maxSequenceNumber={newsBlocks.length}
          codeBlockHandlers={codeBlockHandlers(block.localId)}
          imageBlockHandlers={imageBlockHandlers(block.localId)}
          textBlockHandlers={textBlockHandlers(block.localId)}
        />
      ))}
    </div>
  );
});

import { memo, FC, useState } from 'react';
import cls from './StarRating.module.scss';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import StarIcon from '@/shared/assets/icons/star.svg';

interface StarRatingProps {
  className?: string;
  onSelect?: (star: number) => void
  size?: number
  selectedStars?: number
}

const starts = [1, 2, 3, 4, 5];

export const StarRating:FC<StarRatingProps> = memo((props) => {
  const {
    className, onSelect, selectedStars = 0, size = 30, 
  } = props;

  const [currentStarsCount, setCurrentStarsCount] = useState(0);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {starts.map((star) => (
        <StarIcon
          key={star}
          width={size}
          height={size}
          onMouseLeave={onLeave}
          onClick={onClick(star)}
          onMouseEnter={onHover(star)}
          className={classNames(cls.star, {
            [cls.hovered]: currentStarsCount >= star,
            [cls.normal]: isSelected,
          }, [])}
        />
      ))}
    </div>
  );
});

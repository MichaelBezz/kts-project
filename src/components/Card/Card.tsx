import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import styles from './Card.module.scss';

export type CardProps = {
  className?: string,
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot
}) => {
  return (
    <div className={cn(styles['card'], className)} onClick={onClick}>
      <div className={styles['card__image']}>
        <img src={image} width='360' height='360' alt='Иллюстрация карточки' />
      </div>

      <div className={styles['card__content']}>
        <div className={styles['card__body']}>
          {captionSlot && (
            <Text tag='p' view='p-14' weight='medium' color='secondary'>
              {captionSlot}
            </Text>
          )}

          <Text tag='p' view='p-20' weight='medium' maxLines={2}>
            {title}
          </Text>

          <Text tag='p' view='p-16' color='secondary' maxLines={3}>
            {subtitle}
          </Text>
        </div>

        <div className={cn(
          styles['card__footer'],
          {[styles['card__footer--without-slot']]: !actionSlot}
        )}>
          {contentSlot && (
            <Text className={styles['card__price']} tag='p' view='p-18' weight='bold'>
              {contentSlot}
            </Text>
          )}

          {actionSlot ? actionSlot : null}
        </div>
      </div>
    </div>
  );
};

export default Card;

import cn from 'classnames';
import * as React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  /** Html-тег */
  tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-32' | 'p-24' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent' | 'error';
  /** Максимальное кол-во строк */
  maxLines?: number;
  /** Контент */
  children: React.ReactNode;
};

const Text: React.FC<TextProps> = ({
  className,
  tag: Tag = 'p',
  view,
  weight,
  color,
  maxLines,
  children
}) => {
  return (
    <Tag
      className={cn(
        styles['text'],
        {[styles[`text--${view}`]]: view},
        {[styles[`text--${weight}`]]: weight},
        {[styles[`text--${color}`]]: color},
        {[styles['text--max-lines']]: maxLines},
        className
      )}
      style={{WebkitLineClamp: maxLines ?? 'none'}}
    >
      {children}
    </Tag>
  );
};

export default React.memo(Text);

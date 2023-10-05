import * as React from 'react';
import ContentLoader from 'react-content-loader';

export type CardLoaderProps = {
  className?: string;
  cards?: number;
}

const CategoryLoader: React.FC<CardLoaderProps> = ({ className, cards = 3, ...props }) => {
  const items = Array.from({ length: cards }, (_, index) => index + 1);

  return (
    <div className={className}>
      {items.map((item) => (
        <ContentLoader
          key={item}
          speed={3.5}
          viewBox="0 0 360 360"
          backgroundColor="#f3f3f3"
          foregroundColor="#86aaa7"
          {...props}
        >
          <rect x="0" y="0" rx="20" ry="20" width="360" height="360"/>
        </ContentLoader>
      ))}
    </div>
  );
};

export default React.memo(CategoryLoader);

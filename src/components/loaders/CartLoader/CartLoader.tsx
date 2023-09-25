import * as React from 'react';
import ContentLoader from 'react-content-loader';

export type CartLoaderProps = {
  className?: string;
  cards?: number;
}

const CartLoader: React.FC<CartLoaderProps> = ({ className, cards = 3, ...props }) => {
  const items = Array.from({ length: cards }, (_, index) => index + 1);

  return (
    <div className={className}>
      {items.map((item) => (
        <ContentLoader
          key={item}
          speed={3.5}
          viewBox="0 0 600 80"
          backgroundColor="#f3f3f3"
          foregroundColor="#86aaa7"
          {...props}
        >
          <rect x="9" y="10" rx="8" ry="8" width="60" height="60"/>
          <rect x="80" y="10" rx="8" ry="8" width="100" height="16"/>
          <rect x="80" y="30" rx="8" ry="8" width="315" height="20"/>
          <rect x="427" y="30" rx="8" ry="8" width="60" height="20"/>
          <rect x="500" y="30" rx="8" ry="8" width="40" height="20"/>
          <rect x="549" y="30" rx="8" ry="8" width="20" height="20"/>
        </ContentLoader>
      ))}
    </div>
  );
};

export default React.memo(CartLoader);

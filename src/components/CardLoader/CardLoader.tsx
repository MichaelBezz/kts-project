import * as React from 'react';
import ContentLoader from 'react-content-loader';

export type CardLoaderProps = {
  className?: string;
  cards?: number;
}

const CardLoader: React.FC<CardLoaderProps> = ({ className, cards = 3, ...props }) => {
  const items = Array.from({ length: cards }, (_, index) => index + 1);

  return (
    <div className={className}>
      {items.map((item) => (
        <ContentLoader
          key={item}
          speed={3.5}
          viewBox="0 0 360 658"
          backgroundColor="#f3f3f3"
          foregroundColor="#86aaa7"
          {...props}
        >
          <rect x="12" y="412" rx="5" ry="5" width="220" height="16"/>
          <rect x="12" y="12" rx="20" ry="20" width="336" height="336"/>
          <rect x="12" y="468" rx="5" ry="5" width="220" height="16"/>
          <rect x="12" y="440" rx="5" ry="5" width="220" height="16"/>
          <rect x="12" y="536" rx="5" ry="5" width="101" height="16"/>
          <rect x="193" y="518" rx="20" ry="20" width="155" height="52"/>
        </ContentLoader>
      ))}
    </div>
  );
};

export default React.memo(CardLoader);

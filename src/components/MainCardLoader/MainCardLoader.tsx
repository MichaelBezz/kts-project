import * as React from 'react';
import ContentLoader from 'react-content-loader';

const MainCardLoader: React.FC = (props) => {
  return (
    <ContentLoader
      speed={2}
      viewBox="0 0 600 280"
      backgroundColor="#f3f3f3"
      foregroundColor="#86aaa7"
      {...props}
    >
      <rect x="8" y="8" rx="20" ry="20" width="260" height="260"/>
      <rect x="298" y="8" rx="5" ry="5" width="199" height="18"/>
      <rect x="298" y="35" rx="5" ry="5" width="285" height="18"/>
      <rect x="298" y="97" rx="5" ry="5" width="199" height="18"/>
      <rect x="298" y="140" rx="5" ry="5" width="68" height="18"/>
      <rect x="382" y="141" rx="5" ry="5" width="68" height="18"/>
    </ContentLoader>
  );
};

export default React.memo(MainCardLoader);

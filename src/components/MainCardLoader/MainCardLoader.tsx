import * as React from 'react';
import ContentLoader from 'react-content-loader';

const MainCardLoader: React.FC = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={1300}
      height={600}
      viewBox="0 0 1300 600"
      backgroundColor="#f3f3f3"
      foregroundColor="#86aaa7"
      {...props}
    >
      <rect x="12" y="12" rx="20" ry="20" width="248" height="248"/>
      <rect x="292" y="2" rx="5" ry="5" width="196" height="19"/>
      <rect x="168" y="141" rx="0" ry="0" width="0" height="1"/>
      <rect x="292" y="35" rx="5" ry="5" width="288" height="19"/>
      <rect x="292" y="95" rx="5" ry="5" width="82" height="19"/>
      <rect x="292" y="142" rx="5" ry="5" width="72" height="19"/>
      <rect x="378" y="142" rx="5" ry="5" width="72" height="19"/>
    </ContentLoader>
  );
};

export default MainCardLoader;

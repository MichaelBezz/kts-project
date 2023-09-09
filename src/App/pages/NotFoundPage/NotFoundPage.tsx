import * as React from 'react';
import GoBackButton from 'components/GoBackButton';
import Text from 'components/Text';
import styles from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles['not-found-page']}>
      <div className="container">
        <GoBackButton />

        <div className={styles['not-found-page__content']}>
          <Text tag="h1" view="title">
            Error: 404 Page Not Found
          </Text>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

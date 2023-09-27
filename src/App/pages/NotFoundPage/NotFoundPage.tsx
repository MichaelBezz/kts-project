import * as React from 'react';
import Text from 'components/Text';
import GoBackButton from 'components/buttons/GoBackButton';
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

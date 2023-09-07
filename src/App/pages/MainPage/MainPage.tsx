import * as React from 'react';
import Intro from './components/Intro';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  return(
    <div className={styles['main-page']}>
      <Intro className={styles['main-page__intro']} />
    </div>
  );
};

export default MainPage;

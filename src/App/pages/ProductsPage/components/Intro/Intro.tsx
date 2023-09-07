import cn from 'classnames';
import * as React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import styles from './Intro.module.scss';

export type IntroProps = {
  className?: string;
};

const Intro: React.FC<IntroProps> = ({ className }) => {
  return (
    <section className={cn(styles['intro'], className)}>
      <div className="container">
        <div className={styles['intro__header']}>
          <Text className={styles['intro__title']} tag="h1" view="title" color="primary">
            Products
          </Text>

          <Text className={styles['intro__description']} view="p-20" color="secondary">
            We&nbsp;display products based on&nbsp;the latest products we&nbsp;have,
            if&nbsp;you want to&nbsp;see our old products please enter the name of&nbsp;the item
          </Text>
        </div>

        <div className={styles['intro__search']}>
          <Input
            className={styles['intro__search-input']}
            value=""
            onChange={() => {}}
            placeholder="Search product"
          />

          <Button className={styles['intro__search-button']}>Find now</Button>
        </div>

        <div className={styles['intro__filter']}>
          <MultiDropdown
            options={[]}
            value={[]}
            onChange={() => {}}
            getTitle={() => 'Filter'}
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;

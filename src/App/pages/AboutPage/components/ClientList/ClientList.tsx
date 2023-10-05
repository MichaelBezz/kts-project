import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';
import Text from 'components/Text';
import { useUserStore } from 'store/hooks';
import ClientItem from '../ClientItem';
import styles from './ClientList.module.scss';

export type ClientListProps = {
  className?: string;
};

export type SwiperRef = HTMLElement & {
  swiper: Swiper;
  initialize: () => void;
};

const ClientList: React.FC<ClientListProps> = ({ className }) => {
  const userStore = useUserStore();

  const swiperRef = React.useRef<SwiperRef | null>(null);

  React.useEffect(() => {
    register();

    const params: SwiperOptions = {
      speed: 1500,
      autoHeight: true,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        424: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 20,
        }
      }
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, []);

  return (
    <div className={cn(styles['client-list'], className)}>
      <Text tag="h2" view="p-32">Our clients:</Text>

      {userStore.users.length >= 6 ? (
        <div className={styles['client-list__slider']}>
          <swiper-container ref={swiperRef} init={false}>
            {userStore.users.map((user) => (
              <swiper-slide key={user.id}>
                <ClientItem client={user} />
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      ) : (
        <div className={styles['client-list__body']}>
          {userStore.users.map((user) => (
            <ClientItem key={user.id} client={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(ClientList);

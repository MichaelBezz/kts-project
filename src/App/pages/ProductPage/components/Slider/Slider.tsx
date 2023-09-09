import cn from 'classnames';
import * as React from 'react';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import styles from './Slider.module.scss';

export type SliderProps = {
  className?: string;
  imageSrc: string[];
};

export type SwiperRef = HTMLElement & {
  swiper: Swiper;
  initialize: () => void;
};

const Slider: React.FC<SliderProps> = ({ className, imageSrc }) => {
  const swiperRef = React.useRef<SwiperRef | null>(null);
  const prevButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    register();

    const params: SwiperOptions = {
      spaceBetween: 0,
      slidesPerView: 1,
      loop: false,
      speed: 800,
      effect: 'fade',
      navigation: {
        nextEl: nextButtonRef.current,
        prevEl: prevButtonRef.current
      }
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, []);

  return (
    <div className={cn(styles['slider'], className)}>
      <swiper-container ref={swiperRef} init={false}>
        {imageSrc.map((src) => (
          <swiper-slide key={src}>
            <div className={styles['slider__slide']}>
              <img src={src} width={600} height={600} alt="Product image slide" />
            </div>
          </swiper-slide>
        ))}
      </swiper-container>

      <div className={styles['slider__controls']}>
        <button
          className={styles['slider__button']}
          ref={prevButtonRef}
          type="button"
        >
          <ArrowLeftIcon width={30} height={30} />
        </button>

        <button
          className={styles['slider__button']}
          ref={nextButtonRef}
          type="button"
        >
          <ArrowRightIcon width={30} height={30} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(Slider);

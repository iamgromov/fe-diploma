import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import review1 from "../../assets/img/review1.png";
import review2 from "../../assets/img/review2.png";
import "./Reviews.css";

function Reviews() {
  return (
    <section id="reviews" className="reviews section">
      <div className="container">
        <h2 className="reviews__title section__title">отзывы</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={85}
          slidesPerView={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className="reviews__card">
              <div className="revews__card-img-wrapper">
                <img
                  src={review1}
                  alt="Екатерина Вальнова"
                  className="reviews__card-img"
                />
              </div>
              <div className="reviews__card-content">
                <h4 className="reviews__card-author">Екатерина Вальнова</h4>
                <blockquote className="reviews__card-review">
                  Доброжелательные подсказки на всех этапах помогут правильно
                  заполнить поля и без затруднений купить авиа или ж/д билет,
                  даже если вы заказываете онлайн билет впервые.
                </blockquote>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="reviews__card">
              <div className="revews__card-img-wrapper">
                <img
                  src={review2}
                  alt="Евгений Стрыкало"
                  className="reviews__card-img"
                />
              </div>
              <div className="reviews__card-content">
                <h4 className="reviews__card-author">Евгений Стрыкало</h4>
                <blockquote className="reviews__card-review">
                  СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и
                  за 3 часа до отправления мы пришлем вам СМС-напоминание о
                  поездке.
                </blockquote>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="reviews__card">
              <div className="revews__card-img-wrapper">
                <img
                  src={review1}
                  alt="Екатерина Вальнова"
                  className="reviews__card-img"
                />
              </div>
              <div className="reviews__card-content">
                <h4 className="reviews__card-author">Екатерина Вальнова</h4>
                <blockquote className="reviews__card-review">
                  Доброжелательные подсказки на всех этапах помогут правильно
                  заполнить поля и без затруднений купить авиа или ж/д билет,
                  даже если вы заказываете онлайн билет впервые.
                </blockquote>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="reviews__card">
              <div className="revews__card-img-wrapper">
                <img
                  src={review2}
                  alt="Евгений Стрыкало"
                  className="reviews__card-img"
                />
              </div>
              <div className="reviews__card-content">
                <h4 className="reviews__card-author">Евгений Стрыкало</h4>
                <blockquote className="reviews__card-review">
                  СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и
                  за 3 часа до отправления мы пришлем вам СМС-напоминание о
                  поездке.
                </blockquote>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="reviews__card">
              <div className="revews__card-img-wrapper">
                <img
                  src={review1}
                  alt="Екатерина Вальнова"
                  className="reviews__card-img"
                />
              </div>
              <div className="reviews__card-content">
                <h4 className="reviews__card-author">Екатерина Вальнова</h4>
                <blockquote className="reviews__card-review">
                  Доброжелательные подсказки на всех этапах помогут правильно
                  заполнить поля и без затруднений купить авиа или ж/д билет,
                  даже если вы заказываете онлайн билет впервые.
                </blockquote>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="reviews__card">
              <div className="revews__card-img-wrapper">
                <img
                  src={review2}
                  alt="Евгений Стрыкало"
                  className="reviews__card-img"
                />
              </div>
              <div className="reviews__card-content">
                <h4 className="reviews__card-author">Евгений Стрыкало</h4>
                <blockquote className="reviews__card-review">
                  СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и
                  за 3 часа до отправления мы пришлем вам СМС-напоминание о
                  поездке.
                </blockquote>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default Reviews;

import React, {useState} from "react";
import {Swiper,  SwiperSlide} from 'swiper/react';
import {Keyboard, Navigation, Pagination} from 'swiper/modules';

import review_1 from "../../static/review_1.jpeg";
import review_2 from "../../static/review_2.jpeg";
import review_3 from "../../static/review_3.jpeg";
import review_4 from "../../static/review_4.jpeg";
import review_5 from "../../static/review_5.jpeg";
import review_6 from "../../static/review_6.jpeg";
import review_7 from "../../static/review_7.jpeg";
import review_8 from "../../static/review_8.jpeg";
import review_9 from "../../static/review_9.jpeg";
import review_10 from "../../static/review_10.jpeg";
import "../../styles/seventh_block.css";
import 'swiper/css';



const SeventhBlock: React.FC = () => {
    const reviews = [
        review_1,
        review_2,
        review_3,
        review_4,
        review_5,
        review_6,
        review_7,
        review_8,
        review_9,
        review_10
    ]

    const [initialSlide, setInitialSlide] = useState(0);
    const [swiperOpen, setSwiperOpen] = useState(false);

    function handleSwiperOpen(num: number) {
        setSwiperOpen(true);
        document.body.style.overflow = "hidden";
        setInitialSlide(num);
    }

    function handleSwiperClose() {
        setSwiperOpen(false);
        document.body.style.overflow = "scroll";
    }

    function onKeyPressed(e: KeyboardEvent) {
        console.log(e.key)
        if (e.key === "Escape") {
            setSwiperOpen(false);
            document.body.style.overflow = "scroll";
        }
    }

    return (
       <div className="page_content" id="reviews">
           <div className="seventh_block">
               <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                   <div className="block_info_title">Отзывы наших клиентов</div>
                   <a href="https://t.me/+nVp-YvKEbJJjOTRi" className="link_header_footer">
                       <button className="medium_gradient_button">Телеграм чат</button>
                   </a>
               </div>
               <div className="seventh_reviews" >
                   <div className="seventh_column">
                       <img onClick={() => handleSwiperOpen(0)} src={review_1} alt="review"/>
                       <img onClick={() => handleSwiperOpen(1)} src={review_2} alt="review"/>
                       <img onClick={() => handleSwiperOpen(2)} src={review_3} alt="review" className="review_second_pos_hidden"/>
                       <img onClick={() => handleSwiperOpen(9)} src={review_10} alt="review" className="review_second_pos_shown"/>
                       <img onClick={() => handleSwiperOpen(6)} src={review_7} alt="review" className="review_third_pos_shown"/>

                   </div>
                   <div className="seventh_column">
                       <img onClick={() => handleSwiperOpen(3)} src={review_4} alt="review"/>
                       <img onClick={() => handleSwiperOpen(4)} src={review_5} alt="review"/>
                       <img onClick={() => handleSwiperOpen(2)} src={review_3} alt="review" className="review_second_pos_shown"/>
                       <img onClick={() => handleSwiperOpen(5)} src={review_6} alt="review" className="review_third_pos_shown"/>
                       <img onClick={() => handleSwiperOpen(7)} src={review_8} alt="review" className="review_third_pos_shown"/>
                       <img onClick={() => handleSwiperOpen(8)} src={review_9} alt="review" className="review_third_pos_shown"/>


                   </div>
                   <div className="seventh_column third_seventh_column">
                       <img onClick={() => handleSwiperOpen(5)} src={review_6} alt="review"/>
                       <img onClick={() => handleSwiperOpen(6)} src={review_7} alt="review"/>
                       <img onClick={() => handleSwiperOpen(7)} src={review_8} alt="review"/>
                       <img onClick={() => handleSwiperOpen(8)} src={review_9} alt="review" className="review_second_pos_shown"/>
                   </div>
                   <div className="seventh_column fourth_seventh_column">
                       <img onClick={() => handleSwiperOpen(8)} src={review_9} alt="review"/>
                       <img onClick={() => handleSwiperOpen(9)} src={review_10} alt="review"/>
                   </div>
               </div>
           </div>

           {swiperOpen &&
               // <div>
                   <Swiper
                       modules={[Navigation, Pagination, Keyboard]}
                       navigation={{ nextEl: ".swiper-button-next-wrap",
                           prevEl: ".swiper-button-prev-wrap",}}
                       pagination={{ clickable: true }}
                       loop={true}
                       style={{marginLeft: 0, width: '100vw', height: '100vh', display: 'flex', justifyContent: "center",
                           alignItems: 'center', marginBottom: 90,
                           position: 'fixed', top: 0, zIndex: 999, background: "white"}}
                       slidesPerView={1}
                       keyboard={{ enabled: true }}
                       initialSlide={initialSlide}
                       onKeyPress={onKeyPressed}
                       tabIndex="0"
                   >
                       <div className="swiper-button-prev-wrap">
                           <div className="swiper-button-prev"></div>
                       </div>
                       <div className="swiper-button-next-wrap">
                           <div className="swiper-button-next"></div>
                       </div>
                       {reviews.map((reviewContent, index) => (
                           <SwiperSlide key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                               margin: 'auto'}}>
                               <div>
                                   <img src={reviewContent} alt="review" style={{width: '100%'}}/>
                               </div>
                               <div className="cross" onClick={handleSwiperClose}>
                                   ×
                               </div>
                           </SwiperSlide>
                       ))}

                   </Swiper>
           }
       </div>
    )
}

export default SeventhBlock;
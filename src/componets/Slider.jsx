import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineDateRange } from "react-icons/md";
import { Navigation } from "swiper/modules";

export default function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=a554e8bcb1da4d16be96fb0d4e42102a"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          const filteredArticles = data.articles.filter(
            (article) => article.urlToImage !== null
          );
          setArticles(shuffleArray(filteredArticles));
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const shuffleArray = (array) => {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  
  return (
    <section className="max-w-full mx-auto p-4">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          700: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
      >
        {articles.map((article, index) => (
          <SwiperSlide
            key={index}
            className="bg-[#09415A] text-white rounded-lg overflow-hidden"
          >
            <a target="_blank" href={article.url} className="flex">
              <div>
                <img
                  src={article.urlToImage}
                  alt=""
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4 flex flex-col">
                <p className="text-yellow-500 text-xs uppercase mb-2">
                  By {article.author}
                </p>
                <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                <div className="flex gap-1 items-center">
                  <MdOutlineDateRange size={16} />
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

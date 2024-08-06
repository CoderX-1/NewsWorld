import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MdOutlineDateRange } from "react-icons/md";

const Trending = () => {
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
    <div>
      <section className="max-w-full mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Trending Stories</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            390: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            890: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          className="mySwiper"
        >
          {articles.map((article, index) => (
            <SwiperSlide
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <img
                  src={article.urlToImage || "https://via.placeholder.com/300"}
                  alt={article.title}
                  className="w-full h-48 lg:h-60 object-cover"
                />
                <div className="py-3">
                  <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                  <div className="text-sm text-gray-800 mt-2 flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
                    <div>By {article.author}</div>
                    <div className="flex gap-1 items-center">
                      <MdOutlineDateRange size={18} />
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Trending;

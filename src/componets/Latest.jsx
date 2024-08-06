import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineDateRange } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";

const Trending = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

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
          setArticles(filteredArticles);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const filterArticles = (category) => {
    setSelectedCategory(category);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const getFilteredArticles = () => {
    let filtered = articles;
    if (selectedCategory !== "All") {
      filtered = articles.filter((article) =>
        article.source.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    shuffleArray(filtered);
    return filtered.slice(0, 5); // Limit to first five articles
  };

  const filteredArticles = getFilteredArticles();


  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
        <div className="flex mb-4">
          {["All", "Sports", "Health", "Politics", "Travel"].map((category) => (
            <button
              key={category}
              onClick={() => filterArticles(category)}
              className={`mr-2 px-4 py-2 rounded-full text-white ${
                selectedCategory === category ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 lg:pr-4 mb-4 lg:mb-0">
          {filteredArticles.length > 0 && (
            <div className="relative">
              <img
                src={filteredArticles[0].urlToImage}
                alt={filteredArticles[0].title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="bg-white bg-opacity-75 p-3 px-0 rounded-lg">
                <span className="inline-block px-2 py-1 rounded text-xs text-white bg-blue-500">
                  {filteredArticles[0].source.name}
                </span>
                <h3 className="text-lg font-bold mb-2">
                  {filteredArticles[0].title}
                </h3>
                <div className="text-sm text-gray-800 mt-2 flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
                        <div>By {filteredArticles[0].author}</div>
                        <div className="flex gap-1 items-center">
                          <MdOutlineDateRange size={18} />
                          <span>{new Date(filteredArticles[0].publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-1/3">
          {filteredArticles.slice(1, 5).map((article, index) => (
            <div key={index} className="flex mb-4">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-1/3 h-24 object-cover rounded-lg mr-4"
              />
              <div className="w-2/3">
                <span className="inline-block mb-2 px-2 py-1 rounded text-xs text-white bg-blue-500">
                  {article.source.name}
                </span>
                <h3 className="text-sm font-bold mb-2">{article.title}</h3>
                <div className="text-sm text-gray-800 mt-2 flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
                        <div>By {article.author}</div>
                        <div className="flex gap-1 items-center">
                          <MdOutlineDateRange size={18} />
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;

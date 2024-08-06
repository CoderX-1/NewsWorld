import React, { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";

const Trending = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://newsapi.org/v2/everything?q=sport&apiKey=a554e8bcb1da4d16be96fb0d4e42102a")
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          const filteredArticles = data.articles.filter(article => article.urlToImage !== null);
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
    <section className="m-4">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 md:row-span-4">
            <div className="space-y-4">
              {articles.slice(0, 1).map((article, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <a target="_blank" rel="noopener noreferrer" href={article.url}>
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-[30rem] object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl md:text-2xl font-bold">{article.title}</h3>
                      <div className="text-sm text-gray-800 mt-2 flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
                        <div>By {article.author}</div>
                        <div className="flex gap-1 items-center">
                          <MdOutlineDateRange size={18} />
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 lg:col-span-1 lg:row-span-2">
            {articles.slice(1, 3).map((article, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <a target="_blank" rel="noopener noreferrer" href={article.url}>
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-lg font-bold">{article.title}</h3>
                    <div className="text-sm text-gray-800 mt-1 flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
                      <div>By {article.author}</div>
                      <div className="flex gap-1 items-center">
                        <MdOutlineDateRange size={18} />
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trending;

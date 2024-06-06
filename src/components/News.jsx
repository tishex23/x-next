"use client"

import { useState, useEffect } from "react"

export default function News() {

  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json')
        const data = await res.json();
        setNews(data.articles.slice(0, articleNum));
      }catch(err) {
        console.log("error fetching news",err);
      }
    }
    fetchNews();
  });

  return (
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2">
      <h4 className="font-bold text-xl px-4">Whats Happening</h4>
      {news.slice(0, articleNum).map((article) => (
       <div key={article.url}>
        <a href={article.url} target="_blank">
          <div className="flex items-center px-4 py-2
          hover:bg-gray-200 trnsition duration-200 space-x-1">
            <div className="space-y-0.5">
              <h6 className="text-sm font-bold">{article.title}</h6>
              <p>{article.source.name}</p>
            </div>
            <img 
            src={article.urlToImage} 
            alt="news photo"
            width={70}
            className="rounded-xl"/>
          </div>
        </a>
       </div> 
      ))}
        <button onClick={() => setArticleNum(articleNum + 3)}
        className="text-blue-300 pl-4 pb-3 hover:text-blue-400 text-small">
        Load more...
      </button>
    </div>
  )
}

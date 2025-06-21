import React, { useState } from "react";
import axios from "axios";

type Article = {
  title: string;
  description: string;
  url: string;
  fullText: string;
};

const NewsFetcher: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);

  const handleSearch = async () => {
    console.log("Submitting search:", query, urlInput);

    try {
      const response = await axios.get("/api/news", {
        params: { query },
      });

      let fetchedArticles: Article[] = response.data.articles; // FIXED

      if (urlInput.trim() !== "") {
        fetchedArticles = fetchedArticles.filter((article) =>
          article.url.toLowerCase().includes(urlInput.toLowerCase())
        );
      }

      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>News Summarizer</h1>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>Search Topic:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search topic"
          style={{ marginRight: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "37px" }}>URL:</label>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter article URL"
          style={{ marginRight: "10px" }}
        />
      </div>

      <button onClick={handleSearch}>Search</button>

      <div style={{ marginTop: "20px" }}>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <h3>{article.title}</h3>
              <p>
                <strong>Description:</strong> {article.description}
              </p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read full article
              </a>
              <p style={{ marginTop: "10px" }}>
                <strong>Full Text:</strong>
                <br /> {article.fullText}
              </p>
            </div>
          ))
        ) : (
          <p>No articles loaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default NewsFetcher;

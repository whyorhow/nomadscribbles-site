import React from "react";
import { useLocation, Link } from "react-router-dom";

// Expanded site content with more synonyms
const siteContent = [
  {
    title: "Home",
    path: "/home",
    description: "Explore shops, galleries, travel stories, and more.",
    keywords: ["shop", "gallery", "travel", "story", "home", "explore", "store", "exhibit", "adventure", "journey"]
  },
  {
    title: "Travel Blog",
    path: "/travel-blog",
    description: "Stories and experiences from our journeys.",
    keywords: ["blog", "journey", "story", "experience", "adventure", "travel", "trip", "diary", "memoir"]
  },
  {
    title: "Brazil",
    path: "/brazil",
    description: "Travel stories and info about Brazil.",
    keywords: ["Brazil", "travel", "culture", "cities", "adventure", "South America", "destinations", "tourism", "holiday"]
  },
  {
    title: "São Paulo",
    path: "/brazil/saopaulo",
    description: "Discover São Paulo city, parks, museums, and Carnival.",
    keywords: ["São Paulo", "SP", "city", "parks", "museums", "Carnival", "urban", "sights", "festival", "landmarks"]
  },
  {
    title: "Shop",
    path: "/shop",
    description: "Check out our products.",
    keywords: ["shop", "products", "store", "buy", "purchase", "items", "merchandise", "collection", "goods"]
  },
  {
    title: "Art Gallery",
    path: "/art-gallery",
    description: "Explore artwork and exhibitions.",
    keywords: ["art", "gallery", "exhibition", "painting", "sculpture", "display", "showcase", "artists", "collections"]
  },
  {
    title: "News",
    path: "/news",
    description: "Latest news and updates.",
    keywords: ["news", "update", "article", "story", "information", "bulletin", "announcement", "press"]
  },
  {
    title: "Contact Us",
    path: "/contact-us",
    description: "Get in touch with us.",
    keywords: ["contact", "email", "message", "reach", "inquiry", "support", "connect", "form", "questions"]
  },
];

// Function to highlight matched words
function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
  );
}

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q")?.toLowerCase() || "";

  // Filter results
  const results = siteContent.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.keywords.some(word => word.toLowerCase().includes(query))
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6">Search Results for "{query}"</h1>

      {results.length > 0 ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          {results.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="w-full bg-white rounded-md p-4 shadow hover:bg-gray-100 transition"
            >
              <h2 className="text-xl font-medium">{highlightMatch(item.title, query)}</h2>
              <p className="text-gray-700">{highlightMatch(item.description, query)}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-lg mb-4">No results found.</p>
      )}

      <Link
        to="/home"
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        ← Return Home
      </Link>
    </div>
  );
}

export default SearchResults;

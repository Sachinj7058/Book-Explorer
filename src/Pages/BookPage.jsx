import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";

const BookPage = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const observer = useRef();

  // Fetch books by category
  const fetchBooks = useCallback(async (url) => {
    try {
      const response = await axios.get(url);
      setBooks((prevBooks) => [...prevBooks, ...response.data.results]);
      setNextUrl(response.data.next);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  // Load the first set of books when component mounts
  useEffect(() => {
    fetchBooks(`http://skunkworks.ignitesol.com:8000/books?topic=${category}`);
  }, [category, fetchBooks]);

  // Set up infinite scroll with IntersectionObserver
  const lastBookElementRef = useRef();
  const lastBookRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          fetchBooks(nextUrl);
        }
      });
      if (node) observer.current.observe(node);
    },
    [nextUrl, fetchBooks]
  );

  // Handle search functionality
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto ">
      {/* Back Button and Category Title */}
      <div className="flex items-center mb-8 ">
        <svg
          className="w-6 h-6 mr-2 text-purple-600"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
        </svg>
        <h1 className="text-2xl font-semibold text-purple-600 capitalize">
          {category}
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          className="w-full p-3 pl-10 rounded-md bg-gray-100 text-gray-700 focus:outline-none"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <svg
          className="absolute left-3 top-3 text-gray-500"
          width="24"
          height="24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M10 2a8 8 0 015.887 13.484l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"></path>
        </svg>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredBooks.map((book, index) => {
          if (filteredBooks.length === index + 1) {
            return (
              <div
                ref={lastBookRef}
                key={book.id}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md p-4"
              >
                <BookCard book={book} />
                <h3 className="text-sm font-medium mt-2">{book.title}</h3>
                <p className="text-xs text-gray-500">{book.author}</p>
              </div>
            );
          } else {
            return (
              <div
                key={book.id}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md p-4"
              >
                <BookCard book={book} className="w-full h-full object-cover" />
                <h3 className="text-sm font-medium mt-2">{book.title}</h3>
                {/* <p className="text-xs text-gray-500">{book.author}</p> */}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default BookPage;

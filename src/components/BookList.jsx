import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const BookList = ({ category, searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const observer = useRef();

  // Fetch books from the API
  const fetchBooks = useCallback(async (url) => {
    try {
      const response = await axios.get(url);
      setBooks((prevBooks) => [...prevBooks, ...response.data.results]);
      setNextUrl(response.data.next); // Store next URL for infinite scroll
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  // Load books when the component mounts or category/search query changes
  useEffect(() => {
    let apiUrl = `http://skunkworks.ignitesol.com:8000/books?topic=${category}`;
    if (searchQuery) {
      apiUrl += `&search=${searchQuery}`;
    }
    setBooks([]); // Reset book list when category/search changes
    fetchBooks(apiUrl);
  }, [category, searchQuery, fetchBooks]);

  // Infinite scroll functionality
  const lastBookElementRef = useCallback(
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={book.id}>
              <BookCard book={book} />
            </div>
          );
        } else {
          return <BookCard book={book} key={book.id} />;
        }
      })}
    </div>
  );
};

export default BookList;

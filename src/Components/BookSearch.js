import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { Link } from "react-router-dom";

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [bookshelf, setBookshelf] = useState(
        JSON.parse(localStorage.getItem('bookshelf')) || []
    );


    useEffect(() => {
        if (query.length > 0) {
            fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
                .then(response => response.json())
                .then(data => setBooks(data.docs))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [query]);

    const addToBookShelf = (book) => {
        const isBookAlreadyAdded = bookshelf.some(savedBook => savedBook.key === book.key);
    
        if (!isBookAlreadyAdded) {
          const updatedBookshelf = [...bookshelf, book];
          setBookshelf(updatedBookshelf);
          localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
          setBooks(books.map(b => b.key === book.key ? { ...b, added: true } : b));
        } else {
          alert("This book is already in your bookshelf!");
        }
    };

    const removeFromBookShelf = (book) => {
        const updatedBookshelf = bookshelf.filter(savedBook => savedBook.key !== book.key);
        setBookshelf(updatedBookshelf);
        localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
        setBooks(books.map(b => b.key === book.key ? { ...b, added: false } : b));
    };

    return (
        <div>
            <Link to="/bookshelf" className="back-button">
                My Bookshelf
            </Link>
            <h1>Search by book name:</h1>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className='input-box'
            />
            <div className="book-list">
                {books.map((book,index)=> (
                    <BookCard
                        key={index}
                        book={book}
                        addToBookshelf={addToBookShelf}
                        removeFromBookshelf={removeFromBookShelf}
                        inBookshelf={bookshelf.some(savedBook => savedBook.key === book.key)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BookSearch;

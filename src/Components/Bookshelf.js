import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { useNavigate } from 'react-router-dom';

const MyBookshelf = () => {
    const [bookshelf, setBookshelf] = useState(
        JSON.parse(localStorage.getItem('bookshelf')) || []
    );
    const navigate = useNavigate();

    useEffect(() => {
        const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setBookshelf(storedBookshelf);
    }, []);

    const handleBackToSearch = () => {
        navigate('/');
    };

    const addToBookshelf = (book) => {
        const currentBookshelf = [...bookshelf];
        if (!currentBookshelf.find(b => b.title === book.title)) {
            currentBookshelf.push(book);
            setBookshelf(currentBookshelf);
            localStorage.setItem('bookshelf', JSON.stringify(currentBookshelf));
        }
    };

    const removeFromBookshelf = (book) => {
        const updatedBookshelf = bookshelf.filter(b => b.title !== book.title);
        setBookshelf(updatedBookshelf);
        localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    };

    return (
        <div>
            <button className="back-button" onClick={handleBackToSearch}>
                Back to Search
            </button>
            <h1>My Bookshelf</h1>
            <div className="book-list">
                {bookshelf.map((book, index) => (
                    <BookCard
                        key={index}
                        book={book}
                        addToBookshelf={addToBookshelf}
                        removeFromBookshelf={removeFromBookshelf}
                        inBookshelf={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyBookshelf;

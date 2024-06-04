
import React from 'react';
import { useLocation } from "react-router-dom";


const BookCard = ({ book, addToBookshelf, removeFromBookshelf, inBookshelf }) => {

    const location = useLocation();
   console.log(location.pathname,inBookshelf)
    return (

        <div className="book-card">
            <p>
                <strong>Book Title:</strong> <span className="book-title">{book.title}</span>
            </p>
            <p><strong>Edition Count:</strong> {book.edition_count}</p>
            {(location.pathname==="/" && !inBookshelf) && (
                <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
            ) }
               {(location.pathname==="/bookshelf" && inBookshelf) && (
                <button onClick={() => removeFromBookshelf(book)}>Remove from Bookshelf</button>
            ) }
          
        </div>
    );
};

export default BookCard;

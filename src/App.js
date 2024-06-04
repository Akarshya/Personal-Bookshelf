import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import BookSearch from './Components/BookSearch';
import Bookshelf from './Components/Bookshelf';
import './App.css';

function App() {


  return (
    <BrowserRouter>
    <div className="App">   
        <Routes>
            <Route path="/" exact element={<BookSearch />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
          </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

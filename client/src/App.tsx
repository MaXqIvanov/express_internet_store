import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { BasketPage } from './pages/BasketPage';
import { StorePage } from './pages/StorePage';
import { addProd, changeCheck, changeLoading } from './Redux/prodSlice';
import { Footer } from './templates/Footer';
import { Header } from './templates/Header';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/goods').then((response: any) => { 
      dispatch(addProd(response.data))
      }).then(()=> dispatch(changeLoading(false))
      );
  }, [])
  
  
  return (
    <div className="App">
      <Routes>
                <Route path="/" element={<div className='maid_div_page2'><Header /> <StorePage /> <Footer /></div>} />
                <Route path="/Basket" element={<div className='maid_div_page2'><Header /> <BasketPage /> <Footer /></div>} />
      </Routes>
    </div>
  );
}

export default App;

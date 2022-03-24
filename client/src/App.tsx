import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { BasketPage } from './pages/BasketPage';
import { StorePage } from './pages/StorePage';
import { addProd, changeCheck, changeLoading } from './Redux/prodSlice';
import { Footer } from './templates/Footer';
import { Header } from './templates/Header';

function App() {
  const limit:number = 4   // число зависит от количества элементов, которые мы отображаем на одной страничке 

  const dispatch = useDispatch()
  const [page,setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState(3)
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/goods'+`?page=${page}`).then((response: any) => { 
      dispatch(addProd(response.data.rows))
      setPageCount(Math.ceil(response.data.count/limit))
      }).then(()=> dispatch(changeLoading(false))
      );
  }, [page])
  
  
  return (
    <div className="App">
      <Routes>
                <Route path="/" element={<div className='maid_div_page2'><Header /> <StorePage pageCount={pageCount} page={page} setPage={setPage}/> <Footer /></div>} />
                <Route path="/Basket" element={<div className='maid_div_page2'><Header /> <BasketPage /> <Footer /></div>} />
      </Routes>
    </div>
  );
}

export default App;

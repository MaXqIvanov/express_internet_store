import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { OneProodsPage } from './components/OneProodsPage';
import { Auth } from './pages/Auth';
import { BasketPage } from './pages/BasketPage';
import { ConfidencePage } from './pages/ConfidencePage';
import { StorePage } from './pages/StorePage';
import { addProd, changeLoading } from './Redux/prodSlice';
import { Footer } from './templates/Footer';
import { Header } from './templates/Header';


function App() {

  
  const limit:number = 4   // число зависит от количества элементов, которые мы отображаем на одной страничке 

  const dispatch = useDispatch()
  const [page,setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState(3)
  const [typeGoods, setTypeGoods] = useState("goods")
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/${typeGoods}`+`?page=${page}`).then((response: any) => { 
      dispatch(addProd(response.data.rows))
      setPageCount(Math.ceil(response.data.count/limit))
      }).then(()=> dispatch(changeLoading(false))
      );
  }, [page])
  // useEffect(() => {
  //   axios.get('https://store.web-liter.ru/api/products'+`?page=${page}`).then((response: any) => { 
  
      
  //     dispatch(addProd(response.data.data))
  //     setPageCount(Math.ceil(response.data.total/limit))
  //     }).then(()=> dispatch(changeLoading(false))
  //     );
  // }, [page])
  
  const index = useSelector((state:any) => state.oneProd.index)
  
  return (
    <div className="App">
      <Routes>
                <Route path="/" element={<div className='maid_div_page2'><Header /> <StorePage pageCount={pageCount} page={page} setPage={setPage}/> <Footer /></div>} />
                <Route path="/basket" element={<div className='maid_div_page2'><Header /> <BasketPage /> <Footer /></div>} />
                <Route path="/confidentiality" element={<div className='maid_div_page2'><Header /><ConfidencePage /></div>} />
                <Route path="/auth" element={<div className='maid_div_page2'><Auth /></div>} />
                <Route path="/:id/" element={<div className='maid_div_page2'><Header /><OneProodsPage index={index}/> <Footer /></div>} />
               
      </Routes>
    </div>
  );
}

export default App;

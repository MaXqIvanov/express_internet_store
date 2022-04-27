import React, { Suspense, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes} from 'react-router-dom';
import { apiGetGoods } from './api/api';
import './App.scss';
import { OneProodsPage } from './components/OneProodsPage';
import { Auth } from './pages/Auth/Auth';
import { BasketPage } from './pages/BasketPage';
import { ConfidencePage } from './pages/ConfidencePage';
import { Contacts } from './pages/Contacts';
import { StorePage } from './pages/StorePage';
import { Footer } from './templates/Footer';
import { Header } from './templates/Header';
import ReCAPTCHA from "react-google-recaptcha"
const Train = React.lazy(()=> import('./pages/Train'))
const AdminPage = React.lazy(()=>import('./pages/adminPanel/AdminPage'))
const Questions = React.lazy(()=> import('./pages/question/Questions'))

function App() {
  const recaptchaRef:any = React.useRef();
  const limit:number = 6   // число зависит от количества элементов, которые мы отображаем на одной страничке
  const searchString = new URLSearchParams(window.location.search);
  let truePage:any = searchString.get('page');
  if(truePage==null){
    truePage = 1
  }
  let trueTypeGoods = searchString.get('type');
  if(trueTypeGoods==null){
    trueTypeGoods = "phone"
  }
  let trueSort:any = searchString.get('sort');
  if(trueSort == "true"){
    trueSort = true
  }else trueSort = false
  
  

  const dispatch = useDispatch()
  const [page,setPage] = useState<number>(truePage)
  const [pageCount, setPageCount] = useState<number>(3)
  const [typeGoods, setTypeGoods] = useState<string>(trueTypeGoods)
  const [sortPrice, setSortPrice] = useState<boolean>(trueSort)
  const [name,setName] = useState<string>("")
 
  useEffect(() => {
    apiGetGoods(typeGoods,page,sortPrice,limit,setPageCount,dispatch,name)
  }, [page, typeGoods, sortPrice, name])


  const index = useSelector((state:any) => state.oneProd.index)
 



  return (
    <div className="App">
      <Routes>
                <Route path="/" element={<div className='maid_div_page2'><Header setPage={setPage} setName={setName}  setTypeGoods={setTypeGoods}/> <StorePage setSort={{setSortPrice:setSortPrice, sortPrice:sortPrice}} sortPrice={sortPrice} typeGoods={typeGoods} pageCount={pageCount} page={page} setPage={setPage} setName={setName}/> <Footer /></div>} />
                <Route path="/basket" element={<div className='maid_div_page2'><Header setPage={setPage} setName={setName}  setTypeGoods={setTypeGoods}/> <BasketPage /> <Footer /></div>} />
                <Route path="/confidentiality" element={<div className='maid_div_page2'><Header setPage={setPage} setName={setName}  setTypeGoods={setTypeGoods}/><ConfidencePage /></div>} />
                <Route path="/auth" element={<div className='maid_div_page2'><Auth /></div>} />
                <Route path="/:id/" element={<div className='maid_div_page2'><Header setPage={setPage} setTypeGoods={setTypeGoods}/><OneProodsPage index={index}/> <Footer /></div>} />
                <Route path="/train" element={<Suspense fallback={<Spinner animation="grow" />}><div className='maid_div_page2'><Train /></div></Suspense>} />
                <Route path="/admin" element={<Suspense fallback={<Spinner animation="grow" />}><div className='maid_div_page2'><AdminPage /></div></Suspense>} />
                <Route path="/contacts" element={<Suspense fallback={<Spinner className="Spinner_contacts" animation="grow" />}><div className='maid_div_page2'><Header setPage={setPage} setName={setName}  setTypeGoods={setTypeGoods}/><Contacts /></div></Suspense>} />
                <Route path="/errors" element={<Suspense fallback={<Spinner animation="grow" />}><div className='maid_div_page2'><Header setPage={setPage} setName={setName}  setTypeGoods={setTypeGoods}/><Questions recaptchaRef={recaptchaRef}/></div></Suspense>} />

      </Routes>

      <ReCAPTCHA hidden className="ReCAPTCHA"
            ref={recaptchaRef}
            sitekey="6LeGQ4IfAAAAAK9dGcts02qUCW4pbljK0rS_aLHH"
            // onChange={onChange}
            theme="dark"
            size='invisible'   
          />
    </div>
  );
}

export default App;

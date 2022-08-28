import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'
import Home from './Containers/Home/Home'
import Login from './Containers/User/Login/Login'
import Register from './Containers/User/Register/Register';
import Consult from './Containers/Consult/Consult';
import Reserve from './Containers/Reserve/Reserve';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path= '/' element= {<Home/>}/>
      <Route path= '/login' element= {<Login/>}/>
      <Route path= '/register' element= {<Register/>}/>
      <Route path= '/consult' element= {<Consult/>}/>
      <Route path= '/reserve' element= {<Reserve/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;

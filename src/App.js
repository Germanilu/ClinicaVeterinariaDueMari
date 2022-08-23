import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Containers/Home/Home'
import Login from './Containers/User/Login/Login'

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path= '/' element= {<Home/>}/>
      <Route path= '/login' element= {<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

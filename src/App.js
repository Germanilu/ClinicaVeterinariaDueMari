import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'
import Home from './Containers/Home/Home'
import Login from './Containers/User/Login/Login'
import Register from './Containers/User/Register/Register';
import Consult from './Containers/Consult/Consult';
import Reserve from './Containers/Reserve/Reserve';
import RegisterPet from './Containers/RegisterPet/RegisterPet';
import Profile from './Containers/User/Profile/MyProfile/MyProfile';
import MyReserve from './Containers/User/Profile/MyReserve/MyReserve';
import MyConsult from './Containers/User/Profile/MyConsult/MyConsult';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path= '/' element= {<Home/>}/>
      <Route path= '/login' element= {<Login/>}/>
      <Route path= '/register' element= {<Register/>}/>
      <Route path= '/myProfile' element= {<Profile/>}/>
      <Route path= '/myReserve' element= {<MyReserve/>}/>
      <Route path= '/myConsult' element= {<MyConsult/>}/>
      <Route path= '/consult' element= {<Consult/>}/>
      <Route path= '/reserve' element= {<Reserve/>}/>
      <Route path= '/registerPet' element= {<RegisterPet/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;

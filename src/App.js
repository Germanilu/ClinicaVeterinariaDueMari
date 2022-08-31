import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'
import Home from './Containers/Home/Home'
import Login from './Containers/User/Login/Login'
import Register from './Containers/User/Register/Register';
import UserConsult from './Containers/Consult/UserConsult/UserConsult';
import VetConsult from './Containers/Consult/VetConsult/VetConsult'
import UserReserve from './Containers/Reserve/UserReserve/UserReserve';
import VetReserve from './Containers/Reserve/VetReserve/VetReserve'
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
      <Route path= '/consult' element= {<UserConsult/>}/>
      <Route path= '/reserve' element= {<UserReserve/>}/>
      <Route path= '/registerPet' element= {<RegisterPet/>}/>
      <Route path= '/vetConsult' element= {<VetConsult/>}/>
      <Route path= '/vetReserve' element= {<VetReserve/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;

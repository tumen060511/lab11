import logo from './logo.svg';
import './App.css';
import {Routes,Route,Router} from 'react-router-dom'
import AllCountries from './components/AllCountries/AllCountries';
import { useEffect } from 'react';
import Home from './components/Home/Home';
import AddCountry from './components/AddCountry/AddCountry';
import Countrylist from './components/Countrylist/Countrylist';
import EditCountry from './components/EditCountry/EditCountry';
import Header from './components/Header/Header';
import CountryInfo from './components/CountryInfo/CountryInfo';
import AddCountryInfo from './components/AddCountryInfo/AddCountryInfo';
function App() {

  
  return (
  <>
  <div className = "header">
      <div className="container">
        <h5>Лаборатори 11: Дэлхийн улсууд.</h5>
    </div> 
    
  </div>
  <div className="container">
    <Header></Header>
    <Routes>
      
      <Route path='/' element={<AllCountries/>} />
          <Route exact path="/" element={<Countrylist/>}/>
          <Route exact path="/AddCountry" element={<AddCountry/>}/>
          <Route exact path="/AddCountrylist" element={<Countrylist/>}/> 
          <Route path="editcountry/:id/edit" element={<EditCountry />} />
          <Route exact path="/countryinfo" element={<AddCountryInfo />} />
      <Route path='/country/:countryName' element={<CountryInfo/>} />
    </Routes>
  </div>
  
  </>
  );
}

export default App;

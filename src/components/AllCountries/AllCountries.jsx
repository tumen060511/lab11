import React, { useState, useEffect } from "react";
import { apiURL } from "../util/api";
import SearchInput from "../Search/SearchInput";
import FilterCountry from "../FilterCountry/FilterCountry";
import { Link } from "react-router-dom";
import axios from "axios";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, SetError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      const selectedCountries = data.slice(
        (currentPage - 1) * countriesPerPage,
        currentPage * countriesPerPage
      );
      setCountries(selectedCountries);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      SetError(error.message);
    }
  };


  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);
      if (!res.ok) throw new Error("Та улсынхаа нэрийг шалгаад дахин хайна уу?");
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      SetError(error.message);
    }
  };

    /*lab12 REACTJS+LARAVEL*/
    
    const handleAddCountry = async () => {
      try {
        const response = await axios.post(`${apiURL}/countries`, {
          name: "Шинэ улс",
          capital: "Шинэ хот",
          population: 1000000,
          region: "Asia",
          subregion: "Eastern Asia",
          area: 1564110,
          // Бусад шаардлагатай мэдээлэл оруулах
        });
  
        if (response.status !== 200) {
          throw new Error("Шинэ улс нэмэхэд алдаа гарлаа.");
        }
  
        console.log("Шинэ улс амжилттай нэмэгдлээ.");
        getAllCountries();
      } catch (error) {
        console.error("Алдаа гарлаа:", error.message);
      }
    };
  
    const handleUpdateCountry = async (id) => {
      try {
        const response = await axios.put(`${apiURL}/countries/${id}`, {
          name: "Шинэ нийтлэг нэр",
          capital: "Шинэ улаанбаатар",
          population: 1500000,
          region: "New Asia",
          subregion: "New Eastern Asia",
          area: 2000000,
          // Бусад шаардлагатай мэдээлэл оруулах
        });
  
        if (response.status !== 200) {
          throw new Error("Улсын мэдээллийг засахад алдаа гарлаа.");
        }
  
        console.log("Улсыг засав:", response.data);
        getAllCountries();
      } catch (error) {
        console.error("Алдаа гарлаа:", error.message);
      }
    };
  
    const handleDeleteCountry = async (id) => {
      try {
        const response = await axios.delete(`${apiURL}/countries/${id}`);
  
        if (response.status !== 200) {
          throw new Error("Улсын мэдээллийг устгахад алдаа гарлаа.");
        }
  
        console.log("Улсыг устгасан.");
        getAllCountries();
      } catch (error) {
        console.error("Алдаа гарлаа:", error.message);
      }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);
      if (!res.ok) throw new Error("Амжилтгүй...");
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      SetError(error.message);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };
  var url = 'https://restcountries.com/v3.1/all';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.onload = function() {
      if (xhr.status === 200) {
          // success
          console.log(JSON.parse(xhr.responseText));
      } else {
          // error
          console.log(JSON.parse(xhr.responseText));
      }
  };
  
  xhr.send();






  useEffect(() => {
    getAllCountries();
  }, [currentPage]);

  return (
   
   

    <div className="all_country_wrapper">
      <div className="country_top">
        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>
        <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
        
      </div>

      <div className="country_bottom">
        {isLoading && !error && <h4>Loading......</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries?.map((country) => (
          <Link to={`/country/${country.name.common}`} key={country.cca3}>
            <div className="country_card">
              <div className="country_img">
                <img src={country.flags.png} alt="" />
              </div>

              <div className="country_data">
                <h3>{country.name.common}</h3>
                <h6>{country.population} хүн амтай.</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="page">
      <span>Хуудас {currentPage}</span>
      </div>
      <div className="container d-flex justify-content-between">
        <button type="button" className="btn_prev" onClick={handlePrevClick}>&larr; Өмнөх</button>
        <button type="button" className="btn_next" onClick={handleNextClick}>Дараах &rarr;</button>
      </div>
    </div>
  );
};

export default AllCountries;
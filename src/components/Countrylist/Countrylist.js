import React, { useState, useEffect } from "react";
import { apiURL } from "../util/api";
import SearchInput from "../Search/SearchInput";
import FilterCountry from "../FilterCountry/FilterCountry";
import { Link } from "react-router-dom";
import axios from "axios";
import '../pages/list.css';
function Countrylist()
{ 
    const[cntries, setCountry]= useState([]);
    
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
     
    useEffect( ()=>{
        const getCountry= ()=>{
            fetch("http://127.0.0.1:8000/api/cntry")
            .then(res=>{ return res.json()})
            .then(response=>{ 
                console.log(response.cntries)
                setCountry(response.cntries)
            })
            .catch(error=>{ console.log(error)});
        }
        getCountry();
    },[]);
  
   
    const deleteCountry = (id) => {
        axios.delete('http://127.0.0.1:8000/api/cntrydelete/'+id).then(function(response){
            console.log(response.data);
            alert("Successfully Deleted");
        });
    }
    const handlePrevClick = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
      };
    const actions = () => {
        <Link to={`/countryinfo `}></Link>
    }
     
    return(
        
        <React.Fragment>
            <div className="container container_overflow">
                <div className="row">
                    <div className="col-12">
                        <p className="text-danger"> </p>                
                                <div>
                                <h3>Улсуудын жагсаалт</h3>
                            <div className="all_country_wrapper"></div>
                                <div className="country_bottom"></div>
                                <div className="country_bottom">
                                    {
                                        cntries?.map((pdata, index)=>(
                                            
                                            <div key={index}>
                                                
                                                <div className="country_card">
                                              <div className="country_img">
                                                <img src={`http://127.0.0.1:8000/storage/${pdata.image}`} alt="" onClick={actions} />
                                              </div>
                                              
                                              <p>{pdata.name }</p>
                                              
                                              <div className="country_data">
                                                    <Link to={`/countryinfo`} className="btn btn-success mx-2" onClick={actions}>Дэлгэрэнгүй</Link>
                                                    {/* <Link to={`/editcountry/${pdata.id}/edit`} className="btn btn-success mx-2">Edit</Link>                                                     */}
                                                    {/* <button onClick={() => deleteCountry(pdata.id)} className="btn btn-danger">Delete</button> */}
                                                    
                                                </div>
                                            
                                            </div>
                                            </div>
                                        ))
                                    }
                                </div> 
                            </div>
                            </div>
                </div>
            </div>
            <div className="container d-flex justify-content-between">
        <button type="button" className="btn_prev" onClick={handlePrevClick}>&larr; Өмнөх</button>
        <button type="button" className="btn_next" onClick={handleNextClick}>Дараах &rarr;</button>
      </div>
        </React.Fragment>
    );
}
export default Countrylist;
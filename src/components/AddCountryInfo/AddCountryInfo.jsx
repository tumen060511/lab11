
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { apiURL } from '../util/api';
import { Link } from 'react-router-dom';
import axios from 'axios';
import info from '../pages/info.css';
const CountryInfo = () => {
    const[cntries, setCountry]= useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
     const getCountry= ()=>{
              fetch("http://127.0.0.1:8000/api/cntry")
              .then(res=>{ return res.json()})
              .then(response=>{ 
                  console.log(response.cntries)
                  setCountry(response.cntries)
              })
              .catch(error=>{ console.log(error)});
          }
    const deleteCountry = (id) => {
        axios.delete('http://127.0.0.1:8000/api/cntrydelete/'+id).then(function(response){
        console.log(response.data);
        alert("Successfully Deleted");
            });
        }   
      useEffect( ()=>{
        
         
          getCountry();
      },[]);
    
     
      
        return <div className="country_info_wrapper">
        
        {
                                        cntries?.map((pdata, index)=>(
                                            
                                            <div key={index}>   
                                                <div className='country_info-img'>                               
                                                <img src={`http://127.0.0.1:8000/storage/${pdata.image}`} alt=""/>
                                                </div>  
                                              
                                              <div className="info">
                                              <p>{pdata.name }</p>
                                              
                                                    
                                                    <h6>Нийслэл: {pdata.capital } </h6>
                                                    <h6>{pdata.population } хүн амтай.</h6>
                                                    <Link to={`/editcountry/${pdata.id}/edit`} className="btn btn-success mx-2">Edit</Link>
                                                    <button onClick={() => deleteCountry(pdata.id)} className="btn btn-danger">Delete</button>
                                              </div>      
                                             </div>
                                        ))
                                    }
            
        
    </div>
}
export default CountryInfo;


import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { apiURL } from '../util/api';
import { Link } from 'react-router-dom';
const CountryInfo = () => {
    const [country, setCountry] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, SetError] = useState('')
    const {countryName} = useParams()
    
        useEffect(()=>{
        const getCountryByName = async()=>{
            try {
                const res = await fetch(`${apiURL}/name/${countryName}`)
                if(!res.ok) throw new Error('Олж чадсангүй!.')
                const data = await res.json()
            setCountry(data)
            setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                SetError(error.message)
            }
        };
        getCountryByName();
    },[countryName])
    
    const handleMapClick = async () => {
    try {
        if (country.length > 0) {
            const countryCode = country[0].alpha2Code; // Улсын код авах
            
            const googleMapsURL = `https://www.google.com/maps/place/${countryName}`;
            window.open(googleMapsURL, countryCode); 
        } else {
            console.error('Улс олдсонгүй.');
        }
    } catch (error) {
        console.error('Google Maps холбоос олдсонгүй.', error);
    }
};


    return <div className="country_info_wrapper">
        <button>
            <Link to = '/'> Back </Link>
        </button>
        
        
            {
                country?.map((country,index)=>(
                    <div className="country_info_container" key={index}>
                        <div className="country_info-img">
                            <img src={country.flags.png} alt = ""/>
                        </div>
                        <div className="country_info">
                            <h3>{country.name.common}</h3>
                            <img className="map" src="https://www.merrimackvalleyglass.com/wp-content/uploads/2020/07/1200px-Google_Maps_icon_2020.svg_-600x861.png" onClick={handleMapClick}/>
                            <div className="country_info-left">
                                <h5>Хүн ам: <span>{country.population}</span></h5>
                                
                                <h5>Нийслэл: <span>{country.capital}</span></h5>
                                
                            </div>
                        </div>
                        </div>
                ))
                
            }
            
        
    </div>
}
export default CountryInfo;

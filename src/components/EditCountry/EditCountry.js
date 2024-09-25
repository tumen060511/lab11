import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
 
function EditCountry()
{
    const navigate = useNavigate();
    const {id}=   useParams();
    const [message, setMessage]= useState('');
    const [inputs, setInputs] = useState([]);
    const [fileimage, setPhoto]= useState('');
     
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
     
    
    
    const uploadcntries= async()=>{
        const formData= new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', inputs.name);
        formData.append('capital',inputs.capital);
        formData.append('population',inputs.population);
        formData.append('image', fileimage);
        const response= await axios.post("http://127.0.0.1:8000/api/cntryupdate/"+id, formData, {
            headers:{'Content-Type':"multipart/form-data"},
        } );
        setMessage(response.data.message); 
        console.log(response)
        setTimeout(()=>{
            navigate('/AddCountrylist');
        }, 2000);
    }
 
    const handleSubmit= async(e)=>{
      e.preventDefault();
      await uploadcntries();
 
   }
    
    useEffect(() => {
        const getInput= ()=>{
            fetch("http://127.0.0.1:8000/api/cntry/"+id)
            .then(res=>{ return res.json()})
            .then(response=>{ 
                console.log(response.cntries)
                setInputs(response.cntries)
            })
            .catch(error=>{ console.log(error)});
        }
        getInput();
    }, []);
   
    function getcntries() {
        axios.get('http://127.0.0.1:8000/api/cntry/'+id).then(function(response) {
            console.log(response);
            setInputs(response.data.cntries);
        });
    }
    return(
    <React.Fragment>
        <div className="container">
            <div className="row">
              <div className="col-md-8 mt-4">
                <h5>Edit Country</h5> 
                <p className="text-success"><b>{ message }</b></p>                              
                 
                    <form onSubmit={ handleSubmit}>             
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Country Name </label>
                    <div className="col-sm-9">
                    <input type="text" value="Christmas Island" className="form-control" name="name" onChange={handleChange} />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Captital </label>
                    <div className="col-sm-9">
                        <input type="text" value="Flying Fish Cove"className="form-control" name="capital" onChange={ handleChange} />
                    </div>
                    </div>

                    <div className="mb-3 row">
                    <label  className="col-sm-3">Population </label>
                    <div className="col-sm-9">
                        <input type="text" value="2072" className="form-control" name="population" onChange={ handleChange} />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Country Image</label>
                    <div className="col-sm-9">
                    <img src="D:\christmas island.jpeg" alt="" height={300} width={300} />
                        <input type="file" className="form-control" onChange={(e)=>setPhoto(e.target.files[0])} />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label className="col-sm-3"></label>
                    <div className="col-sm-9">
                    <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                    </div>
 
                    </form>
 
             </div>
            </div>
        </div>
    </React.Fragment>
    );
}
export default EditCountry;
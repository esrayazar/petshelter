import React,{ useEffect, useState }from "react";
import axios from "axios";
import {Link, navigate } from "@reach/router";


const OnePet =(props)=>{
    const{id} =props;
    const [errors, setErrors]= useState("")
    const[pet, setPet] = useState({});
  

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/petshelter/${id}`)
    .then((res)=>{
        console.log(res.data);
        setPet(res.data);

    })
    .catch((err)=>{
        console.log(err);
    })
    },[id])
    const adoptFilter = (idFromBelow) =>{
        axios.delete(`http://localhost:8000/api/petshelter/${idFromBelow}`)
        .then((res)=>{
            console.log(res.data);
            navigate("/")
           
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return(
        <div className="container d-flex justify-content-center">
            <div className= "row w-50 d-flex justify-content-center" > 
            <h2>Incredible Pets</h2>
            <Link to={`/`}>
                Home
            </Link>
            <h4 className="p-3 mb-2 text-purple">Pet View:</h4>
            <div className="border border-dark ">
                <label className="m-3">Name: </label>
                <strong>{pet.name}</strong> <br/>
                <label className="m-3">Type: </label>
                <strong>{pet.type}</strong> <br/>
                <label className="m-3">Description: </label>
                <strong>{pet.description}</strong> <br/>
                <label className="m-3">Skills: </label>
                
                    {pet.skills
                    ? pet.skills.map((skill, index)=>(
                     <span className="badge badge-pill badge-primary" key={index}>
                         {skill} </span>
                     ))
                    :null } 
                <button className=" m-2 btn-sm fw-bold"
                            onClick={()=> adoptFilter(pet._id)}>
                            Adopt
                        </button>
                <a className="btn btn-primary m-2" onClick={()=>{setPet("");navigate("/")}}>Back</a>
                <br/>
                </div>
            </div>

        </div>
    )
}


      
            

    
export default OnePet;


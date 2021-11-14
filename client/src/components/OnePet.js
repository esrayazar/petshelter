import React,{ useEffect, useState }from "react";
import axios from "axios";
import {Link, navigate } from "@reach/router";


const OnePet =(props)=>{
    const{id} =props;
    const [errors, setErrors]= useState("")
    const[pet, setPet] = useState({});
    const[likeFlag, setLikeFlag] = useState(true);
    const[like, setLike] =useState(Number);
  

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
    const updateLike=(id)=>{
        pet.like = 1;
        setLikeFlag(false);
        axios.put(`http://localhost:8000/api/petshelter/${id}`,
        {
          pet
        })
        .then((res)=>{
            console.log(res);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log("edit error: ",err);
            console.log("message: ", err.response.data.errors )
            setErrors(err.response.data.errors);
        })
    }
    
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
        <div className="container w-50">
            <div className= "row d-flex justify-content-center" > 
            <div className="col"><h2>Pet Shelter</h2></div>
            <div className="col d-flex align-items-center"><Link to={`/`}>
                back to home
            </Link></div>
            </div>
            <div className= "row" > 
            <div className="col"><h4 className="p-3 mb-2">Details about: {pet.name}</h4></div>
            <div className="col d-flex align-items-center ">
            <button className="  btn-sm fw-bold btn-danger m-3 mybuttons"
                            onClick={()=> adoptFilter(pet._id)}>
                            Adopt {pet.name}
                        </button>
            </div>
            </div>

            <div className= "row d-flex justify-content-center" > 
            
            
            
            <div className="border border-dark border-4 ">
                <label className="m-3">Name: </label>
                <strong>{pet.name}</strong> <br/>
                <label className="m-3">Type: </label>
                <strong>{pet.type}</strong> <br/>
                <label className="m-3">Description: </label>
                <strong>{pet.description}</strong> <br/>
                <label className="m-3">Skills: </label> <br/>
                {pet.skill1 ? <p> {pet.skill1}</p>:null} 
                {pet.skill2 ? <p> {pet.skill2}</p>:null}
                {pet.skill3 ? <p> {pet.skill3}</p>:null}
                    <div className="row mx-5">
                        <div className="col">
                    <button className="btn btn-success m-4 mybuttons " 
                    onClick={()=> updateLike(pet._id)}
                    disabled={!likeFlag}>Like {pet.name}</button>
                    </div>
                    <div className="col d-flex align-items-center m-3">
                    {pet.like ? <span> {pet.like} like(s)</span>:<span>0 like(s) </span>} 
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


    
export default OnePet;


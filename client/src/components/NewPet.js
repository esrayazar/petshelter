import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link,navigate } from "@reach/router";

const NewPet = (props)=>{

    const [errors, setErrors] = useState({});
    const [pet, setPet] = useState("");
    const [type, setType] =useState("");
    const [description, setDescription] = useState("")
    const [name, setName] =useState("")
    const [skill, setSkill] =useState("")

    const submitHandler =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/petshelter",
        {
             name,
             type,
             description,
             skill
        })
        .then((res)=>{
            console.log("posting: ",res);
            console.log(res.data);
            setPet([...pet, res.data.pet]);
            setPet("");
            navigate("/")
            
        })
        .catch((err)=>{
            console.log(err);
            setErrors(err.response.data.errors);
        })
    }
    return(
        <div className="container d-flex justify-content-center">
            <div className= "row w-50 d-flex justify-content-center" > 
            <h2>Incredible Pets</h2>
            <Link to={`/`}>
                Home
            </Link>
            <h4 className="p-3 mb-2 text-purple">Add a new pet:</h4>
            <form onSubmit={submitHandler}>

            {/* {
                author.length>0&& author.length<3?
                <span className="text-danger">An author name must be at least 3 characters long</span>
                :null
            } */}

                <div className="border border-dark ">
                <label className="m-3">Name</label>
                <input onChange={(e)=>setName(e.target.value)} name="name" type="text" value={name}/> <br/>
                <label className="m-3">Type : </label>
                <input onChange={(e)=>setType(e.target.value)} name="type" type="text" value={type}/> <br/>
                <label className="m-3">Description : </label>
                <input onChange={(e)=>setDescription(e.target.value)} name="description" type="text" value={description}/> <br/>
                <label className="m-3">Skill</label>
                <input onChange={(e)=>setSkill(e.target.value)} name="skill" type="text" value={skill}/> <br/>
                <input className="btn btn-primary m-2" type= "submit"/> 
                <a className="btn btn-primary m-2" onClick={()=>{setPet("");navigate("/")}}>Cancel</a>
                <br/>
                {
                     errors.pet ?
                     <span className="text-danger">{errors.pet.message}</span>
                     :null
                }
                {
                    
                    errors.name ?
                    <span className="text-danger">{errors.name.message}</span>
                    :null
                }
                </div>
            </form>
            </div>

        </div>
    )
}

export default NewPet
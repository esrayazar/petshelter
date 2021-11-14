import React, { useState, useEffect } from "react"
import axios from "axios"
import { navigate } from "@reach/router"
import { Link } from "@reach/router"

const EditPet = (props)=>{

    const [errors, setErrors] = useState({});
    const {id} = props;
    const[name,setName] =useState("");
    const[type,setType] = useState("");
    const[description, setDescription] = useState("")
    //const[skill,setSkill] = useState([])
    const[skill1,setSkill1] = useState("");
    const[skill2,setSkill2] = useState("");
    const[skill3,setSkill3] = useState("");
    useEffect(()=> {
        axios
        .get(`http://localhost:8000/api/petshelter/${id}`)
        .then((res)=>{
            console.log("incoming pet: ",res.data);
            setName(res.data.name);
            setType(res.data.type);
            setDescription(res.data.description);
            setSkill1(res.data.skill1);
            setSkill2(res.data.skill2);
            setSkill3(res.data.skill3);
            
        })
        .catch((err)=>{
            console.log(err);
        });
    },[id]);
    const submitHandler=(e)=>{
        e.preventDefault();
     
        axios.put(`http://localhost:8000/api/petshelter/${id}`,
        {
            name,
            type,
            description,
            skill1,
            skill2,
            skill3
        })
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch((err)=>{
            console.log("edit error: ",err);
            console.log("message: ", err.response.data.errors )
            setErrors(err.response.data.errors);
        })
    }

    return(
        <div className="container w-50">
            <div className= "row d-flex justify-content-center" >
                <div className="col"> 
                <h2>Pet Shelter</h2>
                </div>
                <div className="col d-flex align-items-center m-3">
                <Link to={`/`} className="text-decoration-underline"> 
                    back to home
                </Link>
                </div>
            </div>
            <div className= "row" >
                <div className="col"> 
                <h4 className="p-3 mb-2">Edit {name}</h4>
                </div>
                <div className="col"></div>
            </div>
            
            <form onSubmit={submitHandler}>
            <div className= "row border border-dark border-4" > 
                <div className= "col ">
                <label className="m-3">Pet Name: </label> <br/>
                <input onChange={(e)=>setName(e.target.value)} name="name" type="text" value={name}/> <br/>
                <label className="m-3">Pet Type : </label><br/>
                <input onChange={(e)=>setType(e.target.value)} name="type" type="text" value={type}/> <br/>
                <label className="m-3">Pet Description : </label><br/>
                <input onChange={(e)=>setDescription(e.target.value)} name="description" type="text" value={description}/> <br/>
                <br/>
                <button className="btn btn-primary btn-lg m-4 p-3 mybuttons">Edit pet</button>
                </div>
                <div className = "col">
                <label className="m-3">Skills (optional)</label> <br/>
                <label className="m-3">Skill 1</label>
                <input onChange={(e)=>setSkill1(e.target.value)} name="skill1:" type="text" value={skill1}/> <br/>
                <label className="m-3">Skill 2</label>
                <input onChange={(e)=>setSkill2(e.target.value)} name="skill2" type="text" value={skill2}/> <br/>
                <label className="m-3">Skill 3</label>
                <input onChange={(e)=>setSkill3(e.target.value)} name="skill3" type="text" value={skill3}/> <br/>
                </div>
                
               
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
                { 
                    errors.type ?
                    <span className="text-danger">{errors.type.message}</span>
                    :null
                }
                {
                    errors.description ?
                    <span className="text-danger">{errors.description.message}</span>
                    :null
                }
            </div>
            </form>
            

        </div>
    )
}

export default EditPet
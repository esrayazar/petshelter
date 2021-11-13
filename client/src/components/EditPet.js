import React, { useState, useEffect } from "react"
import axios from "axios"
import { navigate } from "@reach/router"
import { Link } from "@reach/router"

const EditPet = (props)=>{

    const [errors, setErrors] = useState({});
    const {id} = props;
    // const [pet, setPet] = useState("")
    const[name,setName] =useState("");
    const[type,setType] = useState("");
    const[description, setDescription] = useState("")
    //const[skill,setSkill] = useState([])
    const[skills,setSkills] = useState([])
    useEffect(()=> {
        axios
        .get(`http://localhost:8000/api/petshelter/${id}`)
        .then((res)=>{
            console.log("incoming pet: ",res.data);
            setName(res.data.name);
            setType(res.data.type);
            setDescription(res.data.description);
            setSkills(res.data.skills)
            
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
            skills
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

const setPetSkill =(val, ind)=>{
    let updatedPetSkills = [];
    let removeEmpty = false;
    if (val.length == 0) removeEmpty = true;

    let counter = 0;
    skills.forEach(element => {
        if(removeEmpty && (ind == counter)) {
            console.log("empty skill should be removed");
        } else {
            updatedPetSkills.push(element);
        }
        
        counter++;
    });
    if(!removeEmpty) updatedPetSkills[ind] = val;
    setSkills(updatedPetSkills);
}

    return(
        <div className="container d-flex justify-content-center">  
            <div className= "row w-50 d-flex float-left" > 
            <h2 className = "text-start">Incredible friends</h2>
            <Link to={`/`}>
                Home
            </Link>
            <h4 className="p-3 mb-2 text-purple text-start">Edit this pet</h4>
            <form onSubmit={submitHandler}>

            {/* // Front end validation

            {                
            pet.length<3?
            <span className="text-danger">A pet name must be at least 3 characters long</span>
            :null

            } */}
                <div className="border border-dark">
                <label className="m-3">Name</label>
                <input onChange={(e)=>setName(e.target.value)} name="name" type="text" value={name}/> <br/>
                <label className="m-3">Type</label>
                <input onChange={(e)=>setType(e.target.value)} name="type" type="text" value={type}/> <br/>
                <label className="m-3">Description</label>
                <input onChange={(e)=>setDescription(e.target.value)} name="description" type="text" value={description}/> <br/>
                <label className="m-3">Skill</label>
                {skills
                    ? skills.map((skill, index)=>(
                        <input key={index} onChange={(e)=>setPetSkill(e.target.value, index)} name="skill" type="text" value={skill}/>
                     ))
                    :null }
                <input  className="btn btn-primary m-2" type= "submit"/>
                <button  className="btn btn-primary m-2" onClick={()=>navigate("/")}>Cancel</button>
                <br/>

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

export default EditPet
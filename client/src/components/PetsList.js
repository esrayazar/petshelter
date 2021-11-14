import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link } from "@reach/router";


const PetsList = (props)=>{

    const [petsList, setPetsList] = useState([]);

    useEffect(() =>{
        axios
        .get("http://localhost:8000/api/petshelter")
        .then((res)=>{
            console.log(res.data);
            setPetsList(res.data);
        })
        .catch((err)=> console.log(err));


    }, []);

    return(
        <div className="container w-50">
            <div className = "row">
                <div className="col">
                    <h1>Pet Shelter</h1>
                </div>
                <div className="col d-flex align-items-center m-3">
                <Link to={`/petshelter/new`} className="text-decoration-underline">
                    add a pet to the shelter
                </Link>
                </div>
            </div>
            <div className = "row">
            <h4 className="p-3 mb-2 fw-bold">These pets are looking for a good home</h4>
            </div>

                
            <table className="table table-striped table-bordered border-dark border-dark border-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {petsList
                ? petsList.map((pet, index)=>(
                    <tr key= {index}>
                        <td className="fw-bold"><p>{pet.name}</p></td>
                        <td>{pet.type}</td>
                        
                        <td>
                        <Link to={`/petshelter/${pet._id}`}>
                        <span className=" fw-bold text-decoration-underline ">details</span>
                        </Link> 
                        <span> | </span>
                        <Link to={`/petshelter/edit/${pet._id}`}>
                        <span className=" fw-bold text-decoration-underline">edit</span>
                        </Link>
                        
                        </td>
                    </tr>
                        ))
                :null }
                </tbody>
                </table>            
               { /* <DataTable columns={columns} data={data} /> */}
        </div>
        
    )
}

export default PetsList;

import React,{useEffect,useState} from "react";
import axios from "axios";
import { Link } from "@reach/router";
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Name',
        //selector: row => row.name,
        sortable: false,
        cell: row => (
			<Link to={`/petshelter/${row._id}`}>
				{row.name}
			</Link>
		),
    },
    {
        name: 'Type',
        selector: row => row.type,
        sortable: true,
    },
    {
        name: 'Description',
        selector: row => row.description,
        sortable: false,
    },
];

const PetsList = (props)=>{

    const [petsList, setPetsList] = useState([]);
    const [data, setTableData] = useState([]);

    useEffect(() =>{
        axios
        .get("http://localhost:8000/api/petshelter")
        .then((res)=>{
            console.log(res.data);
            setPetsList(res.data);
            setTableData(res.data);
        })
        .catch((err)=> console.log(err));


    }, []);

    const adoptFilter = (idFromBelow) =>{
        axios.delete(`http://localhost:8000/api/petshelter/${idFromBelow}`)
        .then((res)=>{
            console.log(res.data);
            const newList = petsList.filter((pet, index)=> pet._id !==idFromBelow);
            setPetsList(newList)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return(
        <div>
            <h1>Incredible Pets</h1>
            <Link to={`/petshelter/new`}>
                Add a pet
                </Link>
                <p className="p-3 mb-2 text-purple fw-bold"> Our incredible friends :</p>
            <table className="table table-striped table-bordered border-dark">
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Type </th>
                        <th>Description</th>
                        <th>Skills</th>
                        <th>Action available</th>
                    </tr>
                </thead>
                <tbody>
                {petsList
                ? petsList.map((pet, index)=>(
                    <tr key= {index}>
                        <td className="fw-bold">
                        <Link to={`/petshelter/${pet._id}`}>
                        <p>{pet.name}</p>
                        </Link>
                        
                        </td>
                        <td>{pet.type}</td>
                        <td>{pet.description}</td>
                        <td>{pet.skills}</td>
                        <td >

                        <Link to={`/petshelter/edit/${pet._id}`}>
                        <button className="gradiant m-2 btn-sm text-light fw-bold "
                         >Edit</button>
                        </Link>

                        <button className="gradiant m-2 btn-sm text-white fw-bold"
                            onClick={()=> adoptFilter(pet._id)}>
                            Adopt
                        </button>
                        </td>
                    </tr>
                        ))
                :null }
                </tbody>
                </table>            
                <DataTable
            columns={columns}
            data={data}
        />
        </div>
        
    )
}

export default PetsList;

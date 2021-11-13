const Pet = require("../models/pet.model");


module.exports = {
    getAllPets:(req, res)=>{
        Pet.find({})
        .then((allPets)=>res.json(allPets))
        .catch((err)=>res.status(400).json(err))
    },

    getOnePet: (req, res)=>{
        Pet.findById({_id: req.params.id})
        .then((onePet)=>res.json(onePet))
        .catch((err)=>res.status(400).json(err))
    },

    createPet: (req, res)=>{
        const query = {name:req.body.name};
        console.log(query);
        let isUnique = true;
        Pet.find(query)
        .then((onePet)=>{
            console.log("Pet Find! ",onePet);
            if(onePet.length>0)
            {
                console.log("in error block")
            res.status(403).json({errors:
                {pet:
                    {message:
                        "Duplicate Pet Name! Please try different name!"}
                }
            });
            isUnique = false;}
        }).finally(()=>{
            if(isUnique)
            {
                console.log("Unique");
                Pet.create(req.body)
                .then((newPet)=>res.json({newPet}))
                .catch((err)=>{
                    console.log("validation error");
                    res.status(400).json(err)})
            }
        })
        .catch((err)=>{res.status(400).json(err)
        console.log("Find error");
        })

    },

    updatePet: (req, res)=>{
        Pet.findByIdAndUpdate(
            {_id:req.params.id},
            req.body,
            {
                new:true,
                runValidators:true
            })
        .then((updatedPet)=>res.json(updatedPet))
        .catch((err)=>res.status(400).json(err))

    },
    deletePet:(req, res)=>{
        Pet.deleteOne({_id: req.params.id})
        .then((deletedId)=>res.json(deletedId))
        .catch((err)=>res.status(400).json(err))

    }
}

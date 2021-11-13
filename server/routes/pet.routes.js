const PetController = require("../controllers/pet.controller");

module.exports =(app)=>{
    app.get("/api/petshelter", PetController.getAllPets);
    app.post("/api/petshelter", PetController.createPet);
    app.get("/api/petshelter/:id", PetController.getOnePet);
    app.put("/api/petshelter/:id", PetController.updatePet);
    app.delete("/api/petshelter/:id", PetController.deletePet);
}

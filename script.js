const fruitForm = document.querySelector("#input-section form");
const fruitList = document.querySelector("#fruit-section ul");
const fruitNutrition = document.querySelector("#nutrition-section p");


let calories = 0;
const apiKey = "51562086-b8ac04baa2620a6e58764ff20";

fruitForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    // addFruit(e.target[0].value);
    fetchFruitData(e.target[0].value);
    e.target[0].value = "";
});


function addFruit(fruit){
    const li = document.createElement("li")
    li.textContent = fruit.name;
    fruitList.appendChild(li);
    // replaceWithVegetable(li);
    calories += fruit.nutritions.calories;

    fruitNutrition.textContent = calories;
    deleteFruit(li);
}

function fetchFruitData(fruit){
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then(processResponse)
        .then((data) => addFruit(data))
        .catch((err) => console.log(err))

        fetch(`https://pixabay.com/api/${apiKey}&q=${fruit}+fruit&image_type=photo`)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
}

function processResponse(response){
    if(response.ok){
        console.log(response)
        return response.json()
    } else{
        console.log(response)
        throw "Error: http status code = " + response.status
    }
}

function deleteFruit(li){
    li.addEventListener("click",(e)=>{
    li.remove();
    },{once:true})
}

// const vegetables = ["carrot", "broccoli", "spinach", "cauliflower", "potato", "lettuce", "cabbage", "zucchini", "onion", "pepper"];


// function replaceWithVegetable(li){
//     li.addEventListener("click",(e)=>{
//         const index = Math.floor(Math.random() * 11)
//         li.textContent = vegetables[index];
//     },{once:true})
// }
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".searchResult");
const error = document.querySelector(".error");
const container = document.querySelector(".container");
const buttonDiv = document.querySelector(".nextBttn");
const header = document.querySelector(".mainTitle");
const APP_ID = "8f19d916";
const APP_KEY = "7a3f656c71eaa964d11b07a47ad71911";

let start = 0;
let end = 9
let searchQuery = "";
let diet = "";

header.addEventListener("click", reset);

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    diet = e.target.querySelector("select").value;
    console.log(diet);
    if(searchQuery == ""){
        let errorHTML = 
        `
        <p> Please enter a recipe to search! </p>
        
        `
        
   error.innerHTML = errorHTML;
   
    }else{
        fetchAPI();
    }
   
});

async function fetchAPI (){
    let baseURL = "";
    if(diet === "" || diet === "all"){
        baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${start}&to=${end}`;
    } else {
        baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&diet=${diet}&from=${start}&to=${end}`;
    }  
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    generatedHTML(data.hits);
}

function generatedHTML(results){
    if(results == 0){
        let notFoundHTML =
        `
        <p> ERROR 404: Recipe not found </p>
        `
        error.innerHTML = notFoundHTML;
    } else {
        error.innerHTML = "";
    container.classList.remove("initial");
    let generateHTML = "";
    results.map(result =>{
        generateHTML += 
        `
        <div class="item">
                <img src="${result.recipe.image}" alt="">
                <div class="flexContainer">
                    <h2 class="title">${result.recipe.label}</h2>
                    <p class = "itemData">Fat: ${result.recipe.digest[0].total.toFixed(0)}G</p>
                    <p class = "itemData">Carbs: ${result.recipe.digest[1].total.toFixed(0)}G</p>
                    <p class = "itemData">Protein: ${result.recipe.digest[2].total.toFixed(0)}G</p>
                    <p class="itemData">Calories: ${result.recipe.calories.toFixed(0)}</p>
                    <a class="recipeLink" href="${result.recipe.url}" target= "">View Recipe</a>
                    
                </div>
                
                
            </div>
        `
    }
    )
    searchResultDiv.innerHTML = generateHTML;
}
}

function nextPage(){
    start = end;
    end += 9;
    window.scrollTo(0,0);
    fetchAPI();
    
}

function reset(){
  window.location.reload();
}
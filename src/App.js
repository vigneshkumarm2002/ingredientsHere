
import React, { useEffect } from "react";
import { useState } from "react";
import './App.css';
import Recipe from "./components/recipe.js"
import { nanoid } from "nanoid";
import FilterItems from "./components/filter.js"
import SearchIcon from "./searchicon.png"

function App() {

const APP_ID="d7e501a3"
const APP_KEY="726854f1b078bc77e91163eede542f04";

const [Recipes,setRecipes]=useState([])
const [Search,setSearch]=useState("")
const [Submit, setSubmit]=useState("chicken")
const [minType, setminType]=useState("")
const [minFilter, setminFilter]=useState("")
const [maxType, setmaxType]=useState("")
const [maxFilter, setmaxFilter]=useState("")


useEffect(()=>{
  getRecipes()
  
},[Submit,minFilter,maxFilter])



const getRecipes= async()=>{
 const response = await fetch(`https://api.edamam.com/search?q=${Submit}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20&calories=${minFilter==""?0:minFilter}-${maxFilter==""?10000:maxFilter}`)
const data = await response.json();
setRecipes(data.hits)
}

const updateInput=(e)=>{
  setSearch(e.target.value)
}
const updateMinFilterInput=(e)=>{
  setminType(e.target.value)

}
const updateMaxFilterInput=(e)=>{
  setmaxType(e.target.value)
}

const getInput=(e)=>{
  e.preventDefault();
  if (Search===""){
    setSubmit(Submit)
  }
  else{
    setSubmit(Search)
  }
  
}

const getFilterInput=(e)=>{
  e.preventDefault();
    setminFilter(minType)
    setmaxFilter(maxType)
}
const handleFilterItems=(Reset)=>{
  if(!Reset){
    setminType("")
    setmaxType("")
  }
}

  return (
  <div className="wholeContainer">
    <div className='nav'>
      <h1> IngredientsHere<span>.com</span></h1>
    </div>
    <form className="searchbar" onSubmit={getInput}>
      <input type="text" placeholder="Search here..." value={Search} onChange={updateInput} />
      <button type="submit"><img src={SearchIcon} alt="Search"/></button>
    </form>

    <FilterItems  handleMinInput={updateMinFilterInput} 
                  handleMaxInput={updateMaxFilterInput} 
                  handleSubmit={getFilterInput}
                  MinValue={minType} 
                  MaxValue={maxType}
                  handleFilter={handleFilterItems} />
    <div className="Container">
    {
      Recipes.map(recipe => (
        <Recipe 
                key={nanoid()} 
                label={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredientLines}
                servings={recipe.recipe.yield}
                />
      ))}
      </div>
     
    
    </div>
  );
}

export default App;

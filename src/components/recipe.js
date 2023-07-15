import { useEffect, useRef, useState } from "react" 
 import "../App.css"
 import CloseIcon from "../close.png"
 import {nanoid} from "nanoid";
 import { LazyLoadImage } from 'react-lazy-load-image-component';
 import 'react-lazy-load-image-component/src/effects/blur.css';


function Recipe(props) {

    const [Modal,setModal]=useState(false)
    const toggleModal=()=>{
      setModal(!Modal)
        document.body.style.overflow =Modal? "scroll":"hidden";
    }

    // console.log("its recipe renders")

    return ( 
        <>
        
       <div onClick={toggleModal}  className="recipeContainerRight">
        <h1 className="title">{props.label}</h1>
        
        <p  className="paratext">Calories - {Math.round((props.calories)/props.servings)}</p>
        <img
        className="labelimg" loading="lazy" src={props.image} alt={props.label} effect="blur"/>
        
        
    
       <div  className={`modalvisible ${Modal? 'active' : 'inactive'}`}>
          <div  className="modal-content" onClick={(e)=>e.stopPropagation()} >
            <h2 className="modalTitle">{props.label}</h2>
            <div className="caloriemodal">
            <p >Calories - {Math.round((props.calories)/props.servings)} / perServing</p>
            <p > Total Servings - {props.servings} , Total Calories - {Math.round(props.calories)}</p>
            </div>
            <h4 className="modaltext">Ingredients : </h4>
            <ol className="modalIngredients">
            {props.ingredients.map(ingredient=>(
                  <li key={nanoid()}>{ingredient}</li>
                ))}
            </ol>
            <img src={CloseIcon} alt="" className="close-modal" onClick={toggleModal} />
          </div>
        </div>
        </div>
        </>

     );
}

export default Recipe ;
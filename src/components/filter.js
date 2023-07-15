import { useEffect, useState } from "react";

function FilterItems(props) {
  const[Reset,setReset]=useState(true)
  const toggle=()=>{
    if(props.MinValue=="" && props.MaxValue==""){
        setReset(true)
    }
    else if(isNaN(props.MinValue) || isNaN(props.MaxValue)){
      setReset(true)
    }
    else{
        setReset(!Reset)
    } 
    props.handleFilter(Reset)
  }

  
    
return (
        <div className="filter">
        <form onSubmit={props.handleSubmit} className="filterForm">
            <h4 className="FilterText">Set Calories</h4>
            <div className="minmax">
            <input onChange={props.handleMinInput} value={props.MinValue} type="number" placeholder="Min"/>
            <input onChange={props.handleMaxInput} value={props.MaxValue}  type="number" placeholder="Max" />
            
            <button onClick={toggle} type="submit">{Reset?"Set":"Reset"}</button>
            </div>
            {/* <button onClick={toggle} >set Filter</button> */}
            </form>
        </div>
       
      );
}

export default FilterItems;
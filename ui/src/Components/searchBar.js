import React from "react";
import './../Components/main.css';
import {Nav, Form, FormControl, Button } from 'react-bootstrap';

const SearchBar =(props) => {

    return(
        <div className="row search">
            <input type="text"  placeholder="Enter Something" className="form-control" onChange={props.onChange}/>
            <button className="btn btn-primary" onClick={props.onSubmit}>Submit</button>
        </div> 
    );

}
export default SearchBar;
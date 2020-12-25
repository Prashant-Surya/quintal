import React from "react";
import "./main.css";

const Score = (props) => {

    return(
        <div className="text-center">
            <h3>Your score is: {props.score}</h3>
            <a href="/" style={{"fontSize":"30px","marginTop":"20px"}}>Retry</a>
        </div>
    );
}

export default Score;
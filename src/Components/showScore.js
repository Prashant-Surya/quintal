import React from "react";
import "./main.css";

const Score = (props) => {

    return(

        <div>
            <div className="showscore">
                <h3>Your score is: {props.score}</h3>
            </div>
            <a href="/" style={{"marginLeft":"80px","fontSize":"30px","marginTop":"20px"}}>Retry</a>
        </div>
    );
}

export default Score;
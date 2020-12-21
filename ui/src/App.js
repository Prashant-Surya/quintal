import React from "react";

class App extends React.Component{


    constructor(props){
        super(props);
        this.state ={

            showHome:true,
        }
    }
    render(){

        const app = () =>{
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Hi There!</h1>
                    <p className="lead">Welcome to our webiste, Type any word in the search box and hit submit.</p>
                    <hr className="my-4" />
                    <p>We will generate a random quiz based on your keyword.</p>
                    <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                    </p>
                </div>
                
            </div>
        }

        return(
            <div></div>
            
        );
    }
}
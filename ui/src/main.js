import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ThreeDotsWave from "./Components/animations/ThreeDotsWave";
import CircleLoader from "./Components/animations/CircleLoader";
import quizService from "./Components/quizService";
import "./Components/main.css";
import SearchBar from "./Components/searchBar";
import Options from "./Components/options";
import QuestionBox from "./Components/questions";
import MarkAnswers from "./Components/markAnswers";
import Score from "./Components/showScore";

class Choco extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                input: "",
                showAnimation: false,
                showText: true,
                showQuestions: false,
                questionBank: [],
                next: false,
                clicked: false,
                index: 0,
                questionNumber: 1,
                optionsSelected: {},
                score: 0,
                responses: 0,
                submit: 0,
                result: true,
                showCorrectAnswer: false,
                answer: "",
                markanswer: false,
                showScore: false,
                one: false,
                two: false,
                three: false,
                four: false,
                quesLength: 0
            };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.getQuestions = this.getQuestions.bind(this);
            this.handleOptions = this.handleOptions.bind(this);
            this.fetchQuestions = this.fetchQuestions.bind(this);
        }

        handleChange(event) {
            this.setState({
                input: event.target.value,
            });
        }
        handleSubmit(event) {
            event.preventDefault();
            if (this.state.input != "") {
                this.setState({
                    showAnimation: !this.state.showAnimation,
                    showText: !this.state.showText,
                });
            }
            this.getQuestions();
        }

        fetchQuestions = () => {
            return fetch("//quintal-server.herokuapp.com/generate/", {
                method: "POST",
                body: JSON.stringify({
                    search_word: this.state.input,
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(function(response) {
                return response.json();
            });
        };

        /**
         * ,
              () => {
                setTimeout(
                  function () {
                    this.setState({
                      showAnimation: false,
                      showText: false,
                      showQuestions: true,
                    });
                  }.bind(this),
                  2000
                );
              }
         */

        getQuestions = () => {
            this.fetchQuestions().then((response) => {
                //console.log("Response received", response);
                this.setState({
                    questionBank: response.data,
                    showAnimation: false,
                    showText: false,
                    showQuestions: true,
                    quesLength: response.data.length,
                });
            });
        };

        handleOptions(option) {
            const answer = this.state.questionBank[this.state.index].answer;
            if (answer == option) {
                this.setState({
                    score: this.state.score + 1,
                    clicked: this.state.index == this.state.quesLength - 1 ? false : true,
                    showCorrectAnswer: true,
                    answer: answer,
                    markanswer: true,
                    submit: this.state.index == this.state.quesLength - 1 ? true : false,
                    responses: this.state.responses < this.state.quesLength ? this.state.responses + 1 : this.state.quesLength,
                });
            } else
                this.setState({
                    responses: this.state.responses < this.state.quesLength ? this.state.responses + 1 : this.state.quesLength,
                    clicked: this.state.index == this.state.quesLength - 1 ? false : true,
                    submit: this.state.index == this.state.quesLength - 1 ? true : false,
                    showCorrectAnswer: true,
                    markanswer: false,
                    answer: answer,
                });
        }

        render() {
            return ( <
                div className = "container" >
                <
                div className = "title" > QUINTAL < /div> <
                div className = {
                    (this.state.clicked || this.state.submit) ? "clicked-container" : "" } >
                <
                div className = "search" > {
                    this.state.showText && ( <
                        SearchBar onChange = { this.handleChange }
                        onSubmit = { this.handleSubmit }
                        />
                    )
                } { this.state.showAnimation && < CircleLoader / > } <
                /div> { /* style={{"marginLeft":"25px","marginTop":"5px","fontWeight":"bold"}} */ } <
                div className = "row" >
                <
                div className = "question" > {
                    this.state.showQuestions && ( <
                        span style = {
                            { marginLeft: "10px", fondWeight: "bold", "fontSize": "20px" } } > { this.state.questionNumber }. <
                        /span>
                    )
                } <
                span style = {
                    { "fontSize": "20px" } } > {
                    this.state.showQuestions &&
                    this.state.questionBank[this.state.index].question
                } <
                /span> <
                /div> <
                /div> <
                div className = "row options"
                style = {
                    { "marginTop": "15px" } } > {
                    this.state.showQuestions && (
                        // <Options
                        //   options={this.state.questionBank[this.state.index].options}
                        //   handleOptions={this.handleOptions}
                        // />
                        <
                        div >
                        <
                        div className = "col-md-10 options"
                        style = {
                            { "marginLeft": "20px", "marginTop": "5px" } } >
                        <
                        button className = {
                            this.state.one ? "btn btn-secondary" : "btn btn-outline-primary"
                        }
                        onClick = {
                            () => {
                                this.setState({ one: true });
                                this.handleOptions(
                                    this.state.questionBank[this.state.index].options[0]
                                );
                            }
                        } >
                        { this.state.questionBank[this.state.index].options[0] } <
                        /button> <
                        /div> <
                        div className = "col-md-10 options"
                        style = {
                            { "marginLeft": "20px", "marginTop": "5px" } } >
                        <
                        button className = {
                            this.state.two ? "btn btn-secondary" : "btn btn-outline-primary"
                        }
                        onClick = {
                            () => {
                                this.setState({ two: true });
                                this.handleOptions(
                                    this.state.questionBank[this.state.index].options[1]
                                );
                            }
                        } >
                        { this.state.questionBank[this.state.index].options[1] } <
                        /button> <
                        /div> <
                        div className = "col-md-10 options"
                        style = {
                            { "marginLeft": "20px", "marginTop": "5px" } } >
                        <
                        button className = {
                            this.state.three ? "btn btn-secondary" : "btn btn-outline-primary"
                        }
                        onClick = {
                            () => {
                                this.setState({ three: true });
                                this.handleOptions(
                                    this.state.questionBank[this.state.index].options[2]
                                );
                            }
                        } >
                        { this.state.questionBank[this.state.index].options[2] } <
                        /button> <
                        /div> <
                        div className = "col-md-10 options"
                        style = {
                            { "marginLeft": "20px", "marginTop": "5px" } } >
                        <
                        button className = {
                            this.state.four ? "btn btn-secondary" : "btn btn-outline-primary"
                        }
                        onClick = {
                            () => {
                                this.setState({ four: true });
                                this.handleOptions(
                                    this.state.questionBank[this.state.index].options[3]
                                );
                            }
                        } >
                        { this.state.questionBank[this.state.index].options[3] } <
                        /button> <
                        /div> <
                        /div>
                    )
                } <
                /div> <
                /div> <
                div className = "nextbtn" >
                <
                div className = "row" >
                <
                div className = "col-md-8" > {
                    this.state.showCorrectAnswer && ( <
                        MarkAnswers correct = { this.state.markanswer }
                        answer = { this.state.answer }
                        />
                    )
                } <
                /div> <
                div className = "col-md-4" > {
                    this.state.clicked ? ( <
                        button className = "btn btn-primary"
                        onClick = {
                            () =>
                            this.setState({
                                index: this.state.index + 1,
                                clicked: false,
                                questionNumber: this.state.questionNumber + 1,
                                showCorrectAnswer: false,
                                one: false,
                                two: false,
                                three: false,
                                four: false,
                            })
                        } >
                        Next Question <
                        /button>
                    ) : null
                } <
                /div> <
                /div> <
                /div> <
                div className = "submitbtn" >
                <
                div className = "row" >
                <
                div className = "col-md-8" > < /div> <
                div className = "col-md-4" > {
                    this.state.submit ? ( <
                        button className = "btn btn-primary"
                        onClick = {
                            () =>
                            this.setState({
                                showQuestions: false,
                                submit: false,
                                result: true,
                                showCorrectAnswer: false,
                                showScore: true,
                            })
                        } >
                        Submit Quiz <
                        /button>
                    ) : null
                } <
                /div> <
                /div> <
                /div> <
                div className = "row"
                style = {
                    { "marginLeft": "400px", "marginTop": "-150px" } } > {
                    this.state.showScore ? < Score score = { this.state.score }
                    />:null} <
                    /div>

                    <
                    /div>
                );
            }
        }
        export default Choco;

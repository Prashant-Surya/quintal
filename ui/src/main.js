import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CircleLoader from "./Components/animations/CircleLoader";
import quizService from "./Components/quizService";
import "./Components/main.css";
import SearchBar from "./Components/searchBar";
import MarkAnswers from "./Components/markAnswers";
import Score from "./Components/showScore";
import AudioJs from "./Components/audio";

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
      selectedOption: 100,
      quesLength: 0,
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
    }).then(function (response) {
      try {
        return response.json();
      } catch (err) {
        console.log("Error occured", err);
        return Promise.resolve({
          data: [],
        });
      }
    });
  };

  getQuestions = () => {
    this.fetchQuestions().then((response) => {
    // quizService().then((response) => {
      console.log("Response received", response);
      let data = response.data;
      if (data == null) {
        data = [];
      }
      //   let data = response;
      data = data.slice(0, 5);
      this.setState({
        questionBank: data,
        showAnimation: false,
        showText: false,
        showQuestions: true,
        quesLength: data.length,
      });
    });
  };

  handleOptions(optionIndex) {
    const answer = this.state.questionBank[this.state.index].answer;
    const option = this.state.questionBank[this.state.index].options[
      optionIndex
    ];
    let score = this.state.score;
    let markAnswer = false;
    if (answer == option) {
      score += 1;
      markAnswer = true;
    }
    this.setState({
      score,
      selectedOption: optionIndex,
      clicked: this.state.index == this.state.quesLength - 1 ? false : true,
      showCorrectAnswer: true,
      answer: answer,
      markanswer: markAnswer,
      submit: this.state.index == this.state.quesLength - 1 ? true : false,
      responses:
        this.state.responses < this.state.quesLength
          ? this.state.responses + 1
          : this.state.quesLength,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="title"> QUINTAL </div>
        <div
          className={
            this.state.clicked || this.state.submit ? "clicked-container" : ""
          }>
          <div className="search">
            {this.state.showText && (
              <SearchBar
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            )}
            {this.state.showAnimation && <CircleLoader />}
          </div>
          {this.state.showQuestions ? (
            this.state.questionBank.length == 0 ? (
              <div className="text-center" style={{fontSize: "20px"}}>
                  <p> Unfortunately we couldn't find much information for the search word. Please use some words with diversified content in Wikipedia.
                   </p> <br/><p> Few test words: India, Indian History, World War, World War 2
                  </p>
                  <a href="/">Go to Home</a>
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="question">
                    <span
                      style={{
                        marginLeft: "10px",
                        fondWeight: "bold",
                        fontSize: "20px",
                      }}>
                      {this.state.questionNumber}.
                    </span>
                    ) &nbsp;
                    <span style={{ fontSize: "20px" }}>
                      {this.state.questionBank[this.state.index].question}
                    </span>
                  </div>
                </div>
                <div style={{margin: "20px"}}>
                  <AudioJs text={this.state.questionBank[this.state.index].question}/>
                </div>
                <div className="row options" style={{ marginTop: "15px" }}>
                  <div>
                    {this.state.questionBank[this.state.index].options.map(
                      (current, index) => (
                        <div
                          className="col-md-10 options"
                          style={{ marginLeft: "20px", marginTop: "5px" }}>
                          <button
                            className={
                              this.state.selectedOption === index
                                ? "btn btn-secondary"
                                : "btn btn-outline-primary"
                            }
                            onClick={() => {
                              this.handleOptions(index);
                            }}>
                            {current}
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            )
          ) : null}
        </div>
        <div className="nextbtn">
          <div className="row">
            <div className="col-md-8">
              {this.state.showCorrectAnswer && (
                <MarkAnswers
                  correct={this.state.markanswer}
                  answer={this.state.answer}
                />
              )}
            </div>
            <div className="col-md-4">
              {this.state.clicked ? (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    this.setState({
                      index: this.state.index + 1,
                      clicked: false,
                      questionNumber: this.state.questionNumber + 1,
                      showCorrectAnswer: false,
                      selectedOption: 100,
                    })
                  }>
                  Next Question
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="submitbtn">
          <div className="row">
            <div className="col-md-8"> </div>
            <div className="col-md-4">
              {this.state.submit ? (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    this.setState({
                      showQuestions: false,
                      submit: false,
                      result: true,
                      showCorrectAnswer: false,
                      showScore: true,
                    })
                  }>
                  Submit Quiz
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{ marginLeft: "400px", marginTop: "-150px" }}>
          {this.state.showScore ? <Score score={this.state.score} /> : null}
        </div>
      </div>
    );
  }
}
export default Choco;

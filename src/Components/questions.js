import React from "react";
import '../Components/main.css';

class QuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(
        "QBP", this.props);
    this.state = {};
  }
  render() {
      console.log("QB", this.props);
    return (
      <div className="questionBox">
        <div className="question">{this.props.question}</div>
        {this.props.answer.map((text, index) => (
          <button
            key={index}
            className="answerBtn"
            // onClick={() => {
            //   setAnswer([text]);
            //   selected(text);
            // }}
          >
            {text}
          </button>
        ))}
      </div>
    );
  }
}
export default QuestionBox;

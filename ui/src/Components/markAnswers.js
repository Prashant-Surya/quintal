import React from "react";
import "./../Components/main.css";

class MarkAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    console.log("answer is", this.props);
  }

  render() {
    return (
      <div className="markanswer">
        {this.props.correct ? (
          <h4>You have marked the correct answer<span>&#10004;</span></h4>
        ) : (<>
            <h4>Correct Answer is: &nbsp;<b>{this.props.answer} </b> </h4>
        </>)}
      </div>
    );
  }
}
export default MarkAnswers;

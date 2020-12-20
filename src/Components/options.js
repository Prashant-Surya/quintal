import React from "react";

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      dis: false,
    };
  }
  render() {
    return (
      <div className="col-md-9 options" style={{ marginLeft: "20px" }}>
        {this.props.options.map((option, index) => {
          return (
            <button
              key={index}
              className={
                this.state.dis
                  ? "btn btn-secondary options"
                  : "btn btn-primary options"
              }
              onClick={() => {
                this.setState({
                  dis: true,
                });
                this.props.handleOptions(option);
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }
}
export default Options;

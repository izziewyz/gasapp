// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({


getInitialState: function() {
    return { dataa:[], history: [] };
  },





  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
          <h1>Gas fee</h1>
          <p>{"$"+ this.props.address*0.000621371*2.50/20 }</p>
          <p></p>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
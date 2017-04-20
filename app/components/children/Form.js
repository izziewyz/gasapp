// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { username: "",term1: "",term2: "", contact:"" };
  },

  // This function will respond to the user input
  handleChange1: function(event) {

    this.setState({ term1: event.target.value });

  },
  handleChange2: function(event) {

    this.setState({ term2: event.target.value });

  },
  handleChange3: function(event) {

    this.setState({ username: event.target.value });

  },
  handleChange4: function(event) {

    this.setState({ contact: event.target.value });

  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();
    console.log(this.state.term1);

    // Set the parent to have the search term
    this.props.setTerm1(this.state.term1);
    this.props.setTerm2(this.state.term2);
    this.props.setUsername(this.state.username);
    this.props.setContact(this.state.contact);
    // this.setState({ term1: "" });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Query</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Starting Location</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
               
              <input
                value={this.state.term1}
                type="text"
                className="form-control text-center"
                id="term1"
                onChange={this.handleChange1}
                required
              />
              <br />
              <h4 className="">
                <strong>Destination</strong>
              </h4>
               <input
                value={this.state.term2}
                type="text"
                className="form-control text-center"
                id="term2"
                onChange={this.handleChange2}
                required
              />
              <br />
              <h4 className="">
                <strong>Your name</strong>
              </h4>
               <input
                value={this.state.username}
                type="text"
                className="form-control text-center"
                id="username"
                onChange={this.handleChange3}
                
              />
              <br />
              <h4 className="">
                <strong>Email address</strong>
              </h4>
              <input
                value={this.state.contact}
                type="text"
                className="form-control text-center"
                id="contact"
                onChange={this.handleChange4}
                
              />
              <br />

              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;

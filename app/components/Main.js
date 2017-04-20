// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");
var Mapp = require("./children/Mapp");
var CarpoolSearch = require("./children/CarpoolSearch");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { username: "", contact:"",searchTerm1: "",searchTerm2:"", results: "", startzip:"", history: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the address
    helpers.runQuery(this.state.searchTerm1,this.state.searchTerm2).then(function(data) {
      if (data !== this.state.results) {
        console.log("Address", data);
        this.setState({ results: data });
        this.getzipcode();


        // After we've received the result... then post the search term to our history.
        helpers.postHistory(this.state.username,this.state.contact,this.state.searchTerm1,this.state.searchTerm2, this.state.results).then(function() {
          console.log("Updated!");
          console.log(this.state.username);

          // After we've done the post... then get the updated history
          helpers.getHistory().then(function(response) {
            console.log("Current History", response.data);

            console.log("History", response.data);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  },
    
  getzipcode: function(){

    helpers.runQuery3(this.state.searchTerm1).then(function(data) {
      console.log("11111111");
      if (data !== this.state.results) {
        console.log("Address", data);
        this.setState({ startzip: data });
      }
    }.bind(this));
   },     

 
  // This function allows childrens to update the parent.
  setTerm1: function(term) {
    this.setState({ searchTerm1: term });
  },

  setTerm2: function(term) {
    this.setState({ searchTerm2: term });
  },

  setUsername: function(term) {
    this.setState({ username: term });
  },

  setContact: function(term) {
    this.setState({ contact: term });
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Address Finder!</h2>
            <img src="Standard Old fashion.png" width="100%" height="250px"></img>
            <p className="text-center">

              <em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm1={this.setTerm1} setTerm2={this.setTerm2} setUsername={this.setUsername} setContact={this.setContact}/>

          </div>

          <div className="col-md-6">

            <Results address={this.state.results} />

          </div>

        </div>

        <div className="row">

          <History history={this.state.history} />

        </div>
        
        <div className="row">
          <h4><p>{this.state.startzip}</p></h4>
          <Mapp /><p>{this.state.startzip}</p>

        </div>
        
        <div className="col-md-6">
              <CarpoolSearch yourstart={this.state.searchTerm1} />
              
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;

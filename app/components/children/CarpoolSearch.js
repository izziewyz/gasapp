// Include React
var React = require("react");
//var path = require("path");

var helpers = require("../utils/helpers");

// This is the History component. It will be used to show a log of  recent searches.
var CarpoolSearch = React.createClass({
  getInitialState: function() {
    return { dataa:[], history: [] };
  },



 searchfunction: function(){


    event.preventDefault();
    console.log("hi");
     helpers.getHistoryS().then(function(response) {
            // console.log("Current History1", response.data[2]);
            console.log(this.props.yourstart);
            this.setState({history: response.data})
            //this.setState({ history: response.data });
            this.searchfunction2();
            }.bind(this));
     
},

searchfunction2: function(){
  console.log(this.state.history);
    var status;
   for (var i = 0; i < this.state.history.length; i++) { 
                //var lala;

                 
                  
                  helpers.runQuery2(this.state.history[i].location1,this.props.yourstart).then(function(results){
                    console.log(results);
                    //lala = results;
                    //console.log(lala)
                    return status = results;
                  }.bind(this));
                  return status;
              

                
                
                  
                //    if (results == "1 ft"){
                // console.log("hahahahahha")
                // this.state.dataa.push(this.state.history[i])
                //     }
                //   }.bind(this));
        };
        console.log(status);
   //console.log(this.state.dataa);
  },
            


  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search History carpool</h3>
        </div>
        <div className="panel-body text-center">


        <button onClick={this.searchfunction}>Search</button>

          {/* Here we use a map function to loop through an array in JSX */}
          {this.state.history.map(function(search, i) {
            return (
              <p key={i}>{search.location1} -{search.location2}- {search.date}</p>
            );
          })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = CarpoolSearch;

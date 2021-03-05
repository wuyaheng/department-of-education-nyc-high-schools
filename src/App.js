import React, { Component } from 'react';
import './App.css';
import Map from "./components/Map/index"
import geodata from "./data/nyc.geojson"
import axios from "axios"

class App extends Component {
  state = {
    nta: []
  }

  componentDidMount() {
      this.fetchdata()  
  }

  fetchdata = async () => {
    try {
      const res = await axios.get(geodata);
      this.setState({
        nta: res.data.features
      });
    } catch (error) {
      console.log(error)
    }
  } 

  render() { 
      return (
        <>
          <nav>
            <div className="nav-wrapper #455a64 blue-grey darken-2">
              <a href="#" className="brand-logo center">Department of Education High Schools in 2021</a>
            </div>
          </nav>
        
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-2">

        </div>
        <div className="col-md-5">
          <Map results = {this.state.nta}/> 
        </div>
        <div className="col-md-5">
    
        </div>
        </div>
        </div> 
        </>
      );
    } 
}
export default App;

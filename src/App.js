import React, { Component } from 'react';
import './App.css';
import Map from "./components/Map/index";
import ChooseNTA from "./components/ChooseNTA/index";
import MapBox from "./components/MapBox/index";
import geodata from "./data/nyc.geojson";
import axios from "axios";

const ALLNEIGHBORHOOD = "All Neighborhood"

class App extends Component {
  state = {
    geo: [],
    nta: [],
    sel_nta: "",
    schools: [],
    filteredSchools: [] 
  }

  componentDidMount() {
    this.setState(
      {
        sel_nta: ALLNEIGHBORHOOD,
      },
      () => {
      this.fetchSchools()
      });
    this.fetchnta();
    this.fetchdata()
  }

  fetchdata = async () => {
    try {
      const res = await axios.get(geodata);
      this.setState({
        geo: res.data.features
      });
    } catch (error) {
      console.log(error)
    }
  } 


  fetchnta = async () => {
    try {
      const res = await axios.get(
        'https://data.cityofnewyork.us/resource/qpj9-6qjn.json?$group=nta&$select=nta'
      );
      const dropdownNta = res.data.map((x) => x.nta)
      const dropdown = [ALLNEIGHBORHOOD,...dropdownNta]
      this.setState({
        nta: dropdown
      });
    } catch (error) {
      console.log(error)
    }
  } 

  handleInputChange = (event) => {
    this.setState(
      {
        sel_nta: event.target.value
      },
      () => {
      this.fetchSchools() 
      })

  }


  fetchSchools = async () => { 
    let options = {}
    if (this.state.sel_nta !== ALLNEIGHBORHOOD) {
      options = { 
        params: {
          nta: this.state.sel_nta 
        }
      }
    }
    const res = await axios.get('https://data.cityofnewyork.us/resource/qpj9-6qjn.json',options)

    this.setState({
      schools: res.data
    })
  }


  render() { 
      return (
        <>
          <nav>
            <div className="nav-wrapper #455a64 blue-grey darken-2">
              <a href="#" className="brand-logo center">Department of Education High Schools in 2021</a>
            </div>
          </nav>
        
        <div className="container-fluid mt-2">
        <div className="row">
        <div className="col-md-2">
        <div className="card" style={{height: "85vh"}}>
      <div className="searchCard">
      <p className="pt-1">&nbsp; <b>Choose a Neighborhood</b></p> 
        <ChooseNTA results={this.state.nta} handleInputChange={this.handleInputChange} /> 
      </div>
        </div>
        </div>
        <div className="col-md-5">
          <div className="card">
          <Map results = {this.state.geo}/> 
          </div>
        </div>
        <div className="col-md-5">
        <div className="card">
          <MapBox results = {this.state.schools}/>
          </div>
        </div>
        </div>
        </div> 
        </>
      );
    } 
}
export default App;

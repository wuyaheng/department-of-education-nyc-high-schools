import React, { Component } from 'react';
import './App.css';
import ChooseNTA from "./components/ChooseNTA/index";
import MapBox from "./components/MapBox/index";
import geodata from "./data/nyc.geojson";
import Table from "./components/Table/index";
import BoroughChart from "./components/BoroughChart/index";
import axios from "axios";

const ALLNEIGHBORHOOD = "All Neighborhood"

class App extends Component {
  state = {
    geo: [],
    nta: [],
    sel_nta: "",
    schools: [] 
  }

  componentDidMount() {
    this.setState(
      {
        sel_nta: ALLNEIGHBORHOOD,
      },
      () => {
      this.fetchSchools()
      });
    this.fetchdata()
    this.fetchnta();
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

      let data = {
        geoData: this.state.geo,
        schoolData: this.state.schools  
      }

      return (
        <>
          <nav>
            <div className="nav-wrapper #455a64 blue-grey darken-2">
              <a href="#" className="brand-logo center">High Schools in NYC in 2021</a>
            </div>
          </nav>
        
        <div className="container-fluid mt-2">
        <div className="row mb-0">
        <div className="col-md-4">
        <div className="card">
      <h6 className="p-1 mt-1 mb-1"><b>Select a Neighborhood</b></h6> 
        <ChooseNTA results={this.state.nta} handleInputChange={this.handleInputChange} /> 

        </div>
        <div className="card text-center">
        <h6>Number of High Schools in {this.state.sel_nta}</h6>
          <h4 className="numberOfSchools">{this.state.schools.length}</h4>
        </div>
        <div className="card">
        <BoroughChart results={this.state.schools}/> 
        </div>
        </div>
 
        <div className="col-md-8">
        <div className="card">
          <MapBox results = {data}/>
          </div>
        </div>
        </div>

        <div className="row mb-3">
      <div className="col-md-12 table-responsive">
        <Table results={this.state.schools} /> 
      </div>
      </div>
        </div> 
        </>
      );
    } 
}
export default App;

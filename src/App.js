import React, { Component } from 'react';
import './App.css';
import ChooseNTA from "./components/ChooseNTA/index";
import MapBox from "./components/MapBox/index";
import geodata from "./data/nyc.geojson";
import schoolData from "./data/schoolData.json";
import ntaData from "./data/ntaData.json";
import Table from "./components/Table/index";
import BoroughChart from "./components/BoroughChart/index";
const ALLNEIGHBORHOOD = "All Neighborhood"

class App extends Component {
  constructor(props) {
    super(props) 
    const dropdownNta = ntaData.map((x) => x.nta)
    const dropdown = [ALLNEIGHBORHOOD,...dropdownNta]
    this.state = {
      geo: geodata.features,
      nta: dropdown,
      sel_nta: ALLNEIGHBORHOOD
    }
  }

  handleInputChange = (event) => {
    this.setState(
      {
        sel_nta: event.target.value
      })
  }

  getSchoolsData = () => { 
    let schoolDataToDisplay = schoolData
    if (this.state.sel_nta !== ALLNEIGHBORHOOD) {
      schoolDataToDisplay = schoolData.filter(item => item.nta === this.state.sel_nta)
    }
    return schoolDataToDisplay
  }


  render() { 

      let data = {
        geoData: this.state.geo,
        schoolData: this.getSchoolsData()
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
          <h4 className="numberOfSchools">{data.schoolData.length}</h4>
        </div>
        <div className="card">
        <BoroughChart results={data.schoolData}/> 
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
        <Table results={data.schoolData} /> 
      </div>
      </div>
        </div> 
        </>
      );
    } 
}
export default App;

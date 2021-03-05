import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Table = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        params.api.sizeColumnsToFit(); 
    }
 
      let defaultColDef = {
        flex: 1,
        resizable: true,
        sortable: true,
        wrapText: true,
        autoHeight: true
      }


    let rowData = []
    props.results.map((ele, i) => rowData.push( 
      {School_Name: ele.school_name, 
       Overview: ele.overview_paragraph, 
       Academic_Opportunities: "<li>" + ele.academicopportunities1 +"</li><li>"+ ele.academicopportunities2 + "</li><li>" + ele.academicopportunities3 + "</li><li>" + ele.academicopportunities4 + "</li><li>" + ele.academicopportunities5 + "</li>"}
      ))


    let columnDefs = [
      {
        field: 'School_Name',
        headerName: 'School_Name',
        cellRenderer: function(params) {
          return params.data.School_Name;
        },
        flex: 1,
      },
      {
        field: 'Overview',
        headerName: 'Overview',
        cellRenderer: function(params) {
          return params.data.Overview;
        },
        flex: 1,
      },
      {
        field: 'Academic_Opportunities',
        headerName: 'Academic_Opportunities',
        cellRenderer: function(params) {
          return params.data.Academic_Opportunities;
        },
        flex: 1,
      }]

    return (
        <div className="ag-theme-alpine" style={ { height: 500, width: "100%" } }>
            <AgGridReact
                onGridReady={onGridReady}
                rowData={rowData}
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                > 
                <AgGridColumn field="School_Name"></AgGridColumn>
                <AgGridColumn field="Overview"></AgGridColumn>
                <AgGridColumn field="Academic_Opportunities"></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default Table;
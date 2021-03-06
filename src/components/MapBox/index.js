import React from "react";
import SchoolMap from "./../SchoolMap/index";


function MapBox(props) {

    let lat = props.results.schoolData.reduce((t, r) => t + parseFloat(r.latitude), 0) / props.results.schoolData.length;

    let lon = props.results.schoolData.reduce((t, r) => t + parseFloat(r.longitude), 0) / props.results.schoolData.length;

    if(!lat) {
        lat = 40.746106816563156
    }

    if(!lon) {
        lon = -73.92531492341064
    }

    return (
        <>
            <SchoolMap lat={lat} lon={lon} pins={props.results} />
        </>
    )
}

export default MapBox;
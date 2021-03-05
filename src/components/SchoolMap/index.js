import React from "react";
import L from "leaflet";


export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER2 = document.getElementById("map-container2");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER2.appendChild(MAP_ID);

      let schoolMap; 
      props.pins.length > 200 ? 
      schoolMap = L.map("mapid").setView([props.lat, props.lon], 10) : schoolMap = L.map("mapid").setView([props.lat, props.lon], 14)

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(schoolMap);


      props.pins.forEach((pin) =>
        L.marker([pin.latitude, pin.longitude]).addTo(schoolMap).bindTooltip('<b>' + pin.school_name + '</b><p>Phone: ' + pin.phone_number + '</p><p>Email: ' + pin.school_email + '</p><p>Website: ' + pin.website + '</p>')  
      );
    }

    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container2"></div>;
};


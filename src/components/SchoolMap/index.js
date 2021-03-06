import React from "react";
import L from "leaflet";
import 'leaflet.markercluster';


export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER2 = document.getElementById("map-container2");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER2.appendChild(MAP_ID);

      let schoolMap; 
      props.pins.schoolData.length > 200 ? 
      schoolMap = L.map("mapid").setView([props.lat, props.lon], 10) : schoolMap = L.map("mapid").setView([props.lat, props.lon], 13)

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

        // Create a new marker cluster group
        var markers = L.markerClusterGroup();

        var fixUndefined = (item) => (typeof (item) !== 'undefined' ? item : 'Unknown'); 

      props.pins.schoolData.forEach((pin) =>
      (pin.school_name || pin.phone_number || pin.school_email || pin.website) ? 
      markers.addLayer(L.marker([pin.latitude, pin.longitude]).bindTooltip('<b>' + fixUndefined(pin.school_name) + '</b><p><b>Phone:</b> ' + fixUndefined(pin.phone_number) + '</p><p><b>Email:</b> ' + fixUndefined(pin.school_email) + '</p><p><b>Website:</b> ' + fixUndefined(pin.website) + '</p><p><b>Location:</b> ' + pin.location.split("(")[0] + '</p><p><b>Admissions Priority:</b> ' + fixUndefined(pin.admissionspriority11) + '</p><p><b>Time:</b> ' + fixUndefined(pin.start_time) + ' - ' + fixUndefined(pin.end_time) + '</p><p><b>Subway:</b> ' + fixUndefined(pin.subway) + '</p><p><b>Bus:</b> ' + fixUndefined(pin.bus) + '</p><p><b>Language Classes:</b> ' + fixUndefined(pin.language_classes) + '</p><p><b>Advanced Placement Courses: </b> ' + fixUndefined(pin.advancedplacement_courses) + '</p><p><b>Diploma Endorsements: </b> ' + fixUndefined(pin.diplomaendorsements) + '</p>') 
   ) : null );

     // Add our marker cluster layer to the map
      schoolMap.addLayer(markers);

  
              function chooseColor(borough) {
                switch (borough) {
                case "Brooklyn":
                return "#bac7be";
                case "Bronx":
                return "#8d99ae";
                case "Manhattan":
                return "#a0ced9";
                case "Queens":
                return "#cc8b86";
                case "Staten Island":
                return "#f5cb5c";
                default:
                return "black";
                }
            }
            

                var geoJson = L.geoJson(props.pins.geoData, {
                style: function(feature) {
                    return {
                    color: "white",
                    fillColor: chooseColor(feature.properties.borough),
                    fillOpacity: 0.8,
                    weight: 1.5
                    };
                },
                onEachFeature: function(feature, layer) {
                    layer.on({
                    mouseover: function(event) {
                        layer = event.target;
                        layer.setStyle({
                        fillOpacity: 1
                        });
                    },
                    mouseout: function(event) {
                        geoJson.resetStyle(event.target);
                    },
                    click: function(event) {
                        schoolMap.fitBounds(event.target.getBounds());
                    }
                    });
                    layer.bindTooltip("<p><b>" + feature.properties.neighborhood + "</b></p>");
                }
                }).addTo(schoolMap);
    }

    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container2"></div>;
};


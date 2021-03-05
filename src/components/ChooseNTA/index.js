import React from "react";

function ChooseNTA({ results, handleInputChange }) {
    return (
        <div className="input-group pl-2 pr-2">
            <select className="custom-select" id="inputGroupSelect01" onChange={handleInputChange}>
                {results.sort(function(a, b) {
                    if(a.toLowerCase() < b.toLowerCase()) return -1;
                    if(a.toLowerCase() > b.toLowerCase()) return 1;
                    return 0;
                    }).map((ele, i) => (
                    ele ? <option key={i + "-el"} value={ele}>{ele}</option> : null
                ))}
            </select>
        </div>
    )
}

export default ChooseNTA; 
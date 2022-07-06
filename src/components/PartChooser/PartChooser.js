import React, {useEffect, useState} from "react";

function PartChooser({type, handlePost}) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function populateOptions() {
            const response = await fetch(`http://localhost:3001/names/${type}`);
            return response.json();
        }
        if (!options.length) {
            populateOptions().then(result => setOptions(result));
        }
    });

    return (
        <div className="part-chooser">
            <label>{type}</label>
            <select>
                {
                    options.map((opt, i) => {
                        return <option onClick={() => handlePost(type, opt)} key={i}>{opt}</option>
                    })
                }
            </select>
        </div>
    );
}

export default PartChooser;
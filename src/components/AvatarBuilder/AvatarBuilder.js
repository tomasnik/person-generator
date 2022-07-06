import React from "react";
import Avatar from "../Avatar/Avatar";
import {useState} from "react";
import PartChooser from "../PartChooser/PartChooser";
import {useEffect} from "react";

function AvatarBuilder() {
    const [avatar, setAvatar] = useState("");
    const [types, setTypes] = useState([]);


    useEffect(() => {
        async function populateTypes() {
            const response = await fetch(`http://localhost:3001/types`);
            return response.json();
        }
        if (!types.length) {
            populateTypes().then(result => setTypes(result));
        }
    });

    async function postBodyPart(type, name) {
        const response = await fetch("http://localhost:3001/builder", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                partType: type,
                partName: name
            })
        })
        return await response.json();
    }

    function handlePost(type, name) {
        postBodyPart(type, name).then(result => setAvatar(result));
    }

    async function reset() {
        const response = await fetch("http://localhost:3001/reset", {
            method: "post",
        });
        return await response.json();
    }

    function buttonReset() {
        reset().then(result => setAvatar(result)); // might change to ""
    }

    return (
        <div className="avatar-builder">
            <Avatar avatar={avatar}/>
            {
                types.map((type, i) => {
                    return <PartChooser handlePost={handlePost} key={i} type={type}/>
                })
            }
            <button onClick={buttonReset}>Reset</button>
        </div>
    );
}

export default AvatarBuilder;
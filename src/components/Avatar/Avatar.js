import {useState} from "react";
import parse from "html-react-parser";

function Avatar() {
    const [avatar, setAvatar] = useState("");

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

    function postOval() {
        postBodyPart("faces", "oval").then(result => setAvatar(result));
    }

    function postEars() {
        postBodyPart("ears", "basic").then(result => setAvatar(result));
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
        <div className="avatar">
            {parse(avatar)}
            <button onClick={postOval}>Faces</button>
            <button onClick={postEars}>Ears</button>
            <button onClick={buttonReset}>Reset</button>
        </div>
    );
}

export default Avatar;
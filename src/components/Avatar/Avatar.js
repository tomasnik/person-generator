import parse from "html-react-parser";

function Avatar({avatar}) {
    return (
        <div className="avatar">
            {parse(avatar)}
        </div>
    );
}

export default Avatar;
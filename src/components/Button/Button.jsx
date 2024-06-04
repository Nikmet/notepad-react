import "./Button.css";

function Button({ children, onClick }) {
    console.log("button");
    return (
        <button className="button accent" onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;

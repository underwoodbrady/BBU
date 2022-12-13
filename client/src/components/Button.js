const Button = ({ label, secondary, onclick }) => {
    return (
        <button onClick={onclick} className={secondary ? "bg-sky-800 p-2 flex-1 rounded-lg border-2 border-sky-100 drop-shadow-md" : "bg-sky-100 p-2 flex-1 rounded-lg drop-shadow-md"}>
            <h3 className={secondary ? "text-sky-100 text-center" : "text-sky-800 text-center"}>{label}</h3>
        </button>
    );
};
export default Button;

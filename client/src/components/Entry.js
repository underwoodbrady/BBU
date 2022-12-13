const Entry = ({ name, email, onclick }) => {
    return (
        <div className="flex justify-between text-sky-100 items-center">
            <p className="font-semibold">{name}</p>
            <p className="ml-auto">{email}</p>
            <button className="w-4 h-4 bg-sky-200 rounded-sm drop-shadow-md text-xs text-sky-800 ml-4" onClick={onclick}>&#8505;</button>
        </div>
    );
};
export default Entry;

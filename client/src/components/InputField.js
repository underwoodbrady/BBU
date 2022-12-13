const InputField = ({ label, onchange, type }) => {
    return (
        <div>
            <label className="text-sky-100 mb-4 block">{label}</label>
            <input className="border-2 border-sky-100 bg-transparent p-2 rounded-lg text-sky-100 outline-none w-[201px]" onChange={(change)=>onchange(change.target.value)} type={type ? type : "text"} ></input>
        </div>
    );
};
export default InputField;

const CheckboxLabled = ({ children }) => {
    return (
        <div className="flex">
            <input className="border-2 rounded-lg border-sky-100 w-5 h-5 mr-4 bg-transparent" type="checkbox">

            </input>
            <h3 className="text-sky-100 text-sm">{children}</h3>
        </div>
    );
};
export default CheckboxLabled;

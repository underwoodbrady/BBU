import phoneIcon from "../images/phone.svg";
import emailIcon from "../images/email.svg";
import calendar from "../images/calendar.svg";

const Popup = ({name, organization, date, email, phone, days, onclose}) => {
    return (
        <div className="fixed w-screen h-screen bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-50">
            <div className="w-96 bg-sky-800 rounded-lg drop-shadow-md p-6">
                <p className="absolute top-4 right-4 font-bold text-white cursor-pointer" onClick={onclose}>
                    &#10005;
                </p>
                <h5 className="text-neutral-200 font-semibold text-2xl">
                    {name}
                </h5>
                <p className="text-neutral-400 font-semibold mb-2">{organization}</p>
                <p className="text-neutral-300 flex mb-1">{date && <img src={calendar} className="w-4 mr-3"/>}{date}</p>
                <p className="text-neutral-300 flex mb-1">{email && <img src={emailIcon} className="w-4 mr-3"/>}{email}</p>
                <p className="text-neutral-300 flex mb-4">{phone && <img src={phoneIcon} className="w-4 mr-3"/>}{phone}</p>
                <div className="flex justify-between border-b-2 bg-white rounded-lg p-2">
                    <p className="text-sky-800 text-lg">Days Volunteered</p>
                    <p className="text-sky-800 font-bold text-lg">{days}</p>
                </div>
            </div>
        </div>
    );
};
export default Popup;

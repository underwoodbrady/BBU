import Title from "./components/Title";
import InputField from "./components/InputField";
import CheckboxLabled from "./components/CheckboxLabeled";
import Button from "./components/Button";
import Entry from "./components/Entry";
import Popup from "./components/Popup";
import BSF from "./images/BSF2.svg";
import banner from "./images/banner.png";
import { useEffect, useState } from "react";

function App() {
    const [adminPage, setAdminPage] = useState(false);
    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({});
    const [filterOption, setFilterOption] = useState("");
    const [sortedEntries, setSortedEntries] = useState([]);

    useEffect(() => {
        if (entries.length == 0) {
            getEntries();
        }
    }, []);

    const getEntries = async () => {
        setFormData({});
        /** SET FORM TO BE CLEARED */
        fetch("http://csci335.cs.montana.icu/api/read")
            .then((res) => res.json())
            .then((json) => setEntries(json))
            .catch((err) => console.assert(err));
        console.log(entries);
    };

    const validateInput = (data) => {
        return false;
        /*if (
            data.first &&
            data.last &&
            data.email &&
            data.phone &&
            data.organization &&
            data.date
        )
            return false;
        
        if(!data.first)
            return "first"
        if(!data.last)
            return "last"
        if(!data.email)
            return "email"
        if(!data.phone)
            return "phone"
        if(!data.organization)
            return "organization"
        if(!data.date)
            return "date"
        */
    };

    const addEntry = () => {
        let inputTest = validateInput(formData);
        if (inputTest) {
            alert("Missing Form Inputs" + inputTest);
            return;
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch("http://csci335.cs.montana.icu/api/create", requestOptions)
            .then((res) => getEntries())
            .catch((err) => console.assert(err));
    };

    const clearEntries = () => {
        const requestOptions = {
            method: "POST",
        };
        fetch("http://csci335.cs.montana.icu/api/clear", requestOptions)
            .then((res) => getEntries())
            .catch((err) => console.assert(err));
    };

    const updateFormData = (field, data) => {
        switch (field) {
            case "first":
                setFormData({ ...formData, first: data });
                break;
            case "last":
                setFormData({ ...formData, last: data });
                break;
            case "email":
                setFormData({ ...formData, email: data });
                break;
            case "phone":
                setFormData({ ...formData, phone: data });
                break;
            case "date":
                setFormData({ ...formData, date: data });
                break;
            case "organization":
                setFormData({ ...formData, organization: data });
                break;
        }
    };

    const openPopup = (data) => {
        setPopupData(data);
        setShowPopup(true);
    };

    const closePopup = () => {
        setPopupData({});
        setShowPopup(false);
    };

    const sortByFrequency = () => {
        setFilterOption("frequency");
        let sortedArr = [...entries];
        sortedArr.sort((a, b) => {
            if (a.days > b.days) {
                return -1;
            }
            if (a.days < b.days) {
                return 1;
            }

            return 0;
        });
        setSortedEntries(sortedArr);
    };

    const sortByDate = () => {
        let date = prompt("What date do you want? (Ex YYYY-MM-DD)")

        setFilterOption("date");
        let sortedArr = [...entries];
        sortedArr = sortedArr.filter((entry) => {
            return entry.date == date;
        });

        setSortedEntries(sortedArr);
    };

    const sortByVolunteer = () => {
        let volunteer = prompt("What volunteer do you want? (first name only)")

        setFilterOption("volunteer");

        let sortedArr = [...entries];
        sortedArr = sortedArr.filter((entry) => {
            return entry.first.toUpperCase() == volunteer.toUpperCase();
        });

        setSortedEntries(sortedArr);
    };

    const clearSort = () => {
        setFilterOption("");
        setSortedEntries([]);
    };
    return (
        <div className="flex h-screen">
            {showPopup && (
                <Popup
                    name={`${popupData.first} ${popupData.last}` || ""}
                    organization={popupData.organization || ""}
                    email={popupData.email || ""}
                    phone={popupData.phone || ""}
                    days={popupData.days || 1}
                    date={popupData.date || ""}
                    onclose={closePopup}
                />
            )}
            <div>
                <img
                    src={BSF}
                    className="min-h-full min-w-full flex-shrink-0 drop-shadow-lg"
                />
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-[#E8F6FF] rounded-tr-full"></div>
                <div className="absolute top-0 left-0 w-12 h-12 bg-[#FFF8E5] rounded-br-full"></div>
            </div>
            <div className="flex flex-1 justify-center">
                <div className="flex flex-col px-12 py-8 justify-between max-w-[525px]">
                    <section className="flex justify-between">
                        <img src={banner} className="w-full rounded-lg" />
                    </section>
                    {!adminPage && (
                        <section>
                            <div className="flex space-x-8 mb-4">
                                <InputField
                                    label="First"
                                    onchange={(data) =>
                                        updateFormData("first", data)
                                    }
                                />
                                <InputField
                                    label="Last"
                                    onchange={(data) =>
                                        updateFormData("last", data)
                                    }
                                />
                            </div>
                            <div className="flex space-x-8 mb-4">
                                <InputField
                                    label="Email"
                                    onchange={(data) =>
                                        updateFormData("email", data)
                                    }
                                    type="email"
                                />
                                <InputField
                                    label="Phone #"
                                    onchange={(data) =>
                                        updateFormData("phone", data)
                                    }
                                    type="number"
                                />
                            </div>
                            <div className="flex space-x-8 mb-6">
                                <InputField
                                    label="Date"
                                    onchange={(data) =>
                                        updateFormData("date", data)
                                    }
                                    type="date"
                                />
                                <InputField
                                    label="Organization"
                                    onchange={(data) =>
                                        updateFormData("organization", data)
                                    }
                                />
                            </div>
                            <CheckboxLabled label="">
                                I agree to the{" "}
                                <span className="underline">
                                    Terms of Service
                                </span>
                            </CheckboxLabled>
                        </section>
                    )}
                    {adminPage && (
                        <section className="border-t-[1px] border-b-[1px] border-sky-100 py-4 overflow-y-auto my-12 h-full">
                            <div className="mb-4">
                                <Title text="Current Entries" />
                                <div className="flex space-x-2 mt-2">
                                    <p className="mr-1 text-white text-sm">
                                        Sort by:
                                    </p>
                                    <button
                                        className={
                                            "h-6 bg-sky-100 rounded-lg text-xs drop-shadow-md text-sky-800 px-2 hover:font-bold" +
                                            (filterOption === "frequency"
                                                ? " font-bold"
                                                : "")
                                        }
                                        onClick={() => sortByFrequency()}>
                                        Frequency
                                    </button>
                                    <button
                                        className={
                                            "h-6 bg-sky-100 rounded-lg text-xs drop-shadow-md text-sky-800 px-2 hover:font-bold" +
                                            (filterOption === "date"
                                                ? " font-bold"
                                                : "")
                                        }
                                        onClick={() => sortByDate()}>
                                        Date
                                    </button>
                                    <button
                                        className={
                                            "h-6 bg-sky-100 rounded-lg text-xs drop-shadow-md text-sky-800 px-2 hover:font-bold" +
                                            (filterOption === "volunteer"
                                                ? " font-bold"
                                                : "")
                                        }
                                        onClick={() => sortByVolunteer()}>
                                        Volunteer
                                    </button>
                                    <button
                                        className="h-6 bg-red-200 rounded-lg text-xs drop-shadow-md text-sky-800 px-2 hover:font-bold"
                                        onClick={() => clearSort()}>
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                {sortedEntries.length > 0 ? (
                                    sortedEntries.map((entry) => (
                                        <Entry
                                            name={`${entry.first} ${entry.last}`}
                                            email={entry.email}
                                            onclick={() => openPopup(entry)}
                                        />
                                    ))
                                ) : entries.length > 0 ? (
                                    entries.map((entry) => (
                                        <Entry
                                            name={`${entry.first} ${entry.last}`}
                                            email={entry.email}
                                            onclick={() => openPopup(entry)}
                                        />
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </section>
                    )}
                    <div className="flex space-x-8">
                        {adminPage ? (
                            <Button
                                label="Clear Entries"
                                onclick={clearEntries}
                            />
                        ) : (
                            <Button label="Add Entry" onclick={addEntry} />
                        )}
                        <Button
                            label={adminPage ? "Form" : "Admin Panel"}
                            secondary
                            onclick={() => {
                                setAdminPage(!adminPage);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

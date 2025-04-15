import React, { useEffect, useState } from "react";
import contactUs from "../../public/contact_us.jpg";
import { Shimmer } from "./Shimmer";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    setContactInfo({
      name: "",
      mobile: "",
      email: "",
      message: "",
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const isFormValid = Object.values(contactInfo).every(
    (value) => value.trim() !== ""
  );
  return (
    <div className="min-h-screen flex flex-col">
      {loading ? (
        <Shimmer className="flex-grow" />
      ) : (
        <div className="flex mx-auto my-4 p-4 w-full">
          <div className="w-[650px] flex items-center justify-center p-2 ">
            <img
              src={contactUs}
              alt={"Profile_image"}
              className="w-full h-full object-cover shadow-md rounded-md"
            />
          </div>

          <div className="w-2/2 ml-[100px]  px-3 mt-[50px] border">
            <div className="flex flex-wrap items-center mb-3">
              <span className="font-sans font-lg font-bold m-3 w-[80px] ">
                Name:
              </span>{" "}
              <input
                type="text"
                className="border border-solid border-black rounded-sm w-[300px] ml-4 p-1 "
                placeholder="Enter your Name"
                value={contactInfo?.name}
                name="name"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <span className="font-sans  inline-block  font-lg font-bold m-3 w-[100px] ">
                Mobile No:
              </span>{" "}
              <input
                type="text"
                className="border border-solid border-black rounded-sm w-[300px] ml-[0px] p-1 "
                value={contactInfo?.mobile}
                placeholder="Enter your Mobile Number"
                name="mobile"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <span className="font-sans   font-lg font-bold m-3 w-[80px] ">
                Email:
              </span>{" "}
              <input
                type="text"
                className="border border-solid border-black rounded-sm w-[300px] ml-5 p-1 "
                value={contactInfo?.email}
                placeholder="Enter your Email"
                name="email"
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <span className="font-sans   font-lg font-bold m-3 w-[100px] ">
                Message:
              </span>{" "}
              <textarea
                type="text"
                className="border border-solid border-black rounded-sm w-[300px] m-1 p-1 "
                value={contactInfo?.message}
                placeholder="Enter your Message"
                onChange={handleChange}
                name="message"
              ></textarea>
            </div>{" "}
            <div className="mt-10 ml-20 flex justify-center">
              <button
                className={`px-3 py-1 flex justify-center m-3 h-45 w-100 border rounded-md ${
                  !isFormValid
                    ? "bg-gray-300 border-gray-400 cursor-not-allowed" // Disabled state
                    : "bg-green-100 border-green-500" // Enabled state
                }`}
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                Submit
              </button>
            </div>
          </div>

          {modalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-red-200 p-6 rounded-lg shadow-lg w-[400px] border-2 border-red-400">
                {" "}
                <h3 className="text-lg font-bold text-center">
                  Form Submitted Successfully!
                </h3>
                <p className="text-center mt-2">
                  Your contact details have been received.
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Contact;

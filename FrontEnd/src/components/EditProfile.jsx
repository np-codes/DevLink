import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Edit_Profile_API } from "../apis/profileAPIS";

const EditProfile = ({ user, flipBack }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const [reviewMode, setReviewMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [fieldValues, setFieldValues] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const resetFields = () => {
    setReviewMode(false);
    setFieldValues("");
    setErrorMessage(null);
  };

  const handleSave = () => {
    const data = {
      ...fieldValues,
      skills: fieldValues.skills
        ? fieldValues.skills.split(",").map((skill) => skill.trim())
        : undefined,
    };
    Edit_Profile_API({
      data,
      dispatch,
      setErrorMessage,
      resetFields,
      flipBack,
    });
  };

  const getDisplayValue = (id, fallback, labelOnly = false) => {
    const value = reviewMode
      ? fieldValues[id] || fallback || id.toUpperCase()
      : fallback || id.toUpperCase(); 
    if(id.toUpperCase() === value) return value;
    return !labelOnly? `${id[0].toUpperCase() + id.slice(1)}: ${value}`: value;
  };

  const btncss =
    "sm:w-1/4 w-full sm:py-1 sm:py-2 sm:mx-2 sm:my-1 rounded-md border-2 bg-gradient-to-br from-blue-400 to-purple-300 text-white transition-all duration-200 shadow-lg hover:text-black hover:shadow-black hover:scale-105 ";
  const labelcss =
    "hover:px-2 hover:bg-gradient-to-br from-purple-300 to-purple-100   transition-all duration-200 hover:shadow-lg hover:text-black hover:shadow-black hover:scale-105";

  const fieldOnCard = (id, placeholder, title) => (
    <div key={id} className="w-full h-full">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-black mb-1"
      >
        {title}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg text-gray-700 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        value={fieldValues[id] ?? ""}
        onChange={(e) =>
          setFieldValues((prev) => ({
            ...prev,
            [id]: e.target.value,
          }))
        }
      />
    </div>
  );
//-------------------- bug --- if i click on any input type something and remove it and then save it then the new values will be sent to "" but i dont want that. i want initial values to be set in this case.
  const fields = [
    { id: "photoUrl", placeholder: "Enter image URL", title: "Photo URL" },
    { id: "lastName", placeholder: "Enter last name", title: "Last Name" },
    { id: "age", placeholder: "Enter age", title: "Age" },
    { id: "gender", placeholder: "Enter gender", title: "Gender" },
    { id: "skills", placeholder: "Comma separated", title: "Skills" },
  ];
  return (
    <div className="w-full px-2 md:px-4 max-h-screen overflow-y-auto">
      <div className="grid grid-cols-2 gap-4 py-4 w-full h-full ">
        <div className="flex justify-end-safe items-center md:col-start-1 md:col-end-2 py-4">
          <div className="w-100 max-w-md border-2 border-black rounded-2xl h-full">
            <div className="card w-full h-[600px] max-h-[calc(100vh-10rem)] bg-white shadow-xl hover:shadow-2xl hover:shadow-black rounded-2xl overflow-hidden transition duration-500 ease-in-out p-4 md:p-6 space-y-4 overflow-y-auto">
              <div className="flex flex-col gap-2 sm:gap-4 md:gap-4">
                {fields.map((field) =>
                  fieldOnCard(field.id, field.placeholder, field.title)
                )}

                {/* About */}
                <div className="w-full h-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-semibold text-black mb-1"
                  >
                    About
                  </label>
                  <textarea
                    id="about"
                    rows="4"
                    placeholder="Tell us about yourself"
                    className="w-full px-4 py-2 rounded-lg text-gray-700 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    value={fieldValues["about"] ?? ""}
                    onChange={(e) =>
                      setFieldValues((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-baseline items-center md:col-start-2 md:col-end-3 py-4">
          <div className="w-100 max-w-md border-2 border-black rounded-2xl h-full">
            <div className="card w-full h-[600px] max-h-[calc(100vh-10rem)] bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-black  transition duration-500 ease-in-out">
              <label
                className={`h-[250px] sm:h-[300px] md:h-[350px] w-full bg-gray-100 overflow-hidden shadow-lg transform transition-all duration-300 ease-in-out flex items-center justify-center hover:scale-95 hover:shadow-black hover:ring-2 hover:ring-black hover:rounded-xl`}
                htmlFor="photoUrl"
              >
                <img
                  src={getDisplayValue("photoUrl", photoUrl, true)}
                  alt="User"
                  className="object-cover w-full h-full hover:rounded-xl transition-transform duration-300 ease-in-out"
                />
              </label>
              <div className="card-body p-1 sm:p-2 md:p-3 space-y-1 sm:space-y-2 flex flex-col items-center">
                <h2 className="card-placeholder text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
                  {firstName + " "}
                  <label className={labelcss} htmlFor="lastName">
                    {getDisplayValue("lastName", lastName, true)}
                  </label>
                </h2>

                <label
                  htmlFor="about"
                  className={`text-gray-600 text-xs sm:text-sm ${labelcss} line-clamp-3 text-center max-w-[90%]`}
                  placeholder={about}
                >
                  {getDisplayValue("about", about, true)}
                </label>
                <div className="flex flex-col items-center gap-1 text-sm sm:text-base font-bold text-gray-700 border-t border-gray-200 pt-3">
                  <label htmlFor="age" className={labelcss}>
                    {getDisplayValue("age", age)}
                  </label>
                  <label htmlFor="gender" className={labelcss}>
                    {getDisplayValue("gender", gender)}
                  </label>
                  <label
                    htmlFor="skills"
                    className={`line-clamp-2 max-w-[90%] text-center ${labelcss}`}
                    placeholder={
                      Array.isArray(skills) ? skills.join(", ") : skills
                    }
                  >
                    {(() => {
                      const value = reviewMode ? fieldValues["skills"] : skills;
                      if (
                        !value ||
                        (Array.isArray(value)
                          ? value.length === 0
                          : value.trim?.() === "")
                      ) {
                        return "SKILLS";
                      }
                      return `Skills: ${
                        Array.isArray(value) ? value.join(", ") : value
                      }`;
                    })()}
                  </label>
                </div>
                <div className="text-red-600 font-semibold text-xs sm:text-sm px-4 text-center">
                  {errorMessage}
                </div>
              </div>
              <div className="card-actions flex flex-wrap justify-center gap-2 items-center pb-5 px-4 font-bold">
                <button
                  type="button"
                  className={btncss}
                  onClick={() => {
                    resetFields();
                    flipBack();
                  }}
                >
                  CANCEL
                </button>
                {fieldValues === "" ? null : errorMessage ? (
                  <button
                    type="button"
                    className={btncss}
                    onClick={() => {
                      setErrorMessage(null);
                    }}
                  >
                    Retry
                  </button>
                ) : (
                  <button
                    type="button"
                    className={btncss}
                    onClick={() => {
                      setReviewMode(!reviewMode);
                    }}
                  >
                    REVIEW
                  </button>
                )}
                <button
                  type="button"
                  className={btncss}
                  onClick={() => handleSave()}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

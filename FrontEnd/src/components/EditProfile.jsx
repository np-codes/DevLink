import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Edit_Profile_API } from "../utils/apis";

const EditProfile = ({ user, flipBack }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const [hoveredField, setHoveredField] = useState(null);
	const [reviewMode, setReviewMode] = useState(false);
	const [activeMode, setActiveMode] = useState(null);
	const [errorMessage, setErrorMessage] = useState()
	const [fieldValues, setFieldValues] = useState("");
	const dispatch = useDispatch()
  
	const handleFieldInteraction = (fieldname) => ({
    onMouseEnter: () => setHoveredField(fieldname),
    onMouseLeave: () => setHoveredField(null),
    onClick: () => setActiveMode(fieldname),
  });

	const resetFields = () => {
    setHoveredField(null);
    setReviewMode(false);
    setActiveMode(null);
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
		Edit_Profile_API({data, dispatch, setErrorMessage, resetFields, flipBack})
	}

	const shouldShowField = (fieldname) => {
		const originalValues = { lastName, age, skills, photoUrl, about, gender };
    const hasChanged =
      reviewMode &&
      fieldValues?.[fieldname] !== undefined &&
      fieldValues?.[fieldname] !== originalValues?.[fieldname];

    return hoveredField === fieldname || activeMode === fieldname || hasChanged;
  };	

  const appearancecss = (fieldname) => {
				return `transform transition-all duration-500 ease-in-out ${
          shouldShowField(fieldname)
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`;
	}

	const btncss =
    "w-1/4 py-2 mx-2 rounded-md border-2 bg-gradient-to-br from-blue-400 to-purple-300 text-white transition-all duration-200 shadow-lg hover:text-black hover:shadow-black hover:scale-105"; 
  const gridboxcss =
    "bg-gradient-to-br from-purple-300 to-purple-100 rounded-3xl shadow-2xl shadow-black p-8 w-full max-w-md mx-auto backdrop-blur-md border-2 border-black";
  const fieldsetcss =
    "relative border-2 border-black rounded-2xl p-6 bg-gradient-to-br from-white/30 to-purple-100/30 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-purple-300";
  const legendcss =
    "px-4 text-lg font-semibold text-black bg-white/70 backdrop-blur-md rounded-md shadow-lg shadow-black -ml-2 -mt-6";
  const inputcss =
    "mt-4 w-full px-5 py-3 text-base text-black placeholder-black bg-white/80 rounded-xl border border-black shadow-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 hover:shadow-lg";
  const labelcss =
    "hover:px-2 hover:bg-gradient-to-br from-purple-300 to-purple-100   transition-all duration-200 hover:shadow-lg hover:text-black hover:shadow-black hover:scale-105";
	
  const sharedinput = (id, title) => (
    <div className={appearancecss(id)}>
      {(shouldShowField(id)) && (
        <div className={gridboxcss}>
          <fieldset className={fieldsetcss}>
            <legend className={legendcss}>{title}</legend>
            <input
              id={id}
              type="text"
              className={inputcss}
              placeholder="Click And Start Typing.."
							value={fieldValues[id] ?? ""}
							onChange={(e) => setFieldValues((prev) => ({...prev, [id]: e.target.value}))}
            />
          </fieldset>
        </div>
      )}
    </div>
  );
  const fieldsLeft = [
    { id: "lastName", title: "Enter Your Last Name" },
    { id: "age", title: "Enter Your Age" },
    { id: "skills", title: "Enter Your Skills" },
  ];
  const fieldsRight = [
    { id: "photoUrl", title: "Enter Your PhotoURL" },
    { id: "about", title: "Enter About Yourself" },
    { id: "gender", title: "Enter Your Gender" },
  ];
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3  w-full h-full">
        <div className="w-full h-full col-start-1 col-end-2 grid grid-flow-col grid-rows-3 gap-4 py-5 ">
          {fieldsLeft.map((field) => (
            <div key={field.id}> {sharedinput(field.id, field.title)} </div>
          ))}
        </div>
        <div className="w-full h-full col-start-3 col-end-4 grid grid-flow-col grid-rows-3 gap-4 py-5">
          {fieldsRight.map((field) => (
            <div key={field.id}> {sharedinput(field.id, field.title)} </div>
          ))}
        </div>
        <div className="absolute  inset-0 backface-hidden flex justify-center items-center">
          <div className="card max-w-96 max-h-[600px] bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-black  transition duration-500 ease-in-out">
            <label
              className={`h-90 bg-gray-100 overflow-hidden rounded-xl  shadow-lg transform transition-all duration-300 ease-in-out hover:scale-90 hover:shadow-black  hover:ring-2 hover:ring-black`}
              htmlFor="photoUrl"
              {...handleFieldInteraction("photoUrl")}
            >
              <img
                src={photoUrl}
                alt="User"
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out"
              />
            </label>
            <div className="card-body p-5 space-y-2 flex flex-col items-center">
              <h2 className="card-title text-3xl font-semibold text-gray-800">
                {firstName}
                <label
                  className={labelcss}
                  htmlFor="lastName"
                  {...handleFieldInteraction("lastName")}
                >
                  {lastName || "LASTNAME"}
                </label>
              </h2>

              <label
                htmlFor="about"
                className={`text-gray-600 text-sm  ${labelcss}`}
                {...handleFieldInteraction("about")}
              >
                {about ? `About: ${about}` : "ABOUT"}
              </label>
              <div className="flex flex-col items-center gap-0.5 font-bold text-base text-gray-700 border-t border-gray-200 pt-3">
                <label
                  htmlFor="age"
                  className={labelcss}
                  {...handleFieldInteraction("age")}
                >
                  {age ? `Age: ${age}` : "AGE"}
                </label>
                <label
                  htmlFor="gender"
                  className={labelcss}
                  {...handleFieldInteraction("gender")}
                >
                  {gender ? `Gender: ${gender}` : "GENDER"}
                </label>
                <label
                  htmlFor="skills"
                  className={labelcss}
                  {...handleFieldInteraction("skills")}
                >
                  {skills != 0
                    ? `Skills: ${
                        Array.isArray(skills) ? skills.join(", ") : skills
                      }`
                    : "SKILLS"}
                </label>
              </div>
              <div className="text-red-600 font-semibold text-sm px-4 text-center">
                {errorMessage}
              </div>
            </div>
            <div className="card-actions justify-center-safe flex items-center pb-5 px-4 font-bold">
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
                    setErrorMessage(null)
                    setActiveMode(null);
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
                    setActiveMode(null);
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
  );
};

export default EditProfile;

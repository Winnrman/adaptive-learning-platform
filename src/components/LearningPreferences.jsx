import React, { useState } from "react";

const LearningPreferences = ({ handleContinue }) => {
  const [selectedSpeed, setSelectedSpeed] = useState(null);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const toggleReason = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const isComplete = selectedSpeed && selectedReasons.length > 0 && selectedTime;

  const preferenceBlock = (title, options, selected, toggleFn, multiple = false) => (
    <div className="mb-6">
      <h2 className="text-md mb-3">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = multiple
            ? selected.includes(option)
            : selected === option;

          return (
            <div
              key={option}
              onClick={() => toggleFn(option)}
              className={`cursor-pointer px-3 py-2 text-sm rounded-xl shadow-sm transition ${
                isSelected ? "border border-transparent bg-blue-900 text-white" : "border border-gray-300 bg-white hover:bg-gray-100"
              }`}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className = "w-screen h-screen flex flex-col justify-center items-center p-4">
        <h1 className="text-lg font-semibold mb-4">
        Great! Now that we've got your interests, let's dive into your learning preferences.
      </h1>

    <div className="max-w-2xl mx-auto p-6">
      {preferenceBlock(
        "What is your preferred learning speed?",
        ["Slow & steady", "Balanced", "Intensive"],
        selectedSpeed,
        setSelectedSpeed
      )}

      {preferenceBlock(
        "Why are you learning Japanese?",
        ["Travel", "Hobby", "Work", "Relationships", "School", "Anime/Games"],
        selectedReasons,
        toggleReason,
        true
      )}

      {preferenceBlock(
        "How much time do you want to devote per week?",
        ["5 minutes", "15 minutes", "30 minutes", "1 hour", "More than 1 hour"],
        selectedTime,
        setSelectedTime
      )}

      {isComplete && (
        <>
          <hr className="w-full border border-gray-300 my-6" />
          <div className="flex w-full justify-end">
            <button
              className="px-6 py-2 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 transition"
              onClick={() => handleContinue({
                speed: selectedSpeed,
                reasons: selectedReasons,
                time: selectedTime,
              })}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default LearningPreferences;

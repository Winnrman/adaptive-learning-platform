import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LearningPreferences = ({ handleContinue }) => {
  const [selectedSpeed, setSelectedSpeed] = useState(null);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [lessonPlan, setLessonPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  //retrieve the interests which were passed through the state
  const { selectedInterests } = location.state || {};

  const toggleReason = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const isComplete = selectedSpeed && selectedReasons.length > 0 && selectedTime;

  const fetchLessonPlan = async (preferences) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //send the interests as well as the preferences
        body: JSON.stringify({
          ...preferences,
          interests: selectedInterests,
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch lesson plan');
      }
      const data = await response.json();
      setLessonPlan(data);
      // Optionally pass lesson plan to parent via handleContinue
      handleContinue(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    }
    
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc ml-6">
          {content.map((item, index) => (
            <li key={index}>{renderContent(item)}</li>
          ))}
        </ul>
      );
    }
  
    if (typeof content === 'object') {
      return Object.keys(content).map((key) => (
        <div key={key} className="mb-4">
          <h5 className="font-semibold text-md">{key}:</h5>
          {renderContent(content[key])}
        </div>
      ));
    }
  
    return null;
  };

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
              onClick={() => fetchLessonPlan({
                speed: selectedSpeed,
                reasons: selectedReasons,
                time: selectedTime,
              })}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Continue'}
            </button>
          </div>
        </>
      )}

      {error && (
        <div className="text-red-600 mt-4">
          Error: {error}
        </div>
      )}

{lessonPlan && (
  <div className="mt-6 p-4 border rounded bg-gray-100">
    <h3 className="text-lg font-semibold mb-4">Lesson Plan</h3>
    {renderContent(lessonPlan)}
  </div>
)}

    </div>
    </div>
  );
};

export default LearningPreferences;

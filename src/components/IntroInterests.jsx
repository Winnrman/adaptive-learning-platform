import React, { useState } from "react";

const IntroInterests = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");

  const commonInterests = [
    "Anime",
    "Manga",
    "Video Games",
    "Programming",
    "Woodworking",
    "Cooking",
    "Travel",
    "Photography",
    "Music",
    "Drawing",
    "Fitness",
    "Fashion",
    "History",
    "Science",
    "Technology",
    "Books",
    "Comics",
    "Movies",
    "Hiking",
    "Martial Arts",
    "Cats",
    "Dogs",
    "Art",
    "Dance",
    "Podcasts",
    "Meditation",
    "Yoga",
    "Business",
    "Finance",
    "K-Pop",
    "J-Pop",
    "Cosplay",
    "Fantasy",
    "Horror",
    "Sports",
    "Skateboarding",
    "Gardening",
    "DIY",
    "Astrology",
    "Language Learning",
    "Writing",
    "Poetry",
    "Board Games",
    "Esports",
    "Streetwear",
    "Tea",
    "Coffee",
    "Philosophy",
  ];

  const handleInterestClick = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const filteredInterests = commonInterests.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedInterests = filteredInterests.slice(0, visibleCount);

  const handleContinue = () => {
    console.log("Selected interests:", selectedInterests);
    // further logic here (API, routing, etc.)
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center p-4">
      <h1 className="text-lg font-semibold mb-4">
        Welcome to the platform, Andre! Before we can begin, we need to know a
        bit about you.
      </h1>

      <div className="flex w-2/3 flex-row gap-2 justify-center items-center">
        <input
          type="text"
          placeholder="What are you interested in?"
          className="sm:w-1/2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          className="p-2 px-4 bg-blue-900 rounded-md text-white font-semibold"
          onClick={handleContinue}
        >
          Add
        </button>
      </div>

      {/* <p className = "text-xs text-slate-500">Entering your interests will help us personalize your experience and create a customized learning journey.</p> */}

      {/* if there are no matching interests, display a message */}
      {filteredInterests.length === 0 ? (
        <p className="text-xs text-slate-500">
          No matching interests found. Try another keyword.
        </p>
      ) : (
        <p className="text-xs text-slate-500">
          Click or enter any interest to select it – you can pick as many as
          you'd like.
        </p>
      )}

      <div className="interests flex flex-wrap justify-center gap-2 max-w-4xl">
        {displayedInterests.map((interest, index) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <div
              key={index}
              id={interest}
              role="button"
              aria-pressed={isSelected}
              aria-label={`Interest: ${interest}, Pressed: ${isSelected}`}
              onClick={() => handleInterestClick(interest)}
              className={`cursor-pointer px-2 py-1 text-sm rounded-xl shadow-sm transition ${isSelected ? 'border text-white border-transparent bg-blue-900' : 'border border-gray-300 bg-white hover:bg-gray-100'}`}

            >
              {interest}
            </div>
          );
        })}
      </div>

      {visibleCount < filteredInterests.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 12)}
          className="mt-4 hover:cursor-pointer px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          Show More
        </button>
      )}

{selectedInterests.length > 0 && (
  <>
    {/* <hr className="w-1/2 h-0.5 border border-gray-300" /> */}
    <div className="flex flex-row gap-2 mt-4 justify-between">
      <div className="w-full bg-transparent p-2"></div>
      <button
        className="px-6 py-2 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 transition"
        onClick={() => handleContinue(true)}
      >
        Continue
      </button>
    </div>
  </>
)}


    </div>
  );
};

export default IntroInterests;

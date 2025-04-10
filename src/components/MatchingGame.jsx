import React, { useState } from 'react';

const hiraganaDictionary = {
  "sushi": "sushi",
  "gohan": "meal/rice",
};

//TODO: we need to connect this to metrics so it can be tracked

const MatchingGame = () => {
  const [matches, setMatches] = useState({});

  const handleMatch = (romanji, english) => {
    if (hiraganaDictionary[romanji] === english) {
      setMatches(prev => ({ ...prev, [romanji]: true }));
    }
  };

  return (
    <div className = "w-full h-full m-12 bg-slate-100 rounded-full">
        <h1>Matching Game</h1>
        <p>Match the hiragana to the english</p>

        {/* two rows, one english and one hiragana */}
    </div>
  );
};

export default MatchingGame;

import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

const UnderlineComponent = () => {
  const [translations, setTranslations] = useState({});
  const [hoveredWord, setHoveredWord] = useState(null);

  const phrase = "sushi to gohan kudasai";

  const getTranslation = async (word) => {
    if (!word) return "No word provided";
    
    // Return cached translation immediately if available
    if (translations[word]) {
      return translations[word];
    }

    try {
      const response = await fetch("http://localhost:3001/romanji", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ romanji: word }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      if (data?.translation) {
        setTranslations((prev) => ({ 
          ...prev, 
          [word]: data.translation 
        }));
        return data.translation;
      }
      return "No translation available";
    } catch (error) {
      console.error("Translation fetch failed:", error);
      return "Translation service unavailable";
    }
  };

  const handleMouseEnter = async (word) => {
    if (!word) return;
    
    setHoveredWord(word);
    const translation = await getTranslation(word);
    if (translation && !translations[word]) {
      setTranslations(prev => ({ ...prev, [word]: translation }));
    }
  };

  return (
    <div className="underline-component border-2 flex items-center border-black px-4 py-2 w-fit rounded-md">
        {phrase.split(" ").map((word, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="px-0.5 text-xs hover:cursor-pointer underline"
                  onMouseEnter={() => handleMouseEnter(word)}
                >
                  {word}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{translations[word] || "Loading..."}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
    </div>
  );
};

export default UnderlineComponent;

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

  const phrase = "Sushi to gohan kudasai.";

  const getTranslation = async (word) => {
    console.log("Accessing local translation for:", word);
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

      const data = await response.json();
      if (data.translation) {
        setTranslations((prev) => ({ ...prev, [word]: data.translation }));
        console.log("Fetched translation:", data.translation);
        return data.translation;
      }
    } catch (error) {
      console.error("Error fetching translation:", error);
    }

    return "Translation not found";
  };

  const handleMouseEnter = async (word) => {
    setHoveredWord(word);
    await getTranslation(word);
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
                <p>
                  {hoveredWord === word
                    ? translations[word] || "Loading..."
                    : ""}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
    </div>
  );
};

export default UnderlineComponent;

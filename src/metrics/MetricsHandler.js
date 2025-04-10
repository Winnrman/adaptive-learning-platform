//This file is for all the metrics handling functions. It organizes the metrics into AI-friendly formats which can be interpreted by the AI for a better adaptive learning experience.

// --Underline Component Metrics --
//number of hovers
//number of clicks
//total time spent on component
let numberOfHovers = 0;
let numberOfClicks = 0;
let totalTimeSpentOnComponent = 0;

UnderlineDifficulty = numberOfHovers * 0.1 + numberOfClicks * 0.1 + totalTimeSpentOnComponent * 0.1;

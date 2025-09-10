## How to Run Project:
1. Run `npm run dev` command to run the frontend
2. Run `node src/server.js` to run the backend server for API requests
3. Run `python3 src/python-server.py` to run the flask server (Connects to Ollama local instance) 

## Goals
- tracking metrics
- adaptive AI which learns the user's proficiency and adjusts the difficulty level accordingly.

### April 16, 2025
- Added new UI page (onboarding) for users to select / add their interests. This connects to the next step which is telling the AI what they want to learn.

### April 25, 2025
- Incorporated the AI to generate the lesson plan based on the user's interests and hobbies.
- BUGS: Lesson plan created is not specific enough and does not adhere to the user's interests.
from flask import Flask, jsonify, request
import ollama
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate-lesson-plan', methods=['POST'])
def generate_lesson_plan():
    try:
        data = request.get_json()
        print(data)
        if not data:
            return jsonify({"error": "Invalid input data"}), 400
        
        # Compose prompt for lesson plan generation using user's preferences
        prompt = (
    "Create a detailed and engaging beginner-level Japanese lesson plan tailored to the following learner profile:\n"
    f"- Learning speed: {data.get('speed', 'N/A')}\n"
    f"- Reason for learning: {', '.join(data.get('reasons', []))}\n"
    f"- Weekly study time: {data.get('time', 'N/A')}\n"
    f"- Interests: {', '.join(data.get('interests', []))}\n\n"
    "The lesson plan should:\n"
    "- Be structured, clear, and actionable for a casual learner.\n"
    "- There should be no mention of textbooks, or external resources such as 'Online platform'\n"
    "- Emphasize fun, curiosity, and motivation rather than intensity unless otherwise stated.\n"
    "- [SUPER IMPORTANT!!] Incorporate vocabulary, examples, or themes from the learner's interests (e.g., anime, programming, photography).\n"
    "- Fit within the time constraints of the learner.\n"
    "Output only the Week 1 lesson. Use headings and bullet points to make it easy to follow."
)


        print(prompt)
        
        # Generate response from Ollama model
        response = ollama.generate(
            model='gwen:14b',
            prompt=prompt
        )
        
        lesson_plan_text = response.response
        
        return jsonify({"lesson_plan": lesson_plan_text})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# @app.route('/generate-tags', methods=['POST'])
# def tag_generator():
#     try:
#         # Extract input data
#         data = request.get_json()
#         if not data or 'text' not in data:
#             return jsonify({"error": "Invalid input data"}), 400
        
#         # Generate response from Ollama model
#         response = ollama.generate(
#             model='gwen:14b', 
#             prompt=f"Create (max of 6) single-word tags for this entry: '{data['text']}'"
#         )
        
#         # Access the 'response' field
#         raw_response = response.response
        
#         # Extract tags from the response
#         tags = []
#         # Split by the first newline and focus on the second part (the list)
#         if "\n" in raw_response:
#             tags_section = raw_response.split("\n", 1)[1].strip()  # Get everything after the first newline
#             # Process each line (assuming each tag is prefixed with a number and a period)
#             tags = [
#                 line.split(".", 1)[1].strip().replace("**", "").replace("`", "")  # Remove '**' and '`' and extract tag

                
#                 for line in tags_section.split("\n") 
#                 if line.strip().startswith(tuple(map(str, range(1, 10))))  # Check if it starts with a number
#             ]

#             print(tags)
        
#         return jsonify({"tags": tags})
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000)

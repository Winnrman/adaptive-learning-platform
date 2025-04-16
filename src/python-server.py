from flask import Flask, jsonify, request
import ollama
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate-tags', methods=['POST'])
def tag_generator():
    try:
        # Extract input data
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"error": "Invalid input data"}), 400
        
        # Generate response from Ollama model
        response = ollama.generate(
            model='gwen:14b', 
            prompt=f"Create (max of 6) single-word tags for this entry: '{data['text']}'"
        )
        
        # Access the 'response' field
        raw_response = response.response
        
        # Extract tags from the response
        tags = []
        # Split by the first newline and focus on the second part (the list)
        if "\n" in raw_response:
            tags_section = raw_response.split("\n", 1)[1].strip()  # Get everything after the first newline
            # Process each line (assuming each tag is prefixed with a number and a period)
            tags = [
                line.split(".", 1)[1].strip().replace("**", "").replace("`", "")  # Remove '**' and '`' and extract tag

                
                for line in tags_section.split("\n") 
                if line.strip().startswith(tuple(map(str, range(1, 10))))  # Check if it starts with a number
            ]

            print(tags)
        
        return jsonify({"tags": tags})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000)

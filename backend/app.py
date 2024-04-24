from flask import Flask, request
from flask_cors import CORS
from crawler import crawler

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

@app.route('/results', methods=['POST'])
def get_results():
    query = request.json.get('query')
    links = crawler(query)
    return links

if __name__ == '__main__':
    app.run(debug=True)

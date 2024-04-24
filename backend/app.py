from flask import Flask, request, jsonify
from flask_cors import CORS
from crawler import crawler, get_world_ranking

app = Flask(__name__)
CORS(app)

@app.route('/searchResults', methods=['POST'])
def get_results():
    query = request.json.get('query')
    results = crawler(query)
    return jsonify(results)

@app.route('/universityRanking', methods=['POST'])
def get_ranking():
    ranking_type = request.json.get('type')
    ranking = get_world_ranking(ranking_type)
    return jsonify(ranking)

if __name__ == '__main__':
    app.run(debug=True)

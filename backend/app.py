from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from crawler import crawler, get_world_ranking

app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app)

@app.route('/searchResults', methods=['POST'])
#@cross_origin()
def get_results():
    query = request.json.get('query')
    results = crawler(query)
    return jsonify(results)

@app.route('/universityRanking', methods=['GET'])
#@cross_origin()
def get_ranking():
    ranking = get_world_ranking()
    return jsonify(ranking)
    #return "teste"

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from functions import crawler, rankings, university_list

app = Flask(__name__)
CORS(app)

@app.route('/searchResults', methods=['POST'])
def get_results():
    query = request.json.get('query')
    results = crawler(query)
    return jsonify(results)

@app.route('/universityRanking', methods=['POST'])
def get_ranking():
    subject = request.json.get('subject')
    country = request.json.get('country')
    subject = "" if subject is None else subject
    country = "" if country is None else country
    if (subject != "" or country != ""):
        ranking = rankings(subject, country)
        return jsonify(ranking)
    else:
        return jsonify([])

@app.route('/universityList', methods=['POST'])
def get_university_list():
    country = request.json.get('country')
    name = request.json.get('name')
    universities = university_list(country, name)
    return jsonify(universities)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=False)
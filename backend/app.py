from flask import Flask, request, jsonify
from flask_cors import CORS
from functions import crawler, rankings, university_list

load_from_csv = False
is_check_rankings = True
max_university_list_length = 500

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
        ranking = rankings(subject, country, load_from_csv)
        return jsonify(ranking)
    else:
        return jsonify([])

@app.route('/universityList', methods=['POST'])
def get_university_list():
    country = request.json.get('country')
    name = request.json.get('name')
    universities = university_list(country, name, is_check_rankings, load_from_csv, max_university_list_length)
    return jsonify(universities)


if __name__ == '__main__':
    app.run(port=5000, debug=False)
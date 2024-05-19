import requests
from bs4 import BeautifulSoup
from urllib.parse import urlencode, urlunparse
from fuzzywuzzy import fuzz
import time
import csv


subjects = {
    "Computer Science": "&area=1700",
    "Engineering": "&area=2200",
    "Mathematics": "&area=2600",
    "Medicine": "&area=2700",
    "Business Management and Accounting": "&area=1400",
    "Social Sciences": "&area=3300",
    "Law": "&area=3308",
    "Communication": "&area=3315"
}

countries = {
    "World": "",
    "China": "&country=CHN",
    "Ethiopia": "&country=ETH",
    "France": "&country=FRA",
    "Germany": "&country=DEU",
    "Ghana": "&country=GHA",
    "Indonesia": "&country=IDN",
    "Malaysia": "&country=MYS",
    "Mexico": "&country=MEX",
    "Norway": "&country=NOR",
    "Portugal": "&country=PRT",
    "Singapore": "&country=SGP",
    "Spain": "&country=ESP",
    "Sweden": "&country=SWE",
    "United Kingdom": "&country=GBR",
    "United States": "&country=USA",
}

bingHeaders = {
    #"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
    #"Referer": "https://www.bing.com/search?",
    "Accept-Language": "en;q=0.7,en-US;q=0.6,en-GB;q=0.5",
    #"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
}

def crawler(query):
    def extract_links(soup):
        links = []
        for result in soup.find_all('li', class_="b_algo"):
            title = result.find('h2').get_text()
            link = result.find('a')['href']
            description = result.find('p').get_text() if result.find('p') else None
            links.append({"title": title, "link": link, "description": description})
        return links

    for keyword in ["university", "degree", "course"]:
        if keyword not in query.lower():
            adjusted_query = query + " " + keyword
            params = {"q": adjusted_query}
            url = "https://www.bing.com/search?" + urlencode(params)
            print(url)

            time.sleep(3)
            response = requests.get(url)

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                links = extract_links(soup)
                if links:
                    return links

    # Retry with the original query
    params = {"q": query}
    url = "https://www.bing.com/search?" + urlencode(params)
    print(url)

    time.sleep(3)
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        return extract_links(soup)

    print("Failed to retrieve page:", response.status_code)
    return []


def rankings(subject, country):
    base_url = "https://www.scimagoir.com/rankings.php?sector=Higher+educ."
    if subject != "":
        url = base_url + subjects[subject]
        if country != "":
            url += countries[country]
    elif country != "":
            url = base_url + countries[country]

    universities = []

    print(url)

    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        table = soup.find('table', id='tbldata')

        if table:
            rows = table.find_all('tr')[1:] if (country == "World" or (country != "" and subject == "")) else table.find_all('tr')
            
            for index, row in enumerate(rows):
                cells = row.find_all('td')
                if not cells:
                    continue
                university_name = cells[2].text.strip()
                if (university_name[len(university_name) - 1] == "*"):
                    university_name = university_name[0: len(university_name) - 2]
                university_country = cells[3].text.strip()
                universities.append({"name": university_name, "rank": index + 1, "country": university_country})
        else:
            print("Table not found on the page.")
    else:
        print("Failed to retrieve page:", response.status_code)

    return universities


def are_same_university(university1, university2):
    similarity_score = fuzz.token_sort_ratio(university1, university2)
    return similarity_score >= 95  # Adjust the threshold as needed


def university_list(country, name, is_check_rankings, load_from_csv, max_university_list_length):
    if not load_from_csv or name != "":
        api_url = "http://universities.hipolabs.com/search?"

        if country != "":
            api_url += "country=" + country
            if name != "":
                api_url += "&name=" + name
        elif name != "":
            api_url += "name=" + name

        response = requests.get(api_url)

        if response.status_code == 200:
            data = response.json()

            if is_check_rankings:
                check_rankings(country, data, load_from_csv)

            data = sorted(data, key=sort_key)
            return data[0:max_university_list_length + 1]
        else:
            print("Error:", response.status_code)
    
    else:
        data = load_csv(f"universities lists/{country}.csv")
        if is_check_rankings:
            check_rankings(country, data, load_from_csv)
        data = sorted(data, key=sort_key)
        return data[0:max_university_list_length + 1]


def check_rankings(country, unis, load_from_csv):
    world_ranking = load_csv('rankings/World.csv') if load_from_csv else rankings("", country)
    if country and country != "" and country != "World":
        country_ranking = load_csv(f'rankings/{country}.csv') if load_from_csv else rankings("", country)
        country_ranking_dict = {item['University']: item['Rank'] for item in country_ranking}
    else:
        country_ranking = None
        country_ranking_dict = None

    for uni in unis:
        uni_name = uni["name"]
        uni_rank = None
        uni_name_dict = None

        for index, item in enumerate(world_ranking):
            item_name = item["University"] if load_from_csv else item["name"]
            if are_same_university(item_name, uni_name):
                uni_rank = item['Rank'] if load_from_csv else item['rank']
                uni_name_dict = item_name
                break

        uni["world_rank"] = uni_rank
        
        """country_rank = None
        if country_ranking is not None:
            for index2, item2 in enumerate(country_ranking):
                item_name2 = item2["University"] if load_from_csv else item2["name"]
                if are_same_university(item_name2, uni_name):
                    country_rank = item2['Rank'] if load_from_csv else item2['rank'] 
                    break

            uni["country_rank"] = country_rank"""
        
        country_rank = None
        if country_ranking is not None:
            if uni_name_dict is not None and uni_name_dict in country_ranking_dict:
                country_rank = country_ranking_dict[uni_name_dict]
            
            else:
                for index2, item2 in enumerate(country_ranking):
                    item_name2 = item2["University"] if load_from_csv else item2["name"]
                    if are_same_university(item_name2, uni_name):
                        country_rank = item2['Rank'] if load_from_csv else item2['rank'] 
                        break

            uni["country_rank"] = country_rank


def sort_key(univ):
    def safe_float(value):
        try:
            return float(value)
        except (TypeError, ValueError):
            return float('inf')

    world_rank = safe_float(univ["world_rank"])
    country_rank = safe_float(univ["country_rank"])
    return (world_rank, country_rank)

def load_csv(filename):
    data = []
    with open(filename, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data


def save_to_csv(data, filename, ranking):
    if ranking:
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['Rank', 'University', 'Country']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for item in data:
                writer.writerow({'Rank': item['rank'], 'University': item['name'], 'Country': item['country']})
    else:
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ["name", "country", "alpha_two_code", "web_pages"]
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for item in data:
                writer.writerow({'name': item['name'], 'country': item['country'], 'alpha_two_code': item['alpha_two_code'], 'web_pages': item['web_pages'][0]})




"""for country in countries:
    data = rankings("", country)
    save_to_csv(data, f'./rankings/{country}.csv', True)"""

"""for country in countries:
    universities_list = university_list(country, "", False, False)
    save_to_csv(universities_list, f'./universities lists/{country}.csv', False)"""
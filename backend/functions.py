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

    for keyword in ["university", "college", "degree", "course", "school"]:
        if keyword not in query.lower():
            adjusted_query = query + " " + keyword
            params = {"q": adjusted_query}
            url = "https://www.bing.com/search?" + urlencode(params)
            print(url)

            time.sleep(3)
            response = requests.get(url, headers=bingHeaders)

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
    response = requests.get(url, headers=bingHeaders)

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
        url = base_url + countries[country]

    universities = []

    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        table = soup.find('table', id='tbldata')

        if table:
            rows = table.find_all('tr')[1:] if (country == "World" or country != "") else table.find_all('tr')
            
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
    return similarity_score >= 90  # You can adjust the threshold as needed


def university_list(country, name):
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

        world_ranking = load_csv('rankings/World.csv')
        country_ranking = None

        for uni in data:
            uni_name = uni["name"]
            uni_rank = None

            for index, item in enumerate(world_ranking):
                if are_same_university(item['University'], uni_name):
                    uni_rank = item['Rank']
                    break
            
            uni["world_rank"] = uni_rank
            
            if uni_rank is None and country and country != "":
                if country_ranking is None:
                    country_ranking = load_csv(f'rankings/{country}.csv')

                for index2, item2 in enumerate(country_ranking):
                    if are_same_university(item2['University'], uni_name):
                        uni_rank = item2['Rank']
                        break

                uni["country_rank"] = uni_rank

        """world_ranking = rankings("", "World")

        for uni in data:
            uni_name = uni["name"]
            uni_rank = None

            for index, item in enumerate(world_ranking):
                if are_same_university(item['name'], uni_name):
                    uni_rank = index + 1
                    break
            
            if uni_rank == None:
                #print("n encontrei vou ver no país")
                country_ranking = rankings("", country)
                for index2, item2 in enumerate(country_ranking):
                    #print(uni_name, item2)
                    if are_same_university(item2['name'], uni_name):
                        uni_rank = index2 + 1
                        break

            uni["world_rank"] = uni_rank"""

        return data
    else:
        print("Error:", response.status_code)


def load_csv(filename):
    data = []
    with open(filename, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data


def save_to_csv(data, filename):
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Rank', 'University', 'Country']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for item in data:
            writer.writerow({'Rank': item['rank'], 'University': item['name'], 'Country': item['country']})




#for country in countries:
    #data = rankings("", country)
    #save_to_csv(data, f'./rankings/{country}.csv')
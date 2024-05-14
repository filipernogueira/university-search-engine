import requests
from bs4 import BeautifulSoup
from urllib.parse import urlencode, urlunparse

bingHeaders = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
}

def crawler(query):
    query += " university"
    url = urlunparse(("https", "www.bing.com", "/search", "", urlencode({"q": query}), ""))

    response = requests.get(url, headers=bingHeaders)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        links = []
        for result in soup.find_all('li', class_="b_algo"):
            title = result.find('h2').get_text()
            link = result.find('a')['href']
            description = result.find('p').get_text() if result.find('p') else None
            links.append({"title": title, "link": link, "description": description})

        return links
    else:
        print("Failed to retrieve page:", response.status_code)


def rankings(ranking_type):
    base_url = "https://www.scimagoir.com/rankings.php?sector=Higher+educ."

    ranking_types = {
        "World": "",
        "Computer Science": "&area=1700",
        "Engineering": "&area=2200",
        "Mathematics": "&area=2600",
        "Medicine": "&area=2700",
        "Business Management and Accounting": "&area=1400",
        "Social Sciences": "&area=3300",
        "Law": "&area=3308",
        "Communication": "&area=3315"
    }

    url = base_url + ranking_types[ranking_type]

    universities = []

    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        table = soup.find('table', id='tbldata')

        if table:
            rows = table.find_all('tr')[1:] if ranking_type == "World" else table.find_all('tr')
            
            for row in rows:
                cells = row.find_all('td')
                university_name = cells[2].text.strip()
                if (university_name[len(university_name) - 1] == "*"):
                    university_name = university_name[0: len(university_name) - 2]
                university_country = cells[3].text.strip()
                universities.append({"name": university_name, "country": university_country})
        else:
            print("Table not found on the page.")
    else:
        print("Failed to retrieve page:", response.status_code)

    return universities

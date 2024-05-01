import requests
from bs4 import BeautifulSoup


def crawler(query):
    query = query.replace(" ", "+")
    url = "https://www.google.com.hk/search?q=" + query

    links = []
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        link_elements = soup.find_all('a', href=True)
          
        for link in link_elements:
            href = link['href']
            
            if href.startswith('/url?q='):
                # Extracting the URL from the Google link format
                clean_link = href.split('/url?q=')[1].split('&sa=')[0]
                links.append({"title": link.text, "link": clean_link})

        return links
    else:
        print("Failed to retrieve page:", response.status_code)


def rankings(ranking_type):
    if ranking_type == "world":
        url = "https://www.scimagoir.com/rankings.php?sector=Higher%20educ."
    elif ranking_type == "cs":
        url = "https://www.scimagoir.com/rankings.php?sector=Higher+educ.&area=1700"

    universities = []

    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        table = soup.find('table', id='tbldata')

        if table:
            rows = table.find_all('tr')[1:] if ranking_type == "world" else table.find_all('tr')
            
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


def top_universities():
    url = "https://csrankings.org/#/index?all&world"

    results = []

    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        #print(soup.prettify())

        table = soup.find('table', id="ranking")
        print(soup)

        if table:
            #print("hey")
            rows = table.find_all('tr')
            #print(rows)
            for row in rows:
                cells = row.find_all('td')
                print(cells)
                break
                """university_name = cells[2].text.strip()
                if (university_name[len(university_name) - 1] == "*"):
                    university_name = university_name[0: len(university_name) - 2]
                university_country = cells[3].text.strip()
                universities.append({"name": university_name, "country": university_country})"""

        #return results
    else:
        print("Failed to retrieve page:", response.status_code)

    return results


#print(top_universities())
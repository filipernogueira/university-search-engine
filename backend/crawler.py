import requests
from bs4 import BeautifulSoup

def crawler(query):
    site = "https://www.google.com.hk/search?q="
    url = site + query

    links = []
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all links on the page
        link_elements = soup.find_all('a', href=True)  # Select only <a> tags with href attribute
        
        links_collected = 0
        
        for link in link_elements:
            if links_collected >= 10:
                break
            
            href = link['href']
            
            # Check if it's a valid URL
            if href.startswith('http'):
                links.append(href)
                links_collected += 1
        
        return links
    else:
        print("Failed to retrieve page:", response.status_code)

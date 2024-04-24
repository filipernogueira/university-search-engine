import requests
from bs4 import BeautifulSoup

def crawler(query):
    print("query:", query)
    query = query.replace(" ", "+")
    url = "https://www.google.com.hk/search?q=" + query
    print("url:", url)

    links = []
    response = requests.get(url)
    print("response:", response)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        link_elements = soup.find_all('a', href=True)
          
        for link in link_elements:     
            href = link['href']
            
            if href.startswith('/url?q='):
                # Extracting the URL from the Google link format
                clean_link = href.split('/url?q=')[1].split('&sa=')[0]
                #links.append(clean_link)
                links.append({"title": link.text, "link": clean_link})

        return links
    else:
        print("Failed to retrieve page:", response.status_code)

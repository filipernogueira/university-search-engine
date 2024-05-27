import os
from functions import rankings, university_list, countries
import csv

def ensure_folder_exists(folder_path):
    """Ensure that a certain folder exists, if it doesn't, create it

    Args:
        folder_path (string): pathe to the folder
    """
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

def save_to_csv(data, filename, ranking):
    """Save data to csv file

    Args:
        data (List[dict]): List of Universities/Rankings
        filename (string): Path to the file
        ranking (boolean): Check if we are saving universities or rankings
    """
    ensure_folder_exists(os.path.dirname(filename))
    if ranking:
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['Rank', 'University', 'Country']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for item in data:
                writer.writerow({'Rank': item['Rank'], 'University': item['University'], 'Country': item['Country']})
    else:
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ["name", "country", "alpha_two_code", "web_pages"]
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for item in data:
                writer.writerow({'name': item['name'], 'country': item['country'], 'alpha_two_code': item['alpha_two_code'], 'web_pages': item['web_pages'][0]})

if __name__ == '__main__':
    for country in countries:
        print(f"Starting on {country}...")
        data = rankings("", country, False)
        save_to_csv(data, f'./rankings/{country}.csv', True)

        universities_list = university_list(country, "", False, False, 999999999999, False)
        save_to_csv(universities_list, f'./universities_lists/{country}.csv', False)

import json
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
import requests

def get_mission_content(mission_header):
    mission_paragraph = mission_header.find_next('p')
    if mission_paragraph:
        mission_content = mission_paragraph.text.strip()
    else:
        mission_content = ''
    return mission_content

def get_profile_content(profile_header):
    profile_content = ''
    ul = profile_header.find_next('ul')
    if ul:
        li_items = ul.find_all('li')
        profile_content = [li.text.strip() for li in li_items]
    return profile_content

def scrape_job_listings(url):
    job_listings = []

    # Send a GET request to the URL
    response = requests.get(url)

    if response.status_code == 200:
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find the job listings on the page
        job_listings_article = soup.find_all('article', class_='teaser-jobs')

        # Extract the main host from the original URL
        parsed_url = urlparse(url)
        base_url = parsed_url.scheme + "://" + parsed_url.netloc

        for job in job_listings_article:
            job_data = {}

            job_title = job.find('h3').text.strip()
            article_link = job.find('a', class_='teaser-link')['href']
            
            # Append the article link to the base URL
            full_article_link = urljoin(base_url, article_link)

            # Make a new request to the full article link
            article_response = requests.get(full_article_link)

            if article_response.status_code == 200:
                # Parse the HTML content of the linked page
                article_soup = BeautifulSoup(article_response.content, 'html.parser')

                # Extract the desired information from the linked page
                job_description = article_soup.find('h2').text.strip()

                # Extract the "Jetzt bewerben" link
                bewerben_link = article_soup.find('a', text='Jetzt bewerben')
                if bewerben_link:
                    link = bewerben_link['href']

                # Extract the details inside <li> tags after the specified header
                header = article_soup.find('p', text='Ihre Haupttätigkeit:')
                if header:
                    ul = header.find_next('ul')
                    if ul:
                        li_items = ul.find_all('li')
                        haupttatigkeit = [li.text.strip() for li in li_items]
                    else:
                        haupttatigkeit = []
                else:
                    haupttatigkeit = []
                    
                # Extract the contents of the <p> tag after "Ihre Mission"
                """mission_header = article_soup.find('strong', text=lambda t: t and t.__contains__('Mission'))

                if mission_header:
                    mission_content = get_mission_content(mission_header)
                else:
                    mission_header = article_soup.find('h2', text=lambda t: t and t.__contains__('Mission'))
                    if mission_header:
                        mission_content = get_mission_content(mission_header)
                    else:
                        mission_content = ""
                """

                profile_header = article_soup.find('h2', text=lambda t: t and t.__contains__('Ihr Profil'))

                if profile_header:
                    profile_content = get_profile_content(profile_header)
                else:
                    profile_header = article_soup.find('strong', text=lambda t: t and t.__contains__('Bewegt mehr'))
                    if profile_header:
                        profile_content = get_profile_content(profile_header)
                    else:
                        profile_content = ""

                # Store the extracted information in the job_data dictionary
                job_data['Job Title'] = job_title
                job_data['Description'] = job_description
                #job_data['Mission'] = mission_content
                job_data['Aufgaben'] = haupttatigkeit
                job_data['Profile'] = profile_content
                job_data['Link'] = link

                # Append the job_data dictionary to the job_listings list
                job_listings.append(job_data)

    else:
        print("Error accessing the website.")

    # Save the job_listings data as JSON
    with open('job_listings.json', 'w', encoding='utf-8') as f:
        json.dump(job_listings, f, indent=4, ensure_ascii=False)

# URL of the job listings page
url = 'https://www.it.nrw/karriere/jobs'

# Call the function to scrape the job listings and save them as JSON
scrape_job_listings(url)

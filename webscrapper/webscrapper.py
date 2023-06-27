import requests
from bs4 import BeautifulSoup

def scrape_job_listings(url):
    # Send a GET request to the URL
    response = requests.get(url)

    if response.status_code == 200:
        print("Can access the website.")
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find the job listings on the page
        #job_listings = soup.find_all('div', class_='article .teaser-title')
        job_listings = soup.find_all('article', class_='teaser-jobs')


        for job in job_listings:
            job_title = job.find('h3').text.strip()
            
            # Print or store the extracted information as per your requirements
            print("Job Title:", job_title)
            print("=" * 50)

    else:
        print("Error accessing the website.")

# URL of the job listings page
url = 'https://www.it.nrw/karriere/jobs'

# Call the function to scrape the job listings
scrape_job_listings(url)
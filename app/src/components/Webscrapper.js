import { get } from 'axios';
import { load } from 'cheerio';

async function scrapeWebsite(url) {
  try {
    const response = await get(url);
    const html = response.data;
    const $ = load(html);

    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content');

    const data = {
      title,
      description,
    };

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export default scrapeWebsite;
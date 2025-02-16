import requests
from bs4 import BeautifulSoup
from datetime import datetime

def scrape_yahoo_news():
    """
    Scrape news articles from Yahoo Japan News
    Returns a list of dictionaries containing news data
    """
    url = "https://news.yahoo.co.jp/articles/0bb1e6e992953aa61579b0e4592c8d604ce82b3a"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        # Send GET request to Yahoo News
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Parse HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find news articles
        articles = []
        news_list = soup.find_all("article", class_="sc-ebcc528f-0")
        
        for article in news_list:
            try:
                # Extract article data
                title_element = article.find("h2", class_="sc-ebcc528f-4")
                link_element = article.find("a", class_="sc-ebcc528f-1")
                
                if title_element and link_element:
                    article_data = {
                        "title": title_element.text.strip(),
                        "link": link_element.get("href"),
                        "timestamp": datetime.now().isoformat()
                    }
                    articles.append(article_data)
            
            except Exception as e:
                print(f"Error parsing article: {str(e)}")
                continue
        
        return articles
    
    except requests.RequestException as e:
        print(f"Error fetching data: {str(e)}")
        return []

if __name__ == "__main__":
    news_articles = scrape_yahoo_news()
    for article in news_articles:
        print(f"Title: {article['title']}")
        print(f"Link: {article['link']}")
        print(f"Timestamp: {article['timestamp']}")
        print("-" * 50)
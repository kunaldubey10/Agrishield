import requests
import json

def test_commodity_prices():
    try:
        response = requests.get('http://localhost:5000/api/commodity-prices')
        if response.status_code == 200:
            data = response.json()
            print("API Response:")
            print(json.dumps(data, indent=2))
            print("\nAPI is working correctly!")
        else:
            print(f"Error: Status code {response.status_code}")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == '__main__':
    test_commodity_prices() 
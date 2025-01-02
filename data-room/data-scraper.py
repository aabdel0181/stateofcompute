import requests
import numpy as np
import pandas as pd

# File for scraping and storing Akash and Aethir data

def fetch_akash():
    """
    Fetch the latest data from the Akash API, focusing on the specific fields:
      - The date (most recent timestamp)
      - activeGPU
      - active lease count
      - amount staked by compute providers
      - total protocol earnings in USD 
      - daily protocol earnings in USD
    Return: one-row DataFrame.
    """
    akash_api_url = "https://api.cloudmos.io/v1/dashboard-data"

    try:
        response = requests.get(akash_api_url, timeout=10)
        response.raise_for_status()
        
        data = response.json()

        # navigate the JSON
        now_stats       = data.get("now", {})
        network_stats = data.get("networkCapacity", {})
        chain_stats = data.get("chainStats", {})

        parsed_data = {
            "date": now_stats.get("date"),                      
            "active_gpu_capacity": now_stats.get("activeGPU"),           
            "available_gpu": network_stats.get("availableGPU"), 
            "active_leases": now_stats.get("activeLeaseCount"), 
            "staked_compute_providers": chain_stats.get("bondedTokens"), 
            "daily_earnings_usd": now_stats.get("dailyUUsdSpent"), 
            "protocol_earnings_usd": now_stats.get("totalUUsdSpent"),   
            "active_provider_count": network_stats.get("activeProviderCount")
        }

        # Convert to a one-row DataFrame so it's easy to store/merge later
        df = pd.DataFrame([parsed_data])
        print("Akash cleaned")
        print(df.head())

        return df

    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching Akash data: {e}")
        return pd.DataFrame()



def main():
    """
    Main function to orchestrate the fetching, aggregation, and providing of data.
    """
    # Fetch Akash API
    akash_df = fetch_akash()
    
    # Fetch Aethir API
    aethir_df = fetch_aethir()
    
    # Example of combining data
    # If both DataFrames have similar columns or keys, you can merge or concatenate them.
    # Below is a simple vertical concatenation (assuming both have the same columns).
    combined_df = pd.concat([akash_df, aethir_df], ignore_index=True)
    
    # Example: Basic aggregation or manipulation (this is just a placeholder)
    # If there's a numeric column, e.g., 'price' or 'value', you can do:
    # average_value = combined_df['value'].mean()
    # print(f"Average value: {average_value}")
    
    # Provide data for an endpoint
    # - Typically, you would store this combined data in a database or
    #   a file that your web server or API layer can access.
    # - For demonstration, we’ll just print the DataFrame shape.
    print("Combined DataFrame shape:", combined_df.shape)
    
    # If you need to persist to a CSV or database:
    # combined_df.to_csv("akash_aethir_data.csv", index=False)
    # Or use a database library to insert into a table/collection


# Best practice in Python is to check __name__ == '__main__'
# not __name__ == 'main'
if __name__ == '__main__':
    main()

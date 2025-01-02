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
        now_stats = data.get("now", {})
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

def fetch_aethir():
    """
    Fetch data from the Aethir API.
    """
    aethir_GPUi_endpoint = "https://aethir-server-stagging.up.railway.app/protocol/gpu-info-list"
    
    try:
            response = requests.get(aethir_GPUi_endpoint, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            df = pd.DataFrame(data)
            
            # Aggregate the number of GPUs.
            total_gpu_count = df["gpuCards"].sum()
            

            df["totalGPUCount"] = total_gpu_count
            print(f"Total gpu count", total_gpu_count)
            print(f"Aethir cleaned: ", df.head())
            return df, total_gpu_count
    
    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching Aethir data: {e}")
        return pd.DataFrame(), 0

def main():
    """
    Main function to orchestrate the fetching, aggregation, and providing of data.
    """
    # Fetch Akash API
    akash_df = fetch_akash()
    
    # Fetch Aethir API
    aethir_df = fetch_aethir()


if __name__ == '__main__':
    main()

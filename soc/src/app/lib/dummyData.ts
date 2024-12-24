export const generateDummyData = (): GPUMetrics[] => {
    const locations = [
      { city: "San Francisco", lat: 37.7749, lng: -122.4194 },
      { city: "New York", lat: 40.7128, lng: -74.0060 },
      { city: "London", lat: 51.5074, lng: -0.1278 },
      { city: "Tokyo", lat: 35.6762, lng: 139.6503 },
      { city: "Singapore", lat: 1.3521, lng: 103.8198 },
      { city: "Seoul", lat: 37.5665, lng: 126.9780 },
      { city: "Berlin", lat: 52.5200, lng: 13.4050 },
      { city: "Toronto", lat: 43.6532, lng: -79.3832 },
      { city: "Sydney", lat: -33.8688, lng: 151.2093 },
      { city: "Dubai", lat: 25.2048, lng: 55.2708 },
      { city: "Mumbai", lat: 19.0760, lng: 72.8777 },
      { city: "São Paulo", lat: -23.5505, lng: -46.6333 },
      { city: "Amsterdam", lat: 52.3676, lng: 4.9041 },
      { city: "Paris", lat: 48.8566, lng: 2.3522 },
      { city: "Stockholm", lat: 59.3293, lng: 18.0686 },
      { city: "Hong Kong", lat: 22.3193, lng: 114.1694 },
      { city: "Shanghai", lat: 31.2304, lng: 121.4737 },
      { city: "Barcelona", lat: 41.3851, lng: 2.1734 },
      { city: "Melbourne", lat: -37.8136, lng: 144.9631 },
      { city: "Tel Aviv", lat: 32.0853, lng: 34.7818 },
    ];
  
    // Generate 500 data points
    return Array.from({ length: 500 }, (_, index) => {
      const location = locations[Math.floor(Math.random() * locations.length)];
      const latVariation = (Math.random() - 0.5) * 2;
      const lngVariation = (Math.random() - 0.5) * 2;
  
      // Generate more varied status probabilities
      const statusRoll = Math.random();
      let status: 'active' | 'inactive';
      let networkHealth: number;
      let utilization: number;
  
      if (statusRoll < 0.15) {
        // 15% chance of being inactive
        status = 'inactive';
        networkHealth = 0;
        utilization = 0;
      } else {
        status = 'active';
        
        // For active nodes, generate varied health and utilization
        const healthRoll = Math.random();
        if (healthRoll < 0.2) {
          // 20% chance of poor health
          networkHealth = Math.floor(Math.random() * 30 + 40); // 40-70%
        } else {
          networkHealth = Math.floor(Math.random() * 20 + 80); // 80-100%
        }
  
        const utilizationRoll = Math.random();
        if (utilizationRoll < 0.3) {
          // 30% chance of high utilization
          utilization = Math.floor(Math.random() * 10 + 90); // 90-100%
        } else {
          utilization = Math.floor(Math.random() * 60 + 30); // 30-90%
        }
      }
  
      const gpuCount = Math.floor(Math.pow(Math.random(), 2) * 50) + 1;
      const basePrice = 0.5 + Math.random() * 1.5;
      const currentPrice = basePrice * (1 + (Math.random() - 0.5) * 0.2);
  
      return {
        id: `node-${index}`,
        userId: `user-${Math.floor(Math.random() * 50)}`,
        location: {
          city: location.city,
          latitude: location.lat + latVariation,
          longitude: location.lng + lngVariation,
        },
        gpuCount,
        gpuType: ['RTX 4090', 'RTX 3090', 'RTX 3080', 'A100', 'H100'][Math.floor(Math.random() * 5)],
        utilization,
        networkHealth,
        pricing: {
          basePrice: basePrice.toFixed(2),
          currentPrice: currentPrice.toFixed(2),
        },
        lastSeen: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        status,
        performance: {
          throughput: Math.floor(Math.random() * 1000),
          latency: Math.floor(Math.random() * 100),
        }
      };
    });
  };
  // Example usage:
  export const dummyData = generateDummyData();
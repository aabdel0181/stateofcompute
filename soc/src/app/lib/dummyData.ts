export const generateDummyData = (): GPUMetrics[] => {
    const networks = [
      { name: 'Ionet', weightage: 0.2 },
      { name: 'Akash', weightage: 0.25 },
      { name: 'Hyperbolic', weightage: 0.15 },
      { name: 'Vast.ai', weightage: 0.15 },
      { name: 'Aether', weightage: 0.1 },
      { name: 'Spheron', weightage: 0.08 },
      { name: 'Golem', weightage: 0.04 },
      { name: 'Render', weightage: 0.03 }
    ];
  
    const gpuModels = [
      { model: 'RTX 4090', price: 2.5, weightage: 0.2 },
      { model: 'RTX 4080', price: 1.8, weightage: 0.15 },
      { model: 'RTX 3090', price: 1.2, weightage: 0.2 },
      { model: 'RTX 3080', price: 0.9, weightage: 0.15 },
      { model: 'A100', price: 3.5, weightage: 0.15 },
      { model: 'H100', price: 4.5, weightage: 0.1 },
      { model: 'A6000', price: 2.8, weightage: 0.05 }
    ];
  
    const locations = [
      { city: "San Francisco", lat: 37.7749, lng: -122.4194, region: "NA" },
      { city: "New York", lat: 40.7128, lng: -74.0060, region: "NA" },
      { city: "London", lat: 51.5074, lng: -0.1278, region: "EU" },
      { city: "Frankfurt", lat: 50.1109, lng: 8.6821, region: "EU" },
      { city: "Singapore", lat: 1.3521, lng: 103.8198, region: "APAC" },
      { city: "Tokyo", lat: 35.6762, lng: 139.6503, region: "APAC" },
      { city: "Sydney", lat: -33.8688, lng: 151.2093, region: "APAC" },
      { city: "Mumbai", lat: 19.0760, lng: 72.8777, region: "APAC" },
      { city: "São Paulo", lat: -23.5505, lng: -46.6333, region: "SA" },
      { city: "Toronto", lat: 43.6532, lng: -79.3832, region: "NA" }
    ];
  
    // Generate 500 data points
    return Array.from({ length: 500 }, (_, index) => {
      // Select network based on weightage
      const networkRoll = Math.random();
      let cumulativeWeight = 0;
      const network = networks.find(n => {
        cumulativeWeight += n.weightage;
        return networkRoll <= cumulativeWeight;
      })!.name;
  
      // Select GPU model based on weightage
      const gpuRoll = Math.random();
      cumulativeWeight = 0;
      const gpu = gpuModels.find(g => {
        cumulativeWeight += g.weightage;
        return gpuRoll <= cumulativeWeight;
      })!;
  
      const location = locations[Math.floor(Math.random() * locations.length)];
      const latVariation = (Math.random() - 0.5) * 2;
      const lngVariation = (Math.random() - 0.5) * 2;
  
      // Generate more realistic status probabilities
      const statusRoll = Math.random();
      let status: 'active' | 'inactive';
      let networkHealth: number;
      let utilization: number;
  
      if (statusRoll < 0.12) {
        // 12% chance of being inactive
        status = 'inactive';
        networkHealth = Math.floor(Math.random() * 30); // 0-30%
        utilization = 0;
      } else {
        status = 'active';
        
        // Network health based on network maturity
        const networkMaturity = networks.find(n => n.name === network)!.weightage;
        const baseHealth = 70 + (networkMaturity * 100);
        networkHealth = Math.min(98, Math.floor(baseHealth + (Math.random() - 0.5) * 20));
  
        // Utilization based on network popularity
        const baseUtilization = 50 + (networkMaturity * 100);
        utilization = Math.min(100, Math.floor(baseUtilization + (Math.random() - 0.5) * 40));
      }
  
      // GPU count based on provider size (exponential distribution)
      const gpuCount = Math.floor(Math.pow(Math.random(), 2) * 100) + 1;
  
      // Price variation based on GPU model, location, and network
      const regionMultiplier = location.region === 'NA' || location.region === 'EU' ? 1.1 : 0.9;
      const networkMultiplier = 0.8 + (networks.find(n => n.name === network)!.weightage * 1.5);
      const basePrice = gpu.price * regionMultiplier * networkMultiplier;
      const currentPrice = basePrice * (1 + (Math.random() - 0.5) * 0.2);
  
      return {
        id: `node-${network.toLowerCase()}-${index}`,
        userId: `provider-${Math.floor(Math.random() * 100)}`,
        network,
        location: {
          city: location.city,
          region: location.region,
          latitude: location.lat + latVariation,
          longitude: location.lng + lngVariation,
        },
        gpuCount,
        gpuType: gpu.model,
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
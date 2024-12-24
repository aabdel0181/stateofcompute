export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface GPUMetrics {
    id: string;
    userId: string;
    gpuCount: number;
    utilization: number;
    location: Location;
    price: number;
    networkHealth: number;
    timestamp: string;
  }
// Mock data for development
export const mockGPUMetrics: GPUMetrics[] = [
    {
      id: '1',
      userId: 'user1',
      gpuCount: 5,
      utilization: 85,
      location: { latitude: 40.7128, longitude: -74.0060 }, // New York
      price: 2.5,
      networkHealth: 98,
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      userId: 'user2',
      gpuCount: 3,
      utilization: 75,
      location: { latitude: 51.5074, longitude: -0.1278 }, // London
      price: 2.8,
      networkHealth: 95,
      timestamp: new Date().toISOString(),
    },
    {
      id: '3',
      userId: 'user3',
      gpuCount: 8,
      utilization: 90,
      location: { latitude: 35.6762, longitude: 139.6503 }, // Tokyo
      price: 3.0,
      networkHealth: 97,
      timestamp: new Date().toISOString(),
    },
    {
      id: '4',
      userId: 'user4',
      gpuCount: 4,
      utilization: 70,
      location: { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
      price: 2.7,
      networkHealth: 99,
      timestamp: new Date().toISOString(),
    }
  ];
  export async function fetchGPUMetrics(): Promise<GPUMetrics[]> {
    // In production, replace this with actual MongoDB fetch
    return mockGPUMetrics;
  }
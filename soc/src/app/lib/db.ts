import { dummyData } from './dummyData';

export async function fetchGPUMetrics() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyData;
}
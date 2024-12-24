import { Suspense } from 'react';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { fetchGPUMetrics } from './lib/db';

export default async function Home() {
  const data = await fetchGPUMetrics();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalyticsDashboard data={data} />
    </Suspense>
  );
}
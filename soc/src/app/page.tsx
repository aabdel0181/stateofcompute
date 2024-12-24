import { Suspense } from 'react';
import { HomeView } from './components/HomeView';
import { fetchGPUMetrics } from './lib/db';

export default async function Home() {
  const data = await fetchGPUMetrics();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeView data={data} />
    </Suspense>
  );
}
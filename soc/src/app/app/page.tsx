import { MainDashboard } from '../components/MainDashboard';
import { fetchGPUMetrics } from '../lib/db';

export default async function DashboardPage() {
  const data = await fetchGPUMetrics();
  
  return (
    <div className="min-h-screen bg-black pt-16">
      <MainDashboard data={data} />
    </div>
  );
}
import { DashboardView } from '../components/DashboardView';
import { fetchGPUMetrics } from '../lib/db';

export default async function DashboardPage() {
    const data = await fetchGPUMetrics();
    
    return (
      <div className="min-h-screen bg-black">
        <DashboardView data={data} />
      </div>
    );
  }
// 1. Import Service
import { generateWrappedStats } from '@/lib/data';
// 2. Import Client Component
import WrappedCarousel from '@/components/features/wrapped/WrappedCarousel';

interface PageProps {
    params: { username: string };
}

export default async function UserResultPage({ params }: PageProps) {
    // 👇 The Fetch happens here!
    // Next.js automatically caches this if you want
    const data = await generateWrappedStats(params.username);

    // 👇 Render the Carousel
    return <WrappedCarousel data={data} />;
}
import { redirect } from "next/navigation";

interface ListingDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { slug } = await params;
  redirect(`/syndications/${slug}`);
}

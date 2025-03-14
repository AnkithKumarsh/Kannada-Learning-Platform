import LearnLetterClient from "@/components/Learn/LearnLetterClient";

export function generateStaticParams() {
  return Array.from({ length: 13 }, (_, i) => ({
    svaragalu: `svaragalu${i + 1}`,
  }));
}

export default function LearnLetterPage({ params }: { params: { svaragalu: string } }) {
  return <LearnLetterClient svaragalu={params.svaragalu} />;
}
import ActivityDetail from "@/components/activity-details";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ActivityPage({ params }: PageProps) {
  return <ActivityDetail activityId={params.id} />;
}

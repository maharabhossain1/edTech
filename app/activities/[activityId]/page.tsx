import ActivityDetail from "@/components/activity-details";

interface PageProps {
  params: {
    activityId: string;
  };
}

export default function ActivityPage({ params }: PageProps) {
  return <ActivityDetail activityId={params.activityId} />;
}

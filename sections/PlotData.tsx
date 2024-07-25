import {
  Dataset,
  getDatasetFromHyperdxData,
} from "../utils/charts.ts";
import { HyperdxData } from "../loaders/Hyperdx.ts";
import { CompareMetric } from "../components/ApiDashboard.tsx";
import PlotDataIsland from "../islands/PlotDataIsland.tsx";

const isDarkMode = true;

interface LoaderProps {
  data: HyperdxData[];
}

export interface ComponentProps {
  dataset: Dataset;
  p50Latency: CompareMetric;
  p90Latency: CompareMetric;
  p95Latency: CompareMetric;
  p99Latency: CompareMetric;
}

export function loader({ data }: LoaderProps): ComponentProps {
  const totalRequestsLastHour = data.slice(0, 60).reduce(
    (acc, item) => acc + item.requests.ok + item.requests.error,
    0,
  );
  const totalRequestsTwoHoursAgo = data.slice(60, 120).reduce(
    (acc, item) => acc + item.requests.ok + item.requests.error,
    0,
  );

  const p50Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce(
      (acc, item) =>
        acc + item.latency.p50 * (item.requests.ok + item.requests.error),
      0,
    ) / totalRequestsLastHour,
    twoHoursAgo: data.slice(60, 120).reduce(
      (acc, item) =>
        acc + item.latency.p50 * (item.requests.ok + item.requests.error),
      0,
    ) / totalRequestsTwoHoursAgo,
  };

  const p90Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce(
      (acc, item) =>
        acc + item.latency.p90 * (item.requests.ok + item.requests.error),
      0,
    ) / totalRequestsLastHour,
    twoHoursAgo: data.slice(60, 120).reduce(
      (acc, item) =>
        acc + item.latency.p90 * (item.requests.ok + item.requests.error),
      0,
    ) / totalRequestsTwoHoursAgo,
  };

  const p95Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce(
      (acc, item) =>
        acc + item.latency.p95 * (item.requests.ok + item.requests.error),
      0,
    ) / totalRequestsLastHour,
    twoHoursAgo: data.slice(60, 120).reduce(
      (acc, item) =>
        acc + item.latency.p95 * (item.requests.ok + item.requests.error),
      0,
    ) / totalRequestsTwoHoursAgo,
  };

  const p99Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce(
      (acc, item) =>
        acc + item.latency.p99 * (item.requests.ok + item.requests.error),
      0,
    ) / totalRequestsLastHour,
    twoHoursAgo: data.slice(60, 120).reduce(
      (acc, item) =>
        acc + item.latency.p99 * (item.requests.ok + item.requests.error),
      0,
    ) / totalRequestsTwoHoursAgo,
  };

  return {
    dataset: getDatasetFromHyperdxData(data.slice(0, 60), isDarkMode),
    p50Latency,
    p90Latency,
    p95Latency,
    p99Latency,
  };
}

export default function PlotData(
  {
    dataset,
    p50Latency,
    p90Latency,
    p95Latency,
    p99Latency,
  }: ComponentProps,
) {
  return (
    <PlotDataIsland
      dataset={dataset}
      p50Latency={p50Latency}
      p90Latency={p90Latency}
      p95Latency={p95Latency}
      p99Latency={p99Latency}
    />
  )
}

import { HyperdxData } from "./Hyperdx.ts";
import { Dataset, getDatasetFromHyperdxData } from "../utils/charts.ts";

const isDarkMode = true;

const SAMPLING_FACTOR = 100;

interface ApiMetadata {
  name: string;
  imgSrc: string;
  statusPageUrl: string;
}

export interface CompareMetric {
  lastHour: number;
  twoHoursAgo: number;
}

export interface ApiProps {
  metadata: ApiMetadata;
  dataset: Dataset;
  p50Latency: CompareMetric;
  p90Latency: CompareMetric;
  p95Latency: CompareMetric;
  p99Latency: CompareMetric;
  errorRate: CompareMetric;
}

export interface ApisProps {
  apis: ApiProps[];
}

function parse(metadata: ApiMetadata, data: HyperdxData[]): ApiProps {
  const totalErrorsLastHour = data.slice(0, 60).reduce(
    (acc, item) => acc + item.requests.error,
    0,
  );
  const totalErrorsTwoHoursAgo = data.slice(60, 120).reduce(
    (acc, item) => acc + item.requests.error,
    0,
  );

  const totalRequestsLastHour = data.slice(0, 60).reduce(
    (acc, item) =>
      acc + item.requests.ok * SAMPLING_FACTOR + item.requests.error,
    0,
  );
  const totalRequestsTwoHoursAgo = data.slice(60, 120).reduce(
    (acc, item) =>
      acc + item.requests.ok * SAMPLING_FACTOR + item.requests.error,
    0,
  );

  const errorRate: CompareMetric = {
    lastHour: totalErrorsLastHour / totalRequestsLastHour,
    twoHoursAgo: totalErrorsTwoHoursAgo / totalRequestsTwoHoursAgo,
  };

  const p50Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce(
      (acc, item) =>
        acc +
        item.latency.p50 *
          (item.requests.ok * SAMPLING_FACTOR + item.requests.error),
      0,
    ) / totalRequestsLastHour,
    twoHoursAgo: data.slice(60, 120).reduce(
      (acc, item) =>
        acc +
        item.latency.p50 *
          (item.requests.ok * SAMPLING_FACTOR + item.requests.error),
      0,
    ) / totalRequestsTwoHoursAgo,
  };

  const p90Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce(
      (acc, item) =>
        acc +
        item.latency.p90 *
          (item.requests.ok * SAMPLING_FACTOR + item.requests.error),
      0,
    ) / totalRequestsLastHour,
    twoHoursAgo: data.slice(60, 120).reduce(
      (acc, item) =>
        acc +
        item.latency.p90 *
          (item.requests.ok * SAMPLING_FACTOR + item.requests.error),
      0,
    ) / totalRequestsTwoHoursAgo,
  };

  const p95Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce(
      (acc, item) =>
        acc +
        item.latency.p95 *
          (item.requests.ok * SAMPLING_FACTOR + item.requests.error),
      0,
    ) / totalRequestsLastHour,
    twoHoursAgo: data.slice(60, 120).reduce(
      (acc, item) =>
        acc +
        item.latency.p95 *
          (item.requests.ok * SAMPLING_FACTOR + item.requests.error),
      0,
    ) / totalRequestsTwoHoursAgo,
  };

  const p99Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce(
      (acc, item) =>
        acc +
        item.latency.p99 *
          (item.requests.ok * SAMPLING_FACTOR + item.requests.error),
      0,
    ) / totalRequestsLastHour,
    twoHoursAgo: data.slice(60, 120).reduce(
      (acc, item) =>
        acc +
        item.latency.p99 *
          (item.requests.ok * SAMPLING_FACTOR + item.requests.error),
      0,
    ) / totalRequestsTwoHoursAgo,
  };

  return {
    metadata,
    dataset: getDatasetFromHyperdxData(data.slice(0, 60), isDarkMode),
    errorRate,
    p50Latency,
    p90Latency,
    p95Latency,
    p99Latency,
  };
}

export interface Props {
  apis: {
    metadata: ApiMetadata;
    data: HyperdxData[];
  }[];
}

export default function loader(
  { apis }: Props,
): ApisProps {
  return {
    apis: apis.map(({ metadata, data }) => ({
      ...parse(metadata, data),
    })),
  };
}

import TimeSeries from "../islands/TimeSeries.tsx";
import {
  Dataset,
  getHyperdxOptionsConfig,
  getDatasetFromHyperdxData,
} from "../utils/charts.ts";
import Text from "../components/ui/Text.tsx";
import { HyperdxData } from "../loaders/Hyperdx.ts";

interface LoaderProps {
  data: HyperdxData[];
}

interface CompareMetric {
  lastHour: number;
  twoHoursAgo: number;
}

interface ComponentProps {
  dataset: Dataset;
  percentilErrors: CompareMetric;
  p50Latency: CompareMetric;
  p90Latency: CompareMetric;
  p95Latency: CompareMetric;
  p99Latency: CompareMetric;
}


export function loader ({ data } : LoaderProps): ComponentProps {
  const errorsLastHour = data.slice(0, 60).reduce((acc, item) => acc + item.requests.error, 0);
  const requestsLastHour = data.slice(0, 60).reduce((acc, item) => acc + item.requests.ok, 0);

  const errorsTwoHoursAgo = data.slice(60, 120).reduce((acc, item) => acc + item.requests.error, 0);
  const requestsTwoHoursAgo = data.slice(60, 120).reduce((acc, item) => acc + item.requests.ok, 0);

  const percentilErrors: CompareMetric = {
    lastHour: errorsLastHour / (errorsLastHour + requestsLastHour),
    twoHoursAgo: errorsTwoHoursAgo / (errorsTwoHoursAgo + requestsTwoHoursAgo),
  };

  const p50Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce((acc, item) => acc + item.latency.p50, 0) / 60,
    twoHoursAgo: data.slice(60, 120).reduce((acc, item) => acc + item.latency.p50, 0) / 60,
  };

  const p90Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce((acc, item) => acc + item.latency.p90, 0) / 60,
    twoHoursAgo: data.slice(60, 120).reduce((acc, item) => acc + item.latency.p90, 0) / 60,
  };

  const p95Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce((acc, item) => acc + item.latency.p95, 0) / 60,
    twoHoursAgo: data.slice(60, 120).reduce((acc, item) => acc + item.latency.p95, 0) / 60,
  };

  const p99Latency: CompareMetric = {
    lastHour: data.slice(0, 60).reduce((acc, item) => acc + item.latency.p99, 0) / 60,
    twoHoursAgo: data.slice(60, 120).reduce((acc, item) => acc + item.latency.p99, 0) / 60,
  };

  return {
    dataset: getDatasetFromHyperdxData(data.slice(0, 60), true),
    percentilErrors,
    p50Latency,
    p90Latency,
    p95Latency,
    p99Latency,
  };
};

export default function PlotData({ dataset, percentilErrors, p50Latency, p90Latency, p95Latency, p99Latency }: ComponentProps) {
  console.log({
    percentilErrors,
    p50Latency,
    p90Latency,
    p95Latency,
    p99Latency,
  })
  const optionsConfig = getHyperdxOptionsConfig(
    dataset,
    true,
  );
  return (
    <div class="bg-base-700 p-40 flex flex-col gap-4">
      <div class="justify-center w-full">
        <Text variant="hero-large">
          Healthcheck apis
        </Text>
      </div>
      <div class="flex flex-col gap-2">
        <Text variant="hero-small">
          VTEX
        </Text>
        <div class="flex">
          <div class="flex-1 bg-base-200 rounded-2xl">
            <div class="flex flex-col gap-6 p-4">
              <Text variant="heading">erros</Text>
              <Text variant="hero-large" class="text-decorative-one-900">
                algum numero
              </Text>
            </div>
          </div>
        </div>
        <div class="w-full h-full">
          <TimeSeries
            dataset={dataset}
            class="h-[400px] pt-4"
            optionsConfig={optionsConfig}
          />
        </div>
      </div>
    </div>
  );
}

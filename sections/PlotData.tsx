import TimeSeries from "../islands/TimeSeries.tsx";
import {
  Dataset,
  getDatasetFromHyperdxData,
  getHyperdxOptionsConfig,
} from "../utils/charts.ts";
import Text from "../components/ui/Text.tsx";
import { HyperdxData } from "../loaders/Hyperdx.ts";
import { SectionCard } from "../components/SectionCard.tsx";

const isDarkMode = true;

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

export function loader({ data }: LoaderProps): ComponentProps {
  const errorsLastHour = data.slice(0, 60).reduce(
    (acc, item) => acc + item.requests.error,
    0,
  );
  const requestsLastHour = data.slice(0, 60).reduce(
    (acc, item) => acc + item.requests.ok,
    0,
  );

  const errorsTwoHoursAgo = data.slice(60, 120).reduce(
    (acc, item) => acc + item.requests.error,
    0,
  );
  const requestsTwoHoursAgo = data.slice(60, 120).reduce(
    (acc, item) => acc + item.requests.ok,
    0,
  );

  const percentilErrors: CompareMetric = {
    lastHour: errorsLastHour / (errorsLastHour + requestsLastHour),
    twoHoursAgo: errorsTwoHoursAgo / (errorsTwoHoursAgo + requestsTwoHoursAgo),
  };

  const p50Latency: CompareMetric = {
    lastHour:
      data.slice(0, 60).reduce((acc, item) => acc + item.latency.p50, 0) / 60,
    twoHoursAgo:
      data.slice(60, 120).reduce((acc, item) => acc + item.latency.p50, 0) / 60,
  };

  const p90Latency: CompareMetric = {
    lastHour:
      data.slice(0, 60).reduce((acc, item) => acc + item.latency.p90, 0) / 60,
    twoHoursAgo:
      data.slice(60, 120).reduce((acc, item) => acc + item.latency.p90, 0) / 60,
  };

  const p95Latency: CompareMetric = {
    lastHour:
      data.slice(0, 60).reduce((acc, item) => acc + item.latency.p95, 0) / 60,
    twoHoursAgo:
      data.slice(60, 120).reduce((acc, item) => acc + item.latency.p95, 0) / 60,
  };

  const p99Latency: CompareMetric = {
    lastHour:
      data.slice(0, 60).reduce((acc, item) => acc + item.latency.p99, 0) / 60,
    twoHoursAgo:
      data.slice(60, 120).reduce((acc, item) => acc + item.latency.p99, 0) / 60,
  };

  return {
    dataset: getDatasetFromHyperdxData(data.slice(0, 60), isDarkMode),
    percentilErrors,
    p50Latency,
    p90Latency,
    p95Latency,
    p99Latency,
  };
}

export default function PlotData(
  { dataset, percentilErrors, p50Latency, p90Latency, p95Latency, p99Latency }:
    ComponentProps,
) {
  const optionsConfig = getHyperdxOptionsConfig(
    isDarkMode,
  );
  const MetricCard = (
    { title, lastHour, twoHoursAgo }: {
      title: string;
      lastHour: string;
      twoHoursAgo: string;
    },
  ) => (
    <div class="flex-1 bg-base-200 rounded-2xl">
      <div class="flex flex-col gap-3 p-4">
        <Text variant="heading">{title}</Text>
        <div class="flex gap-2">
          <Text variant="hero-small">
            Last hour:
          </Text>
          <Text variant="hero-medium" class="text-decorative-one-900">
            {lastHour}
          </Text>
        </div>
        <div class="flex gap-2">
          <Text variant="hero-small">
            Two hours ago:
          </Text>
          <Text variant="hero-medium" class="text-decorative-one-900">
            {twoHoursAgo}
          </Text>
        </div>
      </div>
    </div>
  );
  return (
    <div class="bg-base-000 px-[200px] py-20 flex flex-col gap-8">
      <div class="justify-center w-full">
        <Text variant="hero-large">
          Healthcheck apis
        </Text>
      </div>
      <div class="flex flex-col gap-2">
        <Text variant="hero-small">
          VTEX
        </Text>
        <div class="flex gap-4">
          <div class="flex-1 bg-base-200 rounded-2xl">
            <div class="flex flex-col gap-6 p-4">
              <Text variant="heading">Status</Text>
              <Text variant="hero-large" class="text-decorative-one-900">
                Fully operational
              </Text>
            </div>
          </div>
          <MetricCard
            title="Errors"
            lastHour={`${(percentilErrors.lastHour * 100).toFixed(3)}%`}
            twoHoursAgo={`${(percentilErrors.twoHoursAgo * 100).toFixed(3)}%`}
          />
        </div>
        <Text variant="hero-medium">
          Latency
        </Text>
        <div class="flex flex-wrap gap-4">
          <MetricCard
            title="P50"
            lastHour={`${p50Latency.lastHour.toFixed(2)}ms`}
            twoHoursAgo={`${p50Latency.twoHoursAgo.toFixed(2)}ms`}
          />
          <MetricCard
            title="P90"
            lastHour={`${p90Latency.lastHour.toFixed(2)}ms`}
            twoHoursAgo={`${p90Latency.twoHoursAgo.toFixed(2)}ms`}
          />
        </div>
        <div class="flex flex-wrap gap-4">
          <MetricCard
            title="P95"
            lastHour={`${p95Latency.lastHour.toFixed(2)}ms`}
            twoHoursAgo={`${p95Latency.twoHoursAgo.toFixed(2)}ms`}
          />
          <MetricCard
            title="P99"
            lastHour={`${p99Latency.lastHour.toFixed(2)}ms`}
            twoHoursAgo={`${p99Latency.twoHoursAgo.toFixed(2)}ms`}
          />
        </div>
        <div class="w-full h-[450px]">
          <SectionCard 
            title="Latency"
            description="Latency in milliseconds for VTEX requests passing through deco."
            children={
              <TimeSeries
                dataset={dataset}
                class="h-[400px] pt-4"
                optionsConfig={optionsConfig}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

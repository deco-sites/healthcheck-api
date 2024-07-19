import TimeSeries from "../islands/TimeSeries.tsx";
import {
  Dataset,
  getDatasetFromHyperdxData,
  getHyperdxOptionsConfig,
} from "../utils/charts.ts";
import Text from "../components/ui/Text.tsx";
import { HyperdxData } from "../loaders/Hyperdx.ts";
import { SectionCard } from "../components/SectionCard.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";


const isDarkMode = true;

interface LoaderProps {
  data: HyperdxData[];
  imgSrc: string;
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
  imgSrc: string;
}

export function loader({ data, imgSrc }: LoaderProps): ComponentProps {
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
    imgSrc,
    dataset: getDatasetFromHyperdxData(data.slice(0, 60), isDarkMode),
    percentilErrors,
    p50Latency,
    p90Latency,
    p95Latency,
    p99Latency,
  };
}

export default function PlotData(
  { imgSrc, dataset, percentilErrors: _percentilErrors, p50Latency, p90Latency, p95Latency, p99Latency }:
    ComponentProps,
) {
  const optionsConfig = getHyperdxOptionsConfig(
    isDarkMode,
  );
  const MetricCard = (
    { description, data, lastData }: {
      description: string;
      data: number;
      lastData: number;
    },
  ) => {
    const increase = data > lastData;
    const percent = ((data - lastData) / lastData * 100).toFixed(0);
    return (
      <div class="flex flex-col gap-2 p-4 bg-base-100 rounded-lg w-[200px]">
        <Text variant="body-regular">{description}</Text>
        <Text variant="display">
          {data.toFixed(2)}ms
        </Text>
        <div class="flex flex-row gap-1">
          <Icon 
            id={increase ? "trending-up" : "trending-down"} 
            size={16} 
            class={`${increase ? "text-critical-900" : "text-positive-900"}`} 
          />
          <Text variant="body-regular-10" tone={increase ? "critical-900" : "positive-900"}>
            {percent}% {increase ? "more" : "less"} than 2 hours ago
          </Text>
        </div>
      </div>
    );
  }
  return (
    <div class="bg-base-000 px-[120px] py-10 flex flex-col gap-6">
      <div class="flex flex-row justify-between">
        <Text variant="hero-large" class="!font-normal">
          API Healthcheck
        </Text>
        <div class="flex gap-1 items-center">
          <Text variant="body-regular-10" tone="base-700">
            Powered by
          </Text>
          <Icon
            id="deco-cx"
            width={40}
            height={11}
            class="text-base-700"
          />
        </div>
      </div>
      <div class="flex flex-row w-full justify-between items-center">
        <div class="flex flex-row gap-3 h-12">
          <Image
            src={imgSrc}
            class="rounded-lg"
            width={48}
            height={48}
          />
          <div class="flex flex-col">
            <Text variant="heading" class="!font-medium">
              VTEX
            </Text>
            <a href="https://status.vtex.com/">
              <Text variant="body-regular">
                https://status.vtex.com/
              </Text>
            </a>
          </div>
        </div>
        <div class="flex flex-col gap-2 bg-positive-100 rounded-lg p-4 w-full max-w-[200px]">
          <Text variant="body-regular">
            Status
          </Text>
          <div class="flex flex-row gap-2 items-center">
            <Icon id="circle-check" size={16} class="text-positive-800" />
            <Text variant="body-strong" tone="positive-900">
              Fully operational
            </Text>
          </div>
        </div>
      </div>

      <div class="flex flex-row gap-10 max-h-[500px]">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-col">
            <Text variant="heading" class="!font-normal">
              Latency
            </Text>
            <Text tone="base-500" variant="body-regular">
              Latency in miliseconds for VTEX requests passing through deco.cx
            </Text>
          </div>
          <TimeSeries
            dataset={dataset}
            class="h-[400px] w-full h-full"
            optionsConfig={optionsConfig}
          />
        </div>
        <div class="flex flex-col gap-4">
          <MetricCard
            description="Latency P50"
            data={p50Latency.lastHour}
            lastData={p50Latency.twoHoursAgo}
          />
          <MetricCard
            description="Latency P90"
            data={p90Latency.lastHour}
            lastData={p90Latency.twoHoursAgo}
          />
          <MetricCard
            description="Latency P95"
            data={p95Latency.lastHour}
            lastData={p95Latency.twoHoursAgo}
          />
          <MetricCard
            description="Latency P99"
            data={p99Latency.lastHour}
            lastData={p99Latency.twoHoursAgo}
          />
        </div>
      </div>
    </div>
  );
}

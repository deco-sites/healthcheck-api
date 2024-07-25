import Text from "./ui/Text.tsx";
import TimeSeries from "../islands/TimeSeries.tsx";
import MetricCard from "./MetricCard.tsx";
import {
  Dataset,
  getHyperdxOptionsConfig,
} from "../utils/charts.ts";
import { CompareMetric } from "../loaders/ApisLatency.ts";
import Icon from "./ui/Icon.tsx";

export interface ApiDashboardProps {
  dataset: Dataset;
  p50Latency: CompareMetric;
  p90Latency: CompareMetric;
  p95Latency: CompareMetric;
  p99Latency: CompareMetric;
  isDarkMode: boolean;
  statusPageUrl: string;
}

export default function ApiDashboard ({ dataset, p50Latency, p90Latency, p95Latency, p99Latency, isDarkMode, statusPageUrl }: ApiDashboardProps) {
  const optionsConfig = getHyperdxOptionsConfig(
    isDarkMode,
  );
  return (
    <div class="flex flex-col gap-4 w-full h-[658px]">
      <div class="flex flex-row justify-between">
        <div class="flex flex-col">
          <Text variant="heading" class="!font-normal">
            Latency
          </Text>
          <Text tone="base-500" variant="body-regular">
            Latency in miliseconds for VTEX requests passing through deco.cx
          </Text>
        </div>
        <a href={statusPageUrl}>
          <Icon
            id="external-link"
            class="hover:text-base-700"
            strokeWidth={1}
            size={24}
          />
        </a>
      </div>
      <TimeSeries
        dataset={dataset}
        class="h-[500px] w-full h-full"
        optionsConfig={optionsConfig}
      />
      <div class="flex flex-row gap-4 w-full">
        <MetricCard
          description="Latency P50"
          data={p50Latency.lastHour}
          lastData={p50Latency.twoHoursAgo}
          class="text-[#7857FF]"
        />
        <MetricCard
          description="Latency P90"
          data={p90Latency.lastHour}
          lastData={p90Latency.twoHoursAgo}
          class="text-[#2FD080]"
        />
        <MetricCard
          description="Latency P95"
          data={p95Latency.lastHour}
          lastData={p95Latency.twoHoursAgo}
          class="text-[#FF6E6E]"
        />
        <MetricCard
          description="Latency P99"
          data={p99Latency.lastHour}
          lastData={p99Latency.twoHoursAgo}
          class="text-[#FFA300]"
        />
      </div>
    </div>
  );
}
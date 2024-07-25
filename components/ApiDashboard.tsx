import Text from "./ui/Text.tsx";
import TimeSeries from "../islands/TimeSeries.tsx";
import MetricCard from "./MetricCard.tsx";
import {
  Dataset,
  getHyperdxOptionsConfig,
} from "../utils/charts.ts";


export interface CompareMetric {
  lastHour: number;
  twoHoursAgo: number;
}

export interface ApiDashboardProps {
  dataset: Dataset;
  p50Latency: CompareMetric;
  p90Latency: CompareMetric;
  p95Latency: CompareMetric;
  p99Latency: CompareMetric;
  isDarkMode: boolean;
}

export default function ApiDashboard ({ dataset, p50Latency, p90Latency, p95Latency, p99Latency, isDarkMode }: ApiDashboardProps) {
  const optionsConfig = getHyperdxOptionsConfig(
    isDarkMode,
  );
  return (
    <div class="flex flex-col gap-4 w-full h-[558px]">
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
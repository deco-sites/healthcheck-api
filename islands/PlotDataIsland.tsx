import Text from "../components/ui/Text.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import ApiDashboard from "../components/ApiDashboard.tsx";
import { useSignal } from "@preact/signals";

import { ApisProps, CompareMetric } from "../loaders/ApisLatency.ts";

const isDarkMode = true;

export default function PlotData(
  { apisData } : { apisData: ApisProps }
) {
  const { apis } = apisData;
  const selectedApi = useSignal<string>("VTEX");

  const data = new Map();
  apis.forEach((api) => {
    data.set(api.metadata.name, api);
  });

  const ErrorRate = ({ errorRate } : { errorRate: CompareMetric }) => {
    const increase = errorRate.lastHour > errorRate.twoHoursAgo;
    const percent = errorRate.twoHoursAgo === 0 ? 0 
      : Math.abs((errorRate.lastHour - errorRate.twoHoursAgo) / errorRate.twoHoursAgo * 100);
    return (
      <div class="flex flex-col">
        <div class="flex flex-row gap-1">
          <Text variant="body-regular" tone="base-500">Error rate: </Text>
          <Text variant="body-regular" tone="base-500">
            {(errorRate.lastHour * 100).toFixed(3)}%
          </Text>
        </div>
        <div class="flex flex-row gap-1">
          <Icon
            id={increase ? "trending-up" : "trending-down"}
            size={16}
            class={`${increase ? "text-critical-900" : "text-positive-900"}`}
          />
          <Text
            variant="body-regular-10"
            tone={increase ? "critical-900" : "positive-900"}
          >
            {isNaN(percent) ? 0.0 : percent.toFixed(0)}% {increase ? "more" : "less"}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div class="bg-base-000 px-[120px] py-10 flex flex-col gap-10">
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
      <div class="flex flex-row gap-6 w-full">
        <div class="flex flex-col gap-4 w-[245px]">
          {apis.map((api) => (
            <button class={`flex flex-row gap-[6px] p-3 items-center w-full rounded-lg
              ${selectedApi.value === api.metadata.name ? "bg-base-200" : ""}
              `} 
              onClick={() => {
                selectedApi.value = api.metadata.name;
              }
            }>
              <Image
                src={api.metadata.imgSrc}
                class="rounded-lg"
                width={selectedApi.value === api.metadata.name ? 64 : 48}
                height={selectedApi.value === api.metadata.name ? 64 : 48}
              />
              <div class="flex flex-col">
                <Text variant="medium-20" class="!font-medium">
                  {api.metadata.name}
                </Text>
                {
                  selectedApi.value === api.metadata.name &&
                  <ErrorRate errorRate={api.errorRate} />
                }
              </div>
            </button>
          ))}
        </div>
        <ApiDashboard
          isDarkMode={isDarkMode}
          dataset={data.get(selectedApi.value).dataset}
          p50Latency={data.get(selectedApi.value).p50Latency}
          p90Latency={data.get(selectedApi.value).p90Latency}
          p95Latency={data.get(selectedApi.value).p95Latency}
          p99Latency={data.get(selectedApi.value).p99Latency}
          statusPageUrl={data.get(selectedApi.value).metadata.statusPageUrl}
        />
      </div>
    </div>
  );
}

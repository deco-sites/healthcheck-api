import Text from "../components/ui/Text.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import ApiDashboard from "../components/ApiDashboard.tsx";
import { useSignal } from "@preact/signals";

import { ComponentProps } from "../sections/PlotData.tsx";

const isDarkMode = true;

export default function PlotData(
  {
    dataset,
    p50Latency,
    p90Latency,
    p95Latency,
    p99Latency,
  }: ComponentProps,
) {
  const apis = [
    {
      name: "VTEX",
      url: "https://status.vtex.com",
      imgSrc: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10965/90b5fce0-ed10-45fb-9814-e4b66725c270",
    },
    {
      name: "Shopify",
      url: "https://shopifystatus.com",
      imgSrc: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10965/88d5ecea-7919-4ff3-91e2-62d9ed0f3bdb",
    }
  ];
  const selectedApi = useSignal<string>("VTEX");
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
        <div class="flex flex-col gap-4 w-[200px]">
          {apis.map((api) => (
            <button class={`flex flex-row gap-3 p-2 items-center w-full rounded-lg
              ${selectedApi.value === api.name ? "bg-base-200" : ""}
              `} 
              onClick={() => {
                selectedApi.value = api.name;
              }
            }>
              <Image
                src={api.imgSrc}
                class="rounded-lg"
                width={48}
                height={48}
              />
              <div class="flex flex-col">
                <Text variant="medium-20" class="!font-medium">
                  {api.name}
                </Text>
                <Text variant="body-regular" tone="base-500">
                  {api.url.slice(8)}
                </Text>
              </div>
            </button>
          ))}
        </div>
        <ApiDashboard
          dataset={dataset}
          p50Latency={p50Latency}
          p90Latency={p90Latency}
          p95Latency={p95Latency}
          p99Latency={p99Latency}
          isDarkMode={isDarkMode}
        />
      </div>

    </div>
  );
}

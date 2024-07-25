import Text from "./ui/Text.tsx";
import Icon from "./ui/Icon.tsx";

export interface MetricCardProps {
  description: string;
  data: number;
  lastData: number;
  class: string;
}

export default function MetricCard (
  { description, data, lastData, class: _IconClass }: MetricCardProps,
) {
  const increase = data > lastData;
  const percent = (Math.abs((data - lastData) / lastData * 100)).toFixed(0);
  return (
    <div class="flex flex-grow flex-col gap-2 p-4 bg-base-100 rounded-lg w-[200px]">
      <div class="flex flex-row gap-1 items-center">
        <Icon
          id="status-dot"
          size={16}
          class={_IconClass}
        />
        <Text variant="body-regular">{description}</Text>
      </div>
      <Text variant="display">
        {data.toFixed(2)}ms
      </Text>
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
          {percent}% {increase ? "more" : "less"} than 2 hours ago
        </Text>
      </div>
    </div>
  );
};
import TimeSeries from "../islands/TimeSeries.tsx";
import {
  Dataset,
  getMedianSeriesConfig,
  getP90SeriesConfig,
  getP95SeriesConfig,
  getReleasesOptionsConfig,
  Series,
} from "../utils/charts.ts";
import { HyperdxData } from "../loaders/Hyperdx.ts";

function formatDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const secondsStr = seconds < 10 ? "0" + seconds : seconds;

  return `${month} ${day} ${hours}:${minutesStr}:${secondsStr} ${ampm}`;
}

interface Props {
  data: HyperdxData[];
}

export function loader ({ data } : Props): Dataset {
  const dayDuration = 24 * 60 * 60 * 1000;

  const isDarkMode = false;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return data && data.length > 0
    ? {
      categories: data.map((item) => {
        const date = new Date(item.date);
        return formatDate(date);
      }).reverse(),
      series: [
        {
          label: "Median",
          values: data
            .map((item) => Number(item.latency.p50.toFixed(2)))
            .reverse(),
          seriesConfig: getMedianSeriesConfig(isDarkMode),
        } as Series,
        {
          label: "P90",
          values: data
            .map((item) => Number(item.latency.p90.toFixed(2)))
            .reverse(),
          seriesConfig: getP90SeriesConfig(isDarkMode),
        } as Series,
        {
          label: "P95",
          values: data
            .map((item) => Number(item.latency.p95.toFixed(2)))
            .reverse(),
          seriesConfig: getP95SeriesConfig(isDarkMode),
        } as Series,
      ],
    }
    : {
      categories: Array.from(
        { length: 30 },
        (_, i) =>
          new Date(today.getTime() - i * dayDuration).toISOString().split(
            "T",
          )[0],
      ).reverse(),
      series: [
        {
          label: "a",
          values: Array.from({ length: 30 }, () => 0),
          seriesConfig: getP90SeriesConfig(isDarkMode),
        } as Series,
      ],
    };
};

export default function PlotData(chartData: Dataset) {
  const optionsConfig = getReleasesOptionsConfig(
    chartData,
    false,
  );
  return (
    <div class="w-[1200px] h-[600px]">
      <TimeSeries
        dataset={chartData}
        class="h-[236px] pt-4"
        optionsConfig={optionsConfig}
      />
    </div>
  );
}

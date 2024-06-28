import TimeSeries from "../components/TimeSeries.tsx";
import {
  Dataset,
  get4xxSeriesConfig,
  get5xxSeriesConfig,
  getDemoStoreData,
  getReleasesOptionsConfig,
  getRequestsSeriesConfig,
  Series,
} from "../utils/charts.ts";

const getRequestsChartData = (hyperDxData: any): Dataset => {
  const dayDuration = 24 * 60 * 60 * 1000;
  
  const isDarkMode = true;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return hyperDxData && hyperDxData.length > 0
    ? {
      categories: hyperDxData.map((item: any) => item.date).reverse(),
      series: [
        {
          label: "Total Requests",
          values: hyperDxData.map((item: any) => item.requests)
            .reverse(),
          seriesConfig: getRequestsSeriesConfig(isDarkMode),
        } as Series,
        {
          label: "Warnings 4xx",
          values: hyperDxData
            .map((item: any) => item.count4xx)
            .reverse(),
          seriesConfig: get4xxSeriesConfig(isDarkMode),
        } as Series,
        {
          label: "Errors 5xx",
          values: hyperDxData
            .map((item: any) => item.count5xx)
            .reverse(),
          seriesConfig: get5xxSeriesConfig(isDarkMode),
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
          seriesConfig: get4xxSeriesConfig(isDarkMode),
        } as Series,
      ],
    };
};

export default function PlotData() {
  const chartData = getRequestsChartData(getDemoStoreData());
  const optionsConfig = getReleasesOptionsConfig(
    chartData,
    true,
  );
  return (
    <TimeSeries
      dataset={chartData}
      class="h-[236px] pt-4"
      optionsConfig={optionsConfig}
    />
  );
}

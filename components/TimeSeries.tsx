import ChartIsland from "../islands/Chart.tsx";
import { Dataset, formatDay } from "../utils/charts.ts";
import { useMemo } from "preact/hooks";

export interface Props {
  dataset: Dataset;
  class?: string;
  // deno-lint-ignore no-explicit-any
  optionsConfig?: any;
  plugins?: any;
}

export default function TimeSeries(
  { dataset, class: _class, optionsConfig, plugins }: Props,
) {
  const labels = useMemo(() => dataset.categories.map(formatDay), [
    dataset.categories,
  ]);

  return (
    <>
      <div class={_class ?? ""}>
        <ChartIsland
          type="line"
          data={{
            labels,
            datasets: dataset.series.map(({ values, label, seriesConfig }) => ({
              label,
              data: values,
              ...seriesConfig,
            })),
          }}
          options={{
            ...optionsConfig,
          }}
          plugins={plugins}
        />
      </div>
    </>
  );
}

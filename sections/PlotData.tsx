import PlotDataIsland from "../islands/PlotDataIsland.tsx";
import { ApisProps } from "site/loaders/ApisLatency.ts";

export interface Props {
  data: ApisProps;
}

export default function PlotData(
  { data }: Props,
) {
  return (
    <PlotDataIsland
      apisData={data}
    />
  );
}

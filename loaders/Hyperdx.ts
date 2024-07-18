// deno-lint-ignore-file no-explicit-any
const HYPERDX_APIKEY = Deno.env.get("HYPERDX_APIKEY");

const path = `https://api.hyperdx.io/api/v1/charts/series`;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const getRequestBody = (
  { startTime, endTime, granularity }: {
    startTime: number;
    endTime: number;
    granularity?: string;
  },
) => {
  return {
    "series": [
      {
        "dataSource": "events",
        "aggFn": "count",
        "where": "vtexcommercestable -fastly.decocache",
        "groupBy": ["level"],
      },
      {
        "dataSource": "events",
        "aggFn": "p50",
        "field": "duration",
        "where": "vtexcommercestable -fastly.decocache",
        "groupBy": ["level"],
      },
      {
        "dataSource": "events",
        "aggFn": "p90",
        "field": "duration",
        "where": "vtexcommercestable -fastly.decocache",
        "groupBy": ["level"],
      },
      {
        "dataSource": "events",
        "aggFn": "p95",
        "field": "duration",
        "where": "vtexcommercestable -fastly.decocache",
        "groupBy": ["level"],
      },
      {
        "dataSource": "events",
        "aggFn": "p99",
        "field": "duration",
        "where": "vtexcommercestable -fastly.decocache",
        "groupBy": ["level"],
      },
    ],
    "endTime": endTime,
    "startTime": startTime,
    "granularity": granularity ?? "1 hour",
    "seriesReturnType": "column",
  };
};

export interface HyperdxData {
  date: number;
  requests: {
    ok: number;
    error: number;
  };
  latency: {
    p50: number;
    p90: number;
    p95: number;
    p99: number;
  };
}

export default async function loader(): Promise<HyperdxData[]> {
  const response = await fetch(encodeURI(path), {
    method: "POST",
    body: JSON.stringify(
      getRequestBody({
        "startTime": new Date().getTime() - 2 * HOUR,
        "endTime": new Date().getTime(),
        "granularity": "1 minute",
      }),
    ),
    headers: {
      "Authorization": `Bearer ${HYPERDX_APIKEY}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const map = new Map<number, HyperdxData>();
  data.data?.forEach(
    (item: { [x: string]: any; ts_bucket: any; group: any[] }) => {
      const time = item.ts_bucket, level = item.group[0];
      const count = item["series_0.data"];
      const p50 = item["series_1.data"];
      const p90 = item["series_2.data"];
      const p95 = item["series_3.data"];
      const p99 = item["series_4.data"];
      if (!map.has(time)) {
        map.set(time, {
          date: time,
          requests: { ok: 0, error: 0 },
          latency: { p50: 0, p90: 0, p95: 0, p99: 0 },
        });
      }

      map.get(time)!.requests[level as "ok" | "error"] = count;

      const oldLatency = map.get(time)!.latency;
      const requests = map.get(time)!.requests;

      const getBalancedMetric = (old: number, new_: number) => {
        if (old == 0) {
          return new_;
        }
        return level == "ok"
          ? (old * requests.error + new_ * requests.ok) /
            (requests.ok + requests.error)
          : (old * requests.ok + new_ * requests.error) /
            (requests.ok + requests.error);
      };
      map.get(time)!.latency.p50 = getBalancedMetric(oldLatency.p50, p50);
      map.get(time)!.latency.p90 = getBalancedMetric(oldLatency.p90, p90);
      map.get(time)!.latency.p95 = getBalancedMetric(oldLatency.p95, p95);
      map.get(time)!.latency.p99 = getBalancedMetric(oldLatency.p99, p99);
    },
  );
  return Array.from(map.values()).reverse();
}

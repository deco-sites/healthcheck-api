// deno-lint-ignore-file no-explicit-any
import { HyperdxData } from "site/loaders/Hyperdx.ts";

export interface SeriesConfig {
  borderColor?: string;
  borderWidth?: number;
  pointBackgroundColor?: any;
  pointBorderColor?: string;
  lineTension?: number;
  segment?: {
    borderColor?: string;
    borderDash?: any;
  };
}

export interface OptionsConfig {
  devicePixelRatio?: number;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  elements?: {
    point: {
      radius: number;
    };
  };
  scales: {
    x: {
      beginAtZero?: boolean;
      grid?: {
        display: boolean;
        color: any;
      };
      ticks?: {
        color: string;
        autoSkip: boolean;
        maxRotation: number;
      };
    };
    y: {
      beginAtZero: boolean;
      grid: {
        display: boolean;
        color: string;
      };
      ticks: {
        color: string;
        callback: (value: string | number) => string;
      };
    };
  };
  interaction?: { mode: string; intersect: boolean };
  plugins?: {
    legend?: {
      display?: boolean;
    };
    tooltip?: {
      backgroundColor?: string;
      titleColor?: string;
      labelFont?: {
        weight?: string;
      };
      footerColor?: string;
      footerFont?: {
        weight?: string;
      };
      yAlign?: string;
      displayColors?: boolean;
      callbacks: {
        title?: (item: any) => string;
        label?: (t: any, _d: any) => string;
        labelTextColor?: () => string;
        footer?: (item: any) => string;
      };
    };
  };
}

export interface Series {
  values: number[];
  label: string;
  seriesConfig?: SeriesConfig;
}

export interface Dataset {
  categories: string[];
  series: Series[];
}

/**
 * Formats a number into a readable format with suffixes for large numbers.
 *
 * @param value - The number or string to be formatted.
 * @param digits - The number of decimal places to include in the formatted number (default is 1).
 * @returns The formatted number as a string.
 */
export function formatNumber(value: string | number, digits = 1): string {
  const num = Number(value);
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export const getHyperdxOptionsConfig = (
  isDarkMode: boolean,
) => {
  return {
    devicePixelRatio: 4,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "#303d3d",
          tickBorderDash: [6, 4],
        },
        ticks: {
          font: {
            family: "sans-serif",
          },
          autoSkip: true,
          maxRotation: 0,
          color: isDarkMode ? "#AFB6B6" : "#0D1717",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "#303d3d",
        },
        ticks: {
          font: {
            family: "sans-serif",
          },
          color: isDarkMode ? "#AFB6B6" : "#0D1717",
          callback: formatNumber,
        },
      },
    },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: {
          family: "sans-serif",
        },
        bodyFont: {
          family: "sans-serif",
        },
        footerFont: {
          family: "sans-serif",
        },
        boxWidth: 8,
        boxHeight: 0.5,
        boxPadding: 3,
      },
    },
  };
};

export const getP99SeriesConfig = (isDarkMode: boolean): SeriesConfig => {
  return {
    borderColor: isDarkMode ? "#FFA300" : "#27AE6B",
    borderWidth: 2,
    pointBackgroundColor: isDarkMode
      ? "#FFA300"
      : "#27AE6B",
    pointBorderColor: isDarkMode ? "#FFA300" : "#27AE6B",
    lineTension: 0.5,
    segment: {
      borderColor: isDarkMode ? "#FFA300" : "#27AE6B",
      borderDash: [6, 0],
    },
  };
};

export const getP95SeriesConfig = (isDarkMode: boolean): SeriesConfig => {
  return {
    borderColor: isDarkMode ? "#FF6E6E" : "#27AE6B",
    borderWidth: 2,
    pointBackgroundColor: isDarkMode
      ? "#FF6E6E"
      : "#27AE6B",
    pointBorderColor: isDarkMode ? "#FF6E6E" : "#27AE6B",
    lineTension: 0.5,
    segment: {
      borderColor: isDarkMode ? "#FF6E6E" : "#27AE6B",
      borderDash: [6, 0],
    },
  };
};

export const getP90SeriesConfig = (isDarkMode: boolean): SeriesConfig => {
  return {
    borderColor: isDarkMode ? "#2FD080" : "#27AE6B",
    borderWidth: 2,
    pointBackgroundColor: isDarkMode
      ? "#2FD080"
      : "#27AE6B",
    pointBorderColor: isDarkMode ? "#2FD080" : "#27AE6B",
    lineTension: 0.5,
    segment: {
      borderColor: isDarkMode ? "#2FD080" : "#27AE6B",
      borderDash: [6, 0],
    },
  };
};

export const getMedianSeriesConfig = (isDarkMode: boolean) => {
  return {
    borderColor: isDarkMode ? "#7857FF" : "#27AE6B",
    borderWidth: 2,
    pointBackgroundColor: isDarkMode
      ? "#7857FF"
      : "#27AE6B",
    pointBorderColor: isDarkMode ? "#7857FF" : "#27AE6B",
    lineTension: 0.5,
    segment: {
      borderColor: isDarkMode ? "#7857FF" : "#27AE6B",
      borderDash: [6, 0],
    },
  };
};

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

  return `    ${month} ${day} ${hours}:${minutesStr}:${secondsStr} ${ampm}    `;
}

export const getDatasetFromHyperdxData = (
  data: HyperdxData[],
  isDarkMode: boolean,
) => {
  const dayDuration = 24 * 60 * 60 * 1000;

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
        {
          label: "P99",
          values: data
            .map((item) => Number(item.latency.p99.toFixed(2)))
            .reverse(),
          seriesConfig: getP99SeriesConfig(isDarkMode),
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

// deno-lint-ignore-file
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

export const getReleasesOptionsConfig = (
  dataset: Dataset,
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
          color: (ctx: any) => {
            const totalTicks = ctx.scale.ticks.length;
            if (
              ctx.tick.value === ctx.scale.ticks[0].value ||
              ctx.tick.value === ctx.scale.ticks[totalTicks - 1].value
            ) {
              return "rgb(128, 145, 145)";
            } else {
              return "transparent";
            }
          },
        },
        ticks: {
          font: {
            family: "sans-serif",
          },
          autoSkip: true,
          maxRotation: 0,
          color: isDarkMode ? "#FAFAFA" : "#0D1717",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgb(128, 145, 145)",
        },
        ticks: {
          font: {
            family: "sans-serif",
          },
          color: isDarkMode ? "#FAFAFA" : "#0D1717",
          callback: function (value: any, index: any, ticks: any) {
            return "$AAAAA";
          },
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

export const getP95SeriesConfig = (isDarkMode: boolean): SeriesConfig => {
  return {
    borderColor: isDarkMode ? "rgb(225, 130, 107)" : "rgb(182, 66, 37)",
    borderWidth: 2,
    pointBackgroundColor: isDarkMode
      ? "rgb(225, 130, 107)"
      : "rgb(176, 59, 30)",
    pointBorderColor: isDarkMode ? "rgb(225, 130, 107)" : "rgb(176, 59, 30)",
    lineTension: 0.5,
    segment: {
      borderColor: isDarkMode ? "rgb(225, 130, 107)" : "rgb(182, 66, 37)",
      borderDash: [6, 0],
    },
  };
};

export const getP90SeriesConfig = (isDarkMode: boolean): SeriesConfig => {
  return {
    borderColor: isDarkMode ? "rgb(246, 213, 121)" : "rgb(153, 115, 11)",
    borderWidth: 2,
    pointBackgroundColor: isDarkMode
      ? "rgb(246, 213, 121)"
      : "rgb(145, 110, 13)",
    pointBorderColor: isDarkMode ? "rgb(246, 213, 121)" : "rgb(145, 110, 13)",
    lineTension: 0.5,
    segment: {
      borderColor: isDarkMode ? "rgb(246, 213, 121)" : "rgb(153, 115, 11)",
      borderDash: [6, 0],
    },
  };
};

export const getMedianSeriesConfig = (isDarkMode: boolean) => {
  return {
    borderColor: isDarkMode ? "rgb(102, 158, 255)" : "rgb(48, 110, 217)",
    borderWidth: 2,
    pointBackgroundColor: isDarkMode
      ? "rgb(102, 158, 255)"
      : "rgb(40, 103, 212)",
    pointBorderColor: isDarkMode ? "rgb(102, 158, 255)" : "rgb(40, 103, 212)",
    lineTension: 0.5,
    segment: {
      borderColor: isDarkMode ? "rgb(102, 158, 255)" : "rgb(48, 110, 217)",
      borderDash: [6, 0],
    },
  };
};

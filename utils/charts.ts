interface DailyMetrics {
  date: string;
  [key: string]: string | number;
}

const demoStoreDataRaw = [
  {
    requests: 1428451,
    count4xx: 88124,
    count5xx: 3055,
  },
  {
    requests: 1927433,
    count4xx: 110545,
    count5xx: 5693,
  },
  {
    requests: 1925333,
    count4xx: 117480,
    count5xx: 5945,
  },
  {
    requests: 1971803,
    count4xx: 105841,
    count5xx: 5747,
  },
  {
    requests: 1819035,
    count4xx: 132436,
    count5xx: 3145,
  },
  {
    requests: 2046630,
    count4xx: 238352,
    count5xx: 21761,
  },
  {
    requests: 2001963,
    count4xx: 206899,
    count5xx: 5906,
  },
  {
    requests: 2144881,
    count4xx: 208557,
    count5xx: 5755,
  },
  {
    requests: 2044483,
    count4xx: 212149,
    count5xx: 5041,
  },
  {
    requests: 1960630,
    count4xx: 195908,
    count5xx: 5541,
  },
  {
    requests: 1968451,
    count4xx: 197479,
    count5xx: 4430,
  },
  {
    requests: 1786623,
    count4xx: 138371,
    count5xx: 2452,
  },
  {
    requests: 1553320,
    count4xx: 92245,
    count5xx: 3551,
  },
  {
    requests: 1753518,
    count4xx: 82533,
    count5xx: 5065,
  },
  {
    requests: 1860345,
    count4xx: 93923,
    count5xx: 3590,
  },
  {
    requests: 1901432,
    count4xx: 91543,
    count5xx: 4793,
  },
  {
    requests: 1934650,
    count4xx: 170814,
    count5xx: 5575,
  },
  {
    requests: 1977932,
    count4xx: 135842,
    count5xx: 3164,
  },
  {
    requests: 1691303,
    count4xx: 132784,
    count5xx: 1860,
  },
  {
    requests: 1835843,
    count4xx: 117203,
    count5xx: 2526,
  },
  {
    requests: 2524426,
    count4xx: 133771,
    count5xx: 3801,
  },
  {
    requests: 2500925,
    count4xx: 77983,
    count5xx: 4058,
  },
  {
    requests: 2018901,
    count4xx: 70553,
    count5xx: 2891,
  },
  {
    requests: 2052313,
    count4xx: 141370,
    count5xx: 2602,
  },
  {
    requests: 2068089,
    count4xx: 153462,
    count5xx: 3511,
  },
  {
    requests: 1359557,
    count4xx: 60694,
    count5xx: 813,
  },
  {
    requests: 1590949,
    count4xx: 124894,
    count5xx: 1284,
  },
  {
    requests: 1601050,
    count4xx: 73181,
    count5xx: 2270,
  },
  {
    requests: 1753139,
    count4xx: 79520,
    count5xx: 2896,
  },
  {
    requests: 1812591,
    count4xx: 112449,
    count5xx: 4175,
  },
];

export const getDemoStoreData = () => {
  const today = new Date();
  const dayDuration = 24 * 60 * 60 * 1000;
  return demoStoreDataRaw.map((item, i) => {
    return {
      date: new Date(today.getTime() - i * dayDuration).toISOString().slice(
        0,
        10,
      ),
      requests: item.requests,
      count4xx: item.count4xx,
      count5xx: item.count5xx,
    };
  });
};

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
  scales: {
    x: {
      beginAtZero: boolean;
      grid: {
        display: boolean;
        color: any;
      };
      ticks: {
        color: string;
      };
    };
    y: {
      beginAtZero: boolean;
      grid: {
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
    tooltip: {
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

const EMPTY_SCALE = {
  ticks: {
    display: false,
  },
  grid: {
    display: false,
  },
  border: {
    display: false,
  },
};

export const CHART_OPTIONS = {
  EMPTY: {
    layout: {
      padding: 0,
    },
    scales: {
      x: EMPTY_SCALE,
      y: EMPTY_SCALE,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  },
};

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

/**
 * Extracts and returns the day from a date string in "YYYY-MM-DD" format.
 *
 * @param date - The date string to extract the day from.
 * @returns The day extracted from the date.
 */
export function formatDay(date: string): string {
  return date.split("-")[2];
}

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export function convertToChartData(
  rawData: DailyMetrics[],
  properties: string[],
  period?: string,
  siteId?: string,
) {
  const date = period ? new Date(period) : new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysInMonth = getDaysInMonth(month + 1, year);
  const categories: string[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    categories.push(formatDate(date));
  }

  const aggregatedData: { [date: string]: { [prop: string]: number } } = {};
  rawData.forEach((item) => {
    if (
      (siteId === "*" || item.site === siteId) &&
      !aggregatedData[item.date]
    ) {
      aggregatedData[item.date] = {};
      properties.forEach((prop) => {
        aggregatedData[item.date][prop] = 0;
      });
    }
    properties.forEach((prop) => {
      if (siteId === "*" || item.site === siteId) {
        aggregatedData[item.date][prop] += (item[prop] as number) || 0;
      }
    });
  });

  const seriesData: { [prop: string]: number[] } = {};
  properties.forEach((prop) => {
    seriesData[prop] = new Array(daysInMonth).fill(0);
  });

  Object.keys(aggregatedData).forEach((date) => {
    const index = categories.indexOf(date);
    if (index !== -1) {
      properties.forEach((prop) => {
        seriesData[prop][index] = aggregatedData[date][prop];
      });
    }
  });

  const series = properties.map((prop) => {
    return {
      label: prop
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      values: seriesData[prop],
    };
  });

  return { categories, series };
}

/**
 * Calculates the total of all values in a dataset.
 * @param {Object} dataset - The dataset containing a 'values' array.
 * @returns {number} - The total sum of the values.
 */
export function calculateTotal(dataset: Series) {
  if (!dataset || !Array.isArray(dataset.values)) {
    return 0;
  }

  return dataset.values.reduce((acc, curr) => acc + curr, 0);
}

export const getBillingSeriesConfig = (
  dataset: Dataset,
): SeriesConfig => {
  const dash = (ctx: any, value: any) => {
    const today = new Date(Date.now());
    const todayString = today.toISOString().split("T")[0];
    const index = dataset.categories.indexOf(todayString);

    return (
      ((ctx.p0DataIndex + 1) >= index || ctx.dataIndex >= index) &&
      index >= 0 && value
    );
  };

  return {
    borderColor: "rgb(39, 174, 107)",
    borderWidth: 2,
    pointBackgroundColor: (ctx: any) =>
      dash(ctx, "rgb(22, 33, 33)") || "rgb(2, 246, 124)",
    pointBorderColor: "rgb(2, 246, 124)",
    lineTension: 0.4,
    segment: {
      borderColor: "rgb(39, 174, 107)",
      borderDash: (ctx: any) => dash(ctx, [6, 6]) || [6, 0],
    },
  };
};

const commonOptions = (isDarkMode: boolean) => {
  return {
    elements: {
      point:{
        radius: 0
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
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
          color: isDarkMode ? "#FAFAFA" : "#0D1717",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display:true,
          color: "rgb(128, 145, 145)",
        },
        ticks: {
          color: isDarkMode ? "#FAFAFA" : "#0D1717",
          callback: formatNumber,
        },
      },
    },
    interaction: { mode: "index", intersect: false },
  };
};

export const getBillingOptionsConfig = (
  dataset: Dataset,
  isDarkMode = true,
): OptionsConfig => {
  return {
    ...commonOptions(isDarkMode),
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#FAFAFA",
        titleColor: "#0D1717",
        footerColor: "#0D1717",
        footerFont: {
          weight: "regular",
        },
        yAlign: "bottom",
        displayColors: false,
        callbacks: {
          title: (item: any) => {
            const date = new Date(
              dataset.categories[item[0].dataIndex],
            );
            return date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              timeZone: "UTC",
            });
          },
          label: () => "",
          footer: (item: any) => {
            const label = item[0]?.dataset?.label;
            const value = item[0].formattedValue;
            return `${value} ${label}`;
          },
        },
      },
    },
  };
};

export const getReleasesOptionsConfig = (
  dataset: Dataset,
  isDarkMode: boolean,
): OptionsConfig => {
  return {
    devicePixelRatio: 4,
    responsive: true,
    maintainAspectRatio: false,
    ...commonOptions(isDarkMode),
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#FAFAFA",
        titleColor: "#0D1717",
        labelFont: {
          weight: "regular",
        },
        yAlign: "bottom",
        displayColors: false,
        callbacks: {
          title: (item: any) => {
            const date = new Date(
              dataset.categories[item[0].dataIndex],
            );
            return date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              timeZone: "UTC",
            });
          },
          label: (t: any, _d: any) => {
            return `${t.formattedValue} ${t.dataset.label}`;
          },
          labelTextColor: () => {
            return "#0D1717";
          },
        },
      },
    },
  };
};

export const get5xxSeriesConfig = (isDarkMode: boolean): SeriesConfig => {
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

export const get4xxSeriesConfig = (isDarkMode: boolean): SeriesConfig => {
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

export const getRequestsSeriesConfig = (isDarkMode: boolean) => {
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

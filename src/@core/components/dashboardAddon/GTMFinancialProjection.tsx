// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Third Party Imports
import { ApexOptions } from "apexcharts";

// ** Custom Components Imports
import OptionsMenu from "src/@core/components/option-menu";
import ReactApexcharts from "src/@core/components/react-apexcharts";

// ** Util Import
import { hexToRGBA } from "src/@core/utils/hex-to-rgba";
import { useGenAI } from "../genAI/GenAIProvider";

const GTMFinancialProjection = () => {
  // ** Hook
  const theme = useTheme();
  const { genAIData } = useGenAI();

  const series = [
    {
      name: "Penjualan",
      type: "column",
      data: genAIData
        ? Object.values(genAIData?.gtm.market_size_timeline).map((x) =>
            Number.parseFloat(x)
          )
        : [],
    },
    {
      type: "line",
      name: "Penjualan",
      data: genAIData
        ? Object.values(genAIData?.gtm.market_size_timeline).map((x) =>
            Number.parseFloat(x)
          )
        : [],
    },
  ];

  const options: ApexOptions = {
    chart: {
      offsetY: -9,
      offsetX: -16,
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "35%",
        endingShape: "rounded",
        startingShape: "rounded",
        colors: {
          ranges: [
            {
              to: 50,
              from: 40,
              color: hexToRGBA(theme.palette.primary.main, 1),
            },
          ],
        },
      },
    },
    markers: {
      size: 3.5,
      strokeWidth: 2,
      fillOpacity: 1,
      strokeOpacity: 1,
      colors: [theme.palette.background.paper],
      strokeColors: hexToRGBA(theme.palette.primary.main, 1),
    },
    stroke: {
      width: [0, 2],
      colors: [theme.palette.customColors.trackBg, theme.palette.primary.main],
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [hexToRGBA(theme.palette.customColors.trackBg, 1)],
    grid: {
      strokeDashArray: 7,
      borderColor: theme.palette.divider,
    },
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    xaxis: {
      categories: genAIData
        ? Object.keys(genAIData?.gtm.market_size_timeline).map((x) => `Yr ${x}`)
        : [],
      tickPlacement: "on",
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      min: 0,
      max: Object.values(genAIData?.gtm.market_size_timeline ?? { "1": 90 })
        .map((x) => Number.parseFloat(x))
        .reduce((a, b) => (a > b ? a : b), 0),
      show: true,
      tickAmount: 3,
      labels: {
        formatter: (value) =>
          `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}JT`,
        style: {
          fontSize: "0.75rem",
          colors: theme.palette.text.disabled,
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader title="Proyeksi Keuntungan" />
      <CardContent
        sx={{ "& .apexcharts-xcrosshairs.apexcharts-active": { opacity: 0 } }}
      >
        <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: 4 }} variant="h5">
            {genAIData
              ? Math.round(
                  Object.values(genAIData?.gtm.market_size_timeline)
                    .map((x) => Number.parseFloat(x))
                    .reduce((a, b) => a + b, 0)
                )
              : ""}
            JT
          </Typography>
          <Typography variant="body2">
            Potensi keuntungan yang bisa didapatkan dalam waktu 5 tahun
          </Typography>
        </Box>
        <ReactApexcharts
          type="line"
          height={208}
          series={series}
          options={options}
        />
      </CardContent>
    </Card>
  );
};

export default GTMFinancialProjection;

// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Component Import
import CardStatisticsVertical from "src/@core/components/card-statistics/card-stats-vertical";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

// ** Demo Components Imports
import AnalyticsPerformance from "src/views/dashboards/analytics/AnalyticsPerformance";
import Overview from "src/@core/components/dashboardAddon/overview";
import AnalysisInsight from "src/@core/components/dashboardAddon/AnalysisInsight";
import LocalMarketSize from "src/@core/components/dashboardAddon/LocalMarketSize";
import GlobalMarketSize from "src/@core/components/dashboardAddon/GlobalMarketSize";
import { useGenAI } from "src/@core/components/genAI/GenAIProvider";

const AnalyticsDashboard = () => {
  const { genAIData } = useGenAI();
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className="match-height">
        <Grid item xs={12} md={12}>
          <Overview />
        </Grid>

        {/* <Grid item xs={12} md={8}>
          <AnalyticsTotalTransactions />
        </Grid> */}
        <Grid item xs={12} sm={8}>
          <AnalyticsPerformance />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalysisInsight
            title="Analisis Kekuatan Bisnis"
            strength={
              genAIData?.market_opportunity.insight_strength_potential ?? ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <LocalMarketSize />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalysisInsight
            title="Analisis Pasar Lokal"
            strength={
              genAIData?.market_opportunity
                .market_size_estimation_local_insight ?? ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <GlobalMarketSize />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalysisInsight
            title="Analisis Pasar Global"
            strength={
              genAIData?.market_opportunity
                .market_size_estimation_international_insight ?? ""
            }
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default AnalyticsDashboard;

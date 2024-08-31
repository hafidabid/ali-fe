// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Component Import
import CardStatisticsVertical from "src/@core/components/card-statistics/card-stats-vertical";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

// ** Demo Components Imports
import AnalyticsSessions from "src/views/dashboards/analytics/AnalyticsSessions";
import AnalyticsOverview from "src/views/dashboards/analytics/AnalyticsOverview";
import AnalyticsPerformance from "src/views/dashboards/analytics/AnalyticsPerformance";
import AnalyticsWeeklySales from "src/views/dashboards/analytics/AnalyticsWeeklySales";
import AnalyticsVisitsByDay from "src/views/dashboards/analytics/AnalyticsVisitsByDay";
import AnalyticsTotalRevenue from "src/views/dashboards/analytics/AnalyticsTotalRevenue";
import AnalyticsSalesCountry from "src/views/dashboards/analytics/AnalyticsSalesCountry";
import AnalyticsCongratulations from "src/views/dashboards/analytics/AnalyticsCongratulations";
import AnalyticsActivityTimeline from "src/views/dashboards/analytics/AnalyticsActivityTimeline";
import AnalyticsTotalTransactions from "src/views/dashboards/analytics/AnalyticsTotalTransactions";
import AnalyticsProjectStatistics from "src/views/dashboards/analytics/AnalyticsProjectStatistics";
import AnalyticsTopReferralSources from "src/views/dashboards/analytics/AnalyticsTopReferralSources";
import Overview from "src/@core/components/dashboardAddon/overview";
import AnalysisInsight from "src/@core/components/dashboardAddon/AnalysisInsight";
import LocalMarketSize from "src/@core/components/dashboardAddon/LocalMarketSize";
import GlobalMarketSize from "src/@core/components/dashboardAddon/GlobalMarketSize";

const AnalyticsDashboard = () => {
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
            strength={`loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris. loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris.`}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <LocalMarketSize />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalysisInsight
            title="Analisis Pasar Lokal"
            strength={`loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris. loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris.`}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <GlobalMarketSize />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalysisInsight
            title="Analisis Pasar Global"
            strength={`loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris. loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris.`}
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default AnalyticsDashboard;

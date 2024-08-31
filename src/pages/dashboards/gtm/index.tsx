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
import { Card, CardHeader } from "@mui/material";
import GTMTimeline from "src/@core/components/dashboardAddon/GTMTimeline";
import GTMFinancialProjection from "src/@core/components/dashboardAddon/GTMFinancialProjection";

const AnalyticsDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className="match-height">
        <Grid item xs={12} md={12}>
          <Overview />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={"Strategy Panel"} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalysisInsight
            title="Diferenisasi Produk"
            strength={`loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris. loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris.`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalysisInsight
            title="Strategi Penetapan Harga"
            strength={`loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris. loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris.`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalysisInsight
            title="Saluran Distribusi"
            strength={`loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris. loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris.`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalysisInsight
            title="Kanal Marketing"
            strength={`loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris. loram ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. a day in paris.`}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <GTMTimeline />
        </Grid>
        <Grid item xs={12} md={4}>
          <GTMFinancialProjection />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default AnalyticsDashboard;

// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Component Import
import CardStatisticsVertical from "src/@core/components/card-statistics/card-stats-vertical";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

// ** Demo Components Imports
import Overview from "src/@core/components/dashboardAddon/overview";
import AnalysisInsight from "src/@core/components/dashboardAddon/AnalysisInsight";
import CrmAward from "src/views/dashboards/crm/CrmAward";
import { useGenAI } from "src/@core/components/genAI/GenAIProvider";

const FundingCommunityPage = () => {
  const { genAIData } = useGenAI();

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className="match-height">
        <Grid item xs={12} md={12}>
          <Overview />
        </Grid>
        <Grid item xs={12} md={6}>
          <CrmAward />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalysisInsight
            title="Komunitas dan Berjejaring"
            strength={genAIData?.funding_community.community ?? ""}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <AnalysisInsight
            title="Mencari Pendanaan?"
            strength={genAIData?.funding_community.how_to_get_fund ?? ""}
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default FundingCommunityPage;

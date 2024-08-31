// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

// ** Demo Components Imports
import Overview from "src/@core/components/dashboardAddon/overview";
import AnalysisInsight from "src/@core/components/dashboardAddon/AnalysisInsight";
import { Card, CardHeader } from "@mui/material";
import GTMTimeline from "src/@core/components/dashboardAddon/GTMTimeline";
import GTMFinancialProjection from "src/@core/components/dashboardAddon/GTMFinancialProjection";
import { useGenAI } from "src/@core/components/genAI/GenAIProvider";

const AnalyticsDashboard = () => {
  const { genAIData } = useGenAI();

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
            strength={genAIData?.gtm.strategy_panel.diferensiasi_produk ?? ""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalysisInsight
            title="Strategi Penetapan Harga"
            strength={
              genAIData?.gtm.strategy_panel.strategi_penetapan_harga ?? ""
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalysisInsight
            title="Saluran Distribusi"
            strength={genAIData?.gtm.strategy_panel.saluran_distribusi ?? ""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalysisInsight
            title="Kanal Marketing"
            strength={genAIData?.gtm.strategy_panel.marketing_channel ?? ""}
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

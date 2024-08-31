// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid, { GridProps } from "@mui/material/Grid";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useGenAI } from "../genAI/GenAIProvider";

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    order: -1,
    display: "flex",
    justifyContent: "center",
  },
}));

// Styled component for the image
const Img = styled("img")(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: "absolute",
  [theme.breakpoints.down("sm")]: {
    width: 250,
    position: "static",
  },
}));
export default function Overview() {
  const [businessName, setBusinessName] = useState("");
  const [businessSummary, setBusinessSummary] = useState("");
  const [quickInsight, setQuickInsight] = useState("");
  const theme = useTheme();

  const { genAIData } = useGenAI();

  useEffect(() => {
    console.log("gen ai data is", genAIData);
    if (genAIData) {
      setBusinessName(localStorage.getItem("businessName") || "");

      setBusinessSummary(genAIData?.overview.summary || "");

      setQuickInsight(
        genAIData?.overview.suggestion || "Tidak ada sugesti untuk saat ini"
      );
    }
  }, [genAIData]);

  return (
    <Card sx={{ position: "relative" }}>
      <CardContent
        sx={{ p: (theme) => `${theme.spacing(6.75, 7.5)} !important` }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" sx={{ mb: 4.5 }}>
              Halo{" "}
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {businessName}
              </Box>
              ! 🎉
            </Typography>
            <Typography variant="body2" align="justify">
              {businessSummary}
            </Typography>
            <Alert
              icon={false}
              sx={{
                py: 3,
                my: 2,
                "& .MuiAlert-message": { p: 0 },
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, display: "block", color: "primary.main" }}
              >
                💡{` `}
                <strong>Wawasan Penting!</strong>
              </Typography>
              <Typography
                variant="caption"
                align="justify"
                sx={{ display: "block", color: "primary.main" }}
              >
                {quickInsight}
              </Typography>
            </Alert>
          </Grid>

          <StyledGrid item xs={12} sm={6}>
            <Img
              alt="Congratulations John"
              src={`/images/cards/illustration-john-${theme.palette.mode}.png`}
            />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  );
}

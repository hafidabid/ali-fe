// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// Styled component for the trophy image
const TrophyImg = styled("img")(({ theme }) => ({
  right: 22,
  bottom: 0,
  width: 106,
  position: "absolute",
  [theme.breakpoints.down("sm")]: {
    width: 95,
  },
}));

const CrmAward = () => {
  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6">Estimasi Pendanaan</Typography>
        <Typography variant="body2" sx={{ mb: 3.25 }}>
          Untuk membuat bisnis anda supaya naik tahta
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "primary.main" }}
        >
          IDR42.8 M
        </Typography>
        <Typography variant="body2" sx={{ mb: 3.25 }}>
          Pendanaan dibutuhkan
        </Typography>

        <TrophyImg alt="trophy" src="/images/cards/trophy.png" />
      </CardContent>
    </Card>
  );
};

export default CrmAward;

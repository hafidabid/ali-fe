import { FC } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Chip } from "@mui/material";

// ** Types
interface StrengthAnalysisProps {
  strength: string;
  title: string;
}

// ** StrengthAnalysis Component
const AnalysisInsight: FC<StrengthAnalysisProps> = ({ strength, title }) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Typography
          variant="body1"
          color="textPrimary"
          className="font-semibold"
          align="justify"
        >
          {strength}
        </Typography>
        {/* Example of additional chips or status indicators */}
        {/* <Box mt={2} className="flex gap-4">
          <Chip label="Strong" color="success" className="text-sm" />
          <Chip label="Needs Improvement" color="warning" className="text-sm" />
        </Box> */}
      </CardContent>
    </Card>
  );
};

export default AnalysisInsight;

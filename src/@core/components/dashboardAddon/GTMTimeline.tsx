// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import MuiTimeline, { TimelineProps } from "@mui/lab/Timeline";

// ** Custom Components Imports
import OptionsMenu from "src/@core/components/option-menu";
import { useGenAI } from "../genAI/GenAIProvider";
import { useEffect, useState } from "react";

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  "& .MuiTimelineItem-root": {
    width: "100%",
    "&:before": {
      display: "none",
    },
  },
});

const GTMTimeline = () => {
  const { genAIData } = useGenAI();
  const [milestoneNum, setMilestoneNum] = useState<string[]>([]);
  const [milestoneText, setMilestoneText] = useState<string[][]>([]);

  useEffect(() => {
    if (genAIData) {
      setMilestoneNum(Object.keys(genAIData.gtm.milestone));
      setMilestoneText(Object.values(genAIData.gtm.milestone));
    }
  }, [genAIData]);

  return (
    <Card>
      <CardHeader title="Timeline Pemasaran dan Pengembangan" />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(2.5)} !important` }}>
        <Timeline sx={{ my: 0, py: 0 }}>
          {milestoneNum.map((num, index) => (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot
                  color={
                    index % 3 === 0
                      ? "primary"
                      : index % 3 === 1
                      ? "success"
                      : "warning"
                  }
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                sx={{ mt: 0, mb: (theme) => `${theme.spacing(3)} !important` }}
              >
                <Box
                  sx={{
                    mb: 3,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ mr: 2, fontWeight: 600 }}>
                    {index + 1}.{` `}
                    {milestoneText[index][0] ?? ""}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {milestoneText[index][1] ?? ""}
                  </Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default GTMTimeline;

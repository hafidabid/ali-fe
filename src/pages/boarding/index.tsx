// ** React Imports
import { useState, ReactNode, MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Typography, { TypographyProps } from "@mui/material/Typography";
import MuiFormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";
import useBgColor from "src/@core/hooks/useBgColor";
import { useSettings } from "src/@core/hooks/useSettings";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import {
  Questions,
  QuestionType,
} from "../../@core/components/onboarding/question";
import Select from "@mui/material/Select";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  MenuItem,
  Slider,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const LoginIllustration = styled("img")(({ theme }) => ({
  maxWidth: "48rem",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "38rem",
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "30rem",
  },
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: "50%",
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "45%",
  },
}));

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.18px",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
  })
);

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

const defaultValues = {
  password: "admin",
  email: "admin@materialize.com",
};

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [responses, setResponses] = useState<
    Record<string, Record<string, string>>
  >({});
  const [currentStep, setCurrentStep] = useState<number>(0);

  // State to hold the slider value
  const [sliderValue, setSliderValue] = useState<number>(1_000_000); // Default slider value

  const [_errors, setErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState<boolean>(false);
  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();
  const bgColors = useBgColor();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  // ** Vars
  const { skin } = settings;

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const imageSource =
    skin === "bordered"
      ? "auth-v2-login-illustration-bordered"
      : "auth-v2-login-illustration";

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    const questions = Questions[currentStep].questions;
    const errF: string[] = [];

    questions.forEach((question) => {
      if (
        question.required &&
        !getResponseValue(sectionKey, question.jsonIdentifier)
      ) {
        newErrors[question.jsonIdentifier] = "This field is required.";
        errF.push(question.renderedQuestion ?? question.question);
      }
    });

    setErrors(newErrors);

    if (errF.length > 0) {
      alert(`Anda belum menginput: ${errF.join(", ")}`);
    }
    return Object.keys(newErrors).length === 0; // No errors if the object is empty
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < Questions.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitNew = () => {
    if (validateStep()) {
      console.log("User responses:", responses);

      // set unique id first
      const uniqueId = `${uuidv4()}`;

      // put data to local storage first
      localStorage.setItem("responses", JSON.stringify(responses));
      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem(
        "businessName",
        getResponseValue("informasi_bisnis_dasar", "nama_usaha")
      );

      // hit the backend api
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ business_id: uniqueId, data: responses }),
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            auth.login(
              {
                email: "admin@materialize.com",
                password: "admin",
                rememberMe: true,
              },
              () => {
                setError("email", {
                  type: "manual",
                  message: "Email or Password is invalid",
                });
              }
            );
          } else {
            console.error("Onboard POST Response:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });

      // Add logic to handle form submission, e.g., send data to a backend server
    }
  };

  const handleChange = (mainKey: string, questionKey: string, value: any) => {
    setResponses({
      ...responses,
      [mainKey]: {
        ...responses[mainKey],
        [questionKey]: value,
      },
    });

    // Clear error when input is valid
    if (_errors[questionKey] && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [questionKey]: "",
      }));
    }
  };

  const getResponseValue = (secKey: string, qKey: string): string => {
    try {
      return responses[secKey][qKey] ?? "";
    } catch (e) {
      return "";
    }
  };

  const sectionKey = Questions[currentStep].jsonIdentifier;
  return (
    <Box className="content-right">
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt="login-illustration"
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </LoginIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper
        sx={
          skin === "bordered" && !hidden
            ? { borderLeft: `1px solid ${theme.palette.divider}` }
            : {}
        }
      >
        <Box
          sx={{
            p: 7,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: "flex",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width={47}
                fill="none"
                height={26}
                viewBox="0 0 268 150"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fillOpacity="0.4"
                  fill="url(#paint0_linear_7821_79167)"
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fillOpacity="0.4"
                  fill="url(#paint1_linear_7821_79167)"
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)"
                />
                <defs>
                  <linearGradient
                    y1="0"
                    x1="25.1443"
                    x2="25.1443"
                    y2="143.953"
                    id="paint0_linear_7821_79167"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    y1="0"
                    x1="25.1443"
                    x2="25.1443"
                    y2="143.953"
                    id="paint1_linear_7821_79167"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <Typography
                variant="h6"
                sx={{
                  ml: 2,
                  lineHeight: 1,
                  fontWeight: 700,
                  fontSize: "1.5rem !important",
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant="h5">{`Selamat datang di aplikasi ${themeConfig.templateName}! 👋🏻`}</TypographyStyled>
              <Typography variant="body2">
                Solusi memajukan usaha anda
              </Typography>
            </Box>

            {/* Step Progress Indicator */}
            <Stepper activeStep={currentStep} alternativeLabel sx={{ mb: 4 }}>
              {Questions.map((section, index) => (
                <Step key={index}>
                  <StepLabel>{`Step ${index + 1}`}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              
            </form> */}

            {/* Render Questions for the Current Step */}
            <Box key={Questions[currentStep].title} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {Questions[currentStep].title}
              </Typography>
              {Questions[currentStep].questions.map((question) => {
                const {
                  type,
                  question: questionKey,
                  selections,
                  renderedQuestion,
                  rangeOpt,
                  jsonIdentifier: questionJsonIdentifier,
                } = question;

                const localOptions = selections || [];
                switch (type) {
                  case QuestionType.Text:
                  case QuestionType.TextArea:
                    return (
                      <FormControl
                        fullWidth
                        sx={{ mb: 4 }}
                        key={questionJsonIdentifier}
                      >
                        <TextField
                          multiline={type === QuestionType.TextArea}
                          rows={type === QuestionType.TextArea ? 4 : 1}
                          label={renderedQuestion}
                          value={getResponseValue(
                            sectionKey,
                            questionJsonIdentifier
                          )}
                          onChange={(e) =>
                            handleChange(
                              sectionKey,
                              questionJsonIdentifier,
                              e.target.value
                            )
                          }
                          error={!!_errors[questionJsonIdentifier]}
                          helperText={_errors[questionJsonIdentifier] || ""}
                        />
                      </FormControl>
                    );
                  case QuestionType.Select:
                    return (
                      <FormControl
                        fullWidth
                        sx={{ mb: 4 }}
                        key={questionJsonIdentifier}
                        error={!!_errors[questionJsonIdentifier]}
                      >
                        <InputLabel>{renderedQuestion}</InputLabel>
                        <Select
                          value={getResponseValue(
                            sectionKey,
                            questionJsonIdentifier
                          )}
                          onChange={(e) => {
                            handleChange(
                              sectionKey,
                              questionJsonIdentifier,
                              e.target.value
                            );
                          }}
                        >
                          {selections?.map((selection) => (
                            <MenuItem
                              key={selection.value}
                              value={selection.value}
                            >
                              {selection.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    );
                  case QuestionType.SelectWithCustomValue: {
                    const handleInputChange = (
                      event: any,
                      newInputValue: string
                    ) => {
                      // If user presses Enter and the value is not in the list
                      if (
                        event?.type === "keydown" &&
                        event?.key === "Enter" &&
                        !localOptions.some(
                          (option) => option.label === newInputValue
                        )
                      ) {
                        // Add the new custom option to the options array
                        const newOption = {
                          label: newInputValue,
                          value: newInputValue,
                        };
                        localOptions.push(newOption);
                        handleChange(
                          sectionKey,
                          questionJsonIdentifier,
                          newInputValue
                        ); // Update responses with the new custom option
                      } else {
                        handleChange(
                          sectionKey,
                          questionJsonIdentifier,
                          newInputValue
                        );
                      }
                    };

                    return (
                      <FormControl
                        fullWidth
                        sx={{ mb: 4 }}
                        key={questionJsonIdentifier}
                        error={!!_errors[questionJsonIdentifier]}
                      >
                        <Autocomplete
                          options={localOptions.map((option) => option.label)}
                          getOptionLabel={(option) => option}
                          freeSolo
                          noOptionsText="Enter to create a new option"
                          onInputChange={(event, newValue) =>
                            handleInputChange(event, newValue)
                          }
                          onChange={(event, newValue) =>
                            handleChange(
                              sectionKey,
                              questionJsonIdentifier,
                              newValue
                            )
                          }
                          value={getResponseValue(
                            sectionKey,
                            questionJsonIdentifier
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={renderedQuestion}
                              variant="outlined"
                              onKeyDown={(e: any) => {
                                if (
                                  e.key === "Enter" &&
                                  !localOptions.some(
                                    (option) => option.label === e.target.value
                                  )
                                ) {
                                  localOptions.push({
                                    label: e.target.value,
                                    value: e.target.value,
                                  });
                                  handleChange(
                                    sectionKey,
                                    questionJsonIdentifier,
                                    e.target.value
                                  ); // Update with new custom value
                                }
                              }}
                            />
                          )}
                        />
                      </FormControl>
                    );
                  }
                  case QuestionType.MultiSelect:
                    return (
                      <div>
                        <Typography sx={{ mb: 4 }} gutterBottom>
                          {renderedQuestion}
                        </Typography>
                        <FormControl
                          component="fieldset"
                          key={questionJsonIdentifier}
                          sx={{ mb: 4 }}
                          error={!!_errors[questionJsonIdentifier]}
                        >
                          {selections?.map((selection) => (
                            <FormControlLabel
                              key={selection.value}
                              control={
                                <Checkbox
                                  checked={getResponseValue(
                                    sectionKey,
                                    questionJsonIdentifier
                                  ).includes(selection.value)}
                                  onChange={(e) => {
                                    const selectedValues = getResponseValue(
                                      sectionKey,
                                      questionJsonIdentifier
                                    ).split(";");
                                    if (e.target.checked) {
                                      handleChange(
                                        sectionKey,
                                        questionJsonIdentifier,
                                        [
                                          ...selectedValues,
                                          selection.value,
                                        ].join(";")
                                      );
                                    } else {
                                      handleChange(
                                        sectionKey,
                                        questionJsonIdentifier,
                                        selectedValues
                                          .filter(
                                            (value: string) =>
                                              value !== selection.value
                                          )
                                          .join(";")
                                      );
                                    }
                                  }}
                                />
                              }
                              label={selection.label}
                            />
                          ))}
                        </FormControl>
                      </div>
                    );
                  case QuestionType.Range: {
                    const handleSliderChange = (
                      event: Event,
                      newValue: number | number[]
                    ) => {
                      const value = newValue as number;
                      setSliderValue(value);
                      const rangeString = `${value}`;
                      handleChange(
                        sectionKey,
                        questionJsonIdentifier,
                        rangeString
                      );
                    };

                    return (
                      <FormControl
                        fullWidth
                        sx={{ mb: 4 }}
                        key={questionJsonIdentifier}
                        error={!!_errors[questionJsonIdentifier]}
                      >
                        <Typography id="slider" gutterBottom>
                          {renderedQuestion}
                        </Typography>
                        <Slider
                          value={Number.parseInt(
                            getResponseValue(sectionKey, questionJsonIdentifier)
                          )}
                          onChange={handleSliderChange}
                          valueLabelDisplay="auto"
                          min={rangeOpt?.min || 0}
                          max={rangeOpt?.max || 100} // Adjust the range limits as necessary
                        />
                        <Typography variant="body2">
                          {`${Number.parseInt(
                            getResponseValue(sectionKey, questionJsonIdentifier)
                          ).toLocaleString()}`}
                        </Typography>
                      </FormControl>
                    );
                  }
                  case QuestionType.Location:
                    return (
                      <FormControl
                        fullWidth
                        sx={{ mb: 4 }}
                        key={questionJsonIdentifier}
                      >
                        <TextField
                          label={renderedQuestion}
                          value={getResponseValue(
                            sectionKey,
                            questionJsonIdentifier
                          )}
                          onChange={(e) =>
                            handleChange(
                              sectionKey,
                              questionJsonIdentifier,
                              e.target.value
                            )
                          }
                          error={!!_errors[questionJsonIdentifier]}
                          helperText={_errors[questionJsonIdentifier]}
                        />
                      </FormControl>
                    );
                  default:
                    return null;
                }
              })}
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                disabled={currentStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Previous
              </Button>
              {currentStep === Questions.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmitNew}
                  sx={{ mb: 7 }}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

LoginPage.guestGuard = true;

export default LoginPage;

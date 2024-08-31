// ** React Imports
import {
  ReactNode,
  ReactElement,
  useEffect,
  useState,
  useCallback,
} from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";

// ** MUI Imports
import { Box, Button, CircularProgress, Typography } from "@mui/material";

// ** Custom Components Import
import FallbackSpinner from "../spinner";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [fail, setFail] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  // Check onboarding status
  const checkStatus = useCallback(async () => {
    const id = localStorage.getItem("uniqueId");
    if (!id) {
      setLoading(false);
      router.replace("/boarding");
      return;
    }

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/${id}`
      );

      if (resp.status === 200) {
        const _data = await resp.json();
        if (_data.success) {
          setLoading(false);
        } else if (_data.failed || counter > 50) {
          setFail(true);
          setLoading(false);
        } else {
          setCounter((prevCounter) => prevCounter + 1);
        }
      } else {
        setFail(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
      setFail(true);
      setLoading(false);
    }
  }, [counter, router]);

  // Redirect user if not authenticated or no user data is found
  useEffect(() => {
    if (!router.isReady) return;

    if (auth.user === null && !window.localStorage.getItem("userData")) {
      const redirectTo =
        router.asPath !== "/"
          ? { pathname: "/boarding", query: { returnUrl: router.asPath } }
          : "/boarding";
      router.replace(redirectTo);
    }
  }, [router, auth.user]);

  // Periodically check status if loading and not failed
  useEffect(() => {
    if (loading && !fail) {
      const interval = setTimeout(() => {
        checkStatus();
      }, 2500);

      return () => clearTimeout(interval);
    }
  }, [loading, fail, checkStatus]);

  // Retry fetching status manually
  const handleManualRefresh = () => {
    setLoading(true);
    setCounter(0);
    checkStatus();
  };

  // Clear local storage and restart onboarding
  const handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Render loading state
  if (auth.loading || auth.user === null) {
    return fallback;
  }

  if (loading) {
    return <LoadingScreen onRefresh={handleManualRefresh} />;
  }

  // Render error state
  if (fail) {
    return (
      <ErrorScreen
        onRetry={handleManualRefresh}
        onClearData={handleClearData}
      />
    );
  }

  // Render children if authenticated and not loading
  return <>{children}</>;
};

// Loading screen component
const LoadingScreen = ({ onRefresh }: { onRefresh: () => void }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100vh"
    p={2}
    textAlign="center"
  >
    <CircularProgress />
    <Typography variant="h6" sx={{ mt: 3 }}>
      Kita sedang mempersiapkan solusi terbaik untuk bisnis anda, silahkan
      tunggu 1-3 menit.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={onRefresh}
      sx={{ mt: 3 }}
    >
      Refresh Status
    </Button>
  </Box>
);

// Error screen component
const ErrorScreen = ({
  onRetry,
  onClearData,
}: {
  onRetry: () => void;
  onClearData: () => void;
}) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100vh"
    p={2}
    textAlign="center"
  >
    <Typography variant="h6" color="error" sx={{ mb: 2 }}>
      Failed to verify your onboarding status.
    </Typography>
    <Typography variant="body1" sx={{ mb: 4 }}>
      Please choose an option to continue:
    </Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={onRetry}
      sx={{ mb: 2 }}
    >
      Retry
    </Button>
    <Button variant="outlined" color="secondary" onClick={onClearData}>
      Clear Data and Start Over
    </Button>
  </Box>
);

export default AuthGuard;

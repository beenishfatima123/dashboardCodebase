import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";
import Google from "../../../assets/icons/google.svg";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { signInWithGoogle } from "../../../api/authHelper";

const FirebaseSocial = ({setLoading}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const googleAuthProvider = useMemo(() => new GoogleAuthProvider(), []);

  const handleNavigate = () => {
    if (location?.pathname === "/") 
      history.push(`/dashboard`, { replace: true });
  };

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? "space-around" : "space-between"}
      sx={{
        "& .MuiButton-startIcon": {
          mr: matchDownSM ? 0 : 1,
          ml: matchDownSM ? 0 : -0.5,
        },
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() =>
          signInWithGoogle(
            auth,
            googleAuthProvider,
            handleNavigate,
            dispatch,
            setLoading
          )
        }
      >
        {!matchDownSM && "Google"}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;

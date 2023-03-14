import { CircularProgress } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { firebaseApp } from "../configs/firebase";
import { useAccount } from "../hooks/use-account";
import { getCurrentAccountThunk } from "../redux-toolkit/auth/auth-thunk";
import { useAppDispatch } from "../redux-toolkit/hooks";

type AuthGuardPropType = {
  children: React.ReactNode
}

const AuthGuard = (props: AuthGuardPropType) => {
  const auth = getAuth(firebaseApp);
  const { account, isAuthLoading } = useAccount();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getCurrentAccountThunk(user.uid));
      } else {
        // logout
        navigate("/login");
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);

  if (isAuthLoading === true) return <CircularProgress />;

  if (account === null) {
    return <Navigate to="/login" />;
  }

  return <>{props.children}</>;
};

export default AuthGuard;

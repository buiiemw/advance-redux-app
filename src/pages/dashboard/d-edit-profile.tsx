import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import { toast } from "react-hot-toast";
import { useAccount } from "../../hooks/use-account";
import { useAppDispatch } from "../../redux-toolkit/hooks";
import {
  getCurrentAccountThunk,
  updateAccountThunk,
} from "../../redux-toolkit/auth/auth-thunk";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
YupPassword(yup); // extend yup

export default function DEditProfile() {
  const navigate = useNavigate();
  const { account } = useAccount();
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    firstName: yup.string().required("ป้อนข้อมูลชื่อด้วย"),
    lastName: yup.string().required("ป้อนข้อมูลนามสกุลด้วย"),
  });

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data: FormData) => {
    try {
      dispatch(
        updateAccountThunk({
          userId: account?.userId,
          account: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        })
      );

      // get last update
      dispatch(getCurrentAccountThunk(account?.userId!));

      toast.success("แก้ไขข้อมูลส่วนตัวสำเร็จ");

      // back to dashboard
      navigate("../");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={account?.photoUrl}
            sx={{ width: 62, height: 62 }}
          ></Avatar>

          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera fontSize="large" />
          </IconButton>
          <Typography component="h1" variant="h5">
            แก้ไขข้อมูลส่วนตัว
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName")}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName && errors.firstName.message}
                  fullWidth
                  label="First Name"
                  defaultValue={account?.firstName}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName")}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName && errors.lastName.message}
                  label="Last Name"
                  defaultValue={account?.lastName}
                  fullWidth
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
              loadingIndicator="กำลังแก้ไขข้อมูล รอสักครู่..."
            >
              บันทึก
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </>
  );
}

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from 'yup-password'
import { toast } from "react-hot-toast";
import { registerUser } from "../services/auth.service";
YupPassword(yup) // extend yup

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ระบบลาออนไลน์
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup.string().required("ป้อนข้อมูลชื่อด้วย"),
    lastName: yup.string().required("ป้อนข้อมูลนามสกุลด้วย"),
    email: yup.string().required('ป้อนอีเมลล์ด้วย').email('รูปแบบอีเมล์ไม่ถุกต้อง'),
    password: yup.string().required('ป้อนรหัสผ่านด้วย')
        .min(6, 'รหัสผ่านอย่างน้อย 6 ตัวอักษรขึ้นไป')
        .minSymbols(1, "ต้องมีอักษรพิเศษอย่างน้อย 1 ตัวขึ้นไป")
        .minUppercase(1, "รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัวขึ้นไป"),
  });

  type FormData = yup.InferType<typeof schema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all"
  });
  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await registerUser(data.firstName, data.lastName, data.email, data.password!);
      if (userCredential.user) {
        toast.success("ลงทะเบียนสำเร็จ");
        navigate("/login");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("มีผู้ใช้งานอีเมล์นี้ในระบบแล้ว");
      } else {
        toast.error(error.message);
      }
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ลงทะเบียนผู้ใช้ใหม่
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
                  {...register('firstName')}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName && errors.firstName.message}
                  fullWidth
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName')}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName && errors.lastName.message}
                  label="Last Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email')}
                  error={errors.email ? true : false}
                  helperText={errors.email && errors.email.message}
                  label="Email Address"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password')}
                  error={errors.password ? true : false}
                  helperText={errors.password && errors.password.message}
                  label="Password"
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
              loadingIndicator="กำลังลงทะเบียน รอสักครู่..."
            >
              ลงทะเบียน
            </LoadingButton>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Link variant="body2" component={RouterLink} to="/">
                  กลับหน้าหลัก
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" component={RouterLink} to="/login">
                  ถ้าลงทะเบียนแล้ว ไปที่หน้า Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}

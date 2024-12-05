// IMPORTS
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useGetAnnounceQuery } from "@/features/announce/announceApi";
import { Announce } from "@/shared/types/announce";
import {
  Login as LoginIcon,
  VisibilityOutlined as EyeOpenIcon,
  VisibilityOffOutlined as EyeCloseIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { IconButton, Tooltip, Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { generateCaptcha, convertToEnglishNumber } from "@/helper";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/SVGs";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { LOGIN } from "@/constants/const";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const Login = () => {
  //STATES
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [userInputCaptcha, setUserInputCaptcha] = useState("");
  const [isRotated, setIsRotated] = useState(false);
  const [announceitems, setAnnounceItems] = useState<Announce[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // CONSTS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const form_data = watch();

  const [login, { isLoading }] = useLoginMutation();

  // GET ANNOUNCES
  const {
    data: announces,
    isSuccess: isAnnounceSuccess,
    isLoading: isAnnounceLoading,
    isFetching: isAnnounceFetching,
    refetch,
  } = useGetAnnounceQuery();

  // FETCH ANNOUNCES
  useEffect(() => {
    const today = new Date();
    refetch();
    if (isAnnounceSuccess) {
      const filteredAnnounces = announces.itemList.filter((item) => {
        const runDate = new Date(item.runDate);
        return runDate <= today;
      });
      setAnnounceItems(filteredAnnounces);
    }
  }, [isAnnounceSuccess, announces, refetch]);

  // CHECK IF USER IS ALREADY LOGGED IN
  useEffect(() => {
    if (sessionStorage.getItem("userInfo")) {
      navigate("/retirement/cartable");
    }
  }, [navigate]);

  const onSubmit = async (data: FieldValues) => {
    // user authentication logic
    if (captcha) {
      try {
        const res = await login(data).unwrap();
        dispatch(setCredentials({ ...res }));
        setValue("username", "");
        setValue("password", "");
        navigate("/retirement/cartable");
        toast.success(res.message, {
          autoClose: 2000,
        });
      } catch {
        setCaptchaText(generateCaptcha(4));
        setUserInputCaptcha("");
        setValue("username", "");
        setValue("password", "");
      }
    } else {
      setCaptchaText(generateCaptcha(4));
      setUserInputCaptcha("");
      setCaptcha(false);
      setValue("username", "");
      setValue("password", "");
      toast.error("! کد امنیتی اشتباه است", {
        autoClose: 2000,
      });
    }
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha(4));
    setUserInputCaptcha("");
    setCaptcha(false);
    setIsRotated(true);
  };

  // CAPTCHA CREATOR
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    function addNoise(ctx: CanvasRenderingContext2D) {
      if (!canvas) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 1) {
        // Random noise color
        // let color = Math.random() > 0.5 ? 255 : 0;
        const color = Math.random() > 0.5 ? 225 : 0;
        pixels[i] = pixels[i + 1] = pixels[i + 2] = color;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addNoise(ctx);
    ctx.fillStyle = "#333";
    ctx.font = "28px Arial";

    const textWidth = ctx.measureText(captchaText).width;
    const startX = (canvas.width - textWidth) / 2;

    for (let i = 0; i < captchaText.length; i++) {
      ctx.save();
      // adjust startX for each char
      ctx.translate(startX + i * 30, 30);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }
  }, [captchaText]);

  useEffect(() => {
    setCaptchaText(generateCaptcha(4));
    setUserInputCaptcha("");
    setCaptcha(false);
  }, []);

  function handleCaptchaInputChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setUserInputCaptcha(input);

    if (convertToEnglishNumber(input) === captchaText) {
      setCaptcha(true);
    } else {
      setCaptcha(false);
    }
  }

  return (
    <div className="login__main">
      {/* ANNOUNCES */}
      <div className="login__info">
        <div className="login__info--title">
          <div className="title-wrapper">
            <h1>اطلاعیه ها</h1>
          </div>
        </div>

        <div className="login__info--container">
          {isAnnounceLoading || isAnnounceFetching ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "2rem 10rem",
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Swiper
              navigation={true}
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
            >
              {announceitems.map((item) => (
                <SwiperSlide key={item.announceID}>
                  <div className="announce-container">
                    <h5 className="announce-container__title">{item.title}</h5>
                    <p className="announce-container__text">
                      {item.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* CREDENTIALS */}
        <div className="login__credentials">
          <div className="login__credentials--title">
            <h1>ورود به سامانه</h1>
          </div>

          <form
            method="POST"
            className="login__credentials--form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label htmlFor="username" className="login__credentials--label">
                نام کاربری
              </label>
              <div className="login__credentials--wrapper">
                {errors.username && (
                  <span className="error-form">
                    {errors.username.message as string}
                  </span>
                )}
                <input
                  type="text"
                  placeholder="نام کاربری خود را وارد نمایید..."
                  {...register("username", {
                    required: "نام کاربری را وارد کنید",
                  })}
                  id="username"
                  className="login__credentials--input"
                  disabled={isLoading}
                />
                {form_data.username || form_data.username !== "" ? (
                  <div className="login__credentials--icon">
                    <IconButton
                      onClick={() => {
                        setValue("username", "");
                      }}
                      color="default"
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="psw" className="login__credentials--label">
                رمز عبور
              </label>
              <div className="login__credentials--wrapper">
                {errors.password && (
                  <span className="error-form">
                    {errors.password.message as string}
                  </span>
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=" رمز عبور خود را وارد نمایید..."
                  {...register("password", {
                    required: "رمز عبور را وارد کنید",
                  })}
                  id="psw"
                  className="login__credentials--input"
                  disabled={isLoading}
                />
                <div className="login__credentials--icon">
                  {form_data.password || form_data.password !== "" ? (
                    <IconButton
                      onClick={() => {
                        setValue("password", "");
                      }}
                      color="default"
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  ) : null}
                  <Tooltip title={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}>
                    <span>
                      <IconButton
                        onClick={handleShowPasswordChange}
                        color="primary"
                        size="small"
                      >
                        {showPassword ? (
                          <EyeOpenIcon fontSize="small" />
                        ) : (
                          <EyeCloseIcon fontSize="small" />
                        )}
                      </IconButton>
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="captcha" className="login__credentials--label">
                کد امنیتی
              </label>
              <div className="login__credentials--wrapper">
                <input
                  type="text"
                  placeholder="کد روبرو را وارد کنید"
                  id="captcha"
                  className="login__credentials--input"
                  onChange={handleCaptchaInputChange}
                  value={userInputCaptcha}
                />
                <div className="login__credentials--captcha">
                  <canvas
                    ref={canvasRef}
                    width="130"
                    height="43"
                    className="login__credentials--captcha-canvas"
                  >
                    {captchaText}
                  </canvas>

                  <div className="login__credentials--captcha-icon">
                    <Tooltip title="کد جدید">
                      <span>
                        <IconButton
                          onClick={refreshCaptcha}
                          color="primary"
                          size="small"
                          onAnimationEnd={() => setIsRotated(false)}
                        >
                          <div
                            className={`${
                              isRotated ? "rotate" : ""
                            } flex-row flex-center`}
                          >
                            <RefreshIcon />
                          </div>
                        </IconButton>
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            <LoadingButton
              dir="ltr"
              endIcon={<LoginIcon />}
              //   onClick={handleSubmit(onSubmit)}
              type="submit"
              loading={isLoading}
              variant="contained"
              color="primary"
            >
              <span>{LOGIN}</span>
            </LoadingButton>

            <div className="login__credentials--forgot">
              <h5>رمز عبور خود را فراموش کرده اید؟</h5>
            </div>
          </form>
        </div>

        <div className="login-logo">
          <div className="hero__logo">
            <Logo color="white" />
          </div>

          <h1
            className="heading-primary"
            style={{ color: "white", textShadow: "1px 1px 5px black" }}
          >
            سامانه بازنشستگان و وظیفه بگیران
          </h1>
        </div>
      </div>
    </div>
  );
};

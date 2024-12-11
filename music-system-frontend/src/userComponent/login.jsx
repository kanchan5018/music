import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './userCss.css';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { loginRequest } from "../redux/UserReducer/action";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLogin, logindata, loginstatus } = useSelector((state) => state.User);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  // Handle login response and redirect to Playlist on success
  useEffect(() => {
    if (logindata) {
      if (loginstatus=== "success") {
        localStorage.setItem('token', logindata.data.token)
        toast.success(logindata.message || 'Login SuccessFully', {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/playlist"); // Redirect to Playlist page on success
        }, 3000);
      } else if(loginstatus=== "failed") {
        toast.error(logindata.message || "Login failed!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  }, [logindata, navigate]);

  return (
    <section className="cover-user login">
      <ToastContainer /> {/* Toastify Container */}
      <div className="container-fluid px-0">
        <div className="row g-0 position-relative">
          <div className="col-lg-4 cover-my-30 order-2">
            <div className="cover-user-img d-flex align-items-center">
              <div className="row">
                <div className="col-12">
                  <div className="card login-page border-0" style={{ zIndex: 1 }}>
                    <div className="card-body p-0">
                      <h4 className="card-title text-center">Login</h4>
                      <form className="login-form mt-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Your Email <span className="text-danger">*</span>
                              </label>
                              <div className="form-icon position-relative">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail fea icon-sm icons"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <input
                                  type="email"
                                  className={`form-control ps-5 ${errors.email ? "is-invalid" : ""}`}
                                  placeholder="Email Id"
                                  {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                      message: "Invalid email format",
                                    },
                                  })}
                                  title={errors.email?.message || ""}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label className="form-label">
                                password <span className="text-danger">*</span>
                              </label>
                              <div className="form-icon position-relative">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-key fea icon-sm icons"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                                <input
                                  type="password"
                                  className={`form-control ps-5 ${errors.password ? "is-invalid" : ""}`}
                                  placeholder="password"
                                  {...register("password", {
                                    required: "password is required",
                                    minLength: {
                                      value: 6,
                                      message: "password must be at least 6 characters",
                                    },
                                  })}
                                  title={errors.password?.message || ""}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12 mb-0">
                            <div className="d-grid">
                              <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={isLogin}
                              >
                                {isLogin ? (
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                  "Sign In"
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="d-flex justify-content-between">
                              <div className="mb-3 mt-3">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                  >
                                    Remember me
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 text-center">
                            <p className="mb-0 mt-3">
                              <small className="text-dark me-2">Don't have an account ?</small>
                              <a href="/registration" className="text-dark fw-bold">Sign Up</a>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-8 offset-lg-4 padding-less img order-1 login-img"
            data-jarallax="true"
            data-speed="0.5"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Login;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registrationRequest } from "../redux/UserReducer/action"; // Make sure this path is correct

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isRegistration, registraData, registerStatus, error } = useSelector((state) => state.User); // Access registration state
  console.log("error",error)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(registrationRequest(data)); // Dispatch registration request action
  };

  // Handle registration result and redirect if successful
  useEffect(() => {
    if (registraData) {
      if (registerStatus === "success") {
        toast.success(registraData?.message, {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/"); // Redirect to login page
        }, 3000);
      } else if(registerStatus === "failed")  {
        toast.error(error?.message || "Registration failed!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  }, [registraData, navigate, error, registerStatus]);

  return (
    <section className="cover-user">
      <ToastContainer /> {/* Toastify Container */}
      <div className="container-fluid px-0">
        <div className="row g-0 position-relative">
          <div className="col-lg-4 cover-my-30 order-2">
            <div className="cover-user-img d-lg-flex align-items-center">
              <div className="row">
                <div className="col-12">
                  <div className="card border-0" style={{ zIndex: 1 }}>
                    <div className="card-body p-0">
                      <h4 className="card-title text-center">Signup</h4>
                      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <div className="row">
                          {/* Form Fields */}
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Username <span className="text-danger">*</span>
                              </label>
                              <div className="form-icon position-relative">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user fea icon-sm icons"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <input
                                  type="text"
                                  className={`form-control ps-5 ${errors.username ? "is-invalid" : ""}`}
                                  placeholder="Username"
                                  title={errors.username ? errors.username.message : ""}
                                  {...register("username", {
                                    required: "Username is required",
                                    pattern: {
                                      value: /^[a-zA-Z\s]+$/,
                                      message: "Only alphabet characters are allowed",
                                    },
                                  })}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
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
                                  title={errors.email ? errors.email.message : ""}
                                  {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                      message: "Invalid email format",
                                    },
                                  })}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Password <span className="text-danger">*</span>
                              </label>
                              <div className="form-icon position-relative">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-key fea icon-sm icons"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                                <input
                                  type="password"
                                  className={`form-control ps-5 ${errors.password ? "is-invalid" : ""}`}
                                  placeholder="Password"
                                  title={errors.password ? errors.password.message : ""}
                                  {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                      value: 8,
                                      message: "Password must be at least 8 characters",
                                    },
                                  })}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="d-grid">
                              <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={isRegistration}
                              >
                                {isRegistration ? (
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                  "Sign Up"
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="mx-auto">
                            <p className="mb-0 mt-3">
                              <small className="text-dark me-2">Already have an account?</small>{" "}
                              <a href="/" className="text-dark fw-bold">
                                Sign in
                              </a>
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
            className="col-lg-8 offset-lg-4 padding-less img order-1 registration"
            data-jarallax=""
            data-speed="0.5"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Registration;

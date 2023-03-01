import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { app } from "../../app/constants";
import { useSignInMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import usePersist from "../../hooks/usePersist";

const SignIn = () => {
  const emailRef = useRef(null);
  const errRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await signIn({
        email: email,
        password: password,
      }).unwrap();
      //TODO: send only token
      // console.log(accessToken);
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      //   console.log("original status", err);
      if (err.data) {
        // isLoading: true until timeout occurs
        setErrMsg(err.data);
      } else {
        setErrMsg("No Server Response");
      }
      errRef.current.focus();
    }
  };

  const errClass = errMsg ? "errmsg" : "offscreen";
  if (isLoading) return <p>Loading...</p>;

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const content = (
    <Form onSubmit={handleSubmit} className="login-form">
      <div className="text-center">
        <h1>
          <span className="font-weight-bold">{app.name}</span>
        </h1>
        <h2>Welcome</h2>
      </div>
      <FormGroup>
        <label htmlFor="email">Email:</label>
        <Input
          innerRef={emailRef}
          value={email}
          onChange={handleEmailInput}
          type="email"
          name="email"
          placeholder="Email"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password:</label>
        <Input
          value={password}
          onChange={handlePasswordInput}
          type="password"
          name="password"
          placeholder="Password"
        />
      </FormGroup>
      <FormGroup>
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <div className="d-grid gap-2">
          <Button className="btn btn-dark">Sign In</Button>
        </div>
      </FormGroup>

      <FormGroup check>
        {/* <Label check htmlFor="persist" k>
          Trust this device */}
        <Input
          type="checkbox"
          checked={persist}
          onChange={handleToggle}
          id="persist"
        />
        <Label htmlFor="persist">Trust this Device</Label>
        {/* </Label> */}
      </FormGroup>

      <div className="text-center pt-3">
        Or continue with you social account:
      </div>
      <FacebookLoginButton className="mt-3 mb-3" />
      <GoogleLoginButton className="mt-3 mb-3" />
      <div className="text-center">
        <Link to="signup">Sign up</Link>
        <span className="p-2">|</span>
        <Link to="signup">Forgot password</Link>
      </div>
    </Form>
  );

  return content;
};

export default SignIn;

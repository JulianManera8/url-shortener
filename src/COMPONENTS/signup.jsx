/* eslint-disable no-constant-condition */
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import Error from "./error";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import * as Yup from "yup";
// import {signup} from '../DATABASE/apiAuth'

export default function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUserData((u) => ({
      ...u,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("You must write your name"),
        lastname: Yup.string().required("You must write your lastname"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("You must write a password"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Your passwords do not match")
          .required("You must check that your password matches"),
      });

      await schema.validate(userData, { abortEarly: false });
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            if you do not already have an account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              className=""
              onChange={handleChangeInput}
            />
            {errors.name && <Error errorMessage={errors.name} />}{" "}
          </div>

          <div>
            <Input
              name="lastname"
              type="text"
              placeholder="Lastame"
              className=""
              onChange={handleChangeInput}
            />
            {errors.lastname && <Error errorMessage={errors.lastname} />}{" "}
          </div>

          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className=""
              onChange={handleChangeInput}
            />
            {errors.email && <Error errorMessage={errors.email} />}{" "}
          </div>

          <div>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className=""
              onChange={handleChangeInput}
            />

            {errors.password && <Error errorMessage={errors.password} />}
          </div>

          <div>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              className=""
              onChange={handleChangeInput}
            />
            {errors.confirmPassword && (
              <Error errorMessage={errors.confirmPassword} />
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit">
            {true ? <BeatLoader size={10} color="teal" /> : "Create account"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

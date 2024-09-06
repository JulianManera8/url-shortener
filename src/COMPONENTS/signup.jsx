import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/COMPONENTS/ui/card";
import { Input } from "./ui/input";
import Error from "./error";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import {signup} from '../DATABASE/apiAuth'
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "@/HOOKS/use-fetch";
import { UrlState } from "@/context";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [userData, setUserData] = useState({
    fullname: '',
    email: "",
    profile_pic: '',
    password: "",
    confirmPassword: "",
  });

  const [passEye, setPassEye] = useState(true)

  const [errors, setErrors] = useState({});

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const longLink = searchParams.get('createNew')

  const handleChangeInput = (e) => {
    const { name, value, files } = e.target;

    setUserData((u) => ({
      ...u,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, userData);

  const { fetchUser } = UrlState()

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? 'createNew=${longLink}' : ''}`);
      fetchUser();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const schema = Yup.object().shape({
        fullname: Yup.string().required("You must write your full name"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("You must write a password"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Your passwords do not match")
          .required("You must check that your password matches"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(userData, { abortEarly: false });

      await fnSignup();

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

        <CardContent className="space-y-6">
          <div>
            <Input
              name="fullname"
              type="text"
              placeholder="Full name"
              className=""
              onChange={handleChangeInput}
            />
            {errors.fullname && <Error errorMessage={errors.fullname} />}{" "}
          </div>

          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className=""
              onChange={handleChangeInput}
              autoComplete='email'
            />
            {errors.email && <Error errorMessage={errors.email} />}{" "}
          </div>

          <div className="relative">
            <Input
              name="password"
              type={passEye ? 'password': 'text'}
              placeholder="Password"
              className=""
              onChange={handleChangeInput}
              autoComplete='off'
            />
            {passEye ? <Eye className="absolute inset-y-0 my-auto right-3 text-gray-400 cursor-pointer" onClick={() => setPassEye(!passEye)}/> : <EyeOff className="absolute inset-y-0 my-auto right-3 text-gray-400 cursor-pointer" onClick={() => setPassEye(!passEye)}/>}

            {errors.password && <Error errorMessage={errors.password} />}
          </div>

          <div className="relative">
            <Input
              name="confirmPassword"
              type={passEye ? 'password': 'text'}
              placeholder="Confirm password"
              className=""
              onChange={handleChangeInput}
              autoComplete='off'
            />
            {passEye ? <Eye className="absolute inset-y-0 my-auto right-3 text-gray-400 cursor-pointer" onClick={() => setPassEye(!passEye)}/> : <EyeOff className="absolute inset-y-0 my-auto right-3 text-gray-400 cursor-pointer" onClick={() => setPassEye(!passEye)}/>}

            {errors.confirmPassword && (
              <Error errorMessage={errors.confirmPassword} />
            )}
          </div>

          <div>
            <label htmlFor="profile_pic" className="text-gray-300 text-sm">Select a profile picture <span className="text-gray-600"> (optional)</span> </label>
            <Input
              name="profile_pic"
              type="file"
              accept='image/*'
              className="flex justify mt-1 text-transparent bg-slate-600"
              onChange={handleChangeInput}
            />
            {errors.profile_pic && (
              <Error errorMessage={errors.profile_pic} />
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button type="submit">
            {loading ? <BeatLoader size={10} color="teal" /> : "Create account"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

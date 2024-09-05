import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/COMPONENTS/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import Error from './error';
import useFetch from "@/HOOKS/use-fetch";
import { login } from "@/DATABASE/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: ''
    });

    const [errors, setErrors] = useState({});

    const [passEye, setPassEye] = useState(true)

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const longLink = searchParams.get('createNew')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((u) => ({
            ...u, 
            [name]: value
        }));
    };

    const { data, error, loading, fn: fnLogin } = useFetch(login, userData);

    const { fetchUser } = UrlState()

    useEffect(() => {
        if (error === null && data) {
          console.log(data)
          navigate(`/?${longLink ? 'createNew=${longLink}' : ''}`);
          fetchUser();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Invalid email")
                    .required("Email is required"),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters long")
                    .required("Password is required"),
            });

            await schema.validate(userData, { abortEarly: false });

            await fnLogin();

        } catch (e) {
            const newErrors = {};
            e.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        <span>to your account if you already have one.</span>
                        {error && <Error errorMessage={error.message} />}
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                    <div>
                        <Input onChange={handleInputChange} type="email" name="email" placeholder="Email" autoComplete='email'/>
                        {errors.email && <Error errorMessage={errors.email} />}
                    </div>

                    <div className="relative">
                        <Input onChange={handleInputChange} type={passEye ? 'password': 'text'} name="password" placeholder="Password" autoComplete='current-password'/>
                        {passEye ? <Eye className="absolute top-2 right-3 text-gray-400" onClick={() => setPassEye(!passEye)}/> : <EyeOff className="absolute top-2 right-3 text-gray-400" onClick={() => setPassEye(!passEye)}/>}
                        
                        {errors.password && <Error errorMessage={errors.password} />}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <Button type="submit">
                        {loading ? <BeatLoader size={10} color="teal" /> : "Login"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

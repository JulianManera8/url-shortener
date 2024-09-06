import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/COMPONENTS/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import Error from './error';
import useFetch from "@/HOOKS/use-fetch";
import { login, loginGoogle } from "@/DATABASE/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";


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

    const { data: logedGoogle, error: errorGoogle, loading: loadingGoogle, fn: fnLoginGoogle } = useFetch(loginGoogle);

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

    const handleLoginGoogle = async (e) => {
        e.preventDefault();

        setErrors({});

        try {
            
            await fnLoginGoogle();

            if (error) throw error;

        } catch (e) {
            const newErrors = {};
    
            if (e.inner) {
                e.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
            } else {
                newErrors.general = e.message || "Error al iniciar sesión con Google";
            }
    
            setErrors(newErrors);
        }
    }

    return (
        <form>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        <span>to your account if you already have one.</span><br/>
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
                        {passEye ? <Eye className="absolute inset-y-0 my-auto right-3 text-gray-400 cursor-pointer" onClick={() => setPassEye(!passEye)}/> : <EyeOff className="absolute inset-y-0 my-auto right-3 text-gray-400 cursor-pointer" onClick={() => setPassEye(!passEye)}/>}
                        
                        {errors.password && <Error errorMessage={errors.password} />}

                    </div>
                </CardContent>

                <CardFooter className="flex justify-center gap-5 sm:flex-row flex-col">

                    <Button onClick={handleLogin}>
                        {loading ? <BeatLoader size={10} color="teal" /> : "Login"}
                    </Button>

                    <Button onClick={handleLoginGoogle} className="bg-blue-200">
                        <FcGoogle className="mr-2 h-4 w-4" /> Login with Email
                    </Button>

                </CardFooter>
            </Card>
        </form>
    );
}

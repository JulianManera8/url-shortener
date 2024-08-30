/* eslint-disable no-constant-condition */
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as Yup from 'yup'
import { useState } from "react";
import Error from './error'
// import { login } from '../DATABASE/apiAuth'


export default function Login() {

    const [ userData, setUserData ] = useState({
        email: "",
        password: ''
    })

    const [errors, setErrors] = useState([])


    const handleInputChange = (e) => {

        //extraigo name y value del e.target
        const { name, value } = e.target;
        //cualquiera sea el name (email, o password) me lo actualiza
        setUserData((u) => ({
            ...u, 
            [name]: value
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors([]); 
    
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Invalid email")
                    .required("Email is required"),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters long')
                    .required('Password is required')
            });
    
            await schema.validate(userData, { abortEarly: false });
            // Aquí iría la lógica de login, por ejemplo, enviar la data al servidor
        } catch (e) {
            const newErrors = {};
    
            e?.inner?.forEach((err) => {
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
            to your account if you already have one.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
          {/* {...register('email')} */}
            <Input onChange={handleInputChange} type="email" name="email" placeholder="Email" />
            {errors.email && <Error errorMessage={errors.email}/> }
          </div>

          <div>
            {/* {...register('email')} */}
            <Input onChange={handleInputChange} type="password" name="password" placeholder="Password" />
            {errors.password && <Error errorMessage={errors.password}/> }

          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={handleLogin}>
            {true ? <BeatLoader size={10} color="teal" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

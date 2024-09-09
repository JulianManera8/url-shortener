/* eslint-disable react-hooks/exhaustive-deps */
import { UrlState } from "../context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,DialogFooter } from "@/COMPONENTS/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "../HOOKS/use-fetch";
import { createUrl } from "../DATABASE/apiUrls";
import { BeatLoader } from "react-spinners";

export default function CreateLink() {
  const { user } = UrlState();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = Yup.object().shape({
    title: Yup.string().required("You must provide a title"),
    longUrl: Yup
      .string()
      .url("Must be a valid URL: https://example.com")
      .required("Please provide a URL"),
    customUrl: Yup.string().required("Please provide a Custom URL"),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const { loading, error, data, fn: fnCreateUrl } = useFetch(createUrl, {
    ...formData,
    user_id: user.id,
  });

  useEffect(() => {

    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
    
  }, [error, data]);

  const createNewLink = async () => {
    setErrors([]); 
  
    try {
      await schema.validate(formData, { abortEarly: false });
  
      const { error, data } = await fnCreateUrl(); 
  
      if(data) {
        navigate(`/link/${data[0].id}`);
      }

      if (error) {
        throw new Error(error.message);
      }
  
      // Si no hay error, puedes manejar la respuesta positiva
      console.log("Enlace creado exitosamente:", data);


    } catch (error) {
      // Si el error proviene de la validación de Yup
      if (error?.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message; // Asignamos los errores de validación a sus respectivos campos
        });

        return setErrors(newErrors); // Actualizamos el estado de errores
      }

      // Aquí manejamos errores que no sean de validación, como los de Supabase
      setErrors({ general: 'This custom URL already exists, try another one' });
    }
  };
  
  
  

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger className="border border-white p-2 rounded-lg bg-white text-black text-xl ">
        Create new Link
      </DialogTrigger>

      <DialogContent className=" rounded-2xl mx-auto sm:max-w-md max-w-xs bg-slate-800">
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle className="font-bold text-3xl flex-1 flex justify-center">
            Create a new Link
          </DialogTitle>

          <Input
            id="title"
            placeholder="Short Link's Title"
            onChange={handleChange}
            value={formData.title}
            className="text-lg h-13"
          />
          {errors.title && <Error errorMessage={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Enter your looooong URL"
            onChange={handleChange}
            value={formData.longUrl}
            className="text-lg h-13"
          />
          {errors.longUrl && <Error errorMessage={errors.longUrl} />}

          <div className="flex items-center gap-2">
            <Card className="p-2 md:text-lg text-xs"> urlink-short.vercel.app/ </Card>/
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              onChange={handleChange}
              value={formData.customUrl}
              className="text-lg h-13"
            />
          </div>
          
          {errors.general && <Error errorMessage={errors.general} />}
        </DialogHeader>

        <DialogFooter className="sm:justify-center mt-4 ">
          <Button onClick={createNewLink} disabled={loading} className="text-2xl">
            {loading ? <BeatLoader color="black" size={10} /> : "Create Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

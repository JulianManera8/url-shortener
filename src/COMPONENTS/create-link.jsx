/* eslint-disable react-hooks/exhaustive-deps */
import { UrlState } from "../context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "../hooks/use-fetch";
import { createUrl } from "../database/apiUrls";
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
      .url("Must be a valid URL")
      .required("Please provide a URL"),
    customUrl: Yup.string(),
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
      
      await fnCreateUrl();

    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
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

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle className="font-bold text-3xl mb-3 flex-1 flex justify-center">
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
            <Card className="p-2"> trimmr.vercel </Card>/
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              onChange={handleChange}
              value={formData.customUrl}
              className="text-lg h-13"
            />
          </div>
          {error && <Error errorMessage={errors.message} />}
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

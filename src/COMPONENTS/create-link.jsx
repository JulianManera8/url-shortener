/* eslint-disable react-hooks/exhaustive-deps */
import { QRCode } from "react-qrcode-logo";
import { UrlState } from "../context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import useFetch from "../HOOKS/use-fetch";
import { createUrl } from "../DATABASE/apiUrls";
import { BeatLoader } from "react-spinners";

export default function CreateLink() {
  const { user } = UrlState();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const refQr = useRef();

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const schema = Yup.object().shape({
    title: Yup.string().required("You must provide a title"),
    longUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Please provide a URL"),
    customUrl: Yup.string(),
  });

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

      const canvas = refQr.current.canvasRef.current;

      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);

    } catch (e) {
      const newErrors = {};
      e.inner.forEach((err) => {
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
      <DialogTrigger className="border border-white p-2 rounded-lg bg-white text-black ">
        Create new Link
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle className="font-bold text-xl mb-3 flex-1 flex justify-center">
            Create a new Link
          </DialogTitle>

          <Input
            id="title"
            placeholder="Short Link's Title"
            onChange={handleChange}
            value={formData.title}
          />
          {errors.title && <Error errorMessage={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Enter your looooong URL"
            onChange={handleChange}
            value={formData.longUrl}
          />
          {errors.longUrl && <Error errorMessage={errors.longUrl} />}

          <div className="flex items-center gap-2">
            <Card className="p-2"> trimmr.vercel </Card>/
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              onChange={handleChange}
              value={formData.customUrl}
            />
          </div>
          {error && <Error errorMessage={errors.message} />}
        </DialogHeader>

        {formData?.longUrl && (
          <QRCode value={formData.longUrl} size={150} ref={refQr} />
        )}

        <DialogFooter className="sm:justify-center mt-4">
          <Button onClick={createNewLink} disabled={loading}>
            {loading ? <BeatLoader color="darkblue" size={10} /> : "Create Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { supabase } from "@/Utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ImageUpload({ setImages, previewImage, setPreviewImage, listedData }) {
  const router = useRouter();

  const uploadHandler = (e) => {
    const files = e.target.files;
    // console.log(files);
    const preview = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewImage(preview);
    setImages(files);
  };

  const deleteFile = (e) => {
    const s = previewImage.filter((item, index) => index !== e);
    setPreviewImage(s);
    // console.log(s);
  };

  const deleteImageHandler = async (image) => {
    const { error } = await supabase
      .from("imageUrlListing")
      .delete()
      .eq("url", image.url);

    if (error) {
      console.log(error.message);
    } else {
      console.log("image deleted successfully");
      toast.success("image deleted successfully");
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            accept="image/png , image/gif , image/jpg , image/jpeg"
            onChange={uploadHandler}
            type="file"
            multiple
            className="hidden"
          />
        </label>
      </div>
      {previewImage.length > 0 && (
        <div className="p-8 rounded-lg shadow-lg">
          <h3>preview</h3>
          <div className="mt-5 gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10">
            {previewImage.map((image, index) => (
              <div
                key={index}
                className="relative"
                onClick={(e) => console.log(e.target)}
              >
                <button
                  className="absolute text-red-500 font-bold "
                  onClick={() => deleteFile(index)}
                >
                  &times;
                </button>
                <Image
                  src={image}
                  alt={image}
                  width={150}
                  height={150}
                  className="rounded-lg w-[100px] h-[100px] object-cover "
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {listedData && (
        <div
          className={
            listedData.length > 0 ? "p-8 rounded-lg shadow-lg" : "hidden"
          }
        >
          <h3 className="text-lg text-slate-300">listed images</h3>
          <div className="mt-5 gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10">
            {listedData.map((image, index) => (
              <div
                key={index}
                className="relative"
                onClick={(e) => console.log(e.target)}
              >
                {/*  */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="absolute text-rose-700 font-bold ">
                      &times;
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you really want to delete the image from your Ad?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteImageHandler(image)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/*  */}
                <Image
                  src={image?.url}
                  alt={image?.url}
                  width={150}
                  height={150}
                  className="rounded-lg w-[100px] h-[100px] object-cover "
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;

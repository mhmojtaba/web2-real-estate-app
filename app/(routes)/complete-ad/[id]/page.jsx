"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik } from "formik";
import { Button } from "@/components/ui/button";
import { supabase } from "@/Utils/supabase/client";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import ImageUpload from "@/app/_components/ImageUpload";

function CompleteAd() {
  const { id } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  //   console.log(user);

  useEffect(() => {
    user && verifyUserParams();
  }, [user]);
  //   console.log(id);

  // checking if the params.id is available in the database and belong to the user or not
  const verifyUserParams = async () => {
    let { data, error } = await supabase
      .from("List")
      .select("* , imageUrlListing (list_id , url)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", id);

    if (data) {
      setCurrentData(data[0]);
      console.log(data);
    }
    if (data?.length <= 0) {
      console.log(data);
      router.push("/");
    } else if (error) {
      console.log(error?.message);
    }
  };

  const submitHandler = async (formValue) => {
    // console.log(formValue);
    setLoader(true);
    const { data, error } = await supabase
      .from("List")
      .update(formValue)
      .eq("id", id)
      .select();
    if (data) {
      setLoader(false);
      console.log(data);
      toast.success("data updated successfully");
      router.push("/");
    } else if (error) {
      setLoader(false);
      console.log(error);
      toast.error(error?.message);
    }

    for (const image of images) {
      const fileImage = image;
      const fileName = Date.now().toString();
      const fileExt = fileImage.name.split(".").pop();

      // upload to supabase storage

      const { data, error } = await supabase.storage
        .from("real-estate-Images")
        .upload(`${fileName}`, fileImage, {
          cacheControl: "3600",
          contentType: `image/${fileExt}`,
          upsert: false,
        });
      if (error) {
        toast.error(error.message);
        setLoader(false);
      } else if (data) {
        setLoader(false);
        // console.log(data);
        const imageUrl = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + fileName;
        // console.log(imageUrl);
        const { data, error } = await supabase
          .from("imageUrlListing")
          .insert([{ url: imageUrl, list_id: id }])
          .select();
        if (data) {
          console.log(data);
        } else if (error) {
          console.log(error.message);
        }
        setPreviewImage([]);
      }
    }
  };

  const cancelHandler = (resetForm) => {
    resetForm();

    router.push("/");
  };

  return (
    <div className="px-10 md:px-20 my-10">
      <h1 className="font-bold text-2xl">
        Enter the detail about your property:
      </h1>
      <Formik
        initialValues={{
          type: "",
          propertyType: "",
          bedroom: "",
          bathroom: "",
          builtIn: "",
          parking: "",
          lotSize: "",
          area: "",
          pool: "",
          description: "",
          extra: "",
          name: user?.fullName,
          profileImage: user?.imageUrl,
        }}
        onSubmit={(values) => {
          //   console.log(values);
          submitHandler(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-lg">
              <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mb-5">
                {/* type */}
                <div className="flex flex-col gap-5">
                  <h2 className="text-lg text-slate-500">
                    Do you want to Sell or Rent?
                  </h2>
                  <RadioGroup
                    className="flex items-center gap-x-10"
                    defaultValue={currentData?.type || "sell"}
                    onValueChange={(e) => (values.type = e)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rent" id="rent" />
                      <Label htmlFor="rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sell" id="sell" />
                      <Label htmlFor="sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* property type */}
                <div className="flex flex-col gap-5">
                  <h2 className="text-lg text-slate-500">Your property type</h2>
                  <Select
                    defaultOpen={currentData?.propertyType}
                    name="propertyType"
                    onValueChange={(e) => (values.propertyType = e)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          currentData?.propertyType
                            ? currentData?.propertyType
                            : "Property type"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="apartment">apartment</SelectItem>
                      <SelectItem value="room">room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mb-5">
                {/* rooms */}
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">number of rooms:</h2>
                  <Input
                    defaultValue={currentData?.bedroom}
                    type="number"
                    placeholder="2"
                    name="bedroom"
                    onChange={handleChange}
                  />
                </div>
                {/* bathroom */}
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Bathroom:</h2>
                  <Input
                    defaultValue={currentData?.bathroom}
                    type="number"
                    placeholder="2"
                    name="bathroom"
                    onChange={handleChange}
                  />
                </div>
                {/* builtIn */}
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Built In :</h2>
                  <Input
                    defaultValue={currentData?.builtIn}
                    type="number"
                    placeholder="1500 sq.m"
                    name="builtIn"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mb-5">
                {/* Parking */}
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Parking :</h2>
                  <Input
                    defaultValue={currentData?.parking}
                    type="number"
                    placeholder="3"
                    name="parking"
                    onChange={handleChange}
                  />
                </div>
                {/* Lot size */}
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Lot Size (sq. m) :</h2>
                  <Input
                    defaultValue={currentData?.lotSize}
                    type="number"
                    placeholder="1500 sq.m"
                    name="lotSize"
                    onChange={handleChange}
                  />
                </div>
                {/* area */}
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Area (sq. m):</h2>
                  <Input
                    defaultValue={currentData?.area}
                    type="number"
                    placeholder="1500 sq.m"
                    name="area"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mb-5">
                {/* selling price */}
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">selling price :</h2>
                  <Input
                    defaultValue={currentData?.sellingPrice}
                    type="number"
                    placeholder="100,000$"
                    name="sellingPrice"
                    onChange={handleChange}
                    value={values.sellingPrice}
                  />
                </div>
                {/* HOA per month */}
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Per month :</h2>
                  <Input
                    defaultValue={currentData?.hoa}
                    type="number"
                    placeholder="6500 $"
                    name="hoa"
                    onChange={handleChange}
                    value={values.hoa}
                  />
                </div>
                {/* type */}
                <div className="flex flex-col gap-5">
                  <h2 className="text-lg text-slate-500">Pool:</h2>
                  <RadioGroup
                    className="flex items-center gap-x-10"
                    defaultValue={currentData?.pool || "false"}
                    onValueChange={(e) => (values.pool = e)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="Yes" />
                      <Label htmlFor="Yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="No" />
                      <Label htmlFor="No">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="grid gap-10 grid-cols-1 md:grid-cols-2 mb-5">
                {/* description */}
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Description:</h2>
                  <Textarea
                    defaultValue={currentData?.description}
                    className="resize-none"
                    type="number"
                    placeholder="Description......."
                    name="description"
                    onChange={handleChange}
                  />
                </div>
                {/* extra features */}
                <div className="flex flex-col gap-2">
                  <h2 className=" text-slate-500">Extra features:</h2>
                  <Textarea
                    defaultValue={currentData?.extra}
                    className="resize-none"
                    type="number"
                    placeholder="Extra Features ......"
                    name="extra"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="my-5">
                <ImageUpload
                  setImages={setImages}
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                />
              </div>
              <div className="flex gap-x-5 flex-row-reverse">
                <Button type="submit">
                  {loader ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "save and Publish"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-sky-600"
                  onClick={submitHandler}
                >
                  {loader ? <Loader className="animate-spin" /> : "save"}
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500"
                  onClick={cancelHandler}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CompleteAd;

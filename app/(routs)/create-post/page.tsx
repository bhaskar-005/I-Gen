"use client";
import FormField from "@/app/_components/FormField";
import Loader from "@/app/_components/Loader";
import React, { ChangeEvent, useState } from "react";
import preview from "@/public/preview.png";
import Image from "next/image";
import { surpriseMePrompts } from "@/app/constants";
import { ImageGeneratorDalle } from "@/app/lib/dalle";
import { CreatePost } from "@/app/lib/posts";
import { Post } from "@prisma/client";
import Navbar from "@/app/_components/Navbar";

const page = () => {
  const [form, setForm] = useState({ name: "", prompt: "", photo: "" });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevPost, setprevPost] = useState<Post>();

  //on change handler funciton
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  //surprise button
  const handleSurpriseMe = (e: ChangeEvent<HTMLInputElement>) => {
    const randomNumber = Math.floor(Math.random() * surpriseMePrompts.length);
    const prompt = surpriseMePrompts[randomNumber];
    if (form.prompt == prompt) {
      handleChange(e);
    }
    setForm({ ...form, prompt: prompt });
  };
  //handle submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prevPost?.prompt === form.prompt || prevPost?.image === form.photo) {
      alert("Already shared.");
      console.log("Already shared.");

      return null;
    }

    setLoading(true);
    const res = await CreatePost({
      name: form.name,
      image:form.photo,
      prompt: form.prompt,
    });
    setprevPost(res);

    setLoading(false);
  };

  //image generation
  const generateImage = async () => {
    if (prompt.length >= 3) {
      return;
    }

    await ImageGeneratorDalle({ prompt: form.prompt });
  };
  return (
    <>
      <Navbar />
      <section className="max-w-7xl my-10 sm:mx-auto mx-6">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
            Generate an imaginative image through DALL-E AI and share it with
            the community
          </p>
        </div>

        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Ex., john doe"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[300px] p-3 h-[300px] flex justify-center items-center">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>

          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              ** Once you have created the image you want, you can share it with
              others in the community **
            </p>
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? "Sharing..." : "Share with the Community"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default page;

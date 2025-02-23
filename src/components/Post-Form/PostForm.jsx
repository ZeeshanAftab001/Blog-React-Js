import React from 'react'
import { useSelector } from "react-redux"
import Input from "../Input/Input.jsx"
import Button from "../Button.jsx"
import Select from "../Select/Select.jsx"
import { useForm } from 'react-hook-form'
import { useEffect, useCallback } from 'react'
import service from '../../appwrite/config.js'
import { useNavigate } from "react-router-dom"

export default function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });
    
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate();

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.createFile(data.image[0]) : null;
            if (file) {
                service.deleteFile(post.featuredImage)
            }
            const dbPost = await service.updateBlog(
                post.$id, { ...data, featuredImage: file ? file.$id : undefined }
            )
            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            const file = data.image[0] ? await service.createFile(data.image[0]) : null;
            if (file) {
                data.featuredImage = file.$id;
            }

            const dbPost = await service.createBlog({
                ...data,
                userId: userData.$id,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                
                {/* Replacing RTE with a Textarea */}
                <div className="mb-4">
                    <label className="block mb-2">Content:</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Write your content here"
                        {...register("content", { required: true })}
                    />
                </div>
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                type="submit"
                value={post ? "Update" : "Submit"}
                bgColor={post ? "bg-green-500" : undefined}
                className="w-full"
                />

            </div>
        </form>
    )
}

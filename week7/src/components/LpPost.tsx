import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postLp } from "../apis/lp";
import { useEffect, useState } from "react";

interface LpPostProps {
    modal: boolean;
    handleClose: () => void;
}

const schema = z.object({
    title: z.string().min(1, { message: "LP Name을 입력해주세요." }),
    content: z.string().min(1, { message: "LP Content을 입력해주세요." }),
    tags: z.array(z.string()).min(1, { message: "LP Tag을 하나 이상 추가해주세요." }),
    thumbnail: z.string().min(1, { message: "LP Thumbnail을 입력해주세요." }),
});

type FormFields = z.infer<typeof schema>;

function LpPost({modal, handleClose} : LpPostProps) {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isSubmitting},
    } = useForm<FormFields>({
        mode: "onBlur",
        defaultValues: {
            tags: [],
        },
    });

    const [tagInput, setTagInput] = useState("");
    const [tagsList, setTagsList] = useState<string[]>([]);
    
    useEffect(() => {
        setTagsList(getValues("tags"));
    }, []);

    const handleAddTag = () => {
        const newTag = tagInput.trim();
        
        if (newTag && !tagsList.includes(newTag)) {
            const newTags = [...tagsList, newTag];
            setTagsList(newTags);
            setValue("tags", newTags);
            setTagInput(""); // 입력창 초기화
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const newTags = tagsList.filter(tag => tag !== tagToRemove);
        setTagsList(newTags);

        setValue("tags", newTags);
    };

    const onSubmit:SubmitHandler<FormFields> = async(data) => {
        const requestBody = { ...data, published: false };

        try {
            const response = await postLp(requestBody);
            console.log(response);
            handleClose();
          } catch (err) {
            console.error(err);
          }
    };
    
    return (
        <>
        {modal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={handleClose}>
                <div className="relative bg-white p-20 rounded-lg shadow-lg flex flex-col items-start space-y-5"
                    onClick={(e) => e.stopPropagation()}>
                    <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="w-full flex justify-center">
                        <img src="/images/lp.png" alt="lp 아이콘"
                            style={{
                                width: "200px",
                                height: "200px",
                            }}
                        />
                    </div>

                    <input
                        {...register("thumbnail")}
                        className={`border border-gray-300 w-[400px] rounded-md p-2
                            ${errors?.thumbnail ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                        type="text"
                        placeholder="LP Thumbnail"
                    />
                    {errors?.thumbnail && (
                    <div className="text-red-500 text-sm">{errors.thumbnail.message}</div>
                    )}

                    <input
                    {...register("title")}
                        className={`border border-gray-300 w-[400px] rounded-md p-2
                            ${errors?.title ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                        type="text"
                        placeholder="LP Name"
                    />
                    {errors?.title && (
                    <div className="text-red-500 text-sm">{errors.title.message}</div>
                    )}

                    <input
                    {...register("content")}
                        className={`border border-gray-300 w-[400px] rounded-md p-2
                            ${errors?.content ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                        type="text"
                        placeholder="LP Content"
                    />
                    {errors?.content && (
                    <div className="text-red-500 text-sm">{errors.content.message}</div>
                    )}

                    <div className="flex items-center space-x-[10px]">
                        <input
                            className="border w-[310px] rounded-md p-2 border-gray-300"
                            type="text"
                            placeholder="LP Tag"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                        />
                        <button
                            type="button"
                            className="bg-blue-500 text-white w-[80px] h-[42px] rounded-md font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300"
                            onClick={handleAddTag}
                        >
                            Add
                        </button>
                    </div>
                    {errors?.tags && <div className="text-red-500 text-sm">{errors.tags.message}</div>}

                    <div className="flex flex-wrap gap-2 max-w-[400px]">
                        {tagsList.map((tag, index) => (
                            <div
                                key={index}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-2"
                            >
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    className="text-blue-500 hover:text-red-500"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <button 
                        className="bg-blue-500 text-white w-[400px] rounded-md p-2 text-lg font-semibold 
                        hover:bg-blue-600 transition-colors cursor-pointer disabled:bg-gray-300"
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    >
                        Add LP
                    </button>
                </div>
            </div>
        )}        
        </>
    )
}

export default LpPost;
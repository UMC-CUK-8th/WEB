import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postComment } from "../../apis/lp";

const schema = z.object({
  content: z.string().min(1, { message: "댓글을 입력해주세요." }),
});
type FormFields = z.infer<typeof schema>;

interface CommentPostProps {
  lpId: number;
  onSubmit: (content: string) => void;
}

const LpCommentPost = ({ lpId, onSubmit }: CommentPostProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const handleFormSubmit: SubmitHandler<FormFields> = async(data) => {
    const requestBody = { ...data };
    onSubmit(requestBody.content);
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
      {...register("content")}
      type="text"
      placeholder="댓글을 입력해주세요"
      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
    <button 
    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
    onClick={handleSubmit(handleFormSubmit)}>
      작성
    </button>
  </div>
  );
};

export default LpCommentPost;
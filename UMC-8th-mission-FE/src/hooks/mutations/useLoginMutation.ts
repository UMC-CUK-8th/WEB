import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { RequestSigninDto } from "../../types/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (signinData: RequestSigninDto) => postSignin(signinData),
  });
};

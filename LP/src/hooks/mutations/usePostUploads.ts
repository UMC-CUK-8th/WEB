import { useMutation } from "@tanstack/react-query";
import {  uploadsImage } from "../../apis/lp";

function usePostUploads(){
    return useMutation({
        mutationFn:uploadsImage,

    })
}

export default usePostUploads;
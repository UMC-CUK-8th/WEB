import { ChangeEvent, useReducer, useState } from "react";

type TActionType = "CHANGE_DEPARTMENT" | "RESET";;

interface IState {
    department: string;
    error: string | null;
}

interface IAction {
    type: TActionType;
    payload?: string;
}

function reducer(state: IState, action: IAction): IState {
    const { type, payload } = action;

    switch (type) {
        case "CHANGE_DEPARTMENT": {
            const newDepartment = payload;
            const hasError = newDepartment !== '카드메이커';
            return {
                ...state,
                department: hasError ? state.department : newDepartment,
                error: hasError ? "거부권 행사가능, 카드메이커만 입력 가능합니다." : null,
            };
        }
        default:
            return state;
    }
}

export default function UseReducerCompany() {
    const [state, dispatch] = useReducer(reducer, {
        department: "Software Developer",
        error: null,
    });

    const [department, setDepartment] = useState("");
    const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value);
    }
    
    return (
        <div>
            <h1>{state.department}</h1>
            {state.error && <p className="text-red-500 font-2xl">{state.error}</p>} 

            <input 
                className="w-[600px] border mt-10 p-4 rounded-md"
                placeholder="변경하시고 싶은 직무를 입력하세요. 단, 거부권 행사 가능"
                value={department} 
                onChange={handleChangeDepartment}
            /> 

            <button onClick={() => 
                dispatch({
                        type: "CHANGE_DEPARTMENT",
                        payload: department,
                    })
                } 
            /> 
        </div>
    )
}
// 페이로드 값을 받아서 인풋으로 보여주는 코드

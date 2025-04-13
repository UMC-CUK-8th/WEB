export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value)); // JSON.stringify를 해서 넣어주는 것이 가장 좋다. 
        } catch (error) {
            console.log(error)
        }
    };

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : null
        } catch (e){
            console.log(e);
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch(error) {
            console.log(error);
        }
    };

    return { setItem, getItem, removeItem };
};
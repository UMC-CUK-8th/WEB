interface ImportMetaEnv{
    readonly VITE_SERVER_API_URL:string;
    readonly DEV: boolean;
}

interface ImportMeta{
    readonly env : ImportMetaEnv
}
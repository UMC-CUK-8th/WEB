import Navbar from "./Navbar";
import ThemeContent from "./ThemeContent";
import { ThemeProvider } from "./context/ThemeProvider";

function ContextPage() : React.ReactElement {
    return (
        <ThemeProvider>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Navbar/>
                <main className="flex-1 w-full">
                    <ThemeContent/>
                </main>
            </div>
        </ThemeProvider>
    )
}

export default ContextPage;
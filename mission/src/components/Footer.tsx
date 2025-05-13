import { Link } from "react-router-dom";
const Footer = () => {
    return <footer className="bg-[#1e1e1e] dark:bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center text-gray-400">
        <p>&copy;{new Date().getFullYear()} 돌려돌려돌림판. All rights  reserved.</p>
        <div className={"flex justify-center space-x-4 mt-4"}>
            <Link to={"#"}>Privacy Policy</Link>
            <Link to={"#"}>Terms of Service</Link>
            <Link to={"#"}>Contact</Link>

        </div>
        </div>
    
    </footer>

}
export default Footer;
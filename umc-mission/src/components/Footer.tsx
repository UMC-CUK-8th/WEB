import { Link } from "react-router-dom";

const Footer= () =>{
 return(
    <footer className="bg-gray-100 dark:bg-gary-900 py-6 mt-12">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
            <p>
                &copy;{new Date().getFullYear()} 돌려돌려돌림판.All rights reserved.
            </p>
            <div className={'flex justify-cneter space-x-4 mt-4'}>
                <Link to ={"#"}>Privacy Policy</Link>
                <Link to ={"#"}>Terms of Service</Link>
                <Link to ={"#"}>Contact</Link>
            </div>
        </div>
    </footer>
 )
}

export default Footer;
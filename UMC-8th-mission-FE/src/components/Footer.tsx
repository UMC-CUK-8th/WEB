import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-[#141414] py-5 mt-12 text-sm">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
            <p> {/* &copy; 이걸 적으면 커퍼레이션 기호를 넣어줄 수 있음. */}
                &copy; {new Date().getFullYear()} UMC와 즐기는 LP판 작업실. All rights
                reserved.
            </p>
            <div className={"flex justify-center space-x-4 mt-2"}>
                <Link to={"#"}>
                    Privacy Policy
                </Link>
                <Link to={"#"}>
                    Terms of Service
                </Link>
                <Link to={"#"}>
                    Contact
                </Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer
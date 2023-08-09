import style from "./Layout.module.scss"
import Header from "../../components/Header";
import classNames from "classnames/bind";
import Footer from "../../components/Footer";
import {SessionProvider} from "next-auth/react"
import { useRouter } from "next/router";


const cx = classNames.bind(style)
function Layout({children, session}) {
    const router = useRouter();
    const path = router.asPath;
    if (path === "/login"){
        return (
            <SessionProvider session={session}>
                <div>
                    {children}
                </div>
            </SessionProvider>
    );
    } else {
        return ( 
        <SessionProvider session={session}>
        <div className={cx("app")}>
            <div className={cx("header")} >
                <Header />
            </div>
            <div className={cx("container")}>
                {children}
            </div>
            <div className={cx("footer")}>
                <Footer />
            </div>
        </div>
        
        </SessionProvider>
        
     )
    }
   
}

export default Layout;
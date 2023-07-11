import Header from "../../components/Header";
import style from "./Layout.module.scss"
import classNames from "classnames/bind";


const cx = classNames.bind(style)
function Layout({children}) {
    return ( 
        <>
        <div className={cx("header")} >
            <Header />
        </div>
        <div className={cx("container")}>
            {children}
        </div>
        
        </>
        
     );
}

export default Layout;
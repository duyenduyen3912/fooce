import { HomeOutlined, SearchOutlined, HeartOutlined, BookOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import style from "./Header.module.scss"
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import 'animate.css';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/UserSlice";
import ApiAdmin from "../../api/ApiAdmin";
import ApiUser from "../../api/ApiUser";
import { useRouter } from "next/router";
const cx = classNames.bind(style)

function Header() {
    const router = useRouter()
    const dispatch = useDispatch()
    const onHandleLogout = () =>{
        dispatch(logoutUser())
        router.push("/login")
    } 
    return (
        <div className={cx("header")}>
            <Row className={cx("header-wrap")}>
                <Col  span={10} className={cx("left")}>
                    <li className={cx("menu-item", "logo")}>
                        <Image src={require("../../assets/imgs/Fooce.png")} width={100} alt="logo" />
                    </li>
                    <li className={cx("menu-item")} >
                        <Link href={"/"} className={cx("menu-item-link")} tabIndex= "0">
                            Home
                        </Link>
                    </li>
                    <li className={cx("menu-item")}>
                        <Link href={"/our-menu"} className={cx("menu-item-link")} tabIndex= "0">
                            Menu
                        </Link>
                    </li>
                    <li className={cx("menu-item")}>
                        <Link href={"/food"} className={cx("menu-item-link")} tabIndex = "0">
                            Food
                        </Link>
                    </li>
                    <li className={cx("menu-item")}>
                        <Link href={"/juice"} className={cx("menu-item-link")} tabIndex = "0">
                            Juice
                        </Link>
                    </li>
                    <li className={cx("menu-item")}>
                        <Link href={"/about-us"} className={cx("menu-item-link")} tabIndex = "0">
                            About us
                        </Link>
                    </li>
                    { ApiAdmin.getRoleAdmin() === "1" ? 
                    <>
                   
                        <div className={`${cx('user')}`}>
                    <li className={cx("menu-item")}>
                    <Link href={"/admin"} className={cx("menu-item-link")} tabIndex = "0">
                                    Admin
                            </Link>  
                   </li>
                    <div className={`animate__zoomIn ${cx('user-menu', 'admin-menu')}`}>
                                <li className={cx('user-menu-item')}>
                                    <Link href={'/admin/dashboard'} className={cx('item-link')}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className={cx('user-menu-item')}>
                                    <Link href={'/admin/product'} className={cx('item-link')} >
                                        Product Manager
                                    </Link>
                                </li>
                       
                    </div> 
                    </div>
                    </>
                        
                        
                        
                        
                        
                        : null
                    }
                    
                </Col>
                <Col  span={7} className={cx("right")}>
                <li className={cx("menu-item")}>
                    <div className={cx("search-wrap")}>
                        <SearchOutlined style={{ fontSize: '18px', color: '#FBBCC0', fontWeight: '600' }}/>
                        <input type = "text" placeholder="Search here ..." className={cx("search-input")}/>
                    </div>
                </li>
                <li className={cx("menu-item", "icon")}>
                    <div style={{position: 'relative', minWidth: '35px'}}>
                        <Link href={"/cart"}>
                        <ShoppingCartOutlined style={{ fontSize: '24px', color: '#FBBCC0', fontWeight: '600' }}/>
                        <span className={cx('quantity')}>4</span>
                    </Link>
                    </div>
                    
                </li>
                
                    {ApiUser.isLogin() ?
                    <div className={`${cx('user')}`}>
                    <li className={cx("menu-item")}>
                       
                           <UserOutlined className={cx('user-icon')} />
                           
                   </li>
                    <div className={`animate__zoomIn ${cx('user-menu')}`}>
                                <li className={cx('user-menu-item')}>
                                    <Link href={'/my-account'} className={cx('item-link')}>
                                        My account
                                    </Link>
                                </li>
                                <li className={cx('user-menu-item')}>
                                    <Link href={'/login'} className={cx('item-link')} onClick={onHandleLogout}>
                                        Logout
                                    </Link>
                                </li>
                       
                    </div> 
                    </div>
                    :
                    <li className={cx("menu-item")}>
                        <Link href={"/login"} className={cx("menu-item-link")} tabIndex = "0">
                            Login
                        </Link>
                    </li>
                    }
              
                
               
                
                </Col>
            </Row>
            
        </div>
        
     )
}

export default Header;
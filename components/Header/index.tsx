import { HomeOutlined, SearchOutlined, HeartOutlined, BookOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import style from "./Header.module.scss"
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import 'animate.css';
import ApiUser from "../../api/ApiUser";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/UserSlice";
const cx = classNames.bind(style)

function Header() {

    const dispatch = useDispatch()
    const onHandleLogout = () => dispatch(logoutUser())
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
                    <li className={cx("menu-item", "icon")}>
                        <Link href={"/admin"} className={cx("menu-item-link")} tabIndex = "0">
                                Admin
                        </Link>
                    </li>
                </Col>
                <Col  span={7} className={cx("right")}>
                <li className={cx("menu-item")}>
                    <div className={cx("search-wrap")}>
                        <SearchOutlined style={{ fontSize: '18px', color: '#FBBCC0', fontWeight: '600' }}/>
                        <input type = "text" placeholder="Search here ..." className={cx("search-input")}/>
                    </div>
                </li>
                <li className={cx("menu-item", "icon")}>
                    <Link href={"/cart"}>
                    
                        <ShoppingCartOutlined style={{ fontSize: '20px', color: '#FBBCC0', fontWeight: '600' }}/>
                    </Link>
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
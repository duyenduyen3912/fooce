import { HomeOutlined, SearchOutlined, HeartOutlined, BookOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import style from "./Header.module.scss"
import classNames from "classnames/bind";
import Image from "next/image";

const cx = classNames.bind(style)

function Header() {
    return (
        <div className={cx("header")}>
            <Row className={cx("header-wrap")}>
                <Col  span={10} className={cx("left")}>
                    <li className={cx("menu-item", "logo")}>
                        <Image src={require("../../assets/imgs/Fooce.png")} width={100} alt="logo" />
                    </li>
                    <li className={cx("menu-item")} >
                        <a className={cx("menu-item-link")} tabIndex= "0">
                            Home
                        </a>
                    </li>
                    <li className={cx("menu-item")}>
                        <a className={cx("menu-item-link")} tabIndex= "0">
                            Menu
                        </a>
                    </li>
                    <li className={cx("menu-item")}>
                        <a className={cx("menu-item-link")} tabIndex = "0">
                            Food
                        </a>
                    </li>
                    <li className={cx("menu-item")}>
                        <a className={cx("menu-item-link")} tabIndex = "0">
                            Juice
                        </a>
                    </li>
                    <li className={cx("menu-item")}>
                        <a className={cx("menu-item-link")} tabIndex = "0">
                            About us
                        </a>
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
                    
                    <ShoppingCartOutlined style={{ fontSize: '20px', color: '#FBBCC0', fontWeight: '600' }}/>
                </li>
                <li className={cx("menu-item", "icon")}>
                    <UserOutlined style={{ fontSize: '20px', color: '#FBBCC0', fontWeight: '600' }}/>
                </li>
                </Col>
            </Row>
            
        </div>
        
     )
}

export default Header;
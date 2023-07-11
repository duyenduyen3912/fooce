import { Carousel } from "antd";
import classNames from "classnames/bind";
import style from "./Home.module.scss"
import Image from "next/image"

const cx = classNames.bind(style)  
function Homepage() {
    return (
       
       <div className={cx("homepage")}>
            <div className={cx("border-top")}>
                <Image src={(require("../../assets/imgs/border-top.png"))} alt="border"/>
            </div>
            <div className={cx("carousel")} >
                <Carousel autoplay dotPosition="right">
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/2.png")} alt="drink"/>
                    </div>
                    <div>
                        <Image src={require("../../assets/imgs/3.png")} alt="drink"/>
                    </div>
                    <div>
                        <Image src={require("../../assets/imgs/4.png")} alt="drink"/>
                    </div>
                    <div>
                        <Image src={require("../../assets/imgs/5.png")} alt="drink"/>
                    </div>
                </Carousel>
           
            </div>
            <div className={cx("border-bottom")}>
                <Image src={(require("../../assets/imgs/border-bottom.png"))} alt="border"/>
            </div>
       </div>
       
     )
}

export default Homepage;
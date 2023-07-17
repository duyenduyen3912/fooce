import React from 'react'
import classNames from 'classnames/bind'
import style from "./PageTitle.module.scss"
import Image from 'next/image'


const cx = classNames.bind(style)
export default function PageTitle(prop) {
  return (
    <div className={cx("page-title")}>
        <Image src={require("../../assets/imgs/title-bg.png")} alt="title-background" className={cx("image")}/>
        <div className={cx("title")}>
            {prop.name}
        </div>
    </div>
  )
}

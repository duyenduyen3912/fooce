
import React from 'react'
import style from "./Menu.module.scss"
import classNames from 'classnames/bind'
import PageTitle from '../../components/PageTitle'
import Head from 'next/head'
import MenuType from '../../components/Menu'
import image from '../../constant/img/image'
const cx = classNames.bind(style)
export default function Menu() {
  return (
    <>
    <Head>
        <title>Fooce | Menu</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icon.png" />
    </Head>
    <div className={cx("menu-page")}>
        <PageTitle name= {"Our menu"} />
        <MenuType bg={image.menuSummer} menuType="Summer"/>
        <MenuType bg={image.menuWinter} menuType="Winter"/>
        <MenuType bg={image.menuCouple} menuType="Couple"/>
    </div>
    </>
    
  )
}

"use client"
import React, { useState } from "react";
import MobNav from "./MobNav";
import Nav from "./Navbar";

const ResponNav=()=>{

        const [showNav,setShowNav]=useState(false)
        const handleNavShow = ()=>{
            setShowNav(true)
        }
        const handleNavHide =()=>{
            setShowNav(false)
        }

    return(
        <div>
            <Nav openNav = {handleNavShow}/>
            <MobNav showNav = {showNav} closeNav = {handleNavHide}/>       
        </div>
    )
}
export default ResponNav
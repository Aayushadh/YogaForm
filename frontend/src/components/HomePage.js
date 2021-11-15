import Button from '@restart/ui/esm/Button'
import React,{useState} from 'react'
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import { useNavigate } from 'react-router'



const HomePage = () => {

    const [name,setName]=useState("Yoga Class")
    const [project,setProject]=useState("")
    const [github,setGithub]=useState("")
    const [description,setDescription]=useState("Yoga is a mirror to look at ourselves from within")

    const navigate = useNavigate()

    const gotoEnroll = ()=>{
        navigate("/enroll")
    }
    const gotoPayfees=()=>{
        navigate("/pay")
    }
    return (
        <header id="home">
        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>{description}.</h3>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                <a href={"/enroll"} className="button btn project-btn">
                  <i className="fa fa-book"></i>Enroll
                </a>
                <a href={"/pay"} className="button btn project-btn">
                <i class="fas fa-money-bill-alt"></i>Pay Fees
                </a>
              </ul>
            </Fade>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    )
}

export default HomePage

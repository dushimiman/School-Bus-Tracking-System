import React from "react"
import "./home.css"

import HomeLayout from "../components/homeLayout"


const Home = () => {
    return (
        <HomeLayout>
            <div className="home-bg">
               <i> <h1>School Bus Tracking System</h1></i>
                <div className="data-container">
                    <h4>Our Tracking System</h4>
                    <p>Our School Bus Tracking System is a comprehensive solution
                         designed to enhance the safety and security of students during
                          their daily commutes.</p>
                   
                </div>


            </div>

        </HomeLayout>
    )
}



export default Home;
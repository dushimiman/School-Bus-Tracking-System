import React, {useState} from "react";
import {Drawer} from "antd";
import "antd/dist/antd.css";
import SingleTour from "./singleTour";
// import { useState } from "react";

const Tourcard =({tour})=>{
    const [drawerVisible,setDrawerVisible] = useState(false);
    const handleclickDrawerVisible = () =>{
        setDrawerVisible(true);

    }
    const closeDrawerVisible = ()=> {
        setDrawerVisible(false);
    }

    console.log (tour.images[0])
    return(
        <>
        <Drawer  title="More Discription" placement="top" visible={drawerVisible} width={70} height={700}  onClose={() =>closeDrawerVisible()}>
<SingleTour tour={tour}/>
        </Drawer>
        <div className="card-container">
            <div className="card">
                <div className="imagecard">
            
                <img src={tour.images[0]} />
                </div>

                
                <h1 >{tour.title}</h1>
                
               <p>{tour.description}</p><br/>
               <div className="card-cont">
                <div>
               <p>seats:{tour.seats}</p>
               <p>available:{tour.available}</p>
               <p>dateScheduled:{tour.dateScheduled}</p>
               </div>
               <div className="read" onClick={() => handleclickDrawerVisible()}>
               <p>dueDate:{tour.dueDate}</p>
               <p>phone:{tour.phone}</p>
               <label onClick={() => handleclickDrawerVisible()}> Read more.....</label>
               </div>
               </div>
              
               
                

            </div>

        </div>
        </>
       
    )
}
export default Tourcard;
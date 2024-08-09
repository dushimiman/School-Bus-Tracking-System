import React from "react";

const SingleTour=({tour})=>{
    return(
        <div className="singletour">
            <div className="contai">
            {/* <div className="disc">
            <img src={tour.images[0]}  width="20%" margin-left="70px"/>
            
            </div> */}
            <div>
            <h1>{tour.title}
            </h1>
            <p>{tour.description}</p>
            <p>Seats:{tour.seats}</p>
               <p>Available:{tour.available}</p>
               <p>DateScheduled:{tour.dateScheduled}</p>
               <p>DueDate:{tour.dueDate}</p>
               <p>Phone:{tour.phone}</p></div>
               </div>
               <h1>GARELLY</h1>
               <div className="Garelly">
                {
               tour.images.map((image)=>(
                <img src={image}></img>

               ))
               }  
                   
                   
                 

              </div>
        </div>
        

    )
}
export default SingleTour;
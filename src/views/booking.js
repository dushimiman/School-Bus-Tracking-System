import React from "react";
import HomeLayout from "../components/homeLayout";
import './booking.css'

const Booking =()=>{
    return(

        <HomeLayout>
           
     <div className="book-sort-div">
         <div className="sort-div">
                <h1>Booking your Tour Now!</h1><br/>
                <label for="category">Tour category</label><br/>
                <select id="category">
                    <option value="Forest">Forest</option>
                    <option value="Forest">park</option>
                    <option value="lake-kivu">lake-kivu</option>
                    <option value="Rubavu">River</option>
                    <option value="Forest">Mize</option>
                    <option value="Forest">Mize</option>
                </select><br/><br/>
                <label for="category"> Tour Location</label><br/>
                <select  id="category">
                    <option value="Forest">Musanze</option>
                    <option value="Forest">Nyamasheke</option>
                    <option value="lake-kivu">Karongi</option>
                    <option value="Rubavu">Rubavu</option>
                    <option value="Forest">Nyanza</option>
                    <option value="Forest">Huye</option>
                </select><br/><br/>
                <button> <a href="/reseach">Booking</a></button>
                </div>
                </div>
                <div className="image">
                    

                </div>
                
              
            
            

            


        </HomeLayout>
    )
}
export default Booking;
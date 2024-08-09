import React from 'react';
import HomeLayout from "../components/homeLayout";
import Tourcard from '../components/tourcard';
import  allTourDate from '../Assets/constants/tours.json'

const Tourview=()=>{
    return(
        <HomeLayout>
            <div className="tours-container">
{
    allTourDate.map((data)=>(<Tourcard tour={data}/>))
}
                

               
                

            </div>

        </HomeLayout>

    )
}
export default Tourview;
import React from "react" 
import Home from "../views/home";
import{Routes, Route, useLocation} from "react-router-dom";
import Aboutus from "../views/Aboutus";
import Garelly from "../views/Garelly";
import Booking from "../views/booking";
import  Reseach from "../views/reseach" ;
import  Contact from "../views/contact" ;
import  Submit from "../views/submit" ;
import Tourview from "../views/tour";
import SignIn from "../views/SignIn";
import DevicesList from '../views/Dashboard/AllDevices'
import DashLayout from '../components/dashboardLayout'
import AddDeviceForm from '../views/Dashboard/NewDevice'
import DeviceTracking from '../views/Dashboard/DeviceTracking'
const isUserLogedIn = localStorage.getItem("userLogedIn");
const Index=()=>{
    const currentUrl=useLocation().pathname;
return(
    <>
    <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/aboutus' element={<Aboutus/>}/>
        <Route path='/garelly' element={<Garelly/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/reseach' element={<Reseach/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/submit' element={<Submit/>}/>
        <Route path='/tour' element={<Tourview/>}/>
       

        
        
    </Routes>
    {
        isUserLogedIn && currentUrl.includes("/dash")?(
            <DashLayout>
                <Routes>
                    <Route path="/dash/NewDevice" element={<AddDeviceForm />}></Route>
                    <Route path="/dash/AllDevices" element={< DevicesList />}></Route>
                    <Route path="/dash/DeviceTracking" element={< DeviceTracking />}></Route>
                </Routes>

            </DashLayout>  )
       :(<></>)
        }
        </>
)

} 


export default Index
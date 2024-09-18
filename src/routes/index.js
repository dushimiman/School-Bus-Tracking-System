import React from "react" 
import Home from "../views/home";
import{Routes, Route, useLocation} from "react-router-dom";
import SignIn from "../views/SignIn";
import DashLayout from '../components/dashboardLayout'
import DeviceTracking from '../views/Dashboard/DeviceTracking'
import AddBus from "../views/Dashboard/AddBus";
import AddSchool from "../views/Dashboard/AddSchool";
import AddChild from "../views/Dashboard/AddChild";
import SchoolsList from '../components/SchoolList'
import AddDestination from "../views/Dashboard/AddDestination";
const isUserLogedIn = localStorage.getItem("userLogedIn");
const Index=()=>{
    const currentUrl=useLocation().pathname;
return(
    <>
    <Routes>
        <Route path='' element={<Home/>}/>
       
        <Route path='/signin' element={<SignIn/>}/>
      
       

        
        
    </Routes>
    {
        isUserLogedIn && currentUrl.includes("/dash")?(
            <DashLayout>
                <Routes>
                <Route path="/dash/AddBus" element={<AddBus/>}></Route>
                    <Route path="/dash/AddSchool" element={<AddSchool />}></Route>
                    <Route path="/dash/AddChild" element={< AddChild />}></Route>
                    <Route path="/dash/AddDestination" element={< AddDestination  />}></Route>
                    <Route path="Schools" element={<SchoolsList />} />
                    <Route path="/dash/DeviceTracking" element={< DeviceTracking />}></Route>
                </Routes>

            </DashLayout>  )
       :(<></>)
        }
        </>
)

} 


export default Index
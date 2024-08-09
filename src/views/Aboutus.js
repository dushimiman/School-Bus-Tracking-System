import React from "react";
import HomeLayout from "../components/homeLayout";
import './Aboutus.css'

const Aboutus=()=>{
    return(
        <HomeLayout>
            <div className="aboutus-container">
                <div className="pragraph">
                    <h1>  Who Are We?</h1>
                    <p>
                  
Beautiful Rwanda Tours <br></br>
 is well known for their unique <br></br>
 and exciting trips in Rwanda and <br></br>
 throughout East Africa. Established by <br></br>
 experienced and passionate tourism professionals,<br></br>

Beautiful Rwanda Tours was created after <br></br>
the realization that Rwanda is one of the continent’s <br></br>
 tourism offerings and a desire to share it with the world!
                    </p>
                </div>
                
            </div >
            <div className="about-us">
            <div className="about">
            <h1>Our Vision</h1>
            <p>It is our vision to be one of the most popular travel agencies  <br/>
                 offering services to every sector of the individuals and business  <br/>
                 And it is also our vision to use the experience of the <br/>
                 highly professional staff members of our company <br/>
            to deal with the requirements of holistic <br/>
            traveling for both leisure travelers and corporates.</p>
            </div>
            <div className="about1">
            <h1>Our Mission</h1>
            <p >We work with the mission to be passionate <br/>
                and driven about servicing the travel related <br/>
                requirements of the individuals and companies through the integrity,<br/>
                commitment and dedication of our competent business partners and staff members.<br/>
                 To increase our reputation, we always attempt to deliver in the best-in-class<br/>
                  services while forming a paradigm shift relating to travel internationally and locally</p>
        </div>
        </div>

            
        </HomeLayout>
    )
}
export default Aboutus
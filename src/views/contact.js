import React from "react";
import HomeLayout from "../components/homeLayout";
import './contact.css'

const Contact=()=>{
    return(
        <HomeLayout>
            <div style={{fontSize:"25px"}}>
            <p>Calls:  0780564438</p>
            <p>Email: @beautifulrwandatours </p>
            </div>
            
        <div className="contact">
            <h1>Send Us Message</h1>
            </div>
            <div className="contact-form">
            <form >
    
        <label>Name</label><br/>
        <input type="text"  /><br/>
   
    
        <label>Email address</label><br/>
        <input type="email"  /><br/>
    
  
        <label >Message</label><br/><br/>
        <textarea className="form-control" rows="5"></textarea>
       
        <button><a href="/submit">Submit</a></button>
       
</form>
</div>
           
        </HomeLayout>

    )
}
export default Contact;
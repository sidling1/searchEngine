import React, { useState } from 'react'
import './homepage.css'
import axios from 'axios';
import ResponsePage from './ResponsePage';

export default function Homepage() {
    const [Response , setResponse] = useState([]);

    const handleResponse = (res)=>{
        if(res){
            const link = res.data.data.link;
            const title = res.data.data.title;
            // console.log(link);
            setResponse(
                [
                    {
                        link:link,
                        title:title
                    }
                ]
            );
            console.log(res);
        }else{
            setResponse([])
        }
        
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        
        const formData = {
            query:event.target.query.value
        }
        console.log(formData);

        axios.post('/knowitall',formData).then(res=>{
            handleResponse(res)
        }).catch(err=>{
            console.log(err)
        })
    };


  return (
    <div>
        <div className="logo">

        </div>
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="What are you looking for today" name="query"/>
                <button type="submit">Submit</button>
            </form>
        </div>
        
    </div>
  );
}

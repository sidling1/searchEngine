import React from 'react'

export default function ResponsePage([Response]) {
  return (
    (Response.length !== 0)?(
        <div>
            {
                Response.map((value,index)=>{
                    return(
                        <div className='search-result'>
                            {Response.title}
                            {Response.link}
                        </div>
                    )
                })
            }
        </div>
        ):(
            <div>
                No Result Found !!
            </div>
        )
  )
}

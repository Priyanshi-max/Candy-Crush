import React from 'react'

export default function scoreBoard({score}) {
  return (
    <div className='scoreBoard' >
    <div style={{display:'flex',flexDirection:'row',backgroundColor:'red',width:'170px',justifyContent:'center',borderRadius:'25px',borderStyle:'dotted',borderColor:'green',borderWidth:'5px'}}>
        <h2 style={{fontSize:'30px',color:"white"}}>Scores: </h2>
        <h2 style={{fontSize:'30px',marginLeft:'3px',color:'white'}}>{score}</h2>
    </div>

    </div>
  )
}

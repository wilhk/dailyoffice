import { devotionalDays } from '../content'
import { getProgress, resetProgress } from '../storage'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ListingPage(){
 const [v,setV]=useState(0)
 const nav=useNavigate()
 const progress=getProgress()
 return(
  <div className='page'><div className='container'>
   <h1>Daily Office</h1>
   <button onClick={()=>{resetProgress();setV(v+1)}}>Reset</button>
   {devotionalDays.map(d=>(
    <div key={d.day} className='list-item' onClick={()=>nav(`/day/${d.day}`)}>
     <div>Day {d.day} - {d.title}</div>
     <div>{progress[d.day]?'✓':''}</div>
    </div>
   ))}
  </div></div>
 )
}
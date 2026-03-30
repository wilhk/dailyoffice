import { useParams,Link } from 'react-router-dom'
import { devotionalDays } from '../content'
import { markDayComplete } from '../storage'

export default function DetailPage(){
 const {dayId}=useParams()
 const day=devotionalDays.find(d=>String(d.day)===dayId)
 if(!day)return <div>Not found</div>
 return(
  <div className='page'><div className='container'>
   <Link to='/'>Back</Link>
   <h1>{day.title}</h1>
   <p>{day.scripture}</p>
   <p>{day.devotional}</p>
   <button className='primary-btn' onClick={()=>markDayComplete(day.day)}>Finish</button>
  </div></div>
 )
}
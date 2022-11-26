import React from 'react'
import { useHistory } from 'react-router-dom'
import classes from './Welcome.module.css'
const Welcome = () => {
    const history = useHistory()
    const profileUpdateHandler=()=>{
         history.push('/updateprofile')
    }
  return (
    <div className={classes.welcome}>
        
      <h1 >Welcome to Expense Tracker</h1>
      <h3>Your profile is incomplete. <span onClick={profileUpdateHandler}>Complete Now.</span></h3>
    </div>
  )
}

export default Welcome

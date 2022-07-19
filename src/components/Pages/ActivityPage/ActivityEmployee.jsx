import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'

export default function ActivityEmployee({a}) {
    const dispatch= useDispatch();
    const employee= useSelector((store => store.employee))
    // {dispatch( {type: "FETCH_EMPLOYEES", payload: {activityID:a.id}})}
  return (
      <div>
      <p>{employee.filter((e)=> a.id=== e.activity_id).map((e,i)=> { return e.employee })}</p>
      </div>
  )
}

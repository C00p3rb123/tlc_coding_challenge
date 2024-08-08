import React from 'react'

type props = {
    message?: string
}
export default function ErrorMessage(props: props) {
  return (
    <div className='error'>
      {props.message ? props.message : "Unable to retrieve powerball numbers at this time"}
    </div>
  )
}

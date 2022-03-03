import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div>
      <h1>404 - No User Found!</h1>
      <Link to="/">Go Back Home</Link>
    </div>
  )
}

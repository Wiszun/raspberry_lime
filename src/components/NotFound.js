import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'

const NotFound = (props) => {
  const [counter, setCounter] = useState(10);

  const countdown = () => setCounter(counter - 1)

  useEffect(() => {
    const interval = setInterval(countdown, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [counter])

    return(
      <section id="contact" onClick={countdown}>
        <h1>Page not found!</h1>
        <p>Redirecting to Homepage in { counter } seconds...</p>
        {counter === 0 && <Redirect to='/' />}
      </section>
    )

};

export default NotFound;

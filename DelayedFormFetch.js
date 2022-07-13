import React, { useState, useEffect } from 'react'

export const DelayedFormFetch = () => {
  const [delay, setDelay] = useState("");
  useEffect(() => {
    (async () => {
      console.log("calling endpoint");
      fetch("https://catfact.ninja/fact").then(res => {
        res.text().then(text => {
          console.log("response", text);
          setDelay("request done");
        })
      })
    })()
  }, [])

  console.log("delay", delay, Date.now().toString());

  if (delay === "") {
    return (
      <div data-testid="loading">
        Still loading...
      </div>
    )
  }

  return (
    <div data-testid="loaded">{delay}</div>
  )
}

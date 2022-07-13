import React, { useState, useEffect } from 'react'

export const DelayedFormXHR = () => {
  const [delay, setDelay] = useState("");
  useEffect(() => {
    (async () => {
      console.log("calling endpoint");
      const req = new XMLHttpRequest();
      req.open("GET", "https://catfact.ninja/fact", true);
      req.onload = () => {
        console.log("response", req.responseText);
        setDelay("request done");
      }
      req.send();
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

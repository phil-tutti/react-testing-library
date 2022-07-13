import React, { useState, useEffect } from 'react'

export const DelayedFormFetchAwait = () => {
  const [delay, setDelay] = useState("");
  useEffect(() => {
    (async () => {
      console.log("calling endpoint");
      const delayRes = await fetch("https://catfact.ninja/fact");
      console.log("response", await delayRes.text());
      setDelay("request done");
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

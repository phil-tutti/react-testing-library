import React, { useState, useEffect } from 'react'

export const DelayedForm = () => {
  const [delay, setDelay] = useState("");
  useEffect(() => {
    (async () => {
      console.log("calling endpoint");
      // const delayRes = await fetch("https://catfact.ninja/fact");
      // console.log("request done");
      // setDelay(await delayRes.text());
      const req = new XMLHttpRequest();
      req.open("GET", "https://catfact.ninja/fact", true);
      req.onload = (e) => {
        console.log("got it", req.responseText);
        setDelay("request done")
      }
      req.onerror = () => {
        console.log("error");
      }
      req.send();
      // fetch("https://catfact.ninja/fact").then(res => {
      //   console.log("request done");
      //   res.text().then(text => {
      //       setDelay(text);
      //   })
      // })
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

import React, { useState, useEffect } from 'react'

import './styles.css'

const App = () => {
  let [names, setNames] = useState([])
// Removing [] from useState([]) results in 'TypeError: Cannot read property 'map' of undefined'
// Replacing [] from useState([]) with 0 results in 'TypeError: names.map is not a function'
  useEffect(() => {
    fetch('https://uinames.com/api/?amount=25&region=nigeria')
      .then(response => response.json())
      .then(data => {
        setNames(data)
      })
  }, [])

  return (
    <div className="App">
      <div>
        {names.map((item, i) => (
          <div key={i}>
            {item.name} {item.surname}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

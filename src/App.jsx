import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    fetch('/api/v1/users')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }, [])

  return <div>Hello World!</div>
}

export { App }

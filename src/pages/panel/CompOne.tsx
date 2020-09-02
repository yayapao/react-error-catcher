import React from 'react'

export default (props: any): React.ReactNode => {
  console.log(props)
  return (
    <>
      <div>Show the React-Router render params below!</div>
      <div>
        {Object.entries(props).map((item) => {
          const [key, value] = item
          return (
            <pre key={key}>
              <span>{key}: </span>
              <code>{JSON.stringify(value)}</code>
            </pre>
          )
        })}
      </div>
    </>
  )
}

import React from 'react'

export const Tabs = ({ rooms, setRoom }) => {
  return (
    <ul className="tabs" style={classes.tabs}>
      {rooms.map((r, i) => (
        <li className="tab col s3" onClick={() => setRoom(r)} key={i}>
          <a href="">{r}</a>
        </li>
      ))}
    </ul>
  )
}

const classes = {
  tabs: {
    borderBottom: '1px solid grey',
    borderRadius: '.5rem .5rem 0 0',
  },
}

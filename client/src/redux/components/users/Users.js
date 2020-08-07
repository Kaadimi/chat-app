import React from 'react'
import { useSelector } from 'react-redux'
import onlineIcon from '../../../icons/onlineIcon.png';

import './Users.css';

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div className="textContainer">
    {
      users
        ? (
          <div>
            <h1>People currently in:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
  )
}

export default Users;

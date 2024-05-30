import React, { useContext } from 'react'
import UserContext from '../Context/UserContext'
import { Link } from 'react-router-dom'

function Group() {
  const { user, groups, setGroups } = useContext(UserContext);

  return (
    <section>
      <h3>Group</h3>
      <Link to='/creategroup'>Create Group</Link>
        <p>You have no groups</p>
    </section>
  )
}

export default Group
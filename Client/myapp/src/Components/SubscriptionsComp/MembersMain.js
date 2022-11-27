import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import utils from '../../Utils'
import Member from './Member'

const url = "http://localhost:2000/api/members"

function MembersMain() {
  const [members, setMembers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: membersData } = await utils.PrivateData(url)
        setMembers(membersData)
      } catch (err) {
        console.error(err.message)
      }
    }
    // eslint-disable-next-line
    fetchData()
  }, [])

  const addMember = () => {
    navigate("add")
  }

  const membersRep = members.map(memberId => {
    return <Member key={memberId._id} id={memberId._id} />
  })

  return (
    <div className='main-page-subs'>
      <h2>Subscriptions</h2>
      <br />
      <button className='btn-link ' onClick={() => { window.location.reload() }}>All Members</button> &nbsp; <button className='btn-link ' onClick={addMember}>Add Member</button>
      <br />
      <br />
      {members.length >= 0 && membersRep}
    </div>
  )
}

export default MembersMain
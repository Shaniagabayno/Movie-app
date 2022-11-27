import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import utils from '../../Utils'

const url = "http://localhost:2000/api/members"

function EditMember() {
  const [member, setMember] = useState({
    name: "",
    email: "",
    city: "",
    dateBirth: ""
  })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await utils.getDataById(url, id)
      setMember(data)
    }
    fetchData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setMember({ ...member, [name]: value });
  }

  const editMember = async () => {
    try {
      await utils.updateItem(url, id, member);
      alert("Updated!")
    } catch (error) {
      alert("ERROR!")
    }
  }

  const backToMainPage = () => {
    navigate("/main/subscriptions")
  }

  return (
    <div className='add-edit-page'>
      <h2 className='form-header-title'>Edit Member</h2>
      <label className='forms-info'> Name :</label>
      <input type="text" className='input' name="name" value={member.name} onChange={handleChange} /> <br />
      <label className='forms-info'> Email:</label>
      <input type="text" className='input' name="email" value={member.email} onChange={handleChange} /> <br />
      <label className='forms-info'>City:</label>
      <input type="text" className='input' name="city" value={member.city} onChange={handleChange} /><br />
      <label className='forms-info'>Birthday:</label>
      <input type="text" className='input' name="dateBirth" value={member.dateBirth} onChange={handleChange} /><br />
      <button className='btn-link' onClick={editMember}>Save</button> &nbsp; <button className='btn-link' onClick={backToMainPage}>Cancel</button></div>
  )
}

export default EditMember
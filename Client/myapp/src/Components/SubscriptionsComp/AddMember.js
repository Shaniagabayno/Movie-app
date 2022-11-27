import { useState } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../../Utils";

const url = "http://localhost:2000/api/members";

function AddMember() {
  //Need to be written as it is in the database
  const [member, setMember] = useState({
    name: "",
    email: "",
    city: "",
    dateBirth: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const addMember = async () => {
    try {
      await utils.addItem(url, member);
      alert("Created!")

    } catch (error) {
      alert("ERROR!");
    }
  };
  const backToMainPage = () => {
    navigate("/main/subscriptions");
  };

  return (
    <div className='add-edit-page'>
      <h2 className='form-header-title'>Add Member</h2>
      <label className='forms-info'> Name :</label>
      <input type="text" className='input' name="name" onChange={handleChange} autoComplete='off' /> <br />
      <label className='forms-info'> Email:</label> <input type="text" className='input' name="email" onChange={handleChange} autoComplete='off' /> <br />
      <label className='forms-info'>City:</label>
      <input type="text" className='input' name="city" onChange={handleChange} autoComplete='off' /><br />
      <label className='forms-info'>Birthday:</label>
      <input type="date" className='input' name="dateBirth" onChange={handleChange} /><br />
      <br />
      <button className='btn-link' onClick={addMember}>Save</button> &nbsp;{" "}
      <button className='btn-link' onClick={backToMainPage}>Cancel</button>
    </div>
  );
}

export default AddMember;

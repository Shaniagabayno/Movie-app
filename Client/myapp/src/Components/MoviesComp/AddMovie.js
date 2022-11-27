import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import utils from "../../Utils";


const url = "http://localhost:2000/api/movies"

function AddMovie() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: "",
    premiered: "",
    genres: [],
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });

  };
  const addMovie = async () => {
    try {
      await utils.addItem(url, movie)
      alert("Created")
    } catch (error) {
      alert("ERROR!")
    }
  }

  const backToMovies = () => {
    navigate("/main/movies")
  }

  return (
    <div className='add-edit-page'>
      <h2>Add Movie</h2>
      <label className='forms-info'> Name :</label>
      <input type="text" name="name" className='input' onChange={handleChange} autoComplete='off' /> <br />
      <label className='forms-info'>Premiered :</label>
      <input type="date" name="premiered" className='input' onChange={handleChange} autoComplete='off' /> <br />
      <label className='forms-info'> Genres : </label>
      <input type="text" name="genres" className='input' onChange={handleChange} autoComplete='off' /> <br />
      <label className='forms-info'>Image url: </label>
      <input type="text" name="image" className='input' onChange={handleChange} autoComplete='off' /><br />
      <br />
      <button className='btn-link' onClick={addMovie}>Save</button> &nbsp; <button className='btn-link' onClick={backToMovies}>Back</button>
    </div>
  )
}

export default AddMovie
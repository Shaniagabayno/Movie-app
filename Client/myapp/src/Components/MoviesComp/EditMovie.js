import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import utils from "../../Utils";

const url = "http://localhost:2000/api/movies"

function EditMovie() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [movie, setMovie] = useState({
    name: "",
    premiered: "",
    genres: [],
    image: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await utils.getDataById(url, id)
      setMovie(data)
    }
    fetchData()
    // eslint-disable-next-line
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const editMovie = async () => {
    try {
      await utils.updateItem(url, id, movie);
      alert("Updated")
    } catch (error) {
      alert("ERROR!")
    }
  }

  const navigatePage = () => {
    navigate("/main/movies")
  }

  return (
    <div className='add-edit-page'>
      <h2 className='form-header-title'> Edit Movie</h2>
      <label className='forms-info'> Name:</label>
      <input type="text" name="name" className='input' autoComplete='off' value={movie.name} onChange={handleChange} /> <br />
      <label className='forms-info'>Premiered:</label>
      <input type="date" name="premiered" className='input' autoComplete='off' value={movie.premiered} onChange={handleChange} />
      <br />
      <label className='forms-info'> Genres: </label>
      <input type="text" name="genres" className='input' autoComplete='off' value={movie.genres} onChange={handleChange} /> <br />
      <label className='forms-info'>Image url: </label>
      <input type="text" name="image" className='input' autoComplete='off' value={movie.image} onChange={handleChange} /><br />
      <br />
      <button className='btn-link' onClick={editMovie}>Save</button> &nbsp; <button className='btn-link' onClick={navigatePage}>Back</button>
    </div>
  )
}

export default EditMovie
import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react'
import utils from '../../Utils'
import Movie from './Movie'

const url = "http://localhost:2000/api/movies"

function MoviesMain() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: moviesData } = await utils.PrivateData(url)
        setMovies(moviesData)
      } catch (err) {
        console.error(err.message);
      }
    }
    // eslint-disable-next-line
    fetchData()
  }, [])

  const addMovie = () => {
    navigate("add")
  }

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    try {
      const filterResults = movies.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setMovies(filterResults)

    } catch (error) {
      console.log("ERROR");
    }

  }

  const moviesRep = movies?.map(movieId => {
    return <Movie key={movieId._id} Id={movieId._id} />
  })

  return (
    <div className='main-page'>
      <h2>Movies</h2>
      <br />
      <button className='btn-link' onClick={() => { window.location.reload() }}>All Movies</button> &nbsp; <button className='btn-link' onClick={addMovie}>Add Movie</button>
      <br />
      <br />
      <span> Find Movie :</span> <input type="text" value={searchTerm} onChange={handleFilter} />&nbsp; <button className='btn-link' onClick={handleSearch} >Find</button>
      <br />
      <br />
      {movies.length >= 0 && moviesRep}

      <Outlet />
    </div>
  )
}

export default MoviesMain
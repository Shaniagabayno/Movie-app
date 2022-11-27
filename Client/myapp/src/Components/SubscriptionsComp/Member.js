import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Utils from "../../Utils";

//All url's
const subsUrl = "http://localhost:2000/api/subs";
const movieUrl = "http://localhost:2000/api/movies";
const url = "http://localhost:2000/api/members";

function Member({ id }) {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [member, setMember] = useState([])
  const [newMovie, setNewMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    movieId: "",
    memberId: id,
    date: "",
  });
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: member } = await Utils.getDataById(url, id);
        const { data: subscriptionsData } = await Utils.PrivateData(subsUrl);
        const { data: movies } = await Utils.PrivateData(movieUrl);

        if (member !== null && subscriptionsData != null && movies !== null) {
          let arr = subscriptionsData.filter(x => x.memberId._id === id)
          setSubscriptions(arr)
          setMember(member)
          setNewMovie(movies)
          for (const subs of arr) {
            let unseenMovies = movies.filter(movie => movie._id !== subs.movieId._id)
            if (unseenMovies) {
              setNewMovie(unseenMovies)
            }
          }
        }
      } catch (error) {
        console.log("400 Bad Request");
      }
    }
    // eslint-disable-next-line
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMovie({ ...selectedMovie, [name]: value });
  }

  const newSubscription = async () => {
    try {
      if (id !== null) {
        await Utils.addItem(subsUrl, selectedMovie);
        window.location.reload()
      }
    } catch (error) {
      alert("ERROR");
    }
  }

  const deleteMember = async () => {
    try {
      //If the user isn't subscribed to a movie 
      await Utils.deleteItem(url, id)

      //Compare member Id and delete from subscriptions
      for (const subs of subscriptions) {
        if (id === subs.memberId._id) {
          await Utils.deleteItem(subsUrl, subs._id);
        }
      }
      window.location.reload()
    } catch (error) {
      console.log("400 Bad Request");
    }
  }

  const divHiddenShow = () => {
    if (!showDiv) {
      setShowDiv(true);
    } else {
      setShowDiv(false);
    }
  }

  const editMember = () => {
    navigate(`edit/${id}`);
  };

  //Movie Lists
  const movieListRep = subscriptions
    .filter((x) => x.memberId?._id === id)
    .map((element) => {
      return (
        <li key={element._id}>
          <Link className="navigation-link" to={"/main/movies"}>{element.movieId.name}</Link>  ,{element.date}
        </li>
      );
    })

  //Movie Options
  const selectRep = newMovie.map((movie) => {
    return (
      <option key={movie._id} value={movie._id}>
        {movie.name}
      </option>
    )
  })

  return (
    <div className='data-container'>
      <main>
        <div className="left_side">
          <h3 className='header-title'>{member.name}</h3>
          <br />
          <span>Email : {member.email}</span>
          <br />

          <span>City : {member.city}</span>
          <br />
          <button className='btn-link' onClick={editMember}>Edit </button>
          <button className='btn-link' onClick={deleteMember}>Delete </button>
        </div>

        <div className="right-side">
          <h3 className='header-title'>Movies Watched</h3>
          <br />
          <button className='btn-link' onClick={divHiddenShow}>Subscribe to new movie</button>
          <br />
          <br />
          {showDiv && (
            <div className="select-movie-con">
              <select name="movieId" onChange={handleChange}>
                <option>Choose Movie</option>
                {selectRep}
              </select>
              <input type="date" name="date" onChange={handleChange} />
              <button onClick={newSubscription}>Subscribe</button>
            </div>
          )}
          <ul>{movieListRep}</ul>
        </div>
      </main>
    </div>

  );
}

export default Member;

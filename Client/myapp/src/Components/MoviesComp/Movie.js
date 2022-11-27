import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Utils from '../../Utils'

const movieUrl = "http://localhost:2000/api/movies"
const subsUrl = "http://localhost:2000/api/subs"

const Movie = ({ Id }) => {
    const navigate = useNavigate()
    const [movie, setMovie] = useState({})
    const [subscriptions, setSubscriptions] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                //Get data
                const { data: movie } = await Utils.getDataById(movieUrl, Id)
                const { data: subscriptionsData } = await Utils.PrivateData(subsUrl)

                if (movie !== null && subscriptionsData !== null) {
                    let arr = subscriptionsData.filter(x => x.movieId._id === Id)
                    setSubscriptions(arr)
                    setMovie(movie)
                }

            } catch (error) {
                console.log("400 Bad Request");
            }
        }
        fetchData()
        // eslint-disable-next-line 
    }, [])

    const deleteMovie = async () => {
        try {
            //If no one subscribed to the movie 
            await Utils.deleteItem(movieUrl, Id)
            //Compare movie Id and delete from subscriptions
            for (const subs of subscriptions) {
                if (Id === subs.movieId._id) {
                    await Utils.deleteItem(subsUrl, subs._id)
                }
            }
            window.location.reload()
        } catch (error) {
            console.log("400 Bad Request");
        }
    }

    const navigatePage = () => {
        navigate(`edit/${Id}`)
    }

    const membersRep = subscriptions.map(element => {
        return <li key={element._id}><Link className="navigation-link" to={"/main/subscriptions"}>{element.memberId?.name}</Link> ,{element.memberId?.dateBirth}</li>
    })

    return (
        <div className='data-container'>
            <h3 className='header-title'> {movie.name}</h3>
            <br />
            <span>Premiered Date: {movie.premiered}</span>
            <br />
            <span> Genres: {movie.genres}</span>
            <br />
            <br />
            <div className='movie-img-subs-container'>
                <img src={movie.image} className="MovieImg" alt='Movie' />
                <div className='subscribed--users-container'>
                    <h3>Subscriptions Watched</h3>
                    <br />
                    <ul>
                        {membersRep}
                    </ul>
                </div>
            </div>

            <br />
            <button className='btn-link' onClick={navigatePage} >Edit</button>
            <button className='btn-link' onClick={deleteMovie}>Delete </button>
            <br />
        </div>

    )
}

export default Movie
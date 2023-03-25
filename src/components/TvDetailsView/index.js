import {useState, useEffect} from 'react'
import axios from 'axios'
import {format} from 'date-fns'

import Header from '../Header'

import Footer from '../Footer'

import './index.css'

const TvDetailsView = props => {
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    const {match} = props
    const {params} = match
    const {id} = params
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=18b6fceaf2cb0f1add340846bd287e73&language=en-US`,
      )
      .then(response => {
        const updatedData = {
          id: response.data.id,
          poster: response.data.poster_path,
          name: response.data.name,
          backdrop: response.data.backdrop_path,
          tagline: response.data.tagline,
          description: response.data.overview,
          runtime: response.data.episode_run_time[0],
          genre: response.data.genres[0].name,
          creator: response.data.created_by[0],
          date: response.data.first_air_date,
        }

        setSelectedMovie(updatedData)
      })
      .catch(error => {
        console.log(error)
      })
  }, [props])

  const renderMovieDetails = () => {
    if (!selectedMovie) return null

    console.log(selectedMovie)
    const year = format(new Date(selectedMovie.date), 'yyyy')

    return (
      <div style={{backgroundColor: 'black', height: '100%'}}>
        <Header />

        <div
          className="container"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop})`,
            backgroundSize: 'cover',
            color: 'white',
            padding: '20px',
            height: '60vh',
          }}
        >
          <div style={{display: 'flex'}}>
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${selectedMovie.poster}`}
              alt="poster"
              className="poster"
            />

            <div className="content-box">
              <div>
                <h1 className="titles">Title</h1>
                <h1 className="heading">
                  {selectedMovie.name} ({year})
                </h1>
              </div>

              <div>
                <h1 className="titles">Genre</h1>
                <p className="para">{selectedMovie.genre}</p>
              </div>

              <div>
                <h1 className="titles">Runtime</h1>
                <p className="runtime">{selectedMovie.runtime}m</p>
              </div>

              <div>
                <p className="para tagline">{selectedMovie.tagline}</p>
              </div>
              <div className="overview">
                <h1 className="titles ">Description</h1>
                <p className="description overflow">
                  {selectedMovie.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return <div>{renderMovieDetails()}</div>
}

export default TvDetailsView

import {Link} from 'react-router-dom'

import './index.css'

const posterUrl = posterPath =>
  `https://www.themoviedb.org/t/p/w220_and_h330_face/${posterPath}`

const MovieDetailsLink = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails
  return (
    <Link to={`/tv/${id}`}>
      <li>
        <img className="popular-img" alt={title} src={posterUrl(posterPath)} />
      </li>
    </Link>
  )
}

export default MovieDetailsLink

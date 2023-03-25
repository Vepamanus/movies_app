import {Link} from 'react-router-dom'

import './index.css'

const MovieDetailsLink = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails
  return (
    <Link to={`/movies/${id}`}>
      <li>
        <img className="popular-img" alt={title} src={posterPath} />
      </li>
    </Link>
  )
}

export default MovieDetailsLink

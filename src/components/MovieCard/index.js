import {Link} from "react-router-dom"
import "./index.css"

const MovieCard = (props) =>{

    const {movieDetails} = props
    console.log(movieDetails)
    const baseDomain = "https://image.tmdb.org/t/p/w500"

  return(
   <Link className="link-el" to={`/movie/:${movieDetails.id}`}> 
      <li className="popular-movie-card">
          <img src={`${baseDomain}${movieDetails.poster_path}`} alt={movieDetails.title} className="popular-movie-image"/>
          <h1 className="popular-movie-name">{movieDetails.title}</h1>
          <p className="popular-movie-rating">Rating : {movieDetails.vote_average}</p>
      </li>
    </Link> 
  )

}

export default MovieCard
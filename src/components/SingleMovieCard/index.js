import {react} from "react"
import "./index.css"


const SingleMovieCard = (props) =>{

    const {castDetails} =props
    const {name, character, known_for_department, profile_path} = castDetails
    const baseDomain = "https://image.tmdb.org/t/p/w500"

  return (
    <li className="cast-details-con">
        <img className="cast-image" alt={`${name}`} src={`${baseDomain}${profile_path}`}/>
          <span>{name}</span>
            <span>{character}</span>
          <span>{known_for_department}</span>
    </li>
  )

}

export default SingleMovieCard
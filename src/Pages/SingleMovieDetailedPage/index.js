import {react, useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import Navbar from '../../components/Navbar/navbar'
import SingleMovieCard from '../../components/SingleMovieCard'
// import ColorRing from 'react-loader-spinner'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}


const SingleMovieDetailedPage = () => {

    const {id} = useParams()
    const [movie, setmovie] = useState({})
    const [Cast, setCast] = useState({})
    const [presentMovieApiStatus, setPresentMovieApiStatus] = useState(apiStatus.initial)
    const [presentCastApiStatus, setPresentCastApiStatus] = useState(apiStatus.initial)
    const baseDomain = "https://image.tmdb.org/t/p/w500"

    console.log(movie)
    console.log(Cast.cast)

    useEffect(()=>{
        getmovie()
        getcast()
    }, [])

  const getmovie = async () => {

    setPresentMovieApiStatus(apiStatus.inProgress)

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id.slice(1, id.length)}?api_key=d266bcef45e2dfeef4079859d0d386e6&language=en-US`
    )
    // console.log(response)
    const data = await response.json()
    // console.log(data)

    if (response.ok === true) {
        setPresentMovieApiStatus(apiStatus.success)
        setmovie({...movie, ...data})
    } else {
      setPresentMovieApiStatus(apiStatus.failure)
    }
  }

  const getcast = async () => {

    setPresentCastApiStatus(apiStatus.inProgress)

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id.slice(1, id.length)}/credits?api_key=d266bcef45e2dfeef4079859d0d386e6&language=en-US`
    )
    // console.log(response)
    const data = await response.json()
    // console.log(data)

    if (response.ok === true) {
      setPresentCastApiStatus(apiStatus.success)
        setCast({...Cast, ...data})
    } else {
      setPresentCastApiStatus(apiStatus.failure)
    }
  }

  const getSearchedMovie = async (movie_name) => {

    setPresentCastApiStatus(apiStatus.inProgress)

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api\_key=d266bcef45e2dfeef4079859d0d386e6&language=en-US&query=${movie_name}&page=1`
    )
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      setPresentCastApiStatus(apiStatus.success)
        setmovie(data)
    } else {
      setPresentCastApiStatus(apiStatus.failure)
        console.log(response.error)
    }
  }

  const onSuccessMovie = () => {

     return (
      <div style={{
        backgroundImage: `url(${baseDomain}${movie.backdrop_path})`,
        backgroundSize: "cover",
        height: "320px",
        width: "90%",
        margin: "10px auto 0px auto",
        padding: "10px"
      }}>
      <div style={{display: 'flex'}}>
        <img className='single-page-image' alt={movie.title} src={`${baseDomain}${movie.poster_path}`}/>
          <div className='single-page-intro'>
            <h1>{movie.title}</h1>
              <p style={{color: 'darkblue'}}>Rating : {movie.vote_average}</p>
              <p>{movie.original_title}</p>
              <p>Release Date {movie.release_date}</p>
            </div>
          </div>
            <h1 style={{fontSize: "16px", color: "white"}}>Overview</h1>
            <p style={{fontSize: "13px", color: "white"}}>{movie.overview}</p>
      </div>
      )
  }

  const onSuccessCast = () =>{

    return(
    <ul className="cast-con">
        {Cast.cast.map(eachItem => (
          <SingleMovieCard castDetails={eachItem} key={eachItem.id} />
        ))}
    </ul>
    )

  }

  const onTryAgain = () => {
    getmovie()
  }

  const onFailure = () => (
    <div className="failure-con">
      <img
        className="failure-image"
        src="https://res.cloudinary.com/djbsa7llg/image/upload/v1676701111/Group_7522_wtgzdz.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="failure-btn" onClick={onTryAgain}>
        Try Again
      </button>
    </div>
  )

  const renderingMovieComponent = () => {
    switch (presentMovieApiStatus) {
      case apiStatus.success:
        return onSuccessMovie()
      // case apiStatus.inProgress:
      //   return this.onLoading()
      case apiStatus.failure:
        return onFailure()
      default:
        return null
    }
  }

  const renderingCastComponent = () => {
    switch (presentCastApiStatus) {
      case apiStatus.success:
        return onSuccessCast()
      // case apiStatus.inProgress:
      //   return this.onLoading()
      case apiStatus.failure:
        return onFailure()
      default:
        return null
    }
  }

  
  
    return (
        <>
          <Navbar getSearchedMovie={getSearchedMovie}/>
            <div className='movie-page-con'>
            <div className='single-page-container'>
              {renderingMovieComponent()}
           <h1 style={{fontSize: "16px", color: "white"}}>Cast</h1>
           {renderingCastComponent()}
         </div>
    </div>
  </>
    )
}

export default SingleMovieDetailedPage

import {react, useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/navbar'
import MovieCard from '../../components/MovieCard'
// import Loader from 'react-loader-spinner'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}



const TopRatedMoviePage = () => {

    const [movieList, setMovieList] = useState([])
    const [presentApiStatus, setPresentApiStatus] = useState(apiStatus.initial)
    const [movie, setMovie] = useState([])

    useEffect(()=>{
        getMovieList()
    }, [])

 
  const getMovieList = async () => {

    setPresentApiStatus(apiStatus.inProgress)

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=d266bcef45e2dfeef4079859d0d386e6&language=en-US&page=1`
    )
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
        setPresentApiStatus(apiStatus.success)
        setMovieList(data.results)
    } else {
        setPresentApiStatus(apiStatus.failure)
    }
  }

  const getSearchedMovie = async (movie_name) => {

    setPresentApiStatus(apiStatus.inProgress)

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api\_key=d266bcef45e2dfeef4079859d0d386e6&language=en-US&query=${movie_name}&page=1`
    )
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
        setPresentApiStatus(apiStatus.success)
        setMovieList(data.results)
    } else {
        setPresentApiStatus(apiStatus.failure)
        console.log(response.error)
    }
  }

  const onSuccess = () => (
      <ul className='movie-container'>
         {movieList.map((eachMovie)=>(
          <MovieCard movieDetails={eachMovie} key={eachMovie.id}/>
         ))}
      </ul>
  )

  const onTryAgain = () => {
    getMovieList()
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


const renderingComponent = () => {
  switch (presentApiStatus) {
    case apiStatus.success:
      return onSuccess()
    
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
                {renderingComponent()}
            </div>
      </>
    )
}

export default TopRatedMoviePage

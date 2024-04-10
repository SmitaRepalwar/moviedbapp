import {react} from "react"
import {BrowserRouter, Routes, Route, useParams} from "react-router-dom"
import PopularMoviePage from "./Pages/PopularMoviePage"
import TopRatedMoviePage from './Pages/TopRatedMoviePage';
import UpcomingMoviePage from "./Pages/UpcomingMoviePage";
import SingleMovieDetailedPage from "./Pages/SingleMovieDetailedPage";
import './App.css';

function App() {
  const {id} = useParams();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PopularMoviePage />} />
        <Route path="top_rated/" element={<TopRatedMoviePage />} />
        <Route path="upcoming" element={<UpcomingMoviePage/>}/>
        <Route path="movie/:id" element={<SingleMovieDetailedPage/>}/>
      </Routes>
  </BrowserRouter>
  );
}

export default App;

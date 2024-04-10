import {react, useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import "./navbar.css"

const moviePages = ["popular", "Top Rated", "Upcoming"]
const navLinks = ['/', '/top_rated', '/upcoming']

const Navbar = ( props )=>{
    let navigate = useNavigate()
    const {getSearchedMovie} = props
    const [searchInput, setSearchInput] = useState('')   

const onSearch = (event) =>{
    setSearchInput(event.target.value)
    console.log(event.target.value)
}    


const onButtonClick = () =>{
    getSearchedMovie(searchInput)
}




    return(
        <nav className="navbar navtextalignment">
            <div className="logocon">
               <h1 className="logotext">MovieDb</h1>
            </div>
              <div className="pagesandsearchbar">
                <ul className="pagescontainer">
                    {moviePages.map((eachPage, index)=>{
                        return (
                                <Link className="link-el" to={`${navLinks[index]}`}>
                                   <li className="navpages" key={index}>{eachPage}</li>
                                </Link>
                             )
                    })}
                </ul>
                    <div className="searchboxcon">
                        <input className="searchbox" type="search" onChange={onSearch} value={searchInput} placeholder="Movie Name"/>
                        <button onClick={onButtonClick} className="searchbutton">Search</button>
                    </div>
              </div>
        </nav>
    )
}

export default Navbar
import { useEffect, useRef, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import ReactLoading from "react-loading";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//you get the API key from the website
const API_URL = "http://www.omdbapi.com/?apikey=bdf8aff8";


const App = () => {
  //the current state value and a function to update the state
  const [movies, setMovies] = useState([]); //let movies = [];
  const [searchedTerm, setSearchedTerm] = useState([]);
  const [pageLoading, setPageLoading] = useState(true); //let pageLoading = true;

  //arrow function
  //The await keyword is used to pause the execution of the function until
  //the fetch request is resolved, which means the response from the API is received
  const searchMovies = async (title) => {
    // console.log(`${API_URL}&s=${title}`);
    const response = await fetch(`${API_URL}&s=${title}`); //query
    const data = await response.json();

    // console.log(data);
    setMovies(data.Search);

    setPageLoading(false);
  };

  //The useEffect takes a callback function and an optional array of dependencies
  //The callback function is executed after the component renders
  //Empty dependency array to run effect only once
  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      {/* <div className="app" ref={pdfRef}> */}
      <h1>MovieLand</h1>

      {pageLoading == true ? (
        <ReactLoading type="cylon" color="#fff" />
      ) : (
        <>
          {/* FRAGMENT `<> </>`
            The fragment element allows you to return multiple elements without adding any extra DOM node to the rendered output.
            It's particularly useful when you need to group elements together
            without introducing a new container element that may affect the CSS layout or styling.
          */}

          <div className="search">
            <input
              placeholder="Search for movies"
              value={searchedTerm}
              onChange={(event) => {
                // console.log(event.target.value);
                setSearchedTerm(event.target.value);
              }}
            />

            <img
              src={SearchIcon}
              alt="search"
              onClick={() => searchMovies(searchedTerm)}
            />
          </div>

          {movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <div>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

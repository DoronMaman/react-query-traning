import React from "react";
import { useAddMoviesData, useMovieData } from "../hooks/useMoviesData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card } from "./card";
import "../styles/RQMovies.css";

export const RQMovies = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [styleClass]=useState("blur_back_defualt defualt-movie");
  const [image]=useState("	http://localhost:3000/static/media/defualt-movie.fcb0857d63fd79ee4ac7.jpeg")

  const onSuccess = () => {
    console.log("Success");
  };
  const onError = () => {
    console.log("Error");
  };
  const { isLoading, data, isError, error } = useMovieData(onSuccess, onError);
  const { mutate: addMovie } = useAddMoviesData();

  const handleAddMoviesClick = () => {
 
    const movie = { name, date , styleClass,image};
    addMovie(movie);
  };
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="App">
      <div>
        
        <div className="div-add-movies">
          <div className="div-input ">
            <input
              className="style-input"
              type="text"
              value={name}
              placeholder="Movie Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="div-input ">
            <input
              className="style-input"
              type="text"
              value={date}
              placeholder="Movie Date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
         <div className="div-input ">
         <div className="div-button" onClick={handleAddMoviesClick}> 
         <div className="label-button" >
         Add Movies
         </div>
        </div>

         </div>
        </div>
        
        <Card movies={data} />
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
export const Movies = () =>{
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMovies, setLoadedMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

  
    useEffect(() => {
      setIsLoading(true);
      fetch("http://localhost:4000/movies")
        .then((response) => {
            if(response.status >= 400) {
                setErrorMessage(response.statusText);
                setIsLoading(false);            }
            response.json()})
        
        .then((data) => {
          const moviesData = [];
  
          for (const key in data) {
            const movieData = {
              id: key,
              ...data[key],
            };
  
            moviesData.push(movieData);
          }
  
          setIsLoading(false);
          setLoadedMovies(moviesData);
     
      
        }
    )
    }, []);
  
    if (isLoading) {
      return (
        <section>
          <p>Loading...</p>
        </section>
      );
    }
    if(errorMessage){
        return(
            <h2>{errorMessage}</h2>
        )
    }
    return <div>
        <h2>Movies Page</h2>
        {loadedMovies.map((movie)=>{
            return <div key={movie.id}>{movie.name}</div>
        })}
        </div>
}
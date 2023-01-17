import "../styles/card.css";
import { Link } from "react-router-dom";

export const Card = (props) => {
  console.log(props);
  return (
    <div>
      {props.movies.map((movie) => (
         <Link to={`/rq-movies/${movie.id}`}>

       
        <div key={movie.id} className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
              <img className="locandina" src={movie.image} />
              <>
                <h1>{movie.name}</h1>
                <h4>{movie.date}</h4>
              </>
            </div>
            <div className={movie.styleClass}></div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

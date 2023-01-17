import axios from "axios";
import { useQueries } from "react-query";

const fetchMovies = (movieId) => {
  return axios.get(`http://localhost:4000/movies/${movieId}`);
};
export const DynamicUsersMovies = ({ movieIds }) => {
  const moviesQuery = useQueries(
    movieIds.map((id) => {
      return {
        queryKey: ["movies", id],
        queryFn: () => fetchMovies(id),
      };
    })
  );
  console.log({ moviesQuery });
return <div>DynamicUsersMovies</div>;
};



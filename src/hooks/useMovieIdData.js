import { useQuery,useQueryClient } from 'react-query'
import axios from 'axios'

const fetchMovierMovie = ({ queryKey }) => {
  const movieId = queryKey[1]
  return axios.get(`http://localhost:4000/movies/${movieId}`)
}

export const useMovieIdData = movieId => {
  const queryClient = useQueryClient()
  return useQuery(['movieId', movieId], fetchMovierMovie,{
    initialData: () => {
        const movie = queryClient
          .getQueryData('movieId')
          ?.data?.find(movie => movie.id === parseInt(movieId))
        if (movie) {
          return { data: movie }
        } else {
          return undefined
        }
      }
  })
}

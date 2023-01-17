import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from '../utils/axios.utils'

const fetchUsers =  () => {
    // return axios.get("http://localhost:4000/movies")
    return request({ url: '/movies' })

   };
   const addMovies = movie => {
    return request({ url: '/movies' ,method:'post' , data:movie})

    // return axios.post('http://localhost:4000/movies', movie)
  }

export const useMovieData = (onSuccess, onError) => {
    return  useQuery("movies", fetchUsers,
    {
    onSuccess,
    onError,
    select:(data)=>{
      const movieName= data.data.map((movie)=>movie);
      return movieName;
    }
    }
    );
  }

    export const useAddMoviesData=()=>{
      const queryClient=useQueryClient()
      return useMutation(addMovies,{
        onMutate: async newMovie => {
          await queryClient.cancelQueries('movies')
          const previousMovieData = queryClient.getQueryData('movies')
          queryClient.setQueryData('movies', oldQueryData => {
            return {
              ...oldQueryData,
              data: [
                ...oldQueryData.data,
                { id: oldQueryData?.data?.length + 1, ...newMovie }
              ]
            }
          })
          return { previousMovieData }
        },
        onError: (_err, _newTodo, context) => {
          queryClient.setQueryData('movies', context.previousMovieData)
        },
        onSettled: () => {
          queryClient.invalidateQueries('movies')
        }
      })
    }

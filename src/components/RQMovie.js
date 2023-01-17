import { useParams } from 'react-router-dom'
import{useMovieIdData} from '../hooks/useMovieIdData'

export const RQSMovie = () => {
  const { movieId } = useParams()
  const { isLoading, data, isError, error } = useMovieIdData(movieId)
  console.log(data);

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <div key={data.data.id} className="movie_card" id="bright">
    <div className="info_section">
      <div className="movie_header">
        <img className="locandina" src={data.data.image} />
        <>
          <h1>{data.data.name}</h1>
          <h4>{data.data.date}</h4>
        </>
      </div>
      <div className={data.data.styleClass}></div>
    </div>
  </div>
  )
}
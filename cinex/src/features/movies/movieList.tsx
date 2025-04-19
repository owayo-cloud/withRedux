import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchMovies } from './moviesSlice'

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch()
interface MoviesState {
  movies: Array<{
    id: string
    title: string
    description: string
    posterUrl: string
  }>
  loading: boolean
  error: string | null
}

const { movies, loading, error } = useAppSelector((state: { movies: MoviesState }) => state.movies)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  if (loading) return <p>Loading movies...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div style={{ padding: '20px' }}>
      <h2>🎬 Movie List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {movies.map((movie: { id: string; title: string; description: string; posterUrl: string }) => (
          <div key={movie.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={movie.posterUrl} alt={movie.title} style={{ width: '100%' }} />
            <h4>{movie.title}</h4>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieList

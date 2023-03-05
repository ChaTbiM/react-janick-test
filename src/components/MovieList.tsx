import { Movie as MovieType } from '~/types/Movie'

import Movie from './Movie'

interface MovieListProps {
  movies: MovieType[]
}

const MovieList: React.FC<MovieListProps> = ({ movies }) =>
  movies?.length > 0 ? (
    <div className="mx-auto flex max-w-4xl flex-wrap place-content-center gap-10">
      {movies.map((movie) => (
        <Movie
          key={`movie-${movie.id}-${movie.title}`}
          title={movie.title}
          category={movie.category}
          poster={movie.poster}
        />
      ))}
    </div>
  ) : (
    <p>There is no ovie available now , we ll upload some soon.</p>
  )

export default MovieList

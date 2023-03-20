import { GetServerSideProps, NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { fetchAllMovies } from '~/modules/movies/api/requests'
import MovieList from '~/modules/movies/components/MovieList'

const Home: NextPage = () => (
  <div className="container m-auto my-10">
    <MovieList />
  </div>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('movies', fetchAllMovies)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default Home

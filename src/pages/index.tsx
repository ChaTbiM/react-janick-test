import { GetServerSideProps, NextPage } from 'next'

import { Movie as MovieType } from '~/types/Movie'

import MovieList from '~/components/MovieList'

interface HomeProps {
  data: MovieType[]
}

/* Replace with your design */
const Home: NextPage<HomeProps> = ({ data }) => (
  <div className="container m-auto">
    <MovieList movies={data} />
  </div>
)

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch(`https://backend.com/movies`)
  const data = await res.json()
  return { props: { data } }
}

export default Home

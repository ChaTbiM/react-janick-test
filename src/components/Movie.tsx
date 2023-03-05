import Image from 'next/image'

import { MovieCategory } from '~/types/Movie'

interface MovieProps {
  title: string
  category: MovieCategory
  poster: string
}
const Movie: React.FC<MovieProps> = ({ title, category, poster }) => (
  <div className=" relative inline-block h-80 w-60 bg-gradient-to-b from-green-700">
    <Image
      src={poster}
      className="h-full w-full"
      alt={`poster for the '${title}' movie`}
      layout="fill"
      objectFit="cover"
    />
    <div className="absolute inset-x-0 top-0 bottom-3/4 bg-gradient-to-b from-slate-700" />
    <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-slate-800 px-2 pt-20 pb-8  text-center text-white">
      <h4 className="font-bold capitalize">{title}</h4>
      <p className="font-medium">{category}</p>
    </div>
  </div>
)

export default Movie

export enum MovieCategory {
  Animation = 'Animation',
  Comedy = 'Comedy',
  Drama = 'Drama',
  Thriller = 'Thriller',
}

export interface Movie {
  id: number
  title: string
  category: MovieCategory
  poster: string
  likes: number
  dislikes: number
  isLikedByUser: boolean
  isDislikedByUser: boolean
}

export enum InteractionType {
  Like = 'Like',
  Dislike = 'Dislike',
}

export type CategoryFilterType = {
  [key in MovieCategory]: boolean
}

export type FiltersType = {
  categoryFiltersList: CategoryFilterType
  searchValue: string
}

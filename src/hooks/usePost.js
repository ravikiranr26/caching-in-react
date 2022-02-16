import axios from 'axios'
import { useQuery } from 'react-query'

import { queryCache } from '../index'

export const fetchPost = (postId) =>
  axios.get(`/api/posts/${postId}`).then((res) => res.data)

export const prefetchPost = postId => queryCache.prefetchQuery(['posts', String(postId)], () => fetchPost(postId))


export default function usePost(postId) {
  return useQuery(['posts', String(postId)], () => fetchPost(postId), 
    {
      initialData: () => queryCache.getQueryData(['posts'])?.find((d) => d.id == postId),
      initialStale: true
    }
  )
}

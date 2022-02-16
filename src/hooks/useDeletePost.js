import axios from 'axios'
import { useMutation } from 'react-query'
import { queryCache } from '../index'

export default function useDeletePost() {
 return useMutation((postId) => 
    axios.delete(`/api/posts/${postId}`).then((res) => res.data) , {
      /* onSuccess: () => {
        queryCache.invalidateQueries(['posts'])
      } */
      onSuccess:(data, postId) => {
        const previousPosts = queryCache.getQueryData('posts')
        const optimisticPosts = previousPosts.filter((d) => d.id !== postId)

        queryCache.setQueryData('posts', optimisticPosts)
        queryCache.invalidateQueries('posts')
      }
    }
  )
}

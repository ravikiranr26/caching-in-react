import axios from 'axios'
import { useMutation } from 'react-query'
import { queryCache } from '../index'

export default function useSavePost() {
  return useMutation((values) => 
    axios.patch(`/api/posts/${values.id}`, values) , {
      /* onSuccess: () => {
        queryCache.invalidateQueries(['posts'])
      } */
      onMutate: (values) => {
        queryCache.cancelQueries('posts')
        
        const oldPost = queryCache.getQueryData(['posts', values.id])

        queryCache.setQueryData(['posts', values.id], values)

        return () => queryCache.setQueryData(['posts', values.id], oldPost)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: (data, variables) => {
        queryCache.invalidateQueries(['posts'])
        queryCache.invalidateQueries(['posts', variables.id])
      }
    }
  )
}

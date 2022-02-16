import axios from 'axios'
import { useQuery } from 'react-query'

const fetchPosts = () => axios.get('/api/posts').then((res) => res.data)

export default function usePosts() {
  return useQuery(['posts'], fetchPosts)
}

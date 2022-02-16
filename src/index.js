import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { hydrate, dehydrate } from 'react-query/hydration'

import { Wrapper, Main } from './components/styled'
import Sidebar from './components/Sidebar'
import GlobalLoader from './components/GlobalLoader'

import Admin from './screens/admin'
import AdminPost from './screens/admin/Post'
import Blog from './screens/blog'
import BlogPost from './screens/blog/Post'

export const queryCache = new QueryCache()

function restoreCache(params) {
  if(typeof localStorage !== 'undefined') {
    let cache = localStorage.getItem('queryCache')
    if(cache) {
      hydrate(queryCache, JSON.parse(cache))
    }
    queryCache.subscribe((cache) => {
      localStorage.setItem('queryCache', JSON.stringify(dehydrate(cache)))
    })
  }
}

// restoreCache()

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof document === 'undefined' ? null : children}
    </div>
  )
}

export default function App() {
  return (
    <SafeHydrate>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <BrowserRouter>
          <Wrapper>
            <Sidebar />
            <Main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <h1>Welcome!</h1>
                    </>
                  }
                />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/:postId" element={<AdminPost />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<BlogPost />} />
              </Routes>
            </Main>
          </Wrapper>
          <GlobalLoader />
        </BrowserRouter>
      </ReactQueryCacheProvider>
    </SafeHydrate>
  )
}

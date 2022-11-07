import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [fetcing, setFetcing] = useState(true)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        if (fetcing) {
            axios
                .get(`https://jsonplaceholder.typicode.com/posts?_limit=20&_page=${currentPage}`)
                .then((response) => {
                    setPosts([...posts, ...response.data])
                    setCurrentPage((prevState) => prevState + 1)
                    setTotalCount(response.headers[['x-total-count']])
                })
                .finally(() => setFetcing(false))
        }
    }, [fetcing])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
                100 &&
            posts.length === totalCount
        ) {
            setFetcing(true)
        }
    }

    return (
        <div className="app">
            {posts.map((posts) => (
                <div className="posts" key={posts.id}>
                    <div className="posts__title">
                        {posts.id}. {posts.title}
                    </div>
                    <div className="posts__body">{posts.body}</div>
                </div>
            ))}
        </div>
    )
}

export default App

import fetch from 'node-fetch'
import { baseUrl, params } from '../constants'
import { SpecificJokeResponse, Child } from './jokeUtils.types'

interface Joke {
    question: string
    answer: string
}

const fetchJokePosts = async (query?: string): Promise<SpecificJokeResponse | null> => {
    // get joke posts about a specific topic
    let response
    if (query) {
        response = await fetch(`${baseUrl}/search.json?q=${query}&restrict_sr=on&sort=top&${params}`)
    }
    // get general joke posts
    response = await fetch(`${baseUrl}/top/.json?${params}`)
    return await response.json()
}

const normaliseJokes = (posts: readonly Child[]): Joke[] =>
    posts.map(({ data }) => ({ question: data.title, answer: data.selftext }))

const randomNumber = (max: number): number => Math.floor(Math.random() * max)

export const getJoke = async (query?: string): Promise<Joke | null> => {
    const response = await fetchJokePosts(query)
    if (response?.data.children && response.data.children.length > 1) {
        const jokes = normaliseJokes(response.data.children)
        // return a random joke from selection
        return jokes[randomNumber(jokes.length)]
    }
    return null
}

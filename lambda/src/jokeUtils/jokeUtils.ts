import fetch from 'node-fetch'
import { baseUrl, params, regExp } from '../constants'
import { SpecificJokeResponse, Child } from './jokeUtils.types'

interface Joke {
    question: string
    answer: string
}

const fetchJokePosts = async (query?: string): Promise<SpecificJokeResponse | null> => {
    // get joke posts about a specific topic
    if (query) {
        const response = await fetch(`${baseUrl}/search.json?q=${query}&restrict_sr=on&sort=top&${params}`)
        return await response.json()
    }
    // get general joke posts
    const response = await fetch(`${baseUrl}/top/.json?${params}`)
    return await response.json()
}

const normaliseJokes = (posts: readonly Child[]): Joke[] | [] =>
    posts
        // remove nsfw posts and those that aren't jokes
        .filter(({ data }) => data.over_18 === false && !data.title.match(regExp) && !data.selftext.match(regExp))
        .map(({ data }) => {
            return { question: data.title, answer: data.selftext }
        })

const randomNumber = (max: number): number => Math.floor(Math.random() * max)

export const getJoke = async (query?: string): Promise<Joke | null> => {
    const response = await fetchJokePosts(query)
    if (response?.data.children && response.data.children.length > 1) {
        const jokes = normaliseJokes(response.data.children)
        // return a random joke from selection
        return Boolean(jokes.length >= 1) ? jokes[randomNumber(jokes.length)] : null
    }
    return null
}

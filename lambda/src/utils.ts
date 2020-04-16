import fetch from 'node-fetch'

import { baseUrl } from './constants'

export const getJoke = async (query: string) => {
    await fetch(`${baseUrl}/search.json?q=${query}&restrict_sr=on&sort=top&t=all`)
        .then((res) => res.json())
        .then((body) => console.log('>>>>>>>>>> RESPONSE', body))
}

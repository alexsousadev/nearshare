type Env = {
    connection_url: string
}

const env: Env = {
    connection_url: import.meta.env.VITE_CONNECTION_URL
}

if (!Object.values(env).every((value) => value)) {
    throw new Error('Missing environment variables')
}

export default env
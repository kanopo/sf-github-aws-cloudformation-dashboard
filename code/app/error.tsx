'use client'

import React, { FC } from 'react'

interface Props {
    error: Error,
    reset: () => void
}
const error: FC<Props> = ({ error, reset }) => {
    return (
        <div>
            <h1>Error loading the dashboard</h1>
            <p>{error.message}</p>
            <button onClick={reset}>Try again</button>
        </div>
    )
}

export default error
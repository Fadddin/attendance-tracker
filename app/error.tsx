'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Blockquote } from "flowbite-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='m-4 flex justify-center items-center'>
            <div>


                <h2 className='text-3xl font-extrabold my-4 text-center'>SORRY!</h2>

                <Blockquote>
                    <svg
                        className="mb-4 h-8 w-8 text-gray-400 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 14"
                    >
                        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                    </svg>
                    <div className='text-gray-400'>
                        EITHER YOU ARE NOT COOL ENOUGH TO VISIT THIS PAGE OR IT DOESN'T EXIST.....
                        <p className='text-green-500'>LIKE YOUR SOCIAL LIFE</p>
                    </div>
                </Blockquote>

                {/* <div>{error.message}</div> */}
                <div className='flex justify-center'>
                    <button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                        className='px-4 py-2 mt-8 mb-4 rounded bg-blue-500'
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    )
}
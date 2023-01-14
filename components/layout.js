import Head from 'next/head'
import Image from 'next/image'

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Head>
                <title>Hacker News Latest Stories App</title>
                <link rel="icon" href="/HackerNewsApp/hn-app/public/favicon.ico" />
            </Head>

            <main className="flex w-full flex-1 flex-col items-center justify-center px-40 text-center">
                {children}
            </main>

        </div>

    )
}
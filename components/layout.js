import Head from 'next/head'

export default function Layout({children}) {
    const date = new Date()
    return (
        <div>
            <Head>
                <title>Hacker News Latest Stories App</title>
            </Head>

            <main className="flex w-full flex-1 flex-col items-center justify-center px-40 text-center">
                {children}
            </main>

            <footer className="flex w-full flex-1 flex-col items-center justify-center px-40 text-center">
                <p className="text-sm text-gray-500"> Created by Sai Poojith for Codento, {date.getFullYear()}</p>
            </footer>
        </div>
    )
}
import {getLatestStories} from "../lib/api";


function HomePage({stories}) {
    return (
        <div>
            <h1 className="py-4 text-5xl font-bold">
                <a className="text-blue-600" href="https://news.ycombinator.com/news">
                    Hacker News Latest Stories
                </a>
            </h1>

            <div className="bg-gray-200 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
                <ul role="list" className=" px-4 rounded-lg border border-gray-400 divide-y divide-gray-400">
                    {stories.map((story) => (
                        <li key={story.id} className="py-4">
                            <div className="flex items-center space-x-4">
                                <div className="min-w-0 flex-1">
                                    <a href={`/stories/${story.id}`}
                                       className="truncate text-sm font-semibold text-gray-900">{story.title}</a>
                                    <p className="truncate text-sm text-blue-500">{story.url}</p>
                                </div>
                                <div>
                                    <a
                                        href={`/stories/${story.id}`}
                                        className="items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 bg-blue-200 text-gray-700 shadow-sm hover:bg-gray-50"
                                    >
                                        View
                                    </a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const stories = await getLatestStories();

    return {
        props: {
            stories,
        },
        revalidate: 10,
    };
}


export default HomePage
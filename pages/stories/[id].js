import {getAllComments, getItem, getLatestStoryIDs} from "../../lib/api";
import Link from "next/link"

const levelIndent = {
    0: "",
    1: "indent-4",
    2: "indent-8",
    3: "indent-12",
    4: "indent-16",
    5: "indent-20",
    6: "indent-24",
    7: "indent-28",
    8: "indent-32",
}

export default function Story({story, comments}) {
    return (
        <div>
            <div>
                <button
                    className="h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                    <Link href="/"> Back to Home </Link>
                </button>
            </div>
            <div>
                <h1 className="py-4 text-6xl font-bold">
                    {story.title}
                </h1>
                {
                    story.text && <div
                        className="container bg-gray-200  mx-auto px-4 sm:px-6 lg:px-8 rounded-lg border border-gray-400">
                        <br></br>
                        <p className="font-semibold">Content:</p>
                        <p> {story.text} </p>
                        {
                            story.url &&
                            <a className="py-4 text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
                               href={story.url}>
                                URL: {story.url}
                            </a>
                        }
                    </div>
                }

                <div
                    className="px-4 mt-6 mx-auto flex flex-wrap text-start items-center justify-center sm:px-6 lg:px-8 ">
                    <ul className="px-4 bg-white rounded-lg border border-gray-400 text-black-900">
                        <p className="font-semibold"> Comments: </p>
                        {comments.map(comment => (
                            <li key={comment.id}
                                className={`${levelIndent[comment.level]} py-2 border border-gray-200 w-full `}>
                                <div className="focus-within:ring-2 focus-within:ring-indigo-500 ">
                                    <h3 className="text-sm font-semibold text-gray-800">
                                        {comment.by}:
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-900 line-clamp-2">{comment.text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
}


export async function getStaticPaths() {
    const ids = await getLatestStoryIDs();

    return {
        paths: ids.map(id => ({params: {id: id.toString()}})),
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const story = await getItem(params.id);
    const comments = await getAllComments(0, story);

    return {
        props: {
            story,
            comments,
        },
        revalidate: 10,
    }
}
export function getItem(id) {
    let story = fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(res => res.json())

    return story
}

export function getLatestStoryIDs() {
    return fetch('https://hacker-news.firebaseio.com/v0/showstories.json')
        .then(res => res.json())
        .then(res => res.slice(0, 20))
}

export async function getLatestStories() {
    let ids = await getLatestStoryIDs()

    return Promise.all(ids.map(id => getItem(id)))
}

export async function getComments(story) {
    if (story.kids === undefined) {
        return []
    }
    return Promise.all(story.kids.map(id => getItem(id)))
}

export async function getAllComments(level, story) {
    let comments = await getComments(story)

    let arr = []
    for (let i = 0; i < comments.length; i++) {
        arr.push({
            level: level,
            ...comments[i],
        })
        if (comments[i].kids !== undefined) {
            arr = arr.concat(await getAllComments(level + 1, comments[i]))
        }
    }

    return arr
}
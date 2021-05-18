//import mongodb from "mongodb"
//const ObjectId = mongodb.ObjectID
let music

export default class musicDAO {
  static async injectDB(conn) {
    if (music) {
      return
    }
    try {
      music = await conn.db(process.env.MUSIC_NS).collection("music")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in MusicDAO: ${e}`,
      )
    }
  }

  static async getSongs({
    filters = null,
    page = 0,
    songsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } }
      } else if ("artist" in filters) {
        query = { "artist": { $eq: filters["artist"] } }
      } 
    }

    let cursor
    
    try {
      cursor = await music
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { songsList: [], totalNumSongs: 0 }
    }

    const displayCursor = cursor.limit(songsPerPage).skip(songsPerPage * page)

    try {
      const songsList = await displayCursor.toArray()
      const totalNumSongs = await music.countDocuments(query)

      return { songsList, totalNumSongs }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { songsList: [], totalNumSongs: 0 }
    }
  }

}

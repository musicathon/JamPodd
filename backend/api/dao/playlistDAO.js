import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let playlist

export default class PlaylistDAO {
  static async injectDB(conn) {
    if (playlist) {
      return
    }
    try {
      playlist = await conn.db(process.env.MUSIC_NS).collection("user_playlists")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }


  static async getPlaylist({
    filters = null,
    page = 0,
    playlistsPerPage = 15,
  } = {}) {
    let query
    if (filters) {
      if ("keyword" in filters) {
        query = { $text: { $search: filters["keyword"] } }
      } else if ("playlist_name" in filters) {
        query = { "playlist_name": { $eq: filters["playlist_name"] } }
      } 
    }

    let cursor
    
    try {
      cursor = await playlist.find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { playlistList: [], totalNumPlaylists: 0 }
    }

    const displayCursor = cursor.limit(playlistsPerPage).skip(playlistsPerPage * page)

    try {
      const playlistList = await displayCursor.toArray()
      const totalNumPlaylists = await playlist.countDocuments(query)

      return { playlistList, totalNumPlaylists }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { playlistList: [], totalNumPlaylists: 0 }
    }
  }

  static async addPlaylist(_id, userInfo, playlist_name) {
    try {
      const addedPlaylist = {
          user_id: userInfo._id,
          playlist_name: playlist_name,
          playlistId: ObjectId(_id), }

      return await playlist.insertOne(addedPlaylist)
    } catch (e) {
      console.error(`Unable to add playlist: ${e}`)
      return { error: e }
    }
  }

  static async updatePlaylist(playlistId, userId, title) {
    try {
      const updatedPlaylist = await playlist.updateOne(
        { user_id: userId, _id: ObjectId(playlistId)},
        { $set: { title: title} },
      )

      return updatedPlaylist
    } catch (e) {
      console.error(`Unable to edit playlist: ${e}`)
      return { error: e }
    }
  }

  static async deletePlaylist(playlistId, userId) {

    try {
      const deleteResponse = await playlist.deleteOne({
        _id: ObjectId(playlistId),
        user_id: userId,
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete playlist: ${e}`)
      return { error: e }
    }
  }

}
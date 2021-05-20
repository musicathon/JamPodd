import PlaylistDAO from "./dao/playlistDAO.js"

export default class PlaylistController {

  static async apiGetPlaylists(req, res, next) {
    const playlistsPerPage = req.query.playlistsPerPage ? parseInt(req.query.playlistsPerPage, 10) : 15
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.user_id) {
      filters.user_id = req.query.user_id
    }
    const { playlistsList, totalNumPlaylists } = await PlaylistDAO.getPlaylist({
      filters,
      page,
      playlistsPerPage,
    })

    let response = {
      playlists: playlistsList,
      page: page,
      entries_per_page: playlistsPerPage,
      total_results: totalNumPlaylists,
    }
    res.json(response)
  }

  static async apiAddPlaylist(req, res, next) {
    try {
      const playlistId = req.body.playlist_id
      const userInfo = req.body.user_id
      const playlist_name = req.body.text
      

      const displayPlaylist = await PlaylistDAO.addPlaylist(
        playlistId,
        userInfo,
        playlist_name,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiEditPlaylist(req, res, next) {
    try {
      const editId = req.body.edit_id
      const userInfo = req.body.user_id
      const playlist_name = req.body.playlist_name
     

      const editPlaylist = await PlaylistDAO.editPlaylist(
        editId,
        userInfo,
        playlist_name,
      )

      var { error } = editPlaylist
      if (error) {
        res.status(400).json({ error })
      }

      if (editPlaylist.modifiedCount === 0) {
        throw new Error(
          "unable to update playlist - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeletePlaylist(req, res, next) {
    try {
      const deleteId = req.query.id
      const userInfo = req.body.user_id
      console.log(deleteId)
      const deletePlaylist = await PlaylistDAO.deletePlaylist(
        deleteId,
        userInfo,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}

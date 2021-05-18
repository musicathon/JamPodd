import MusicDAO from "./dao/music_dataDAO.js"

export default class MusicController {
  static async apiGetSongs(req, res, next) {
    const songsPerPage = req.query.songsPerPage ? parseInt(req.query.songsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.title) {
      filters.title = req.query.title
    } else if (req.query.artist) {
      filters.artist = req.query.artist
    } 

    const { songsList, totalNumSongs } = await MusicDAO.getSongs({
      filters,
      page,
      songsPerPage,
    })

    let response = {
      songs: songsList,
      page: page,
      filters: filters,
      entries_per_page: songsPerPage,
      total_results: totalNumSongs,
    }
    res.json(response)
  }


}
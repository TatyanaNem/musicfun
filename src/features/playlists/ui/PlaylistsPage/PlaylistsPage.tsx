import { useDeletePlaylistMutation, useGetPlaylistsQuery, useUpdatePlaylistMutation } from "../../api/playlistsApi"
import type { PlaylistData } from "../../api/playlistsApi.types"
import { CreatePlaylistForm } from "./CreatePlaylistForm/CreatePlaylistForm"
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
  const { data } = useGetPlaylistsQuery()
  const [deletePlaylist] = useDeletePlaylistMutation()
  const [updatePlaylist] = useUpdatePlaylistMutation()
 
  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId)
    }
  }

  const updatePlaylistHandler = (playlistId: string) => {
    updatePlaylist({
      playlistId,
      body: {
        title: 'new title',
        description: 'new description',
        tagIds: []
      }
    })
  }
 
  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map((playlist: PlaylistData) => {
          return (
            <div className={s.item} key={playlist.id}>
              <div>title: {playlist.attributes.title}</div>
              <div>description: {playlist.attributes.description}</div>
              <div>userName: {playlist.attributes.user.name}</div>
              <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
              <button onClick={() => updatePlaylistHandler(playlist.id)}>update</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlistsApi.types";
import { PlaylistItem } from "../PlaylistItem/PlaylistItem";
import { UpdatePlaylistForm } from "../UpdatePlaylistForm/UpdatePlaylistForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDeletePlaylistMutation } from "@/features/playlists/api/playlistsApi";
import s from "./PlaylistsList.module.css";

type Props = {
  playlists: PlaylistData[];
  isPlaylistsLoading: boolean;
};

export const PlaylistsList = ({ playlists, isPlaylistsLoading }: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();
  const [deletePlaylist] = useDeletePlaylistMutation();

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id);
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((t) => t.id),
      });
    } else {
      setPlaylistId(null);
    }
  };

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm("Are you sure you want to delete the playlist?")) {
      deletePlaylist(playlistId);
    }
  };

  return (
    <div className={s.items}>
      {!playlists.length && !isPlaylistsLoading && <h2>Playlists not found</h2>}
      {playlists.map((playlist: PlaylistData) => {
        const isEditing = playlistId === playlist.id;

        return (
          <div className={s.item} key={playlist.id}>
            {isEditing ? (
              <UpdatePlaylistForm
                playlistId={playlist.id}
                setPlaylistId={setPlaylistId}
                editPlaylist={editPlaylistHandler}
                register={register}
                handleSubmit={handleSubmit}
              />
            ) : (
              <PlaylistItem
                playlist={playlist}
                deletePlaylist={deletePlaylistHandler}
                editPlaylist={editPlaylistHandler}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

import type { PlaylistData } from "@/features/playlists/api/playlistsApi.types";
import defaultCover from "@/assets/default-playlist-cover.png";
import s from "./PlaylistItem.module.css";
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from "@/features/playlists/api/playlistsApi";
import type { ChangeEvent } from "react";

type PlaylistItemProps = {
  playlist: PlaylistData;
  deletePlaylist: (playlistId: string) => void;
  editPlaylist: (playlist: PlaylistData) => void;
};

export const PlaylistItem = ({
  playlist,
  deletePlaylist,
  editPlaylist,
}: PlaylistItemProps) => {
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation();

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 1024 * 1024;

    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPEG, PNG or GIF images are allowed");
      return;
    }
    if (file.size > maxSize) {
      alert(
        `The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`
      );
      return;
    }

    uploadPlaylistCover({ playlistId: playlist.id, file });
  };

  const originalCover = playlist.attributes.images.main.find(
    (img) => img.type === "original"
  );
  const src = originalCover ? originalCover.url : defaultCover;

  const deleteCoverHandler = () => {
    deletePlaylistCover({ playlistId: playlist.id });
  };

  return (
    <div>
      <img src={src} alt="Playlist cover" className={s.cover} />
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        onChange={uploadCoverHandler}
      />
      {originalCover && (
        <button onClick={deleteCoverHandler}>delete cover</button>
      )}
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </div>
  );
};

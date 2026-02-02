import { useState, type ChangeEvent } from "react";
import {
  useDeletePlaylistMutation,
  useGetPlaylistsQuery,
} from "../../api/playlistsApi";
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from "../../api/playlistsApi.types";
import { CreatePlaylistForm } from "./CreatePlaylistForm/CreatePlaylistForm";
import s from "./PlaylistsPage.module.css";
import { useForm } from "react-hook-form";
import { PlaylistItem } from "./PlaylistItem/PlaylistItem";
import { UpdatePlaylistForm } from "./UpdatePlaylistForm/UpdatePlaylistForm";
import { useDebouncedValue } from "@/common/hooks/useDebouncedValue";
import { Pagination } from "@/common/components";

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();
  const debouncedValue = useDebouncedValue(search);

  const { data, isLoading } = useGetPlaylistsQuery({
    search: debouncedValue,
    pageNumber: currentPage,
    pageSize,
  });
  const [deletePlaylist] = useDeletePlaylistMutation();

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm("Are you sure you want to delete the playlist?")) {
      deletePlaylist(playlistId);
    }
  };

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

  const changePageSizeHandler = (pageSize: number) => {
    setPageSize(pageSize);
    setCurrentPage(1);
  };

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setCurrentPage(1);
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        placeholder={"Search playlist by title"}
        onChange={(e) => searchPlaylistHandler(e)}
      />

      <div className={s.items}>
        {!data?.data.length && !isLoading && <h2>Playlists not found</h2>}
        {data?.data.map((playlist: PlaylistData) => {
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
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  );
};

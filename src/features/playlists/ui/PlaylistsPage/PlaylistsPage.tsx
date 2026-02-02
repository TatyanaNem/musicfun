import { useState, type ChangeEvent } from "react";
import { useGetPlaylistsQuery } from "../../api/playlistsApi";
import { CreatePlaylistForm } from "./CreatePlaylistForm/CreatePlaylistForm";
import s from "./PlaylistsPage.module.css";
import { useDebouncedValue } from "@/common/hooks/useDebouncedValue";
import { Pagination } from "@/common/components";
import { PlaylistsList } from "./PlaylistsList/PlaylistsList";

export const PlaylistsPage = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const debouncedValue = useDebouncedValue(search);

  const { data, isLoading } = useGetPlaylistsQuery({
    search: debouncedValue,
    pageNumber: currentPage,
    pageSize,
  });

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
      <PlaylistsList
        playlists={data?.data || []}
        isPlaylistsLoading={isLoading}
      />
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

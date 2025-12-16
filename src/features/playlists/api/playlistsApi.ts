import type { Images } from "@/common/types";
import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from "./playlistsApi.types";
import { baseApi } from "@/app/api/baseApi";

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylists: builder.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: (params) => ({ url: `playlists`, params }),
      providesTags: ["Playlists"],
    }),
    createPlaylist: builder.mutation<
      { data: PlaylistData },
      CreatePlaylistArgs
    >({
      query: (body) => ({
        method: "POST",
        url: "/playlists",
        body,
      }),
      invalidatesTags: ["Playlists"],
    }),
    deletePlaylist: builder.mutation<void, string>({
      query: (playlistId: string) => ({
        method: "DELETE",
        url: `/playlists/${playlistId}`,
      }),
      invalidatesTags: ["Playlists"],
    }),
    updatePlaylist: builder.mutation<
      void,
      { playlistId: string; body: UpdatePlaylistArgs }
    >({
      query: ({ playlistId, body }) => ({
        method: "PUT",
        url: `/playlists/${playlistId}`,
        body,
      }),
      invalidatesTags: ["Playlists"],
    }),
    uploadPlaylistCover: builder.mutation<
      Images,
      { playlistId: string; file: File }
    >({
      query: ({ playlistId, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          method: "POST",
          url: `/playlists/${playlistId}/images/main`,
          body: formData,
        };
      },
      invalidatesTags: ["Playlists"],
    }),
    deletePlaylistCover: builder.mutation<void, { playlistId: string }>({
      query: ({ playlistId }) => ({
        method: "DELETE",
        url: `/playlists/${playlistId}/images/main`,
      }),
      invalidatesTags: ["Playlists"],
    }),
  }),
});

export const {
  useGetPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi;

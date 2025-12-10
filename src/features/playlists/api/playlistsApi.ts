import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from "./playlistsApi.types";
import { baseApi } from "@/app/api/baseApi";

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylists: builder.query<PlaylistsResponse, void>({
      query: () => "/playlists",
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
  }),
});

export const {
  useGetPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApi;

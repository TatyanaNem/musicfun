import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreatePlaylistArgs, PlaylistData, PlaylistsResponse } from "./playlistsApi.types";

export const playlistsApi = createApi({
    reducerPath: "playlistsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        },
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        },
    }),
    endpoints: (builder) => ({
        getPlaylists: builder.query<PlaylistsResponse, void>({
            query: () => '/playlists',
        }),
        createPlaylist: builder.mutation<{data: PlaylistData}, CreatePlaylistArgs>({
            query: (body) => ({
                method: 'POST',
                url: '/playlists',
                body
            }),
        }),
        deletePlaylist: builder.mutation<void, string>({
            query: (playlistId: string) => ({
                method: 'DELETE',
                url: `/playlists/${playlistId}`,
            }),
        }),
    })
});

export const { useGetPlaylistsQuery, useCreatePlaylistMutation, useDeletePlaylistMutation } = playlistsApi
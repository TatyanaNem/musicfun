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
    })
});

export const { useGetPlaylistsQuery, useCreatePlaylistMutation } = playlistsApi
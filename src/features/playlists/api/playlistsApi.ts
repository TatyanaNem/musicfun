import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchPlaylistsArgs, PlaylistsResponse } from "./playlistsApi.types";

export const playlistsApi = createApi({
    reducerPath: "playlistsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        }
    }),
    endpoints: (builder) => ({
        getPlaylists: builder.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: () => ({
                method: "GET",
                url: "/playlists",
            }),
        }),
    })
});
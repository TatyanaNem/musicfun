import { useUpdatePlaylistMutation } from "@/features/playlists/api/playlistsApi";
import type { UpdatePlaylistArgs } from "@/features/playlists/api/playlistsApi.types";
import type {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

type UpdatePlaylistFormProps = {
  playlistId: string;
  setPlaylistId: (playlistId: null) => void;
  editPlaylist: (playlist: null) => void;
  register: UseFormRegister<UpdatePlaylistArgs>;
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>;
};

export const UpdatePlaylistForm = ({
  playlistId,
  setPlaylistId,
  editPlaylist,
  register,
  handleSubmit,
}: UpdatePlaylistFormProps) => {
  const [updatePlaylist] = useUpdatePlaylistMutation();
  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (data) => {
    if (!playlistId) return;
    updatePlaylist({ playlistId, body: data }).then(() => {
      setPlaylistId(null);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register("title")} placeholder={"title"} />
      </div>
      <div>
        <input {...register("description")} placeholder={"description"} />
      </div>
      <button type={"submit"}>save</button>
      <button type={"button"} onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  );
};

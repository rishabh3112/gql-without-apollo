import { useCallback } from "react";
import { useDeleteAuthorMutation } from "../hooks/useDeleteAuthorMutation";
import { Author as AuthorType } from "../types";

export const Author = ({
  author,
  onDelete,
}: {
  author: AuthorType;
  onDelete?: () => void;
}): JSX.Element => {
  const { id, name, dateOfBirth } = author;
  const [deleteAuthor, { loading }] = useDeleteAuthorMutation({
    onSuccess: onDelete,
  });
  const handleDelete = useCallback(() => {
    deleteAuthor({ id });
  }, [id]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 p-2">
        <img
          src={`https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(name)}`}
          className="w-10"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          {dateOfBirth ? (
            <span className="text-slate-700	">
              Born on: {new Date(dateOfBirth).toUTCString()}
            </span>
          ) : null}
        </div>
      </div>
      <button
        type="submit"
        onClick={handleDelete}
        className="flex-none text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-gray-500 disabled:text-gray-700"
      >
        Delete
      </button>
    </div>
  );
};

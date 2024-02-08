import { useAuthor } from "./hooks/useAuthors";
import { Author } from "./components/Author";
import { useAddAuthorMutation } from "./hooks/useAddAuthorMutation";
import { useCallback, useState } from "react";

export const Authors = (): JSX.Element => {
  const { loading, data, refetch } = useAuthor();
  const [name, setName] = useState<string>("");
  const [addAuthor, { loading: adding }] = useAddAuthorMutation({
    onSuccess: refetch,
  });

  const handleAddAuthor = useCallback(() => {
    if (!name) return;
    addAuthor({ name, dateOfBirth: new Date().toISOString() });
  }, [name]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="animate-ping inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
        <button
          type="submit"
          disabled={!name}
          onClick={handleAddAuthor}
          className="flex-none text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-gray-500 disabled:text-gray-700"
        >
          Add Author
        </button>
      </div>
      <div className="divide-y divide-dotted overflow-auto-y">
        {data
          ? data.map((author) => (
              <Author key={author.id} author={author} onDelete={refetch} />
            ))
          : null}
      </div>
    </div>
  );
};

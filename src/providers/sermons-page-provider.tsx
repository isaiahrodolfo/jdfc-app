import { getSermons, Sermon } from "@/api/supabase/sermons/getSermons";
import { useAuthContext } from "@/hooks/use-auth-context";
import { SermonsPageContext } from "@/hooks/use-sermons-page-context";
import { PropsWithChildren, useEffect, useState } from "react";

export default function SermonsPageProvider({ children }: PropsWithChildren) {
  const { user } = useAuthContext();

  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Load sermons on initial mount
  useEffect(() => {
    if (!user) return;
    const loadSermons = async () => {
      try {
        setIsLoading(true);
        const result = await getSermons(pageNumber, 50, user.id);
        console.log(result);
        setSermons(result.data);
      } catch (error) {
        console.error("Failed to fetch sermons:", error);
        setError("Failed to fetch sermons");
      } finally {
        setIsLoading(false);
      }
    };

    loadSermons();
  }, [user]);

  // TODO: Change this to filter sermons on the backend, and show the first 50 items, for example
  const handleSearchQueryChange = (searchQuery: string) => {
    const filteredSermons = sermons.filter((sermon) =>
      sermon.title?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSermons(filteredSermons);
    setSearchQuery(searchQuery);
  };

  const handleChangePage = (pageNumber: number) => {
    // TODO
  };

  return (
    <SermonsPageContext.Provider
      value={{
        sermons,
        setSermons,
        isLoading,
        error,
        setError,
        pageNumber,
        setPageNumber,
        searchQuery,
        handleSearchQueryChange,
        handleChangePage,
      }}
    >
      {children}
    </SermonsPageContext.Provider>
  );
}

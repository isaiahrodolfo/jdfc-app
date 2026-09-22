import { UserSermon } from "@/api/supabase/sermons/getSermons";
import { createContext, useContext } from "react";

export type SermonsPage = {
  sermons: UserSermon[];
  setSermons: React.Dispatch<React.SetStateAction<UserSermon[]>>;
  isLoading: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
  handleSearchQueryChange: (searchQuery: string) => void;
  handleChangePage: (pageNumber: number) => void;
};

export const SermonsPageContext = createContext<SermonsPage>({
  sermons: [],
  setSermons: () => {},
  isLoading: false,
  error: "",
  setError: () => {},
  pageNumber: 1,
  setPageNumber: () => {},
  searchQuery: "",
  handleSearchQueryChange: () => {},
  handleChangePage: () => {},
});

export const useSermonsPageContext = () => useContext(SermonsPageContext);

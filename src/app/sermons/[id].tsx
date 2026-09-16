import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import DescriptionPage from "../../components/sermons/DescriptionsPage";
import NotesPage from "../../components/sermons/NotesPage";

type PageMode = "description" | "notes";

export default function SermonPage() {
  const [pageMode, setPageMode] = useState<PageMode>("description");
  const { id, title } = useLocalSearchParams();

  const handleTakeNotesPress = () => {
    setPageMode("notes");
  };

  if (pageMode === "description") {
    return (
      <DescriptionPage
        id={id.toString()}
        title={title.toString()}
        handleTakeNotesPress={handleTakeNotesPress}
      />
    );
  } else {
    return <NotesPage id={id.toString()} title={title.toString()} />;
  }
}

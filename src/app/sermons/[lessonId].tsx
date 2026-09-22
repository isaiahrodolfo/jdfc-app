import { toggleFavorited } from "@/api/supabase/lessons/toggleFavorited";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import DescriptionPage from "../../components/sermons/DescriptionPage";
import NotesPage from "../../components/sermons/NotesPage";

type PageMode = "description" | "notes";

export default function SermonPage() {
  const { user } = useAuthContext();

  const {
    lessonId,
    title,
    date,
    seriesId,
    isFavorited: isFavoritedInitial,
    slideshowLink,
    speakerName,
    isLive,
    youtubeLink,
  } = useLocalSearchParams();

  const [pageMode, setPageMode] = useState<PageMode>("description");
  const [isFavorited, setIsFavorited] = useState(
    isFavoritedInitial === "true" ? true : false,
  );

  const handleTakeNotesPress = () => {
    setPageMode("notes");
  };

  const handleToggleFavorited = async () => {
    try {
      toggleFavorited(user.id, Number(lessonId), !isFavorited);
      setIsFavorited((f) => !f);
    } catch {
      console.error("Error toggling favorite for sermon");
    }
  };

  if (pageMode === "description") {
    return (
      <DescriptionPage
        lessonId={lessonId.toString()}
        title={title.toString()}
        date={date.toString()}
        isFavorited={isFavorited ? true : false}
        speakerName={speakerName.toString()}
        slideshowLink={slideshowLink.toString()}
        youtubeLink={youtubeLink ? youtubeLink.toString() : ""}
        handleTakeNotesPress={handleTakeNotesPress}
        handleToggleFavorited={handleToggleFavorited}
      />
    );
  } else {
    return (
      <NotesPage lessonId={lessonId.toString()} title={title.toString()} />
    );
  }
}

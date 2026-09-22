import { toggleFavorited } from "@/api/supabase/lessons/toggleFavorited";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useSermonsPageContext } from "@/hooks/use-sermons-page-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import DescriptionPage from "../../components/sermons/DescriptionPage";
import NotesPage from "../../components/sermons/NotesPage";

type PageMode = "description" | "notes";

export default function SermonPage() {
  const { user } = useAuthContext();
  const { setSermons } = useSermonsPageContext();

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
    const newIsFavorited = !isFavorited;

    try {
      await toggleFavorited(user.id, Number(lessonId), newIsFavorited);
      setIsFavorited(newIsFavorited);
      setSermons((currentSermons) =>
        currentSermons.map((sermon) =>
          sermon.lessonId === Number(lessonId)
            ? { ...sermon, isFavorited: newIsFavorited }
            : sermon,
        ),
      );
    } catch (error) {
      console.log("Failed to toggle favorite", error);
    }
  };

  if (pageMode === "description") {
    return (
      <View>
        <Stack.Screen
          options={{
            title: title?.toString() || "Sermon",
          }}
        />
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
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            title: title?.toString() || "Sermon",
          }}
        />
        <NotesPage lessonId={lessonId.toString()} title={title.toString()} />
      </View>
    );
  }
}

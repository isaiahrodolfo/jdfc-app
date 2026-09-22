import { Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";

type DescriptionPageProps = {
  lessonId: string;
  title: string;
  date: string;
  isFavorited: boolean;
  speakerName: string;
  slideshowLink: string;
  youtubeLink: string;
  handleTakeNotesPress: () => void;
  handleToggleFavorited: () => void;
};

export default function DescriptionPage({
  lessonId,
  title,
  date,
  isFavorited,
  speakerName,
  slideshowLink,
  youtubeLink,
  handleTakeNotesPress,
  handleToggleFavorited,
}: DescriptionPageProps) {
  return (
    <View>
      <Stack.Screen
        options={{
          title: title.toString() || "Default Title",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Text>Sermon Page</Text>
      <Text>Lesson ID: {lessonId}</Text>
      <Text>Date: {date}</Text>
      <Pressable onPress={handleToggleFavorited}>
        <Text>Favorite?: {isFavorited ? "true" : "false"}</Text>
      </Pressable>
      <Text>Speaker Name: {speakerName}</Text>
      <Text>Slideshow Link: {slideshowLink}</Text>
      <Text>YouTube Link: {youtubeLink}</Text>
      <Pressable onPress={handleTakeNotesPress}>
        <Text>Take Notes</Text>
      </Pressable>
    </View>
  );
}

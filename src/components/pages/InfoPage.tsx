import { AccentColor } from "@/constants/theme";
import { Text, View } from "react-native";
import PreviewTitleCard from "../cards/PreviewTitleCard";

type InfoPageProps = {
  eventTypeId: number;
  title: string;
  subtitle?: string;
  category?: string;
  timestamp?: Date;
  location?: string;
  information?: string;
  colorName: AccentColor;
  children?: React.ReactNode;
};

export default function InfoPage({
  eventTypeId,
  title,
  subtitle,
  category,
  colorName,
  timestamp,
  location,
  information,
  children,
}: InfoPageProps) {
  return (
    <View style={{ height: "100%" }}>
      <PreviewTitleCard
        eventTypeId={eventTypeId}
        title={title}
        subtitle={subtitle}
        category={category}
        timestamp={timestamp}
        location={location}
      />

      <View style={{ top: 192 }}>
        <Text>InfoPage</Text>

        <View>
          {children}
          <Text>{information}</Text>
        </View>
      </View>
    </View>
  );
}

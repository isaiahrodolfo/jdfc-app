import { getSlides } from "@/api/supabase/slides/getSlides";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Pdf from "react-native-pdf";

export default function Slides({ slideshowId }: { slideshowId: string }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const uri = await getSlides(Number(slideshowId));
        setPdfUrl(uri);
      } catch (error) {
        console.log("Failed to get PDF file", error);
      }
    };

    loadPdf();
  }, [slideshowId]);

  if (!pdfUrl) {
    return <Text>Loading PDF...</Text>;
  }

  return (
    <View style={{ width: "100%", height: 600 }}>
      <Pdf source={{ uri: pdfUrl }} style={{ flex: 1 }} />
    </View>
  );
}

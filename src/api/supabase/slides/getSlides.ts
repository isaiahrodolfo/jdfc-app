import { supabase } from "@/lib/supabase";

export async function getSlides(slideshowId: number): Promise<string> {
  const { data: slideshow, error: slideshowError } = await supabase
    .from("slideshows")
    .select("slideshow_link")
    .eq("id", slideshowId)
    .single();

  if (slideshowError) {
    throw slideshowError;
  }

  if (!slideshow.slideshow_link) {
    throw new Error("Slideshow file not found");
  }

  console.log("Storage path:", slideshow.slideshow_link);

  const { data, error } = await supabase.storage
    .from("slideshows")
    .download(slideshow.slideshow_link);

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No PDF data returned");
  }

  return new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.onload = () => {
      resolve(fr.result as string);
    };

    fr.onerror = () => {
      reject(new Error("Failed to read PDF file"));
    };

    fr.readAsDataURL(data);
  });
}

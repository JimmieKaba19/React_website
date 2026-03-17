import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import { 
  PresentationDeck, 
  PresentationSlide, 
  DeckWithSlides,
  SlideContent,
  SlideType 
} from "@/types/deck";

// Fetch all decks (admin sees all, public sees published only)
export const useDecks = (adminView = false) => {
  return useQuery({
    queryKey: ["decks", adminView],
    queryFn: async () => {
      let query = supabase
        .from("presentation_decks")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!adminView) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as PresentationDeck[];
    },
  });
};

// Fetch single deck with slides
export const useDeck = (deckId: string | undefined) => {
  return useQuery({
    queryKey: ["deck", deckId],
    queryFn: async () => {
      if (!deckId) throw new Error("No deck ID provided");

      const { data: deck, error: deckError } = await supabase
        .from("presentation_decks")
        .select("*")
        .eq("id", deckId)
        .single();

      if (deckError) throw deckError;

      const { data: slides, error: slidesError } = await supabase
        .from("presentation_slides")
        .select("*")
        .eq("deck_id", deckId)
        .order("sort_order", { ascending: true });

      if (slidesError) throw slidesError;

      return {
        ...deck,
        slides: (slides || []).map(slide => ({
          ...slide,
          content: slide.content as unknown as SlideContent,
          slide_type: slide.slide_type as SlideType,
        })),
      } as DeckWithSlides;
    },
    enabled: !!deckId,
  });
};

// Create deck mutation
export const useCreateDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deck: Omit<Partial<PresentationDeck>, 'id' | 'created_at' | 'updated_at'> & { title: string; client: string }) => {
      const { data, error } = await supabase
        .from("presentation_decks")
        .insert({
          title: deck.title,
          client: deck.client,
          description: deck.description,
          contact_email: deck.contact_email,
          theme_primary: deck.theme_primary,
          theme_secondary: deck.theme_secondary,
          theme_dark: deck.theme_dark,
          theme_light: deck.theme_light,
          theme_accent: deck.theme_accent,
          is_published: deck.is_published,
          sort_order: deck.sort_order,
        })
        .select()
        .single();

      if (error) throw error;
      return data as PresentationDeck;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });
};

// Update deck mutation
export const useUpdateDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PresentationDeck> & { id: string }) => {
      const { data, error } = await supabase
        .from("presentation_decks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as PresentationDeck;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
      queryClient.invalidateQueries({ queryKey: ["deck", data.id] });
    },
  });
};

// Delete deck mutation
export const useDeleteDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deckId: string) => {
      const { error } = await supabase
        .from("presentation_decks")
        .delete()
        .eq("id", deckId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });
};

// Create slide mutation
export const useCreateSlide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slide: { deck_id: string; slide_type: SlideType; content: SlideContent; sort_order: number }) => {
      const { data, error } = await supabase
        .from("presentation_slides")
        .insert({
          deck_id: slide.deck_id,
          slide_type: slide.slide_type,
          content: slide.content as unknown as Json,
          sort_order: slide.sort_order,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["deck", data.deck_id] });
    },
  });
};

// Update slide mutation
export const useUpdateSlide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, deck_id, content, ...rest }: Partial<PresentationSlide> & { id: string; deck_id: string }) => {
      const updateData: Record<string, unknown> = { ...rest };
      if (content !== undefined) {
        updateData.content = content as unknown as Json;
      }
      
      const { data, error } = await supabase
        .from("presentation_slides")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { ...data, deck_id };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["deck", data.deck_id] });
    },
  });
};

// Delete slide mutation
export const useDeleteSlide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, deck_id }: { id: string; deck_id: string }) => {
      const { error } = await supabase
        .from("presentation_slides")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return { deck_id };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["deck", data.deck_id] });
    },
  });
};

// Reorder slides mutation
export const useReorderSlides = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ deck_id, slides }: { deck_id: string; slides: { id: string; sort_order: number }[] }) => {
      const updates = slides.map(slide =>
        supabase
          .from("presentation_slides")
          .update({ sort_order: slide.sort_order })
          .eq("id", slide.id)
      );

      await Promise.all(updates);
      return { deck_id };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["deck", data.deck_id] });
    },
  });
};

// Upload image to storage
export const uploadDeckImage = async (file: File, deckId: string): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${deckId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("deck-images")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("deck-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

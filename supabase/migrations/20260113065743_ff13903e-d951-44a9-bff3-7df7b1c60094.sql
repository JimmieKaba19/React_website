-- Create storage bucket for deck images
INSERT INTO storage.buckets (id, name, public)
VALUES ('deck-images', 'deck-images', true);

-- Storage policies for deck images
CREATE POLICY "Anyone can view deck images"
ON storage.objects FOR SELECT
USING (bucket_id = 'deck-images');

CREATE POLICY "Admins can upload deck images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'deck-images' AND is_admin());

CREATE POLICY "Admins can update deck images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'deck-images' AND is_admin());

CREATE POLICY "Admins can delete deck images"
ON storage.objects FOR DELETE
USING (bucket_id = 'deck-images' AND is_admin());

-- Create presentation_decks table
CREATE TABLE public.presentation_decks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    description TEXT,
    contact_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    -- Theme colors stored as hex
    theme_primary TEXT NOT NULL DEFAULT '#2e7d32',
    theme_secondary TEXT NOT NULL DEFAULT '#fbc02d',
    theme_dark TEXT NOT NULL DEFAULT '#1b2e1c',
    theme_light TEXT NOT NULL DEFAULT '#f1f8e9',
    theme_accent TEXT NOT NULL DEFAULT '#81c784',
    is_published BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- Create slide_type enum
CREATE TYPE public.slide_type AS ENUM (
    'title',
    'two_column',
    'stats',
    'diagram',
    'checklist',
    'closing'
);

-- Create presentation_slides table
CREATE TABLE public.presentation_slides (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    deck_id UUID NOT NULL REFERENCES public.presentation_decks(id) ON DELETE CASCADE,
    slide_type slide_type NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    -- Content stored as JSONB for flexibility per slide type
    content JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.presentation_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presentation_slides ENABLE ROW LEVEL SECURITY;

-- Policies for presentation_decks
CREATE POLICY "Anyone can view published decks"
ON public.presentation_decks FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can view all decks"
ON public.presentation_decks FOR SELECT
USING (is_admin());

CREATE POLICY "Admins can create decks"
ON public.presentation_decks FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update decks"
ON public.presentation_decks FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete decks"
ON public.presentation_decks FOR DELETE
USING (is_admin());

-- Policies for presentation_slides
CREATE POLICY "Anyone can view slides of published decks"
ON public.presentation_slides FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.presentation_decks
        WHERE id = deck_id AND is_published = true
    )
);

CREATE POLICY "Admins can view all slides"
ON public.presentation_slides FOR SELECT
USING (is_admin());

CREATE POLICY "Admins can create slides"
ON public.presentation_slides FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update slides"
ON public.presentation_slides FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete slides"
ON public.presentation_slides FOR DELETE
USING (is_admin());

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_presentation_decks_updated_at
BEFORE UPDATE ON public.presentation_decks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_presentation_slides_updated_at
BEFORE UPDATE ON public.presentation_slides
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster slide queries
CREATE INDEX idx_slides_deck_order ON public.presentation_slides(deck_id, sort_order);
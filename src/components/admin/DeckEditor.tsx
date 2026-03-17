import { useState, useEffect } from "react";
import { ArrowLeft, Save, Plus, GripVertical, Trash2, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  useDeck,
  useCreateDeck,
  useUpdateDeck,
  useCreateSlide,
  useUpdateSlide,
  useDeleteSlide,
} from "@/hooks/useDecks";
import {
  PresentationDeck,
  PresentationSlide,
  SlideType,
  slideTypeLabels,
  defaultSlideContent,
  SlideContent,
} from "@/types/deck";
import { SlideEditorForm } from "./SlideEditorForm";

interface DeckEditorProps {
  deckId?: string;
  onBack: () => void;
  onPreview: (deckId: string) => void;
}

export const DeckEditor = ({ deckId, onBack, onPreview }: DeckEditorProps) => {
  const { toast } = useToast();
  const { data: existingDeck, isLoading } = useDeck(deckId);
  const createDeck = useCreateDeck();
  const updateDeck = useUpdateDeck();
  const createSlide = useCreateSlide();
  const updateSlide = useUpdateSlide();
  const deleteSlide = useDeleteSlide();

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    description: "",
    contact_email: "",
    theme_primary: "#2e7d32",
    theme_secondary: "#fbc02d",
    theme_dark: "#1b2e1c",
    theme_light: "#f1f8e9",
    theme_accent: "#81c784",
    is_published: false,
  });

  const [selectedSlide, setSelectedSlide] = useState<PresentationSlide | null>(null);
  const [deleteSlideTarget, setDeleteSlideTarget] = useState<PresentationSlide | null>(null);
  const [newSlideType, setNewSlideType] = useState<SlideType>("title");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (existingDeck) {
      setFormData({
        title: existingDeck.title,
        client: existingDeck.client,
        description: existingDeck.description || "",
        contact_email: existingDeck.contact_email || "",
        theme_primary: existingDeck.theme_primary,
        theme_secondary: existingDeck.theme_secondary,
        theme_dark: existingDeck.theme_dark,
        theme_light: existingDeck.theme_light,
        theme_accent: existingDeck.theme_accent,
        is_published: existingDeck.is_published,
      });
    }
  }, [existingDeck]);

  const handleSaveDeck = async () => {
    if (!formData.title || !formData.client) {
      toast({ title: "Title and client are required", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      if (deckId) {
        await updateDeck.mutateAsync({ id: deckId, ...formData });
        toast({ title: "Deck updated" });
      } else {
        const newDeck = await createDeck.mutateAsync(formData);
        toast({ title: "Deck created" });
        // Navigate to edit the new deck
        window.history.replaceState(null, "", `?edit=${newDeck.id}`);
      }
    } catch (error: any) {
      toast({ title: "Failed to save deck", description: error.message, variant: "destructive" });
    }
    setIsSaving(false);
  };

  const handleAddSlide = async () => {
    if (!deckId) {
      toast({ title: "Save the deck first before adding slides", variant: "destructive" });
      return;
    }

    try {
      const maxOrder = existingDeck?.slides?.reduce((max, s) => Math.max(max, s.sort_order), -1) ?? -1;
      await createSlide.mutateAsync({
        deck_id: deckId,
        slide_type: newSlideType,
        content: defaultSlideContent[newSlideType],
        sort_order: maxOrder + 1,
      });
      toast({ title: "Slide added" });
    } catch (error: any) {
      toast({ title: "Failed to add slide", description: error.message, variant: "destructive" });
    }
  };

  const handleSaveSlide = async (slide: PresentationSlide, content: SlideContent) => {
    try {
      await updateSlide.mutateAsync({
        id: slide.id,
        deck_id: slide.deck_id,
        content,
      });
      toast({ title: "Slide saved" });
      setSelectedSlide(null);
    } catch (error: any) {
      toast({ title: "Failed to save slide", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteSlide = async () => {
    if (!deleteSlideTarget) return;
    try {
      await deleteSlide.mutateAsync({ id: deleteSlideTarget.id, deck_id: deleteSlideTarget.deck_id });
      toast({ title: "Slide deleted" });
      if (selectedSlide?.id === deleteSlideTarget.id) {
        setSelectedSlide(null);
      }
    } catch (error: any) {
      toast({ title: "Failed to delete slide", description: error.message, variant: "destructive" });
    }
    setDeleteSlideTarget(null);
  };

  if (isLoading && deckId) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h2 className="text-2xl font-bold text-foreground">
            {deckId ? "Edit Deck" : "New Deck"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {deckId && (
            <Button variant="outline" onClick={() => onPreview(deckId)} className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          )}
          <Button onClick={handleSaveDeck} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Deck"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details" className="gap-2">
            <Settings className="h-4 w-4" />
            Details & Theme
          </TabsTrigger>
          <TabsTrigger value="slides" disabled={!deckId}>
            Slides ({existingDeck?.slides?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Presentation title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client *</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData((p) => ({ ...p, client: e.target.value }))}
                    placeholder="Client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Brief description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Email</Label>
                  <Input
                    id="contact"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData((p) => ({ ...p, contact_email: e.target.value }))}
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData((p) => ({ ...p, is_published: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Theme Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Theme Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "theme_primary", label: "Primary" },
                    { key: "theme_secondary", label: "Secondary" },
                    { key: "theme_dark", label: "Dark" },
                    { key: "theme_light", label: "Light" },
                    { key: "theme_accent", label: "Accent" },
                  ].map(({ key, label }) => (
                    <div key={key} className="space-y-2">
                      <Label>{label}</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={formData[key as keyof typeof formData] as string}
                          onChange={(e) => setFormData((p) => ({ ...p, [key]: e.target.value }))}
                          className="w-12 h-10 p-1 cursor-pointer"
                        />
                        <Input
                          value={formData[key as keyof typeof formData] as string}
                          onChange={(e) => setFormData((p) => ({ ...p, [key]: e.target.value }))}
                          className="flex-1 font-mono text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Theme Preview */}
                <div
                  className="rounded-lg p-4 mt-4"
                  style={{ backgroundColor: formData.theme_dark }}
                >
                  <div className="text-center">
                    <p className="font-bold" style={{ color: formData.theme_secondary }}>
                      Theme Preview
                    </p>
                    <p className="text-sm" style={{ color: formData.theme_accent }}>
                      Subtitle text
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="slides" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Slide List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Slides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Select value={newSlideType} onValueChange={(v) => setNewSlideType(v as SlideType)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(slideTypeLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddSlide} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {existingDeck?.slides?.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedSlide?.id === slide.id ? "bg-accent border-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedSlide(slide)}
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {index + 1}. {slideTypeLabels[slide.slide_type]}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteSlideTarget(slide);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Slide Editor */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedSlide ? `Edit ${slideTypeLabels[selectedSlide.slide_type]}` : "Select a slide"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSlide ? (
                  <SlideEditorForm
                    slide={selectedSlide}
                    onSave={(content) => handleSaveSlide(selectedSlide, content)}
                    onCancel={() => setSelectedSlide(null)}
                  />
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    Select a slide from the list to edit its content
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={!!deleteSlideTarget} onOpenChange={() => setDeleteSlideTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this slide?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSlide}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

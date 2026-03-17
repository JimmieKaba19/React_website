import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { DeckList } from "@/components/admin/DeckList";
import { DeckEditor } from "@/components/admin/DeckEditor";
import { PresentationDeck } from "@/types/deck";

const AdminDecks = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAdmin, isLoading } = useAuth();

  const editId = searchParams.get("edit");
  const isCreating = searchParams.get("new") === "true";

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [isLoading, user, isAdmin, navigate]);

  const handleCreateNew = () => {
    setSearchParams({ new: "true" });
  };

  const handleEdit = (deck: PresentationDeck) => {
    setSearchParams({ edit: deck.id });
  };

  const handleBack = () => {
    setSearchParams({});
  };

  const handlePreview = (deckId: string) => {
    window.open(`/decks?preview=${deckId}`, "_blank");
  };

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-bold text-foreground">Deck Management</h1>
            <p className="text-sm text-muted-foreground">Create and manage presentation decks</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {editId || isCreating ? (
          <DeckEditor
            deckId={editId || undefined}
            onBack={handleBack}
            onPreview={handlePreview}
          />
        ) : (
          <DeckList onCreateNew={handleCreateNew} onEdit={handleEdit} />
        )}
      </main>
    </div>
  );
};

export default AdminDecks;

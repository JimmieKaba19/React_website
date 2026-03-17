import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Presentation, Edit, Trash2, Eye, EyeOff, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useDecks, useDeleteDeck, useUpdateDeck } from "@/hooks/useDecks";
import { PresentationDeck } from "@/types/deck";

interface DeckListProps {
  onCreateNew: () => void;
  onEdit: (deck: PresentationDeck) => void;
}

export const DeckList = ({ onCreateNew, onEdit }: DeckListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: decks, isLoading } = useDecks(true);
  const deleteDeck = useDeleteDeck();
  const updateDeck = useUpdateDeck();
  const [deleteTarget, setDeleteTarget] = useState<PresentationDeck | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteDeck.mutateAsync(deleteTarget.id);
      toast({ title: "Deck deleted successfully" });
    } catch (error: any) {
      toast({ title: "Failed to delete deck", description: error.message, variant: "destructive" });
    }
    setDeleteTarget(null);
  };

  const handleTogglePublish = async (deck: PresentationDeck) => {
    try {
      await updateDeck.mutateAsync({ id: deck.id, is_published: !deck.is_published });
      toast({ title: deck.is_published ? "Deck unpublished" : "Deck published" });
    } catch (error: any) {
      toast({ title: "Failed to update deck", description: error.message, variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Presentation Decks</h2>
          <p className="text-muted-foreground">Manage your pitch decks and presentations</p>
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          New Deck
        </Button>
      </div>

      {decks?.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Presentation className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No decks yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first presentation deck to get started
            </p>
            <Button onClick={onCreateNew}>Create Deck</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks?.map((deck) => (
            <Card key={deck.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div
                className="h-24 flex items-center justify-center"
                style={{ backgroundColor: deck.theme_dark }}
              >
                <span className="text-sm font-bold" style={{ color: deck.theme_secondary }}>
                  {deck.title}
                </span>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{deck.title}</CardTitle>
                    <CardDescription className="truncate">{deck.client}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(deck)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTogglePublish(deck)}>
                        {deck.is_published ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Publish
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteTarget(deck)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant={deck.is_published ? "default" : "secondary"}>
                    {deck.is_published ? "Published" : "Draft"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(deck.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{deleteTarget?.title}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this deck and all its slides. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
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

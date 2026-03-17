import { useState, useEffect } from "react";
import { Save, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PresentationSlide,
  SlideContent,
  TitleSlideContent,
  TwoColumnSlideContent,
  StatsSlideContent,
  DiagramSlideContent,
  ChecklistSlideContent,
  ClosingSlideContent,
} from "@/types/deck";

interface SlideEditorFormProps {
  slide: PresentationSlide;
  onSave: (content: SlideContent) => void;
  onCancel: () => void;
}

export const SlideEditorForm = ({ slide, onSave, onCancel }: SlideEditorFormProps) => {
  const [content, setContent] = useState<SlideContent>(slide.content);

  useEffect(() => {
    setContent(slide.content);
  }, [slide.id]);

  const renderTitleForm = () => {
    const c = content as TitleSlideContent;
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={c.title || ""}
            onChange={(e) => setContent({ ...c, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Subtitle</Label>
          <Input
            value={c.subtitle || ""}
            onChange={(e) => setContent({ ...c, subtitle: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Footer (optional)</Label>
          <Input
            value={c.footer || ""}
            onChange={(e) => setContent({ ...c, footer: e.target.value })}
          />
        </div>
      </div>
    );
  };

  const renderTwoColumnForm = () => {
    const c = content as TwoColumnSlideContent;
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Section Header</Label>
          <Input
            value={c.header || ""}
            onChange={(e) => setContent({ ...c, header: e.target.value })}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3 p-4 border rounded-lg">
            <Label className="font-semibold">Left Card</Label>
            <Input
              placeholder="Title"
              value={c.leftCard?.title || ""}
              onChange={(e) =>
                setContent({ ...c, leftCard: { ...c.leftCard, title: e.target.value } })
              }
            />
            <Textarea
              placeholder="Content"
              value={c.leftCard?.content || ""}
              onChange={(e) =>
                setContent({ ...c, leftCard: { ...c.leftCard, content: e.target.value } })
              }
              rows={3}
            />
          </div>
          <div className="space-y-3 p-4 border rounded-lg">
            <Label className="font-semibold">Right Card</Label>
            <Input
              placeholder="Title"
              value={c.rightCard?.title || ""}
              onChange={(e) =>
                setContent({ ...c, rightCard: { ...c.rightCard, title: e.target.value } })
              }
            />
            <Textarea
              placeholder="Content"
              value={c.rightCard?.content || ""}
              onChange={(e) =>
                setContent({ ...c, rightCard: { ...c.rightCard, content: e.target.value } })
              }
              rows={3}
            />
            <Select
              value={c.rightCard?.variant || "primary"}
              onValueChange={(v) =>
                setContent({
                  ...c,
                  rightCard: { ...c.rightCard, variant: v as "primary" | "secondary" },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary Style</SelectItem>
                <SelectItem value="secondary">Secondary Style</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  };

  const renderStatsForm = () => {
    const c = content as StatsSlideContent;
    const stats = c.stats || [];

    const updateStat = (index: number, field: "value" | "label", value: string) => {
      const newStats = [...stats];
      newStats[index] = { ...newStats[index], [field]: value };
      setContent({ ...c, stats: newStats });
    };

    const addStat = () => {
      setContent({ ...c, stats: [...stats, { value: "0", label: "New Metric" }] });
    };

    const removeStat = (index: number) => {
      setContent({ ...c, stats: stats.filter((_, i) => i !== index) });
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Section Header</Label>
          <Input
            value={c.header || ""}
            onChange={(e) => setContent({ ...c, header: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Statistics</Label>
            <Button type="button" size="sm" variant="outline" onClick={addStat}>
              <Plus className="h-4 w-4 mr-1" /> Add Stat
            </Button>
          </div>
          {stats.map((stat, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input
                placeholder="Value (e.g., 30%)"
                value={stat.value}
                onChange={(e) => updateStat(i, "value", e.target.value)}
                className="w-32"
              />
              <Input
                placeholder="Label"
                value={stat.label}
                onChange={(e) => updateStat(i, "label", e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="text-destructive"
                onClick={() => removeStat(i)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label>Badge Text (optional)</Label>
          <Input
            value={c.badge?.text || ""}
            onChange={(e) => setContent({ ...c, badge: { ...c.badge, text: e.target.value } })}
          />
        </div>

        <div className="space-y-2">
          <Label>Footnote (optional)</Label>
          <Input
            value={c.footnote || ""}
            onChange={(e) => setContent({ ...c, footnote: e.target.value })}
          />
        </div>
      </div>
    );
  };

  const renderDiagramForm = () => {
    const c = content as DiagramSlideContent;
    const nodes = c.nodes || [];

    const updateNode = (
      index: number,
      field: "label" | "sublabel" | "variant",
      value: string
    ) => {
      const newNodes = [...nodes];
      newNodes[index] = { ...newNodes[index], [field]: value };
      setContent({ ...c, nodes: newNodes as DiagramSlideContent["nodes"] });
    };

    const addNode = () => {
      setContent({
        ...c,
        nodes: [...nodes, { label: "New Node", sublabel: "Description", variant: "primary" as const }],
      });
    };

    const removeNode = (index: number) => {
      setContent({ ...c, nodes: nodes.filter((_, i) => i !== index) });
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Section Header</Label>
          <Input
            value={c.header || ""}
            onChange={(e) => setContent({ ...c, header: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Diagram Nodes</Label>
            <Button type="button" size="sm" variant="outline" onClick={addNode}>
              <Plus className="h-4 w-4 mr-1" /> Add Node
            </Button>
          </div>
          {nodes.map((node, i) => (
            <div key={i} className="flex gap-2 items-center p-3 border rounded-lg">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Label"
                  value={node.label}
                  onChange={(e) => updateNode(i, "label", e.target.value)}
                />
                <Input
                  placeholder="Sublabel"
                  value={node.sublabel}
                  onChange={(e) => updateNode(i, "sublabel", e.target.value)}
                />
                <Select
                  value={node.variant}
                  onValueChange={(v) => updateNode(i, "variant", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="accent">Accent</SelectItem>
                    <SelectItem value="sap">SAP Blue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="text-destructive"
                onClick={() => removeNode(i)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label>Description (optional)</Label>
          <Textarea
            value={c.description || ""}
            onChange={(e) => setContent({ ...c, description: e.target.value })}
            rows={2}
          />
        </div>
      </div>
    );
  };

  const renderChecklistForm = () => {
    const c = content as ChecklistSlideContent;
    const sections = c.sections || [];

    const updateSection = (index: number, field: "title" | "items", value: string | string[]) => {
      const newSections = [...sections];
      newSections[index] = { ...newSections[index], [field]: value };
      setContent({ ...c, sections: newSections });
    };

    const addSection = () => {
      setContent({
        ...c,
        sections: [...sections, { title: "New Phase", items: ["Task 1"] }],
      });
    };

    const removeSection = (index: number) => {
      setContent({ ...c, sections: sections.filter((_, i) => i !== index) });
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Section Header</Label>
          <Input
            value={c.header || ""}
            onChange={(e) => setContent({ ...c, header: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Checklist Sections</Label>
            <Button type="button" size="sm" variant="outline" onClick={addSection}>
              <Plus className="h-4 w-4 mr-1" /> Add Section
            </Button>
          </div>
          {sections.map((section, i) => (
            <div key={i} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Section Title"
                  value={section.title}
                  onChange={(e) => updateSection(i, "title", e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => removeSection(i)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                placeholder="Items (one per line)"
                value={(section.items || []).join("\n")}
                onChange={(e) =>
                  updateSection(i, "items", e.target.value.split("\n").filter((x) => x.trim()))
                }
                rows={3}
              />
            </div>
          ))}
        </div>

        <div className="p-4 border rounded-lg space-y-3">
          <Label className="font-semibold">Highlight Card (optional)</Label>
          <Input
            placeholder="Card Title"
            value={c.highlightCard?.title || ""}
            onChange={(e) =>
              setContent({ ...c, highlightCard: { ...c.highlightCard, title: e.target.value, content: c.highlightCard?.content || "" } })
            }
          />
          <Textarea
            placeholder="Card Content"
            value={c.highlightCard?.content || ""}
            onChange={(e) =>
              setContent({ ...c, highlightCard: { ...c.highlightCard, title: c.highlightCard?.title || "", content: e.target.value } })
            }
            rows={2}
          />
        </div>
      </div>
    );
  };

  const renderClosingForm = () => {
    const c = content as ClosingSlideContent;
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={c.title || ""}
            onChange={(e) => setContent({ ...c, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Subtitle</Label>
          <Input
            value={c.subtitle || ""}
            onChange={(e) => setContent({ ...c, subtitle: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Contact Info (optional)</Label>
          <Input
            value={c.contactInfo || ""}
            onChange={(e) => setContent({ ...c, contactInfo: e.target.value })}
          />
        </div>
      </div>
    );
  };

  const renderForm = () => {
    switch (slide.slide_type) {
      case "title":
        return renderTitleForm();
      case "two_column":
        return renderTwoColumnForm();
      case "stats":
        return renderStatsForm();
      case "diagram":
        return renderDiagramForm();
      case "checklist":
        return renderChecklistForm();
      case "closing":
        return renderClosingForm();
      default:
        return <p>Unknown slide type</p>;
    }
  };

  return (
    <div className="space-y-6">
      {renderForm()}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={() => onSave(content)}>
          <Save className="h-4 w-4 mr-2" />
          Save Slide
        </Button>
      </div>
    </div>
  );
};

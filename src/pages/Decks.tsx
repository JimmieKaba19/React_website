import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Presentation, ArrowLeft, Calendar, Building, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDecks, useDeck } from "@/hooks/useDecks";
import { decks as staticDecks } from "@/data/decks";
import { 
  PresentationDeck, 
  DeckWithSlides, 
  getThemeFromDeck,
  DeckTheme,
  TitleSlideContent,
  TwoColumnSlideContent,
  StatsSlideContent,
  DiagramSlideContent,
  ChecklistSlideContent,
  ClosingSlideContent,
} from "@/types/deck";

const PIN_CODE = "12345";

// Slide renderer components
const TitleSlide = ({ content, theme }: { content: TitleSlideContent; theme: DeckTheme }) => (
  <section className="w-full h-screen snap-start flex flex-col justify-center items-center relative p-10" style={{ backgroundColor: theme.dark }}>
    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center" style={{ color: theme.secondary }}>{content.title}</h1>
    <p className="text-xl md:text-2xl opacity-90 text-center" style={{ color: theme.accent }}>{content.subtitle}</p>
    {content.footer && <div className="mt-16 font-bold tracking-widest text-sm text-white/70">{content.footer}</div>}
  </section>
);

const TwoColumnSlide = ({ content, theme }: { content: TwoColumnSlideContent; theme: DeckTheme }) => (
  <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
    <div className="absolute top-10 left-10 flex items-center">
      <div className="w-1.5 h-10 mr-4" style={{ backgroundColor: theme.secondary }} />
      <h2 className="text-2xl md:text-4xl font-bold" style={{ color: theme.primary }}>{content.header}</h2>
    </div>
    <div className="grid md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl mt-16">
      <div className="p-6 md:p-8 rounded-2xl shadow-md border-l-4" style={{ backgroundColor: theme.light, borderColor: theme.primary }}>
        <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: theme.primary }}>{content.leftCard.title}</h3>
        <p className="text-base md:text-lg leading-relaxed text-gray-700">{content.leftCard.content}</p>
      </div>
      <div className="p-6 md:p-8 rounded-2xl shadow-md border-l-4" style={{ backgroundColor: theme.light, borderColor: content.rightCard.variant === 'secondary' ? theme.secondary : theme.primary }}>
        <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: theme.primary }}>{content.rightCard.title}</h3>
        <p className="text-base md:text-lg leading-relaxed text-gray-700">{content.rightCard.content}</p>
      </div>
    </div>
  </section>
);

const StatsSlide = ({ content, theme }: { content: StatsSlideContent; theme: DeckTheme }) => (
  <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
    <div className="absolute top-10 left-10 flex items-center">
      <div className="w-1.5 h-10 mr-4" style={{ backgroundColor: theme.secondary }} />
      <h2 className="text-2xl md:text-4xl font-bold" style={{ color: theme.primary }}>{content.header}</h2>
    </div>
    <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl gap-8 md:gap-4 mt-16">
      {content.stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-5xl md:text-7xl font-extrabold" style={{ color: theme.primary }}>{stat.value}</div>
          <div className="text-sm md:text-base text-gray-600 uppercase tracking-widest mt-2">{stat.label}</div>
        </div>
      ))}
    </div>
    {content.badge && (
      <div className="mt-16 text-center">
        <div className="inline-block font-bold px-6 py-3 rounded mb-4 text-white" style={{ backgroundColor: content.badge.color || theme.primary }}>
          {content.badge.text}
        </div>
        {content.footnote && <p className="text-gray-600 italic">{content.footnote}</p>}
      </div>
    )}
  </section>
);

const DiagramSlide = ({ content, theme }: { content: DiagramSlideContent; theme: DeckTheme }) => {
  const getNodeStyle = (variant: string) => {
    switch (variant) {
      case 'secondary': return { bg: theme.secondary, color: theme.dark };
      case 'accent': return { bg: theme.dark, color: theme.accent };
      case 'sap': return { bg: '#0089d1', color: '#ffffff' };
      default: return { bg: theme.primary, color: '#ffffff' };
    }
  };

  return (
    <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
      <div className="absolute top-10 left-10 flex items-center">
        <div className="w-1.5 h-10 mr-4" style={{ backgroundColor: theme.secondary }} />
        <h2 className="text-2xl md:text-4xl font-bold" style={{ color: theme.primary }}>{content.header}</h2>
      </div>
      <div className="w-full max-w-5xl bg-white border-2 border-dashed border-gray-300 rounded-3xl p-6 md:p-10 mt-16">
        <div className="flex flex-wrap justify-center md:justify-around items-center gap-4 md:gap-6">
          {content.nodes.map((node, i) => {
            const style = getNodeStyle(node.variant);
            return (
              <div key={i} className="px-4 py-5 md:px-6 md:py-6 rounded-xl text-center font-bold shadow-lg min-w-[140px] md:min-w-[180px]" style={{ backgroundColor: style.bg, color: style.color }}>
                <div className="text-sm md:text-base">{node.label}</div>
                <div className="text-xs opacity-80 mt-1">{node.sublabel}</div>
              </div>
            );
          })}
        </div>
        <div className="w-full h-0.5 bg-gray-300 my-6 relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-2xl">➔</span>
        </div>
      </div>
      {content.description && <p className="text-center max-w-3xl mt-8 text-gray-700 text-base md:text-lg" dangerouslySetInnerHTML={{ __html: content.description }} />}
    </section>
  );
};

const ChecklistSlide = ({ content, theme }: { content: ChecklistSlideContent; theme: DeckTheme }) => (
  <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
    <div className="absolute top-10 left-10 flex items-center">
      <div className="w-1.5 h-10 mr-4" style={{ backgroundColor: theme.secondary }} />
      <h2 className="text-2xl md:text-4xl font-bold" style={{ color: theme.primary }}>{content.header}</h2>
    </div>
    <div className="grid md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl mt-16">
      <div className="space-y-8">
        {content.sections.map((section, i) => (
          <div key={i}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme.primary }}>{section.title}</h3>
            <ul className="space-y-3">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-center text-base md:text-lg">
                  <span className="font-bold mr-3" style={{ color: theme.primary }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {content.highlightCard && (
        <div className="p-6 md:p-8 rounded-2xl shadow-md border-l-4 text-white" style={{ backgroundColor: theme.dark, borderColor: theme.secondary }}>
          <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: theme.secondary }}>{content.highlightCard.title}</h3>
          <p className="text-base md:text-lg leading-relaxed text-white/90">{content.highlightCard.content}</p>
        </div>
      )}
    </div>
  </section>
);

const ClosingSlide = ({ content, theme }: { content: ClosingSlideContent; theme: DeckTheme }) => (
  <section className="w-full h-screen snap-start flex flex-col justify-center items-center relative p-10" style={{ backgroundColor: theme.dark }}>
    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center" style={{ color: theme.secondary }}>{content.title}</h1>
    <p className="text-xl md:text-2xl opacity-90 text-center" style={{ color: theme.accent }}>{content.subtitle}</p>
    {content.contactInfo && (
      <div className="mt-10 px-8 py-5 rounded-xl" style={{ border: `1px solid ${theme.accent}` }}>
        <p className="text-white">{content.contactInfo}</p>
      </div>
    )}
  </section>
);

const NavigationHint = () => (
  <div className="fixed bottom-5 right-5 bg-black/50 text-white px-5 py-2.5 rounded-full text-sm flex items-center gap-2 pointer-events-none z-50">
    <ArrowDown className="h-4 w-4 animate-bounce" />
    Scroll to navigate
  </div>
);

// Deck viewer for database decks
const DatabaseDeckViewer = ({ deck }: { deck: DeckWithSlides }) => {
  const theme = getThemeFromDeck(deck);

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {deck.slides.map((slide) => {
        switch (slide.slide_type) {
          case 'title': return <TitleSlide key={slide.id} content={slide.content as TitleSlideContent} theme={theme} />;
          case 'two_column': return <TwoColumnSlide key={slide.id} content={slide.content as TwoColumnSlideContent} theme={theme} />;
          case 'stats': return <StatsSlide key={slide.id} content={slide.content as StatsSlideContent} theme={theme} />;
          case 'diagram': return <DiagramSlide key={slide.id} content={slide.content as DiagramSlideContent} theme={theme} />;
          case 'checklist': return <ChecklistSlide key={slide.id} content={slide.content as ChecklistSlideContent} theme={theme} />;
          case 'closing': return <ClosingSlide key={slide.id} content={slide.content as ClosingSlideContent} theme={theme} />;
          default: return null;
        }
      })}
      <NavigationHint />
    </div>
  );
};

const PinGate = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PIN_CODE) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-navy to-primary-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
        transition={{ duration: shake ? 0.4 : 0.3 }}
        className="bg-card p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Private Access</h1>
          <p className="text-muted-foreground mt-2">Enter PIN to view presentation decks</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setError(false); }}
            className={`text-center text-2xl tracking-[0.5em] py-6 ${error ? "border-destructive" : ""}`}
            autoFocus
          />
          {error && <p className="text-destructive text-sm text-center">Incorrect PIN. Please try again.</p>}
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">Access Decks</Button>
        </form>
      </motion.div>
    </div>
  );
};

interface DeckItem {
  id: string;
  title: string;
  client: string;
  description: string;
  date: string;
  theme: DeckTheme;
  isStatic?: boolean;
}

const DeckSelector = ({ onSelect, onLogout }: { onSelect: (deck: DeckItem) => void; onLogout: () => void }) => {
  const { data: dbDecks, isLoading } = useDecks(false);

  const allDecks: DeckItem[] = [
    ...staticDecks.map(d => ({ id: d.id, title: d.title, client: d.client, description: d.description, date: d.date, theme: d.theme, isStatic: true })),
    ...(dbDecks || []).map(d => ({ id: d.id, title: d.title, client: d.client, description: d.description || "", date: new Date(d.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), theme: getThemeFromDeck(d), isStatic: false })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Presentation Decks</h1>
            <p className="text-muted-foreground mt-2">Select a deck to view the full presentation</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="gap-2"><Lock className="h-4 w-4" />Lock</Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDecks.map((deck, index) => (
              <motion.div key={deck.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="group cursor-pointer" onClick={() => onSelect(deck)}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1" style={{ backgroundColor: deck.theme.dark }}>
                  <div className="h-40 flex items-center justify-center p-6">
                    <div className="text-center">
                      <h3 className="text-xl md:text-2xl font-bold" style={{ color: deck.theme.secondary }}>{deck.title}</h3>
                      <p className="text-sm mt-2 opacity-80" style={{ color: deck.theme.accent }}>{deck.description}</p>
                    </div>
                  </div>
                  <div className="bg-card p-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2"><Building className="h-4 w-4" /><span>{deck.client}</span></div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="h-4 w-4" /><span>{deck.date}</span></div>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white font-semibold"><Presentation className="h-5 w-5" />View Presentation</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DeckViewer = ({ deckId, isStatic, onBack }: { deckId: string; isStatic: boolean; onBack: () => void }) => {
  const { data: dbDeck, isLoading } = useDeck(isStatic ? undefined : deckId);

  if (isStatic) {
    const staticDeck = staticDecks.find(d => d.id === deckId);
    if (!staticDeck) return null;
    const DeckComponent = staticDeck.component;
    return (
      <div className="relative">
        <Button onClick={onBack} variant="outline" className="fixed top-5 left-5 z-50 gap-2 bg-card/90 backdrop-blur-sm shadow-lg"><ArrowLeft className="h-4 w-4" />Back to Decks</Button>
        <DeckComponent theme={staticDeck.theme} />
      </div>
    );
  }

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  if (!dbDeck) return null;

  return (
    <div className="relative">
      <Button onClick={onBack} variant="outline" className="fixed top-5 left-5 z-50 gap-2 bg-card/90 backdrop-blur-sm shadow-lg"><ArrowLeft className="h-4 w-4" />Back to Decks</Button>
      <DatabaseDeckViewer deck={dbDeck} />
    </div>
  );
};

const Decks = () => {
  const [searchParams] = useSearchParams();
  const previewId = searchParams.get("preview");
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!previewId);
  const [selectedDeck, setSelectedDeck] = useState<DeckItem | null>(null);

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <motion.div key="gate" exit={{ opacity: 0 }}><PinGate onSuccess={() => setIsAuthenticated(true)} /></motion.div>
      ) : selectedDeck || previewId ? (
        <motion.div key="viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <DeckViewer deckId={selectedDeck?.id || previewId!} isStatic={selectedDeck?.isStatic ?? false} onBack={() => setSelectedDeck(null)} />
        </motion.div>
      ) : (
        <motion.div key="selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <DeckSelector onSelect={setSelectedDeck} onLogout={() => setIsAuthenticated(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Decks;

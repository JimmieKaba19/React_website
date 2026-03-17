export interface DeckTheme {
  primary: string;
  secondary: string;
  dark: string;
  light: string;
  accent: string;
}

export type SlideType = 'title' | 'two_column' | 'stats' | 'diagram' | 'checklist' | 'closing';

export interface TitleSlideContent {
  title: string;
  subtitle: string;
  footer?: string;
}

export interface TwoColumnSlideContent {
  header: string;
  leftCard: { title: string; content: string };
  rightCard: { title: string; content: string; variant?: 'primary' | 'secondary' };
}

export interface StatsSlideContent {
  header: string;
  stats: Array<{ value: string; label: string }>;
  badge?: { text: string; color?: string };
  footnote?: string;
}

export interface DiagramSlideContent {
  header: string;
  nodes: Array<{ label: string; sublabel: string; variant: 'primary' | 'secondary' | 'accent' | 'sap' }>;
  description?: string;
}

export interface ChecklistSlideContent {
  header: string;
  sections: Array<{ title: string; items: string[] }>;
  highlightCard?: { title: string; content: string };
}

export interface ClosingSlideContent {
  title: string;
  subtitle: string;
  contactInfo?: string;
}

export type SlideContent = 
  | TitleSlideContent 
  | TwoColumnSlideContent 
  | StatsSlideContent 
  | DiagramSlideContent 
  | ChecklistSlideContent 
  | ClosingSlideContent;

export interface PresentationSlide {
  id: string;
  deck_id: string;
  slide_type: SlideType;
  sort_order: number;
  content: SlideContent;
  created_at: string;
  updated_at: string;
}

export interface PresentationDeck {
  id: string;
  title: string;
  client: string;
  description: string | null;
  contact_email: string | null;
  theme_primary: string;
  theme_secondary: string;
  theme_dark: string;
  theme_light: string;
  theme_accent: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DeckWithSlides extends PresentationDeck {
  slides: PresentationSlide[];
}

export const getThemeFromDeck = (deck: PresentationDeck): DeckTheme => ({
  primary: deck.theme_primary,
  secondary: deck.theme_secondary,
  dark: deck.theme_dark,
  light: deck.theme_light,
  accent: deck.theme_accent,
});

export const slideTypeLabels: Record<SlideType, string> = {
  title: 'Title Slide',
  two_column: 'Two Column',
  stats: 'Statistics',
  diagram: 'Diagram',
  checklist: 'Checklist',
  closing: 'Closing Slide',
};

export const defaultSlideContent: Record<SlideType, SlideContent> = {
  title: { title: 'Presentation Title', subtitle: 'Subtitle goes here', footer: 'COMPANY NAME' },
  two_column: {
    header: 'Section Title',
    leftCard: { title: 'Left Card', content: 'Content for left card' },
    rightCard: { title: 'Right Card', content: 'Content for right card' },
  },
  stats: {
    header: 'Key Metrics',
    stats: [
      { value: '100%', label: 'Metric One' },
      { value: '50+', label: 'Metric Two' },
      { value: '2x', label: 'Metric Three' },
    ],
  },
  diagram: {
    header: 'System Architecture',
    nodes: [
      { label: 'Component A', sublabel: 'Description', variant: 'primary' },
      { label: 'Component B', sublabel: 'Description', variant: 'secondary' },
    ],
  },
  checklist: {
    header: 'Implementation Plan',
    sections: [
      { title: 'Phase 1', items: ['Task 1', 'Task 2'] },
    ],
  },
  closing: { title: 'Thank You', subtitle: 'Questions?', contactInfo: 'email@example.com' },
};

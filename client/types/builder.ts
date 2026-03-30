export type ComponentType =
  | "section"
  | "row"
  | "column"
  | "heading"
  | "paragraph"
  | "button"
  | "image"
  | "video"
  | "divider"
  | "hero"
  | "feature-grid"
  | "pricing"
  | "testimonials"
  | "logo-cloud"
  | "faq"
  | "cta"
  | "contact-form"
  | "card";

export type PreviewDevice = "desktop" | "tablet" | "mobile";

export interface BuilderComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children?: BuilderComponent[];
  width?: number; // 1-12 for columns, percentage for others
  height?: number; // pixels for components
  // Styling properties
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  // Background image properties
  backgroundImageUrl?: string;
  backgroundSize?: "cover" | "contain" | "auto" | "stretch";
  backgroundPosition?: "top" | "center" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  backgroundRepeat?: "repeat" | "no-repeat" | "repeat-x" | "repeat-y";
  backgroundAttachment?: "scroll" | "fixed";
  backgroundOpacity?: number;
  // Layout properties
  textAlign?: "left" | "center" | "right" | "justify";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
  // Unit tracking for sizing
  widthUnit?: "%" | "px";
  heightUnit?: "px";
  fontSizeUnit?: "px" | "%";
  // Content visibility properties
  contentVisibility?: "all" | "desktop" | "tablet" | "mobile";
  displayConditions?: string[];
  // Image component properties
  imageUrl?: string;
  altText?: string;
  // Video component properties
  videoUrl?: string;
  // Text content
  contentText?: string;
  // Hero section properties
  heroBadgeText?: string;
  heroHeadingText?: string;
  heroDescriptionText?: string;
  heroPrimaryButtonText?: string;
  heroSecondaryButtonText?: string;
  // Individual element styling for hero section
  headingFontSize?: number;
  headingFontSizeUnit?: "px" | "%";
  headingWidth?: number;
  headingWidthUnit?: "%" | "px";
  paragraphFontSize?: number;
  paragraphFontSizeUnit?: "px" | "%";
  paragraphWidth?: number;
  paragraphWidthUnit?: "%" | "px";
  badgeFontSize?: number;
  badgeFontSizeUnit?: "px" | "%";
  badgeWidth?: number;
  badgeWidthUnit?: "%" | "px";
  buttonFontSize?: number;
  buttonFontSizeUnit?: "px" | "%";
  buttonWidth?: number;
  buttonWidthUnit?: "%" | "px";
}

export const DRAG_TYPES = {
  COMPONENT: "COMPONENT",
  LAYOUT: "LAYOUT",
};

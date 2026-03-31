import React from "react";
import { BuilderComponent } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, AlignLeft, AlignCenter, AlignRight, AlignJustify, Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

interface ElementStylePanelProps {
  component: BuilderComponent | null;
  onUpdate: (updates: Partial<BuilderComponent>) => void;
  onClose: () => void;
}

interface StyleState {
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  fontFamily: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  width: string;
  height: string;
  borderRadius: string;
  borderColor: string;
  borderWidth: string;
  textAlign: "left" | "center" | "right" | "justify";
  justifyContent: "flex-start" | "center" | "flex-end" | "space-between";
  backgroundImageUrl: string;
  backgroundSize: "cover" | "contain" | "auto" | "stretch";
  backgroundPosition: "top" | "center" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  backgroundRepeat: "repeat" | "no-repeat" | "repeat-x" | "repeat-y";
  backgroundAttachment: "scroll" | "fixed";
  backgroundOpacity: string;
  contentVisibility: "all" | "desktop" | "tablet" | "mobile";
  displayConditions: string[];
  imageUrl: string;
  altText: string;
  videoUrl: string;
  heroBadgeText: string;
  heroHeadingText: string;
  heroDescriptionText: string;
  heroPrimaryButtonText: string;
  heroSecondaryButtonText: string;
  // Hero element sizing
  badgeWidth: string;
  badgeWidthUnit: "%" | "px";
  badgeFontSize: string;
  badgeFontSizeUnit: "%" | "px" | "rem";
  headingWidth: string;
  headingWidthUnit: "%" | "px";
  headingFontSize: string;
  headingFontSizeUnit: "%" | "px" | "rem";
  paragraphWidth: string;
  paragraphWidthUnit: "%" | "px";
  paragraphFontSize: string;
  paragraphFontSizeUnit: "%" | "px" | "rem";
  buttonWidth: string;
  buttonWidthUnit: "%" | "px";
  buttonFontSize: string;
  buttonFontSizeUnit: "%" | "px" | "rem";
  // Element-specific alignment for hero section
  badgeTextAlign: "left" | "center" | "right" | "justify";
  headingTextAlign: "left" | "center" | "right" | "justify";
  paragraphTextAlign: "left" | "center" | "right" | "justify";
  buttonTextAlign: "left" | "center" | "right" | "justify";
  selectedHeroElement?: string;
  featureIcon?: string;
  featureTitle?: string;
  featureDescription?: string;
  featureGridHeading?: string;
  featureGridDescription?: string;
  featureGridImageUrl?: string;
  featureGridPrimaryButtonText?: string;
  featureGridSecondaryButtonText?: string;
}

interface SpacingState {
  groupPadding: boolean;
  groupMargin: boolean;
}

interface SizingUnits {
  width: "%" | "px";
  height: "%" | "px";
  fontSize: "%" | "px";
}

interface SpacingUnits {
  paddingUnit: "%" | "px";
  marginUnit: "%" | "px";
}

export const ElementStylePanel: React.FC<ElementStylePanelProps> = ({
  component,
  onUpdate,
  onClose,
}) => {
  const clampPercentWidth = React.useCallback((value: string) => {
    if (value === "") return "";
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) return value;
    return String(Math.min(100, Math.max(0, numericValue)));
  }, []);

  const [styles, setStyles] = React.useState<StyleState>({
    backgroundColor: "#ffffff",
    textColor: "#000000",
    fontSize: "16",
    fontWeight: "400",
    lineHeight: "1.5",
    letterSpacing: "0",
    fontFamily: "system",
    paddingTop: "0",
    paddingRight: "0",
    paddingBottom: "0",
    paddingLeft: "0",
    marginTop: "0",
    marginRight: "0",
    marginBottom: "0",
    marginLeft: "0",
    width: "100",
    height: "",
    borderRadius: "0",
    borderColor: "#000000",
    borderWidth: "0",
    textAlign: "left",
    justifyContent: "flex-start",
    backgroundImageUrl: "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll",
    backgroundOpacity: "100",
    contentVisibility: "all",
    displayConditions: [],
    imageUrl: "",
    altText: "",
    videoUrl: "",
    heroBadgeText: "",
    heroHeadingText: "",
    heroDescriptionText: "",
    heroPrimaryButtonText: "",
    heroSecondaryButtonText: "",
    // Hero element sizing
    badgeWidth: "",
    badgeWidthUnit: "%",
    badgeFontSize: "",
    badgeFontSizeUnit: "rem",
    headingWidth: "",
    headingWidthUnit: "%",
    headingFontSize: "",
    headingFontSizeUnit: "rem",
    paragraphWidth: "",
    paragraphWidthUnit: "%",
    paragraphFontSize: "",
    paragraphFontSizeUnit: "rem",
    buttonWidth: "",
    buttonWidthUnit: "%",
    buttonFontSize: "",
    buttonFontSizeUnit: "rem",
    // Element-specific alignment for hero section
    badgeTextAlign: "left",
    headingTextAlign: "left",
    paragraphTextAlign: "left",
    buttonTextAlign: "left",
    selectedHeroElement: "",
    featureGridImageUrl: "",
    featureGridPrimaryButtonText: "",
    featureGridSecondaryButtonText: "",
  });

  const [spacing, setSpacing] = React.useState<SpacingState>({
    groupPadding: true,
    groupMargin: true,
  });

  const [sizingUnits, setSizingUnits] = React.useState<SizingUnits>({
    width: "%",
    height: "px",
    fontSize: "px",
  });

  const [spacingUnits, setSpacingUnits] = React.useState<SpacingUnits>({
    paddingUnit: "px",
    marginUnit: "px",
  });

  const [expandedSections, setExpandedSections] = React.useState({
    content: true,
    buttons: true,
    alignment: true,
    background: true,
    colors: true,
    typography: true,
    sizing: true,
    spacing: true,
    borders: true,
    contentVisibility: true,
    featureContent: true,
    featureHeader: true,
  });

  const [groupPaddingValues, setGroupPaddingValues] = React.useState(false);
  const [groupMarginValues, setGroupMarginValues] = React.useState(false);
  const [showImageDialog, setShowImageDialog] = React.useState(false);
  const [imageDialogUrl, setImageDialogUrl] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const closeImageDialog = React.useCallback(() => {
    setShowImageDialog(false);
    setImageDialogUrl("");
  }, []);

  const openImageDialog = React.useCallback(() => {
    setImageDialogUrl(
      component?.type === "image"
        ? styles.imageUrl || styles.backgroundImageUrl
        : styles.backgroundImageUrl,
    );
    setShowImageDialog(true);
  }, [component?.type, styles.imageUrl, styles.backgroundImageUrl]);

  function applyImageDialogUrl(url: string) {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      return;
    }

    handleStyleChange(
      component?.type === "image" ? "imageUrl" : "backgroundImageUrl",
      trimmedUrl,
    );
    closeImageDialog();
  }

  // Use ref to track pending updates to debounce
  const debounceTimerRef = React.useRef<NodeJS.Timeout>();
  const pendingUpdatesRef = React.useRef<Partial<BuilderComponent>>({});

  // Handle image file upload
  const handleImageUpload = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          applyImageDialogUrl(dataUrl);
          e.target.value = "";
        };
        reader.readAsDataURL(file);
      }
    },
    [applyImageDialogUrl]
  );

  React.useEffect(() => {
    if (component) {
      const props = component.props || {};

      // Get selected feature data if this is a feature-grid
      let featureIcon = "";
      let featureTitle = "";
      let featureDescription = "";
      let featureGridHeading = "";
      let featureGridDescription = "";

      if (component.type === "feature-grid" && component.selectedFeatureId && Array.isArray(component.features)) {
        const selectedFeature = component.features.find((f: any) => f.id === component.selectedFeatureId);
        if (selectedFeature) {
          featureIcon = selectedFeature.icon || "";
          featureTitle = selectedFeature.title || "";
          featureDescription = selectedFeature.description || "";
        }
      }

      // Get selected header element data if this is a feature-grid with a selected header element
      if (component.type === "feature-grid" && component.selectedHeaderElement && Array.isArray(component.headerElements)) {
        const selectedHeaderElement = component.headerElements.find((e: any) => e.id === component.selectedHeaderElement);
        if (selectedHeaderElement) {
          if (selectedHeaderElement.type === "heading") {
            featureGridHeading = selectedHeaderElement.text || "";
          } else if (selectedHeaderElement.type === "description") {
            featureGridDescription = selectedHeaderElement.text || "";
          }
        }
      }

      setStyles({
        backgroundColor: component.backgroundColor || props.backgroundColor || "#ffffff",
        textColor: component.textColor || props.textColor || "#000000",
        fontSize: component.fontSize ? String(component.fontSize) : (props.fontSize ? String(props.fontSize) : "16"),
        fontWeight: component.fontWeight || props.fontWeight || "400",
        lineHeight: component.lineHeight || props.lineHeight || "1.5",
        letterSpacing: component.letterSpacing ? String(component.letterSpacing) : (props.letterSpacing ? String(props.letterSpacing) : "0"),
        fontFamily: component.fontFamily || props.fontFamily || "system",
        paddingTop: component.paddingTop ? String(component.paddingTop) : (props.paddingTop ? String(props.paddingTop) : "0"),
        paddingRight: component.paddingRight ? String(component.paddingRight) : (props.paddingRight ? String(props.paddingRight) : "0"),
        paddingBottom: component.paddingBottom ? String(component.paddingBottom) : (props.paddingBottom ? String(props.paddingBottom) : "0"),
        paddingLeft: component.paddingLeft ? String(component.paddingLeft) : (props.paddingLeft ? String(props.paddingLeft) : "0"),
        marginTop: component.marginTop ? String(component.marginTop) : (props.marginTop ? String(props.marginTop) : "0"),
        marginRight: component.marginRight ? String(component.marginRight) : (props.marginRight ? String(props.marginRight) : "0"),
        marginBottom: component.marginBottom ? String(component.marginBottom) : (props.marginBottom ? String(props.marginBottom) : "0"),
        marginLeft: component.marginLeft ? String(component.marginLeft) : (props.marginLeft ? String(props.marginLeft) : "0"),
        width: component.width ? String(component.width) : (props.width ? String(props.width) : "100"),
        height: component.height ? String(component.height) : (props.height ? String(props.height) : ""),
        borderRadius: component.borderRadius ? String(component.borderRadius) : (props.borderRadius ? String(props.borderRadius) : "0"),
        borderColor: component.borderColor || props.borderColor || "#000000",
        borderWidth: component.borderWidth ? String(component.borderWidth) : (props.borderWidth ? String(props.borderWidth) : "0"),
        textAlign: component.textAlign || props.textAlign || "left",
        justifyContent: component.justifyContent || props.justifyContent || "flex-start",
        backgroundImageUrl: component.backgroundImageUrl || props.backgroundImageUrl || "",
        backgroundSize: component.backgroundSize || props.backgroundSize || "cover",
        backgroundPosition: component.backgroundPosition || props.backgroundPosition || "center",
        backgroundRepeat: component.backgroundRepeat || props.backgroundRepeat || "no-repeat",
        backgroundAttachment: component.backgroundAttachment || props.backgroundAttachment || "scroll",
        backgroundOpacity: component.backgroundOpacity ? String(component.backgroundOpacity) : (props.backgroundOpacity ? String(props.backgroundOpacity) : "100"),
        contentVisibility: (component.contentVisibility || props.contentVisibility || "all") as "all" | "desktop" | "tablet" | "mobile",
        displayConditions: component.displayConditions || props.displayConditions || [],
        imageUrl: component.imageUrl || props.imageUrl || "",
        altText: component.altText || props.altText || "",
        videoUrl: component.videoUrl || props.videoUrl || "",
        heroBadgeText: component.heroBadgeText || "",
        heroHeadingText: component.heroHeadingText || "",
        heroDescriptionText: component.heroDescriptionText || "",
        heroPrimaryButtonText: component.heroPrimaryButtonText || "",
        heroSecondaryButtonText: component.heroSecondaryButtonText || "",
        // Hero element sizing
        badgeWidth: component.badgeWidth ? String(component.badgeWidth) : "",
        badgeWidthUnit: component.badgeWidthUnit || "%",
        badgeFontSize: component.badgeFontSize ? String(component.badgeFontSize) : "",
        badgeFontSizeUnit: component.badgeFontSizeUnit || "rem",
        headingWidth: component.headingWidth ? String(component.headingWidth) : "",
        headingWidthUnit: component.headingWidthUnit || "%",
        headingFontSize: component.headingFontSize ? String(component.headingFontSize) : "",
        headingFontSizeUnit: component.headingFontSizeUnit || "rem",
        paragraphWidth: component.paragraphWidth ? String(component.paragraphWidth) : "",
        paragraphWidthUnit: component.paragraphWidthUnit || "%",
        paragraphFontSize: component.paragraphFontSize ? String(component.paragraphFontSize) : "",
        paragraphFontSizeUnit: component.paragraphFontSizeUnit || "rem",
        buttonWidth: component.buttonWidth ? String(component.buttonWidth) : "",
        buttonWidthUnit: component.buttonWidthUnit || "%",
        buttonFontSize: component.buttonFontSize ? String(component.buttonFontSize) : "",
        buttonFontSizeUnit: component.buttonFontSizeUnit || "rem",
        // Element-specific alignment for hero section
        badgeTextAlign: component.badgeTextAlign || "left",
        headingTextAlign: component.headingTextAlign || "left",
        paragraphTextAlign: component.paragraphTextAlign || "left",
        buttonTextAlign: component.buttonTextAlign || "left",
        selectedHeroElement: component.selectedHeroElement || "",
        featureIcon,
        featureTitle,
        featureDescription,
        featureGridHeading: featureGridHeading || component.featureGridHeading || "",
        featureGridDescription: featureGridDescription || component.featureGridDescription || "",
        featureGridImageUrl: component.featureGridImageUrl || "",
        featureGridPrimaryButtonText: component.featureGridPrimaryButtonText || "",
        featureGridSecondaryButtonText: component.featureGridSecondaryButtonText || "",
      });

      // Initialize units from component
      setSizingUnits({
        width: component.widthUnit || "%",
        height: component.heightUnit || "px",
        fontSize: component.fontSizeUnit || "px",
      });
    }
  }, [
    component?.id,
    component?.heroBadgeText,
    component?.heroHeadingText,
    component?.heroDescriptionText,
    component?.heroPrimaryButtonText,
    component?.heroSecondaryButtonText,
    component?.badgeWidth,
    component?.badgeWidthUnit,
    component?.badgeFontSize,
    component?.badgeFontSizeUnit,
    component?.badgeTextAlign,
    component?.headingWidth,
    component?.headingWidthUnit,
    component?.headingFontSize,
    component?.headingFontSizeUnit,
    component?.headingTextAlign,
    component?.paragraphWidth,
    component?.paragraphWidthUnit,
    component?.paragraphFontSize,
    component?.paragraphFontSizeUnit,
    component?.paragraphTextAlign,
    component?.buttonWidth,
    component?.buttonWidthUnit,
    component?.buttonFontSize,
    component?.buttonFontSizeUnit,
    component?.buttonTextAlign,
    component?.selectedHeroElement,
    component?.selectedFeatureId,
    component?.features,
    component?.selectedHeaderElement,
    component?.headerElements,
    clampPercentWidth,
  ]);

  const handleStyleChange = React.useCallback(
    (key: keyof StyleState, value: string | string[] | "all" | "desktop" | "tablet" | "mobile") => {
      // Handle text alignment for hero elements
      if (key === "textAlign" && component?.selectedHeroElement) {
        const alignmentKey = `${component.selectedHeroElement}TextAlign` as keyof StyleState;
        setStyles((prev) => ({
          ...prev,
          [alignmentKey]: value,
        }));
        const updates: any = {};
        updates[alignmentKey] = value;
        onUpdate(updates);
        return;
      }

      // Update local state immediately for responsive UI
      const nextValue =
        key === "badgeWidth" || key === "headingWidth" || key === "paragraphWidth" || key === "buttonWidth"
          ? clampPercentWidth(value as string)
          : value;
      setStyles((prev) => ({
        ...prev,
        [key]: nextValue,
      }));

      // Prepare the update for the parent
      const updates: any = {};
      if (
        key === "backgroundColor" ||
        key === "textColor" ||
        key === "borderColor" ||
        key === "heroBadgeText" ||
        key === "heroHeadingText" ||
        key === "heroDescriptionText" ||
        key === "heroPrimaryButtonText" ||
        key === "heroSecondaryButtonText" ||
        key === "featureIcon" ||
        key === "featureTitle" ||
        key === "featureDescription" ||
        key === "featureGridHeading" ||
        key === "featureGridDescription" ||
        key === "badgeWidth" ||
        key === "headingWidth" ||
        key === "paragraphWidth" ||
        key === "buttonWidth" ||
        key === "selectedHeroElement"
      ) {
        updates[key] = nextValue;
      } else if (
        key === "badgeFontSize" ||
        key === "headingFontSize" ||
        key === "paragraphFontSize" ||
        key === "buttonFontSize"
      ) {
        // Convert font size values to numbers
        updates[key] = nextValue === "" ? undefined : Number(nextValue);
      } else if (key === "displayConditions" || key === "contentVisibility") {
        // These are special properties that don't need conversion
        updates[key] = value;
      } else {
        updates[key] = isNaN(Number(value as string)) ? value : Number(value as string);
      }

      if (
        key === "heroBadgeText" ||
        key === "heroHeadingText" ||
        key === "heroDescriptionText" ||
        key === "heroPrimaryButtonText" ||
        key === "heroSecondaryButtonText" ||
        key === "featureIcon" ||
        key === "featureTitle" ||
        key === "featureDescription" ||
        key === "featureGridHeading" ||
        key === "featureGridDescription" ||
        key === "badgeWidth" ||
        key === "badgeFontSize" ||
        key === "headingWidth" ||
        key === "headingFontSize" ||
        key === "paragraphWidth" ||
        key === "paragraphFontSize" ||
        key === "buttonWidth" ||
        key === "buttonFontSize" ||
        key === "selectedHeroElement"
      ) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        pendingUpdatesRef.current = {};
        onUpdate(updates);
        // Also update local state for font size to ensure UI shows correct value
        if (key === "badgeFontSize" || key === "headingFontSize" || key === "paragraphFontSize" || key === "buttonFontSize") {
          setStyles((prev) => ({
            ...prev,
            [key]: String(updates[key] || ""),
          }));
        }
        return;
      }

      // Store in pending updates
      pendingUpdatesRef.current = {
        ...pendingUpdatesRef.current,
        ...updates,
      };

      // Clear existing debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Debounce the update call to prevent parent re-renders while typing
      debounceTimerRef.current = setTimeout(() => {
        onUpdate(pendingUpdatesRef.current);
        pendingUpdatesRef.current = {};
      }, 300); // 300ms debounce
    },
    [onUpdate, clampPercentWidth]
  );

  const handleGroupPaddingToggle = () => {
    setSpacing((prev) => ({
      ...prev,
      groupPadding: !prev.groupPadding,
    }));
  };

  const handleGroupMarginToggle = () => {
    setSpacing((prev) => ({
      ...prev,
      groupMargin: !prev.groupMargin,
    }));
  };

  React.useEffect(() => {
    // Cleanup debounce timer on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleUnitChange = React.useCallback(
    (property: keyof SizingUnits, newUnit: "%" | "px") => {
      setSizingUnits((prev) => ({
        ...prev,
        [property]: newUnit,
      }));

      // Update the component with the unit
      const updates: any = {};
      updates[`${property}Unit`] = newUnit; // Store the unit (widthUnit, heightUnit, fontSizeUnit)
      onUpdate(updates);
    },
    [onUpdate]
  );

  const handleSpacingUnitChange = React.useCallback(
    (property: keyof SpacingUnits, newUnit: "%" | "px") => {
      setSpacingUnits((prev) => ({
        ...prev,
        [property]: newUnit,
      }));

      // Update the component with the unit
      const updates: any = {};
      updates[`${property}`] = newUnit;
      onUpdate(updates);
    },
    [onUpdate]
  );

  const handleHeroFontSizeUnitChange = React.useCallback(
    (
      property: "badgeFontSizeUnit" | "headingFontSizeUnit" | "paragraphFontSizeUnit" | "buttonFontSizeUnit",
      newUnit: "%" | "px" | "rem",
    ) => {
      setStyles((prev) => ({
        ...prev,
        [property]: newUnit,
      }));
      onUpdate({ [property]: newUnit } as Partial<BuilderComponent>);
    },
    [onUpdate],
  );

  const handleHeroWidthUnitChange = React.useCallback(
    (
      property: "badgeWidthUnit" | "headingWidthUnit" | "paragraphWidthUnit" | "buttonWidthUnit",
      newUnit: "%" | "px",
    ) => {
      setStyles((prev) => ({
        ...prev,
        [property]: newUnit,
      }));
      onUpdate({ [property]: newUnit } as Partial<BuilderComponent>);
    },
    [onUpdate],
  );

  const toggleSection = React.useCallback(
    (section: keyof typeof expandedSections) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    },
    []
  );

  const SectionHeader = React.useMemo(
    () =>
      ({
        title,
        section,
      }: {
        title: string;
        section: keyof typeof expandedSections;
      }) =>
        (
          <button
            onClick={() => toggleSection(section)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors group"
          >
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              {title}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-400 transition-transform",
                expandedSections[section] && "rotate-180"
              )}
            />
          </button>
        ),
    [expandedSections, toggleSection]
  );

  const StyleInput = React.useMemo(
    () =>
      ({
        label,
        value,
        onChange,
        type = "text",
        placeholder = "",
      }: {
        label: string;
        value: string;
        onChange: (value: string) => void;
        type?: string;
        placeholder?: string;
      }) =>
        (
          <div className="space-y-2 px-4 py-3 border-b border-gray-100">
            <label className="text-xs font-bold text-gray-700">{label}</label>
            {type === "color" ? (
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    onChange(e.dataTransfer.getData("text"));
                  }}
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
                />
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="#000000"
                  className="flex-1 text-xs font-mono h-9"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type={type}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  className="h-9 text-sm"
                />
                {type === "number" && (
                  <span className="text-xs text-gray-500">
                    {label.includes("Font") ? "px" : label.includes("(") ? label.split("(")[1]?.slice(0, -1) : "px"}
                  </span>
                )}
              </div>
            )}
          </div>
        ),
    []
  );

  const SizingInput = React.useMemo(
    () =>
      ({
        label,
        value,
        onChange,
        unit,
        onUnitChange,
        placeholder = "",
        property = "height",
      }: {
        label: string;
        value: string;
        onChange: (value: string) => void;
        unit: "%" | "px";
        onUnitChange: (unit: "%" | "px") => void;
        placeholder?: string;
        property?: "width" | "height" | "fontSize";
      }) => {
        // For width and height in percentage, cap at 100
        const isPercentageCapped =
          (property === "width" || property === "height") && unit === "%";
        const maxValue = isPercentageCapped ? 100 : undefined;
        const displayValue =
          isPercentageCapped && Number(value) > 100 ? "100" : value;

        return (
          <div className="space-y-2 border-b border-gray-100">
            <label className="text-xs font-bold text-gray-700">{label}</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={displayValue}
                onChange={(e) => {
                  let newValue = e.target.value;
                  // Prevent width and height from exceeding 100 when unit is %
                  if (isPercentageCapped && Number(newValue) > 100) {
                    newValue = "100";
                  }
                  onChange(newValue);
                }}
                max={maxValue}
                placeholder={placeholder}
                className="h-9 text-sm flex-1"
              />
              <select
                value={unit}
                onChange={(e) => onUnitChange(e.target.value as "%" | "px")}
                className="px-3 py-2 h-9 border border-gray-200 rounded-lg text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
              >
                <option value="%">%</option>
                <option value="px">px</option>
              </select>
            </div>
          </div>
        );
      },
    []
  );

  if (!component) {
    return (
      <div className="flex flex-col h-full min-h-0">
        <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-700">Style Panel</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          Select an element to edit
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden min-h-0">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-700">
            {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Content Section - for editable text components */}
        {(component.type === "heading" || component.type === "paragraph" || component.type === "button") && (
          <div>
            <SectionHeader title="Content" section="content" />
            {expandedSections.content && (
              <div className="px-4 py-3 space-y-3 bg-gray-50 border-b border-gray-200">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    {component.type === "heading" ? "Heading Text" : component.type === "button" ? "Button Text" : "Paragraph Text"}
                  </label>
                  {component.type === "button" ? (
                    <Input
                      type="text"
                      value={component.contentText || ""}
                      onChange={(e) => onUpdate({ contentText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter button text..."
                    />
                  ) : (
                    <textarea
                      value={component.contentText || ""}
                      onChange={(e) => onUpdate({ contentText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
                      placeholder={component.type === "heading" ? "Enter heading text..." : "Enter paragraph text..."}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Media Section - for image and video components */}
        {(component.type === "image" || component.type === "video") && (
          <div>
            <SectionHeader title={component.type === "image" ? "Image" : "Video"} section="content" />
            {expandedSections.content && (
              <div className="px-4 py-3 space-y-3 bg-gray-50 border-b border-gray-200">
                {component.type === "image" ? (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-2">Image URL</label>
                      <Input
                        type="text"
                        value={styles.imageUrl}
                        onChange={(e) => {
                          handleStyleChange("imageUrl", e.target.value);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-2">Alt Text</label>
                      <Input
                        type="text"
                        value={styles.altText}
                        onChange={(e) => {
                          handleStyleChange("altText", e.target.value);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description of the image"
                      />
                    </div>
                    <button
                      onClick={openImageDialog}
                      className="w-full px-3 py-2 text-xs font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Add Image
                    </button>
                  </>
                ) : (
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-2">Video URL</label>
                    <Input
                      type="text"
                      value={styles.videoUrl}
                      onChange={(e) => {
                        handleStyleChange("videoUrl", e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/video.mp4"
                    />
                    <p className="mt-2 text-[11px] text-gray-500">
                      Use a direct video file URL for the HTML video element.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Hero Content Section */}
        {component.type === "hero" && (
          <div>
            <SectionHeader title="Content" section="content" />
            {expandedSections.content && (
              <div className="px-4 py-3 space-y-4 bg-gray-50 border-b border-gray-200">
                {/* Badge Text */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Badge Text</label>
                  <Input
                    type="text"
                    value={styles.heroBadgeText}
                    onChange={(e) => handleStyleChange("heroBadgeText", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter badge text..."
                  />
                </div>

                {/* Heading Text */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Heading Text</label>
                  <textarea
                    value={styles.heroHeadingText}
                    onChange={(e) => handleStyleChange("heroHeadingText", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
                    placeholder="Enter heading text..."
                  />
                </div>

                {/* Description Text */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Description Text</label>
                  <textarea
                    value={styles.heroDescriptionText}
                    onChange={(e) => handleStyleChange("heroDescriptionText", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
                    placeholder="Enter description text..."
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Feature Grid Header Section */}
        {component?.type === "feature-grid" && component?.selectedHeaderElement && (
          <div>
            <SectionHeader title="Content" section="featureHeader" />
            {expandedSections.featureHeader && (
              <div className="px-4 py-3 space-y-4 bg-gray-50">
                <div>
                  {(() => {
                    const selectedHeaderElement = component?.headerElements?.find((e: any) => e.id === component?.selectedHeaderElement);
                    const isHeading = selectedHeaderElement?.type === "heading";
                    return (
                      <>
                        <label className="text-xs font-semibold text-gray-700 block mb-2">
                          {isHeading ? "Heading Text" : "Description Text"}
                        </label>
                        {isHeading ? (
                          <Input
                            type="text"
                            value={styles.featureGridHeading || ""}
                            onChange={(e) => handleStyleChange("featureGridHeading", e.target.value)}
                            placeholder="Enter heading text"
                            className="text-xs h-8"
                          />
                        ) : (
                          <textarea
                            value={styles.featureGridDescription || ""}
                            onChange={(e) => handleStyleChange("featureGridDescription", e.target.value)}
                            placeholder="Enter description text"
                            className="w-full text-xs border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                            rows={3}
                          />
                        )}
                      </>
                    );
                  })()}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    Section Image URL
                  </label>
                  <Input
                    type="text"
                    value={styles.featureGridImageUrl || ""}
                    onChange={(e) => handleStyleChange("featureGridImageUrl", e.target.value)}
                    placeholder="Enter image URL"
                    className="text-xs h-8"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Feature Grid Content Section */}
        {component?.type === "feature-grid" && component?.selectedFeatureId && (
          <div>
            <SectionHeader title="Feature Content" section="featureContent" />
            {expandedSections.featureContent && (
              <div className="px-4 py-3 space-y-4 bg-gray-50">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    Feature Number / Icon
                  </label>
                  <Input
                    type="text"
                    value={styles.featureIcon || ""}
                    onChange={(e) => handleStyleChange("featureIcon", e.target.value)}
                    placeholder="01, 02, 03 or icon text"
                    maxLength={2}
                    className="text-xs h-8"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    Feature Heading
                  </label>
                  <Input
                    type="text"
                    value={styles.featureTitle || ""}
                    onChange={(e) => handleStyleChange("featureTitle", e.target.value)}
                    placeholder="Enter feature title"
                    className="text-xs h-8"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    Feature Description
                  </label>
                  <textarea
                    value={styles.featureDescription || ""}
                    onChange={(e) => handleStyleChange("featureDescription", e.target.value)}
                    placeholder="Enter feature description"
                    className="w-full text-xs border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features Content Section */}
        {component?.type === "features" && (
          <div>
            <SectionHeader title="Content" section="featureContent" />
            {expandedSections.featureContent && (
              <div className="px-4 py-3 space-y-4 bg-gray-50 border-b border-gray-200">
                {component?.headerElements && component.headerElements.length > 0 ? (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-2">
                        Header Elements
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {component.headerElements.map((element: any) => (
                          <div
                            key={element.id}
                            className={cn(
                              "p-2 border rounded text-xs cursor-pointer hover:bg-white transition-colors",
                              component.selectedHeaderElement === element.id
                                ? "border-blue-400 bg-blue-50"
                                : "border-gray-200"
                            )}
                            onClick={() => {
                              onUpdate({ selectedHeaderElement: element.id });
                            }}
                          >
                            <div className="font-medium text-gray-700">
                              {element.type === "heading" ? "🎯 Heading" : "📝 Description"}
                            </div>
                            <div className="text-gray-500 truncate mt-1">
                              {element.text || "(empty)"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {component?.selectedHeaderElement && (
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-2">
                          Edit {component.headerElements.find((e: any) => e.id === component.selectedHeaderElement)?.type === "heading" ? "Heading" : "Description"}
                        </label>
                        {component.headerElements.find((e: any) => e.id === component.selectedHeaderElement)?.type === "heading" ? (
                          <Input
                            type="text"
                            value={component.headerElements.find((e: any) => e.id === component.selectedHeaderElement)?.text || ""}
                            onChange={(e) => onUpdate({ headerElementText: e.target.value })}
                            placeholder="Enter heading text"
                            className="text-xs h-8"
                          />
                        ) : (
                          <textarea
                            value={component.headerElements.find((e: any) => e.id === component.selectedHeaderElement)?.text || ""}
                            onChange={(e) => onUpdate({ headerElementText: e.target.value })}
                            placeholder="Enter description text"
                            className="w-full text-xs border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                            rows={3}
                          />
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-xs text-gray-500 text-center py-4">
                    No header elements found. Create one by clicking copy/add on heading or description in the editor.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {component.type === "hero" && (
          <div>
            <SectionHeader title="Buttons" section="buttons" />
            {expandedSections.buttons && (
              <div className="px-4 py-3 space-y-4 bg-gray-50 border-b border-gray-200">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Primary Button Text</label>
                  <Input
                    type="text"
                    value={styles.heroPrimaryButtonText}
                    onChange={(e) => handleStyleChange("heroPrimaryButtonText", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Start Free Trial"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">Secondary Button Text</label>
                  <Input
                    type="text"
                    value={styles.heroSecondaryButtonText}
                    onChange={(e) => handleStyleChange("heroSecondaryButtonText", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Watch Demo"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Alignment Section - Hide when editing feature-grid content */}
        {!(component?.type === "feature-grid" && (component?.selectedFeatureId || component?.selectedHeaderElement)) && (
          <div>
            <SectionHeader title="Alignment" section="alignment" />
            {expandedSections.alignment && (
              <div className="px-4 py-4 space-y-4 bg-gray-50">
              {/* Text Alignment */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Text Alignment
                  {component?.selectedHeroElement && (
                    <span className="text-gray-500 text-xs ml-2">
                      ({component.selectedHeroElement})
                    </span>
                  )}
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "left" as const, icon: AlignLeft },
                    { value: "center" as const, icon: AlignCenter },
                    { value: "right" as const, icon: AlignRight },
                    { value: "justify" as const, icon: AlignJustify },
                  ].map((opt) => {
                    const IconComponent = opt.icon;
                    const currentAlignment = component?.selectedHeroElement
                      ? styles[`${component.selectedHeroElement}TextAlign` as keyof StyleState]
                      : styles.textAlign;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleStyleChange("textAlign", opt.value)}
                        className={cn(
                          "flex-1 py-2 px-2 rounded flex items-center justify-center transition-colors border",
                          currentAlignment === opt.value
                            ? "bg-blue-100 border-blue-400 text-blue-600"
                            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                        )}
                        title={`Text align ${opt.value}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content Alignment (Block/Justify Content) */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Content Alignment</label>
                <div className="flex gap-2">
                  {[
                    { value: "flex-start" as const, icon: AlignLeft, label: "Start" },
                    { value: "center" as const, icon: AlignCenter, label: "Center" },
                    { value: "flex-end" as const, icon: AlignRight, label: "End" },
                    { value: "space-between" as const, icon: AlignJustify, label: "Between" },
                  ].map((opt) => {
                    const IconComponent = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleStyleChange("justifyContent", opt.value)}
                        className={cn(
                          "flex-1 py-2 px-2 rounded flex items-center justify-center transition-colors border",
                          styles.justifyContent === opt.value
                            ? "bg-blue-100 border-blue-400 text-blue-600"
                            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                        )}
                        title={`Content align ${opt.label}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>
              </div>
            )}
          </div>
        )}

        {/* Background Section */}
        <div>
          <SectionHeader title="Background" section="background" />
          {expandedSections.background && (
            <div className="px-4 py-4 space-y-4 bg-gray-50">
              {/* Background Color */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={styles.backgroundColor}
                    onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={styles.backgroundColor}
                    onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                    className="flex-1 text-xs"
                  />
                </div>
              </div>

              {/* Image */}
              <div className="border-t pt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={openImageDialog}
                  className="w-full px-3 py-2 text-xs font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Add Image
                </button>

                {/* Image Dialog */}
                {showImageDialog && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">Add Image</h3>
                          <button
                            onClick={closeImageDialog}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        {/* Upload Tab */}
                        <div className="space-y-4">
                          <label className="block">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-sm font-medium text-gray-700">Click to upload or drag image</p>
                              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </label>

                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-white text-gray-500">Or paste URL</span>
                            </div>
                          </div>

                          <Input
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            value={imageDialogUrl}
                            onChange={(e) => setImageDialogUrl(e.target.value)}
                            className="text-xs"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && imageDialogUrl) {
                                applyImageDialogUrl(imageDialogUrl);
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div className="p-6 border-t border-gray-200 flex gap-2 justify-end">
                        <button
                          onClick={closeImageDialog}
                          className="px-4 py-2 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => applyImageDialogUrl(imageDialogUrl)}
                          disabled={!imageDialogUrl.trim()}
                          className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add Image
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Image URL</label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="text"
                    value={styles.backgroundImageUrl}
                    onChange={(e) => handleStyleChange("backgroundImageUrl", e.target.value)}
                    className="flex-1 text-xs"
                    placeholder="https://..."
                  />
                  <button className="px-2 py-1.5 text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Background Size */}
              <div className="border-t pt-4">
                <label className="text-xs font-semibold text-gray-700 block mb-2">Size</label>
                <select
                  value={styles.backgroundSize}
                  onChange={(e) => handleStyleChange("backgroundSize", e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="cover">Cover</option>
                  <option value="contain">Contain</option>
                  <option value="auto">Auto</option>
                  <option value="stretch">Stretch</option>
                </select>
              </div>

              {/* Background Position */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Position</label>
                <select
                  value={styles.backgroundPosition}
                  onChange={(e) => handleStyleChange("backgroundPosition", e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="top">Top</option>
                  <option value="center">Center</option>
                  <option value="bottom">Bottom</option>
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </div>

              {/* Background Repeat */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Repeat</label>
                <select
                  value={styles.backgroundRepeat}
                  onChange={(e) => handleStyleChange("backgroundRepeat", e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="no-repeat">No Repeat</option>
                  <option value="repeat">Repeat</option>
                  <option value="repeat-x">Repeat X</option>
                  <option value="repeat-y">Repeat Y</option>
                </select>
              </div>

              {/* Background Attachment */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Attachment</label>
                <select
                  value={styles.backgroundAttachment}
                  onChange={(e) => handleStyleChange("backgroundAttachment", e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="scroll">Scroll</option>
                  <option value="fixed">Fixed (Parallax)</option>
                </select>
              </div>

              {/* Background Opacity */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Opacity: {styles.backgroundOpacity}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={styles.backgroundOpacity}
                  onChange={(e) => handleStyleChange("backgroundOpacity", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Colors Section */}
        <div>
          <SectionHeader title="Colors" section="colors" />
          {expandedSections.colors && (
            <>
              <StyleInput
                label="Background Color"
                value={styles.backgroundColor}
                onChange={(value) =>
                  handleStyleChange("backgroundColor", value)
                }
                type="color"
              />
              <StyleInput
                label="Text Color"
                value={styles.textColor}
                onChange={(value) => handleStyleChange("textColor", value)}
                type="color"
              />
              <StyleInput
                label="Border Color"
                value={styles.borderColor}
                onChange={(value) => handleStyleChange("borderColor", value)}
                type="color"
              />
            </>
          )}
        </div>

        {/* Typography Section */}
        <div>
          <SectionHeader title="Typography" section="typography" />
          {expandedSections.typography && (
            <div className="px-4 py-3 space-y-4 bg-gray-50">
              {/* Font Family */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Font Family</label>
                <select
                  value={styles.fontFamily}
                  onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="system">System (Sans-serif)</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Monospace</option>
                </select>
              </div>

              {/* Font Weight */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Font Weight</label>
                <select
                  value={styles.fontWeight}
                  onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semibold (600)</option>
                  <option value="700">Bold (700)</option>
                  <option value="800">Extrabold (800)</option>
                  <option value="900">Black (900)</option>
                </select>
              </div>

              {/* Line Height */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Line Height</label>
                <Input
                  type="number"
                  step="0.1"
                  value={styles.lineHeight}
                  onChange={(e) => handleStyleChange("lineHeight", e.target.value)}
                  placeholder="1.5"
                  className="h-9 text-sm"
                />
              </div>

              {/* Letter Spacing */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Letter Spacing (px)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={styles.letterSpacing}
                  onChange={(e) => handleStyleChange("letterSpacing", e.target.value)}
                  placeholder="0"
                  className="h-9 text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sizing Section */}
        <div>
          <SectionHeader title="Sizing" section="sizing" />
          {expandedSections.sizing && (
            <div className="px-4 py-3 space-y-4 bg-gray-50 border-b border-gray-200">
              {component.type !== "hero" && (
                <SizingInput
                  label="Width"
                  value={styles.width}
                  onChange={(value) => handleStyleChange("width", value)}
                  unit={sizingUnits.width}
                  onUnitChange={(unit) => handleUnitChange("width", unit)}
                  placeholder="100"
                  property="width"
                />
              )}
              <SizingInput
                label="Height"
                value={styles.height}
                onChange={(value) => handleStyleChange("height", value)}
                unit={sizingUnits.height}
                onUnitChange={(unit) => handleUnitChange("height", unit)}
                placeholder="auto"
                property="height"
              />
              {component.type === "hero" && component.selectedHeroElement === "paragraph" && (
                <>
                  <div className="flex gap-2 items-center">
                    <label className="text-xs font-bold text-gray-700 min-w-16">Width</label>
                    <Input
                      type="number"
                      value={styles.paragraphWidth}
                      onChange={(e) => handleStyleChange("paragraphWidth" as any, e.target.value)}
                      min={0}
                      max={styles.paragraphWidthUnit === "%" ? 100 : undefined}
                      placeholder="auto"
                      className="flex-1 text-xs h-8"
                    />
                    <select
                      value={styles.paragraphWidthUnit}
                      onChange={(e) => handleHeroWidthUnitChange("paragraphWidthUnit", e.target.value as "%" | "px")}
                      className="px-2 py-1 h-8 border border-gray-200 rounded text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
                    >
                      <option value="%">%</option>
                      <option value="px">px</option>
                    </select>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-xs text-gray-600 min-w-16">Font Size</label>
                    <Input
                      type="number"
                      value={styles.paragraphFontSize}
                      onChange={(e) => handleStyleChange("paragraphFontSize" as any, e.target.value)}
                      placeholder="1.125"
                      className="flex-1 text-xs h-8"
                    />
                    <select
                      value={styles.paragraphFontSizeUnit}
                      onChange={(e) => handleHeroFontSizeUnitChange("paragraphFontSizeUnit", e.target.value as "%" | "px" | "rem")}
                      className="px-2 py-1 h-8 border border-gray-200 rounded text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
                    >
                      <option value="rem">rem</option>
                      <option value="px">px</option>
                    </select>
                  </div>
                </>
              )}
              {component.type !== "hero" && (
                <SizingInput
                  label="Font Size"
                  value={styles.fontSize}
                  onChange={(value) => handleStyleChange("fontSize", value)}
                  unit={sizingUnits.fontSize}
                  onUnitChange={(unit) => handleUnitChange("fontSize", unit)}
                  placeholder="16"
                  property="fontSize"
                />
              )}

              {component.type === "hero" && component.selectedHeroElement && component.selectedHeroElement !== "paragraph" && (
                <div className="pt-2 border-t border-gray-200 space-y-4">
                  <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Edit {component.selectedHeroElement.charAt(0).toUpperCase() + component.selectedHeroElement.slice(1)}
                  </div>

                  {component.selectedHeroElement === "badge" && (
                    <>
                      <div className="flex gap-2 items-center">
                        <label className="text-xs font-bold text-gray-700 min-w-16">Width</label>
                        <Input
                          type="number"
                          value={styles.badgeWidth}
                          onChange={(e) => handleStyleChange("badgeWidth" as any, e.target.value)}
                          min={0}
                          max={styles.badgeWidthUnit === "%" ? 100 : undefined}
                          placeholder="auto"
                          className="flex-1 text-xs h-8"
                        />
                        <select
                          value={styles.badgeWidthUnit}
                          onChange={(e) => handleHeroWidthUnitChange("badgeWidthUnit", e.target.value as "%" | "px")}
                          className="px-2 py-1 h-8 border border-gray-200 rounded text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
                        >
                          <option value="%">%</option>
                          <option value="px">px</option>
                        </select>
                      </div>
                      <div className="flex gap-2 items-center">
                        <label className="text-xs font-bold text-gray-700 min-w-16">Font Size</label>
                        <Input
                          type="number"
                          value={styles.badgeFontSize}
                          onChange={(e) => handleStyleChange("badgeFontSize" as any, e.target.value)}
                          placeholder="0.75"
                          className="flex-1 text-xs h-8"
                        />
                        <select
                          value={styles.badgeFontSizeUnit}
                          onChange={(e) => handleHeroFontSizeUnitChange("badgeFontSizeUnit", e.target.value as "%" | "px" | "rem")}
                          className="px-2 py-1 h-8 border border-gray-200 rounded text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
                        >
                          <option value="rem">rem</option>
                          <option value="px">px</option>
                        </select>
                      </div>
                    </>
                  )}

                  {component.selectedHeroElement === "heading" && (
                    <>
                      <div className="flex gap-2 items-center">
                        <label className="text-xs font-bold text-gray-700 min-w-16">Width</label>
                        <Input
                          type="number"
                          value={styles.headingWidth}
                          onChange={(e) => handleStyleChange("headingWidth" as any, e.target.value)}
                          min={0}
                          max={styles.headingWidthUnit === "%" ? 100 : undefined}
                          placeholder="auto"
                          className="flex-1 text-xs h-8"
                        />
                        <select
                          value={styles.headingWidthUnit}
                          onChange={(e) => handleHeroWidthUnitChange("headingWidthUnit", e.target.value as "%" | "px")}
                          className="px-2 py-1 h-8 border border-gray-200 rounded text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
                        >
                          <option value="%">%</option>
                          <option value="px">px</option>
                        </select>
                      </div>
                      <div className="flex gap-2 items-center">
                        <label className="text-xs font-bold text-gray-700 min-w-16">Font Size</label>
                        <Input
                          type="number"
                          value={styles.headingFontSize}
                          onChange={(e) => handleStyleChange("headingFontSize" as any, e.target.value)}
                          placeholder="3.75"
                          className="flex-1 text-xs h-8"
                        />
                        <select
                          value={styles.headingFontSizeUnit}
                          onChange={(e) => handleHeroFontSizeUnitChange("headingFontSizeUnit", e.target.value as "%" | "px" | "rem")}
                          className="px-2 py-1 h-8 border border-gray-200 rounded text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
                        >
                          <option value="rem">rem</option>
                          <option value="px">px</option>
                        </select>
                      </div>
                    </>
                  )}

                  {component.selectedHeroElement === "buttons" && (
                    <>
                      <div className="flex gap-2 items-center">
                        <label className="text-xs font-bold text-gray-700 min-w-16">Width</label>
                        <Input
                          type="number"
                          value={styles.buttonWidth}
                          onChange={(e) => handleStyleChange("buttonWidth" as any, e.target.value)}
                          min={0}
                          max={styles.buttonWidthUnit === "%" ? 100 : undefined}
                          placeholder="auto"
                          className="flex-1 text-xs h-8"
                        />
                        <select
                          value={styles.buttonWidthUnit}
                          onChange={(e) => handleHeroWidthUnitChange("buttonWidthUnit", e.target.value as "%" | "px")}
                          className="px-2 py-1 h-8 border border-gray-200 rounded text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
                        >
                          <option value="%">%</option>
                          <option value="px">px</option>
                        </select>
                      </div>
                      <div className="flex gap-2 items-center">
                        <label className="text-xs font-bold text-gray-700 min-w-16">Font Size</label>
                        <Input
                          type="number"
                          value={styles.buttonFontSize}
                          onChange={(e) => handleStyleChange("buttonFontSize" as any, e.target.value)}
                          placeholder="1.125"
                          className="flex-1 text-xs h-8"
                        />
                        <select
                          value={styles.buttonFontSizeUnit}
                          onChange={(e) => handleHeroFontSizeUnitChange("buttonFontSizeUnit", e.target.value as "%" | "px" | "rem")}
                          className="px-2 py-1 h-8 border border-gray-200 rounded text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
                        >
                          <option value="rem">rem</option>
                          <option value="px">px</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Spacing Section */}
        <div>
          <SectionHeader title="Spacing" section="spacing" />
          {expandedSections.spacing && (
            <div className="px-4 py-3 space-y-4 bg-gray-50">
              {/* Padding Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    Padding
                    <span className="text-gray-400 text-xs">ⓘ</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={spacingUnits.paddingUnit}
                      onChange={(e) => handleSpacingUnitChange("paddingUnit", e.target.value as "%" | "px")}
                      className="px-2 py-1 h-6 border border-gray-200 rounded text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
                    >
                      <option value="px">px</option>
                      <option value="%">%</option>
                    </select>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={spacing.groupPadding}
                        onChange={handleGroupPaddingToggle}
                        className="w-3 h-3"
                      />
                      <span className="text-xs text-gray-600">Group sides</span>
                    </label>
                  </div>
                </div>

                {spacing.groupPadding ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-gray-400">⊞</span>
                    <Input
                      type="number"
                      value={styles.paddingTop}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (spacingUnits.paddingUnit === "%" && Number(value) > 100) {
                          value = "100";
                        }
                        handleStyleChange("paddingTop", value);
                        handleStyleChange("paddingRight", value);
                        handleStyleChange("paddingBottom", value);
                        handleStyleChange("paddingLeft", value);
                      }}
                      placeholder="0"
                      max={spacingUnits.paddingUnit === "%" ? 100 : undefined}
                      className="w-12 text-xs h-7"
                    />
                    <span className="text-xs text-gray-400">{spacingUnits.paddingUnit}</span>
                    <div className="flex flex-col gap-0 ml-auto">
                      <button
                        onClick={() => {
                          const current = Number(styles.paddingTop);
                          const newVal = spacingUnits.paddingUnit === "%" ? Math.min(100, current + 1) : current + 1;
                          const val = String(newVal);
                          handleStyleChange("paddingTop", val);
                          handleStyleChange("paddingRight", val);
                          handleStyleChange("paddingBottom", val);
                          handleStyleChange("paddingLeft", val);
                        }}
                        className="text-xs text-gray-600 hover:text-gray-900 leading-3"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => {
                          const val = String(Math.max(0, Number(styles.paddingTop) - 1));
                          handleStyleChange("paddingTop", val);
                          handleStyleChange("paddingRight", val);
                          handleStyleChange("paddingBottom", val);
                          handleStyleChange("paddingLeft", val);
                        }}
                        className="text-xs text-gray-600 hover:text-gray-900 leading-3"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { propKey: "paddingTop", label: "⊞" },
                      { propKey: "paddingRight", label: "⊞" },
                      { propKey: "paddingBottom", label: "⊞" },
                      { propKey: "paddingLeft", label: "⊞" },
                    ].map(({ propKey, label }) => (
                      <div key={propKey} className="flex gap-1.5 items-center">
                        <span className="text-xs text-gray-400">{label}</span>
                        <Input
                          type="number"
                          value={styles[propKey as keyof StyleState]}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (spacingUnits.paddingUnit === "%" && Number(value) > 100) {
                              value = "100";
                            }
                            handleStyleChange(propKey as keyof StyleState, value);
                          }}
                          max={spacingUnits.paddingUnit === "%" ? 100 : undefined}
                          className="w-10 text-xs h-7"
                        />
                        <span className="text-xs text-gray-400">{spacingUnits.paddingUnit}</span>
                        <div className="flex flex-col gap-0">
                          <button
                            onClick={() => {
                              const current = Number(styles[propKey as keyof StyleState]);
                              const newVal = spacingUnits.paddingUnit === "%" ? Math.min(100, current + 1) : current + 1;
                              handleStyleChange(propKey as keyof StyleState, String(newVal));
                            }}
                            className="text-xs text-gray-600 hover:text-gray-900 leading-3"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleStyleChange(propKey as keyof StyleState, String(Math.max(0, Number(styles[propKey as keyof StyleState]) - 1)))}
                            className="text-xs text-gray-600 hover:text-gray-900 leading-3"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Margin Section */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    Margin
                    <span className="text-gray-400 text-xs">ⓘ</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={spacingUnits.marginUnit}
                      onChange={(e) => handleSpacingUnitChange("marginUnit", e.target.value as "%" | "px")}
                      className="px-2 py-1 h-6 border border-gray-200 rounded text-xs font-medium bg-white cursor-pointer hover:border-gray-300 transition-colors"
                    >
                      <option value="px">px</option>
                      <option value="%">%</option>
                    </select>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={spacing.groupMargin}
                        onChange={handleGroupMarginToggle}
                        className="w-3 h-3"
                      />
                      <span className="text-xs text-gray-600">Group sides</span>
                    </label>
                  </div>
                </div>

                {spacing.groupMargin ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-gray-400">⊞</span>
                    <Input
                      type="number"
                      value={styles.marginTop}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (spacingUnits.marginUnit === "%" && Number(value) > 100) {
                          value = "100";
                        }
                        handleStyleChange("marginTop", value);
                        handleStyleChange("marginRight", value);
                        handleStyleChange("marginBottom", value);
                        handleStyleChange("marginLeft", value);
                      }}
                      placeholder="0"
                      max={spacingUnits.marginUnit === "%" ? 100 : undefined}
                      className="w-12 text-xs h-7"
                    />
                    <span className="text-xs text-gray-400">{spacingUnits.marginUnit}</span>
                    <div className="flex flex-col gap-0 ml-auto">
                      <button
                        onClick={() => {
                          const current = Number(styles.marginTop);
                          const newVal = spacingUnits.marginUnit === "%" ? Math.min(100, current + 1) : current + 1;
                          const val = String(newVal);
                          handleStyleChange("marginTop", val);
                          handleStyleChange("marginRight", val);
                          handleStyleChange("marginBottom", val);
                          handleStyleChange("marginLeft", val);
                        }}
                        className="text-xs text-gray-600 hover:text-gray-900 leading-3"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => {
                          const val = String(Math.max(0, Number(styles.marginTop) - 1));
                          handleStyleChange("marginTop", val);
                          handleStyleChange("marginRight", val);
                          handleStyleChange("marginBottom", val);
                          handleStyleChange("marginLeft", val);
                        }}
                        className="text-xs text-gray-600 hover:text-gray-900 leading-3"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { propKey: "marginTop", label: "⊞" },
                      { propKey: "marginRight", label: "⊞" },
                      { propKey: "marginBottom", label: "⊞" },
                      { propKey: "marginLeft", label: "⊞" },
                    ].map(({ propKey, label }) => (
                      <div key={propKey} className="flex gap-1.5 items-center">
                        <span className="text-xs text-gray-400">{label}</span>
                        <Input
                          type="number"
                          value={styles[propKey as keyof StyleState]}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (spacingUnits.marginUnit === "%" && Number(value) > 100) {
                              value = "100";
                            }
                            handleStyleChange(propKey as keyof StyleState, value);
                          }}
                          max={spacingUnits.marginUnit === "%" ? 100 : undefined}
                          className="w-10 text-xs h-7"
                        />
                        <span className="text-xs text-gray-400">{spacingUnits.marginUnit}</span>
                        <div className="flex flex-col gap-0">
                          <button
                            onClick={() => {
                              const current = Number(styles[propKey as keyof StyleState]);
                              const newVal = spacingUnits.marginUnit === "%" ? Math.min(100, current + 1) : current + 1;
                              handleStyleChange(propKey as keyof StyleState, String(newVal));
                            }}
                            className="text-xs text-gray-600 hover:text-gray-900 leading-3"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleStyleChange(propKey as keyof StyleState, String(Math.max(0, Number(styles[propKey as keyof StyleState]) - 1)))}
                            className="text-xs text-gray-600 hover:text-gray-900 leading-3"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Borders Section */}
        <div>
          <SectionHeader title="Borders" section="borders" />
          {expandedSections.borders && (
            <>
              <StyleInput
                label="Border Width (px)"
                value={styles.borderWidth}
                onChange={(value) => handleStyleChange("borderWidth", value)}
                type="number"
                placeholder="0"
              />
              <StyleInput
                label="Border Radius (px)"
                value={styles.borderRadius}
                onChange={(value) => handleStyleChange("borderRadius", value)}
                type="number"
                placeholder="0"
              />
            </>
          )}
        </div>

        {/* Content Visibility Section */}
        <div>
          <SectionHeader title="Content Visibility" section="contentVisibility" />
          {expandedSections.contentVisibility && (
            <div className="px-4 py-4 space-y-4 bg-gray-50">
              <p className="text-xs text-gray-600 mb-3">Display or hide content based on the type of device or other specific conditions</p>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-3">Show on:</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "all", label: "All devices", icon: null },
                    { value: "desktop", label: "Only on desktop", icon: Monitor },
                    { value: "tablet", label: "Only on tablet", icon: Tablet },
                    { value: "mobile", label: "Only on mobile", icon: Smartphone },
                  ].map((opt) => {
                    const IconComponent = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleStyleChange("contentVisibility", opt.value)}
                        className={cn(
                          "px-3 py-2 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-colors",
                          styles.contentVisibility === opt.value
                            ? "bg-blue-100 border-blue-400 text-blue-700"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Display Conditions */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-gray-700">Display conditions</label>
                  <button
                    onClick={() => {
                      handleStyleChange("displayConditions", [...styles.displayConditions, ""]);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    + Add condition
                  </button>
                </div>

                {/* Display Conditions List */}
                {styles.displayConditions.length > 0 && (
                  <div className="space-y-2">
                    {styles.displayConditions.map((condition, idx) => (
                      <div key={idx} className="flex gap-2 items-start bg-white p-2.5 rounded border border-gray-200">
                        <Input
                          type="text"
                          value={condition}
                          onChange={(e) => {
                            const newConditions = [...styles.displayConditions];
                            newConditions[idx] = e.target.value;
                            handleStyleChange("displayConditions", newConditions);
                          }}
                          placeholder="Add condition..."
                          className="flex-1 text-xs"
                        />
                        <button
                          onClick={() => {
                            const newConditions = styles.displayConditions.filter((_, i) => i !== idx);
                            handleStyleChange("displayConditions", newConditions);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

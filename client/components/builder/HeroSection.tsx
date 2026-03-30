import React from "react";
import { BuilderComponent } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Copy, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  component: BuilderComponent;
  onUpdate: (id: string, updates: Partial<BuilderComponent>) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onSelect?: (id: string) => void;
}

interface HeroElement {
  id: string;
  type: "badge" | "heading" | "paragraph" | "buttons";
  label: string;
  content: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  component,
  onUpdate,
  onRemove,
  onDuplicate,
  onSelect,
}) => {
  const [selectedElementId, setSelectedElementId] = React.useState<string | null>(null);
  const [hoveredElementId, setHoveredElementId] = React.useState<string | null>(null);
  const [editingElementId, setEditingElementId] = React.useState<string | null>(null);
  const [clipboardData, setClipboardData] = React.useState<{ elementId: string; content: string } | null>(null);

  // Define hero elements
  const heroElements: HeroElement[] = [
    {
      id: "badge",
      type: "badge",
      label: "Badge",
      content: component.heroBadgeText || "✨ New Release",
    },
    {
      id: "heading",
      type: "heading",
      label: "Heading",
      content: component.heroHeadingText || "Build your vision faster than ever.",
    },
    {
      id: "paragraph",
      type: "paragraph",
      label: "Paragraph",
      content: component.heroDescriptionText || "The world's most advanced landing page builder. Drag, drop, and launch in minutes, not days.",
    },
    {
      id: "buttons",
      type: "buttons",
      label: "Buttons",
      content: "CTA Buttons",
    },
  ];

  const getComponentStyles = () => {
    const styles: React.CSSProperties = {};
    // Don't apply width to hero container - it should be full width
    // Width adjustments should only affect internal elements, not the container
    if (component.height) {
      const unit = component.heightUnit || "px";
      styles.minHeight = `${component.height}${unit}`;
    }
    if (component.padding) {
      styles.padding = `${component.padding}px`;
    }
    if (component.margin) {
      styles.margin = `${component.margin}px`;
    }
    if (component.backgroundColor) {
      styles.backgroundColor = component.backgroundColor;
    }
    return styles;
  };

  const handleElementClick = (elementId: string) => {
    setSelectedElementId(selectedElementId === elementId ? null : elementId);
  };

  const handleElementUpdate = (elementId: string, content: string) => {
    const updateMap: Record<string, keyof BuilderComponent> = {
      badge: "heroBadgeText",
      heading: "heroHeadingText",
      paragraph: "heroDescriptionText",
      primaryButton: "heroPrimaryButtonText",
      secondaryButton: "heroSecondaryButtonText",
    };

    const key = updateMap[elementId];
    if (key) {
      onUpdate(component.id, { [key]: content });
    }
  };

  const handleEditableFocus = (event: React.FocusEvent<HTMLElement>) => {
    setEditingElementId(event.currentTarget.dataset.elementId || null);
  };

  const headingTextareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const paragraphTextareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  React.useLayoutEffect(() => {
    resizeTextarea(headingTextareaRef.current);
    resizeTextarea(paragraphTextareaRef.current);
  }, [component.heroHeadingText, component.heroDescriptionText, editingElementId]);

  const handleCopyElement = (elementId: string, content: string) => {
    // Store in local clipboard state
    setClipboardData({ elementId, content });

    // Also copy to browser clipboard
    navigator.clipboard.writeText(content).then(() => {
      console.log("Copied to clipboard:", content);
    }).catch(err => {
      console.error("Failed to copy:", err);
    });
  };

  const handleDeleteElement = (elementId: string) => {
    // Reset element to default value
    const defaultContent: Record<string, string> = {
      badge: "✨ New Release",
      heading: "Build your vision faster than ever.",
      paragraph: "The world's most advanced landing page builder. Drag, drop, and launch in minutes, not days.",
    };

    const updateMap: Record<string, keyof BuilderComponent> = {
      badge: "heroBadgeText",
      heading: "heroHeadingText",
      paragraph: "heroDescriptionText",
    };

    const key = updateMap[elementId];
    if (key && defaultContent[elementId]) {
      onUpdate(component.id, { [key]: defaultContent[elementId] });
      setSelectedElementId(null);
      console.log("Element reset to default:", defaultContent[elementId]);
    }
  };

  const handleAddElement = (elementId: string, content: string) => {
    // Paste clipboard content or duplicate current element
    if (clipboardData) {
      // If clipboard has data, paste it
      const updateMap: Record<string, keyof BuilderComponent> = {
        badge: "heroBadgeText",
        heading: "heroHeadingText",
        paragraph: "heroDescriptionText",
      };

      const sourceKey = updateMap[clipboardData.elementId];
      const targetKey = updateMap[elementId];

      if (sourceKey && targetKey) {
        onUpdate(component.id, { [targetKey]: clipboardData.content });
        console.log("Pasted content:", clipboardData.content);
        setClipboardData(null);
      }
    } else {
      // Otherwise duplicate the current element
      const element = heroElements.find(e => e.id === elementId);
      if (element) {
        const updateMap: Record<string, keyof BuilderComponent> = {
          badge: "heroBadgeText",
          heading: "heroHeadingText",
          paragraph: "heroDescriptionText",
        };

        const key = updateMap[elementId];
        if (key) {
          onUpdate(component.id, { [key]: content });
          console.log("Duplicated element:", content);
        }
      }
    }
  };

  const renderElementContent = (element: HeroElement) => {
    const isSelected = selectedElementId === element.id;
    const isHovered = hoveredElementId === element.id;

    // Get the actual value - in edit mode show the real value even if empty, in display mode show with fallback
    const getDisplayContent = (elementId: string): string => {
      const valueMap: Record<string, string | undefined> = {
        badge: component.heroBadgeText,
        heading: component.heroHeadingText,
        paragraph: component.heroDescriptionText,
      };
      return valueMap[elementId] || "";
    };

    const getDefaultContent = (elementId: string): string => {
      const defaults: Record<string, string> = {
        badge: "✨ New Release",
        heading: "Build your vision faster than ever.",
        paragraph: "The world's most advanced landing page builder. Drag, drop, and launch in minutes, not days.",
      };
      return defaults[elementId] || "";
    };

    const borderClasses = cn(
      "transition-all",
      isSelected && "border-2 border-solid border-valasys-orange",
      isHovered && !isSelected && "border-2 border-dashed border-valasys-orange/50",
      !isSelected && !isHovered && "border-2 border-transparent"
    );

    const containerClasses = cn(
      "relative group transition-all rounded-lg p-3",
      borderClasses
    );

    const renderControls = () => {
      if (!isSelected || editingElementId === element.id) return null;

      return (
        <div
          className="absolute top-1 right-1 flex items-center gap-1 bg-white rounded-md shadow-lg border border-valasys-orange/20 z-[100] pointer-events-auto"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCopyElement(element.id, element.content);
              console.log("Copy clicked for element:", element.id);
            }}
            className="h-6 w-6 flex items-center justify-center hover:bg-valasys-orange/10 rounded transition-colors cursor-pointer"
            title={`Copy element (${clipboardData ? "has clipboard data" : "empty"})`}
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddElement(element.id, element.content);
              console.log("Add/Paste clicked for element:", element.id);
            }}
            className="h-6 w-6 flex items-center justify-center hover:bg-valasys-orange/10 rounded transition-colors cursor-pointer"
            title={clipboardData ? "Paste content" : "Duplicate element"}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDeleteElement(element.id);
              console.log("Delete clicked for element:", element.id);
            }}
            className="h-6 w-6 flex items-center justify-center hover:bg-red-100 text-red-500 rounded transition-colors cursor-pointer"
            title="Reset element to default"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      );
    };

    const onMouseEnter = () => setHoveredElementId(element.id);
    const onMouseLeave = () => setHoveredElementId(null);

    switch (element.type) {
      case "badge":
        const badgeContent = isSelected ? getDisplayContent("badge") : (element.content || getDefaultContent("badge"));
        const badgeFontSize = component.badgeFontSize ? `${component.badgeFontSize}${component.badgeFontSizeUnit || "px"}` : undefined;
        const badgeWidth = component.badgeWidth ? `${component.badgeWidth}${component.badgeWidthUnit || "%"}` : undefined;
        return (
          <div
            key={element.id}
            className={cn(
              containerClasses,
              "relative",
              editingElementId && editingElementId !== element.id && "opacity-0 pointer-events-none transition-opacity"
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => handleElementClick(element.id)}
            style={{ maxWidth: badgeWidth || "100%" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-valasys-orange/10 text-valasys-orange font-bold uppercase tracking-wider" style={{ fontSize: badgeFontSize || "0.75rem" }}>
              {isSelected ? (
                <Input
                  value={badgeContent}
                  data-element-id={element.id}
                  onChange={(e) => handleElementUpdate(element.id, e.target.value)}
                  onFocus={handleEditableFocus}
                  onBlur={() => setEditingElementId(null)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-auto w-auto min-w-0 border-0 bg-transparent p-0 font-bold uppercase tracking-wider text-valasys-orange shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  style={{ fontSize: badgeFontSize || "0.75rem" }}
                />
              ) : (
                <span
                  className="break-words"
                  style={{
                    direction: "ltr",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                    fontSize: badgeFontSize || "0.75rem",
                  }}
                >
                  {badgeContent}
                </span>
              )}
            </div>
            {renderControls()}
          </div>
        );

      case "heading":
        const headingContent = isSelected ? getDisplayContent("heading") : (element.content || getDefaultContent("heading"));
        const headingWidth = component.headingWidth ? `${component.headingWidth}${component.headingWidthUnit || "%"}` : undefined;
        const headingFontSize = component.headingFontSize ? `${component.headingFontSize}${component.headingFontSizeUnit || "px"}` : undefined;
        return (
          <div
            key={element.id}
            className={cn(containerClasses, "relative")}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => handleElementClick(element.id)}
          >
            {isSelected ? (
              <Textarea
                ref={headingTextareaRef}
                value={headingContent}
                data-element-id={element.id}
                onChange={(e) => {
                  handleElementUpdate(element.id, e.target.value);
                  resizeTextarea(e.currentTarget);
                }}
                onFocus={handleEditableFocus}
                onBlur={() => setEditingElementId(null)}
                onClick={(e) => e.stopPropagation()}
                className="min-h-0 resize-none overflow-hidden border-0 bg-transparent p-0 font-black text-gray-900 tracking-tight leading-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{
                  maxWidth: headingWidth || "100%",
                  fontSize: headingFontSize || "3.75rem",
                }}
                rows={1}
              />
            ) : (
              <h1
                className="font-black text-gray-900 tracking-tight leading-none break-words"
                style={{
                  direction: "ltr",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                  maxWidth: headingWidth || "100%",
                  fontSize: headingFontSize || "3.75rem",
                }}
              >
                {headingContent}
              </h1>
            )}
            {renderControls()}
          </div>
        );

      case "paragraph":
        const paragraphContent = isSelected ? getDisplayContent("paragraph") : (element.content || getDefaultContent("paragraph"));
        const paragraphWidth = component.paragraphWidth ? `${component.paragraphWidth}${component.paragraphWidthUnit || "%"}` : undefined;
        const paragraphFontSize = component.paragraphFontSize ? `${component.paragraphFontSize}${component.paragraphFontSizeUnit || "px"}` : undefined;
        return (
          <div
            key={element.id}
            className={cn(containerClasses, "relative")}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => handleElementClick(element.id)}
          >
            {isSelected ? (
              <Textarea
                ref={paragraphTextareaRef}
                value={paragraphContent}
                data-element-id={element.id}
                onChange={(e) => {
                  handleElementUpdate(element.id, e.target.value);
                  resizeTextarea(e.currentTarget);
                }}
                onFocus={handleEditableFocus}
                onBlur={() => setEditingElementId(null)}
                onClick={(e) => e.stopPropagation()}
                className="min-h-0 resize-none overflow-hidden border-0 bg-transparent p-0 text-gray-600 leading-relaxed shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{
                  maxWidth: paragraphWidth || "100%",
                  fontSize: paragraphFontSize || "1.125rem",
                }}
                rows={1}
              />
            ) : (
              <p
                className="text-gray-600 leading-relaxed break-words"
                style={{
                  direction: "ltr",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                  maxWidth: paragraphWidth || "100%",
                  fontSize: paragraphFontSize || "1.125rem",
                }}
              >
                {paragraphContent}
              </p>
            )}
            {renderControls()}
          </div>
        );

      case "buttons":
        const buttonsWidth = component.buttonWidth ? `${component.buttonWidth}${component.buttonWidthUnit || "%"}` : undefined;
        const buttonFontSize = component.buttonFontSize ? `${component.buttonFontSize}${component.buttonFontSizeUnit || "px"}` : undefined;
        return (
          <div
            key={element.id}
            className={containerClasses}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => handleElementClick(element.id)}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4" style={{ maxWidth: buttonsWidth || "100%", fontSize: buttonFontSize || "1.125rem" }}>
              {isSelected ? (
                <Input
                  value={component.heroPrimaryButtonText}
                  data-element-id="primaryButton"
                  onChange={(e) => handleElementUpdate("primaryButton", e.target.value)}
                  onFocus={handleEditableFocus}
                  onBlur={() => setEditingElementId(null)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Start Free Trial"
                  className="h-auto min-w-[220px] rounded-2xl border-0 bg-valasys-orange px-10 py-7 text-center text-lg font-bold text-white shadow-xl focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              ) : (
                <Button className="px-10 py-7 text-lg font-bold rounded-2xl bg-valasys-orange shadow-xl hover:shadow-2xl transition-all hover:bg-valasys-orange/90">
                  {component.heroPrimaryButtonText || "Start Free Trial"}
                </Button>
              )}
              {isSelected ? (
                <Input
                  value={component.heroSecondaryButtonText}
                  data-element-id="secondaryButton"
                  onChange={(e) => handleElementUpdate("secondaryButton", e.target.value)}
                  onFocus={handleEditableFocus}
                  onBlur={() => setEditingElementId(null)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Watch Demo"
                  className="h-auto min-w-[180px] rounded-2xl border border-gray-200 bg-white px-10 py-7 text-center text-lg font-bold text-gray-900 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              ) : (
                <Button
                  variant="outline"
                  className="px-10 py-7 text-lg font-bold rounded-2xl border-gray-200"
                >
                  {component.heroSecondaryButtonText || "Watch Demo"}
                </Button>
              )}
            </div>
            {renderControls()}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="relative overflow-hidden bg-white p-12 lg:p-24 flex flex-col items-center text-center gap-6 rounded-3xl border border-gray-100"
      style={getComponentStyles()}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-valasys-orange/5 to-transparent pointer-events-none" />
      {heroElements.map((element) => renderElementContent(element))}
    </div>
  );
};

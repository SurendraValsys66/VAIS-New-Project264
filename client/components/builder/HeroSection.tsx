import React from "react";
import { BuilderComponent } from "@/types/builder";
import { Button } from "@/components/ui/button";
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
    if (component.width) {
      const unit = component.widthUnit || "%";
      styles.width = `${component.width}${unit}`;
    }
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
    };

    const key = updateMap[elementId];
    if (key) {
      onUpdate(component.id, { [key]: content });
    }
  };

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
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-valasys-orange/10 text-valasys-orange text-xs font-bold uppercase tracking-wider">
              <span
                contentEditable={isSelected}
                suppressContentEditableWarning
                onInput={(e) => {
                  // Don't update state on input - just let the user type freely
                }}
                onFocus={() => setEditingElementId(element.id)}
                onBlur={(e) => {
                  setEditingElementId(null);
                  const text = e.currentTarget.textContent || "";
                  handleElementUpdate(element.id, text);
                }}
                onClick={(e) => {
                  if (isSelected) e.stopPropagation();
                }}
                className={cn(
                  isSelected ? "focus:outline-none focus:ring-0 pointer-events-auto" : "pointer-events-none"
                )}
              >
                {element.content}
              </span>
            </div>
            {renderControls()}
          </div>
        );

      case "heading":
        return (
          <div
            key={element.id}
            className={cn(containerClasses, "relative")}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => handleElementClick(element.id)}
          >
            <h1
              contentEditable={isSelected}
              suppressContentEditableWarning
              onInput={(e) => {
                // Don't update state on input - just let the user type freely
              }}
              onFocus={() => setEditingElementId(element.id)}
              onBlur={(e) => {
                setEditingElementId(null);
                const text = e.currentTarget.textContent || "";
                handleElementUpdate(element.id, text);
              }}
              onClick={(e) => {
                if (isSelected) e.stopPropagation();
              }}
              className={cn(
                "text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-none max-w-4xl",
                isSelected ? "focus:outline-none focus:ring-0 pointer-events-auto" : "pointer-events-none"
              )}
            >
              {element.content}
            </h1>
            {renderControls()}
          </div>
        );

      case "paragraph":
        return (
          <div
            key={element.id}
            className={cn(containerClasses, "relative")}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => handleElementClick(element.id)}
          >
            <p
              contentEditable={isSelected}
              suppressContentEditableWarning
              onInput={(e) => {
                // Don't update state on input - just let the user type freely
              }}
              onFocus={() => setEditingElementId(element.id)}
              onBlur={(e) => {
                setEditingElementId(null);
                const text = e.currentTarget.textContent || "";
                handleElementUpdate(element.id, text);
              }}
              onClick={(e) => {
                if (isSelected) e.stopPropagation();
              }}
              className={cn(
                "text-lg text-gray-600 max-w-2xl leading-relaxed",
                isSelected ? "focus:outline-none focus:ring-0 pointer-events-auto" : "pointer-events-none"
              )}
            >
              {element.content}
            </p>
            {renderControls()}
          </div>
        );

      case "buttons":
        return (
          <div
            key={element.id}
            className={containerClasses}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => handleElementClick(element.id)}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <Button className="px-10 py-7 text-lg font-bold rounded-2xl bg-valasys-orange shadow-xl hover:shadow-2xl transition-all hover:bg-valasys-orange/90">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="px-10 py-7 text-lg font-bold rounded-2xl border-gray-200"
              >
                Watch Demo
              </Button>
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

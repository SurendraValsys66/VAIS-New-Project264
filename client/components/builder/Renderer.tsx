import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { BuilderComponent, DRAG_TYPES, ComponentType, PreviewDevice } from "@/types/builder";
import { cn } from "@/lib/utils";
import {
  Trash2,
  Move,
  ChevronLeft,
  ChevronRight,
  Play,
  Check,
  Star,
  Quote,
  ChevronDown,
  Copy,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RendererProps {
  component: BuilderComponent;
  onUpdate: (id: string, updates: Partial<BuilderComponent>) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, targetParentId: string | null, targetIndex: number) => void;
  onAdd: (type: ComponentType, parentId: string | null, index?: number) => void;
  onDuplicate: (id: string) => void;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
  parentId?: string | null;
  parentIndex?: number;
  previewDevice?: PreviewDevice;
}

export const ComponentRenderer: React.FC<RendererProps> = ({
  component,
  onUpdate,
  onRemove,
  onMove,
  onAdd,
  onDuplicate,
  onSelect,
  isSelected,
  parentId,
  parentIndex,
  previewDevice,
}) => {

  const handleCopyComponent = () => {
    onDuplicate(component.id);
  };

  const handleAddSibling = () => {
    // Add as a sibling at the same level, not as a child
    onAdd(component.type, parentId || null, (parentIndex || 0) + 1);
  };

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPES.COMPONENT,
    item: { id: component.id, type: component.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DRAG_TYPES.COMPONENT,
    canDrop: (item: any) => {
      if (item.id === component.id) return false;

      switch (component.type) {
        case "section":
          return item.type === "row" || !["section", "row", "column"].includes(item.type);
        case "row":
          return item.type === "column";
        case "column":
          return !["section", "row", "column"].includes(item.type);
        default:
          return false;
      }
    },
    drop: (item: any, monitor) => {
      if (monitor.didDrop()) return;
      if (item.id) {
        onMove(item.id, component.id, component.children?.length || 0);
      } else {
        onAdd(item.type, component.id, component.children?.length || 0);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const isVisibleOnPreviewDevice = () => {
    if (!previewDevice) return true;

    switch (component.contentVisibility) {
      case "desktop":
        return previewDevice === "desktop";
      case "tablet":
        return previewDevice === "tablet";
      case "mobile":
        return previewDevice === "mobile";
      default:
        return true;
    }
  };

  const renderChildren = () => {
    return (
      <div
        ref={drop}
        className={cn(
          "min-h-[50px] transition-colors rounded-md border border-dashed border-gray-200 p-2",
          isOver && canDrop && "bg-valasys-orange/5 border-valasys-orange/30",
          component.type === "row" && "flex flex-wrap -mx-2",
          component.type === "section" && "space-y-4 p-4",
          component.type === "column" && "p-2 h-full flex flex-col gap-2",
        )}
      >
        {component.children?.map((child, childIndex) => (
          <ComponentRenderer
            key={child.id}
            component={child}
            onUpdate={onUpdate}
            onRemove={onRemove}
            onMove={onMove}
            onAdd={onAdd}
            onDuplicate={onDuplicate}
            onSelect={onSelect}
            isSelected={isSelected && component.id === child.id}
            parentId={component.id}
            parentIndex={childIndex}
            previewDevice={previewDevice}
          />
        ))}
        {component.children?.length === 0 && (
          <div className="flex items-center justify-center h-full min-h-[50px] text-gray-400 text-[10px] italic">
            Drop items here
          </div>
        )}
      </div>
    );
  };

  const getComponentStyles = () => {
    const styles: React.CSSProperties = {};

    // Apply width (with unit support)
    if (component.width) {
      const unit = component.widthUnit || "%";
      styles.width = `${component.width}${unit}`;
    }

    // Apply height (minHeight for flexibility)
    if (component.height) {
      const unit = component.heightUnit || "px";
      styles.minHeight = `${component.height}${unit}`;
    }

    // Apply padding
    if (component.padding) {
      styles.padding = `${component.padding}px`;
    }

    // Apply margin
    if (component.margin) {
      styles.margin = `${component.margin}px`;
    }

    // Apply border properties
    if (component.borderWidth) {
      styles.borderWidth = `${component.borderWidth}px`;
      styles.borderStyle = "solid";
    }

    if (component.borderColor) {
      styles.borderColor = component.borderColor;
    }

    if (component.borderRadius) {
      styles.borderRadius = `${component.borderRadius}px`;
    }

    // Apply background color
    if (component.backgroundColor) {
      styles.backgroundColor = component.backgroundColor;
    }

    // Apply background image properties (from ElementStylePanel)
    if (component.backgroundImageUrl) {
      // Use double quotes for URL and properly escape
      const imageUrl = component.backgroundImageUrl.replace(/"/g, '\\"');
      styles.backgroundImage = `url("${imageUrl}")`;
      styles.backgroundSize = component.backgroundSize || "cover";
      styles.backgroundPosition = component.backgroundPosition || "center";
      styles.backgroundRepeat = component.backgroundRepeat || "no-repeat";
      styles.backgroundAttachment = component.backgroundAttachment || "scroll";
      // Ensure the component has proper dimensions to display background
      if (!styles.minHeight && !component.height) {
        styles.minHeight = "300px";
      }
    }

    // Apply text color
    if (component.textColor) {
      styles.color = component.textColor;
    }

    // Apply opacity
    if (component.backgroundOpacity !== undefined) {
      styles.opacity = parseInt(String(component.backgroundOpacity)) / 100;
    }

    // Apply justify content
    if (component.justifyContent) {
      styles.justifyContent = component.justifyContent as any;
    }

    // Apply text alignment
    if (component.textAlign) {
      styles.textAlign = component.textAlign as any;
    }

    return styles;
  };

  if (!isVisibleOnPreviewDevice()) {
    return null;
  }

  const wrapWithControls = (content: React.ReactNode) => {
    return (
      <div
        ref={drag}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(component.id);
        }}
        className={cn(
          "group relative rounded-md transition-all cursor-pointer",
          isDragging && "opacity-30",
          component.type === "column" && "w-full md:w-auto h-full",
          isSelected
            ? "border-2 border-valasys-orange shadow-lg shadow-valasys-orange/20 element-selected-pulse"
            : "border-2 border-transparent hover:border-2 hover:border-dashed hover:border-valasys-orange",
        )}
        style={{
          ...(component.type === "column"
            ? { flex: `0 0 ${((component.width || 12) / 12) * 100}%`, padding: "0 0.5rem" }
            : getComponentStyles()),
        }}
      >
        {isSelected && (
          <div className="absolute top-0 right-0 flex items-center gap-1 bg-white rounded-bl-md text-valasys-orange px-1 py-1 z-30 shadow-lg border border-valasys-orange/20">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-valasys-orange/10"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyComponent();
              }}
              title="Copy element"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-valasys-orange/10"
              onClick={(e) => {
                e.stopPropagation();
                handleAddSibling();
              }}
              title="Add element"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-red-100 text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(component.id);
              }}
              title="Delete element"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
            <div className="h-6 w-6 flex items-center justify-center cursor-move hover:bg-valasys-orange/10 rounded">
              <Move className="h-3.5 w-3.5" />
            </div>
          </div>
        )}


        {content}
      </div>
    );
  };

  switch (component.type) {
    // --- Layout ---
    case "section":
      const sectionStyles = getComponentStyles();
      return wrapWithControls(
        <section
          className={cn(
            "rounded-lg shadow-sm overflow-hidden",
            !sectionStyles.backgroundColor && !sectionStyles.backgroundImage && "bg-white"
          )}
          style={sectionStyles}
        >
          {renderChildren()}
        </section>,
      );
    case "row":
      const rowStyles = getComponentStyles();
      return wrapWithControls(
        <div
          className={cn(
            "rounded p-1",
            !rowStyles.backgroundColor && !rowStyles.backgroundImage && "bg-gray-50/50"
          )}
          style={rowStyles}
        >
          {renderChildren()}
        </div>,
      );
    case "column":
      return wrapWithControls(
        <div
          className="bg-valasys-orange/5 rounded border border-valasys-orange/10 min-h-[60px]"
          style={getComponentStyles()}
        >
          {renderChildren()}
        </div>,
      );

    // --- Basic Components ---
    case "heading":
      return wrapWithControls(
        <div className="p-4 h-full flex items-center" style={getComponentStyles()}>
          <h2
            className="text-3xl font-bold w-full leading-tight"
            contentEditable
            suppressContentEditableWarning
            style={{
              color: component.textColor || "#111827",
              fontSize: component.fontSize ? `${component.fontSize}${component.fontSizeUnit || "px"}` : undefined,
            }}
          >
            Catchy Heading
          </h2>
        </div>,
      );
    case "paragraph":
      return wrapWithControls(
        <div className="p-4 h-full" style={getComponentStyles()}>
          <p
            className="text-base leading-relaxed"
            contentEditable
            suppressContentEditableWarning
            style={{
              color: component.textColor || "#4b5563",
              fontSize: component.fontSize ? `${component.fontSize}${component.fontSizeUnit || "px"}` : undefined,
            }}
          >
            Add your description text here. Make it compelling and easy to read for your visitors.
          </p>
        </div>,
      );
    case "button":
      return wrapWithControls(
        <div className="p-4 h-full flex items-center justify-start">
          <Button
            className="px-8 py-6 text-lg font-semibold rounded-xl shadow-lg"
            style={{
              backgroundColor: component.backgroundColor || "#ea580c",
              color: component.textColor || "#ffffff",
              fontSize: component.fontSize ? `${component.fontSize}${component.fontSizeUnit || "px"}` : undefined,
            }}
          >
            Get Started
          </Button>
        </div>,
      );
    case "image":
      return wrapWithControls(
        <div className="p-4 h-full" style={getComponentStyles()}>
          <div className="h-full bg-gray-100 flex items-center justify-center rounded-2xl text-gray-400 border-2 border-dashed border-gray-200 min-h-[150px]">
            Image Placeholder
          </div>
        </div>,
      );
    case "video":
      return wrapWithControls(
        <div className="p-4 h-full" style={getComponentStyles()}>
          <div className="h-full aspect-video bg-black/90 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden relative group/video">
            <Play className="w-16 h-16 text-white opacity-50 group-hover/video:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-valasys-orange" />
            </div>
          </div>
        </div>,
      );
    case "divider":
      return wrapWithControls(
        <div className="px-4 py-8 h-full flex items-center" style={getComponentStyles()}>
          <hr className="w-full border-t border-gray-200" />
        </div>,
      );

    // --- Marketing Components ---
    case "hero":
      return wrapWithControls(
        <div className="relative overflow-hidden bg-white p-12 lg:p-24 flex flex-col items-center text-center gap-6 rounded-3xl border border-gray-100" style={getComponentStyles()}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-valasys-orange/5 to-transparent pointer-events-none" />
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-valasys-orange/10 text-valasys-orange text-xs font-bold uppercase tracking-wider"
            contentEditable
            suppressContentEditableWarning
          >
            ✨ New Release
          </div>
          <h1
            className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-none max-w-4xl"
            contentEditable
            suppressContentEditableWarning
            dangerouslySetInnerHTML={{ __html: 'Build your vision <span class="text-valasys-orange">faster</span> than ever.' }}
          />
          <p
            className="text-lg text-gray-600 max-w-2xl leading-relaxed"
            contentEditable
            suppressContentEditableWarning
          >
            The world's most advanced landing page builder. Drag, drop, and launch in minutes, not
            days.
          </p>
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
        </div>,
      );

    case "feature-grid":
      return wrapWithControls(
        <div className="p-12 bg-gray-50/50 rounded-3xl border border-gray-100" style={getComponentStyles()}>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900" contentEditable suppressContentEditableWarning>
              Everything you need to scale
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto" contentEditable suppressContentEditableWarning>
              Powerful tools designed to help you grow your business and reach your goals faster.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <div className="w-12 h-12 bg-valasys-orange/10 text-valasys-orange rounded-xl flex items-center justify-center font-bold">
                  0{i}
                </div>
                <h3 className="text-lg font-bold" contentEditable suppressContentEditableWarning>
                  {`Feature Item ${i}`}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed" contentEditable suppressContentEditableWarning>
                  Explain how this feature solves a real problem for your users.
                </p>
              </div>
            ))}
          </div>
        </div>,
      );

    case "pricing":
      return wrapWithControls(
        <div className="p-12 bg-white rounded-3xl border border-gray-100" style={getComponentStyles()}>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black mb-4" contentEditable suppressContentEditableWarning>Simple, transparent pricing</h2>
            <p className="text-gray-500" contentEditable suppressContentEditableWarning>Choose the plan that's right for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Starter", "Pro", "Enterprise"].map((plan, i) => (
              <div
                key={plan}
                className={cn(
                  "p-8 rounded-3xl border-2 transition-all space-y-6 flex flex-col",
                  i === 1 ? "border-valasys-orange shadow-2xl scale-105 relative z-10" : "border-gray-100",
                )}
              >
                {i === 1 && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-valasys-orange text-white text-[10px] font-black rounded-full uppercase">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold mb-1" contentEditable suppressContentEditableWarning>{plan}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">${[19, 49, 99][i]}</span>
                    <span className="text-gray-400 text-sm">/mo</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1">
                  {[1, 2, 3, 4].map((j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      <span contentEditable suppressContentEditableWarning>{`Benefit number ${j}`}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "w-full py-6 font-bold rounded-xl",
                    i === 1 ? "bg-valasys-orange hover:bg-valasys-orange/90" : "bg-gray-900",
                  )}
                >
                  Choose {plan}
                </Button>
              </div>
            ))}
          </div>
        </div>,
      );

    case "testimonials":
      return wrapWithControls(
        <div className="p-12 bg-valasys-orange rounded-3xl text-white relative overflow-hidden" style={getComponentStyles()}>
          <Quote className="absolute top-8 left-8 w-24 h-24 opacity-10" />
          <div className="relative z-10 flex flex-col items-center text-center gap-8">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-2xl font-bold max-w-3xl leading-snug italic" contentEditable suppressContentEditableWarning>
              "This platform has completely transformed how we build and launch pages. It's
              incredibly intuitive and powerful at the same time."
            </p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-valasys-orange-light/20 border-4 border-white/20 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=jane" alt="Jane" />
              </div>
              <div>
                <div className="font-bold text-lg" contentEditable suppressContentEditableWarning>
                  Jane Cooper
                </div>
                <div className="text-valasys-orange-light text-sm" contentEditable suppressContentEditableWarning>
                  CEO at TechFlow
                </div>
              </div>
            </div>
          </div>
        </div>,
      );

    case "logo-cloud":
      return wrapWithControls(
        <div className="p-12 bg-white rounded-3xl border border-gray-100 flex flex-col items-center gap-12" style={getComponentStyles()}>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest" contentEditable suppressContentEditableWarning>
            Trusted by the world's most innovative teams
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 grayscale">
            {["Google", "Meta", "Amazon", "Stripe", "Netflix", "Shopify"].map((brand) => (
              <span key={brand} className="text-2xl font-black text-gray-900 tracking-tighter">
                {brand}
              </span>
            ))}
          </div>
        </div>,
      );

    case "faq":
      return wrapWithControls(
        <div className="p-12 bg-gray-50 rounded-3xl border border-gray-100 max-w-4xl mx-auto w-full" style={getComponentStyles()}>
          <h2 className="text-2xl font-bold text-center mb-12" contentEditable suppressContentEditableWarning>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((f) => (
              <div key={f} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-bold text-lg" contentEditable suppressContentEditableWarning>
                    What is the pricing structure for larger teams?
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
                <div className="mt-4 text-gray-500 text-sm leading-relaxed" contentEditable suppressContentEditableWarning>
                  We offer custom enterprise pricing for teams larger than 50 people. Contact our
                  sales team for a personalized quote.
                </div>
              </div>
            ))}
          </div>
        </div>,
      );

    case "cta":
      return wrapWithControls(
        <div className="p-16 bg-gradient-to-tr from-gray-900 to-valasys-gray-900 rounded-3xl text-white text-center flex flex-col items-center gap-8" style={getComponentStyles()}>
          <h2 className="text-3xl font-black" contentEditable suppressContentEditableWarning>
            Ready to start building?
          </h2>
          <p className="text-white/80 max-w-xl" contentEditable suppressContentEditableWarning>
            Join over 10,000+ creators and start building your landing pages today. No credit card
            required.
          </p>
          <div className="flex gap-4">
            <Button className="bg-white text-valasys-gray-900 hover:bg-gray-100 px-8 py-6 rounded-xl font-bold shadow-xl">
              Get Started Now
            </Button>
            <Button variant="ghost" className="text-white border border-white/20 rounded-xl px-8 py-6 font-bold">
              Contact Sales
            </Button>
          </div>
        </div>,
      );

    case "contact-form":
      return wrapWithControls(
        <div className="p-12 bg-white rounded-3xl border border-gray-100 shadow-xl max-w-2xl mx-auto w-full flex flex-col gap-8" style={getComponentStyles()}>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <p className="text-gray-500">We'll get back to you within 24 hours.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">First Name</label>
              <div className="h-12 bg-gray-50 rounded-xl border border-gray-100" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Last Name</label>
              <div className="h-12 bg-gray-50 rounded-xl border border-gray-100" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
            <div className="h-12 bg-gray-50 rounded-xl border border-gray-100" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Message</label>
            <div className="h-32 bg-gray-50 rounded-xl border border-gray-100" />
          </div>
          <Button className="w-full py-6 rounded-xl bg-valasys-orange hover:bg-valasys-orange/90 font-bold shadow-lg">
            Send Message
          </Button>
        </div>,
      );

    case "card":
      return wrapWithControls(
        <div className="p-4 h-full" style={getComponentStyles()}>
          <div className="bg-white border rounded-xl p-4 shadow-sm h-full flex flex-col">
            <h3 className="font-semibold mb-2" contentEditable suppressContentEditableWarning>
              Card Title
            </h3>
            <p className="text-sm text-gray-500 flex-1" contentEditable suppressContentEditableWarning>
              Some content for the card.
            </p>
          </div>
        </div>,
      );

    default:
      return null;
  }
};

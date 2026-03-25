import React from "react";
import { useDrop } from "react-dnd";
import { DRAG_TYPES, ComponentType, BuilderComponent } from "@/types/builder";
import { cn } from "@/lib/utils";
import { useLayout } from "@/hooks/useLayout";
import { ComponentRenderer } from "./Renderer";
import { ComponentsPanel } from "./ComponentsPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { templateLayoutMap } from "@/components/predefine-email-templates/templates";

interface BuilderCanvasProps {
  onBack?: () => void;
  templateId?: string;
  initialLayout?: BuilderComponent[];
}

const DEFAULT_LAYOUT: BuilderComponent[] = [];

export const BuilderCanvas: React.FC<BuilderCanvasProps> = ({ onBack, templateId, initialLayout }) => {
  const [isPreviewMode, setIsPreviewMode] = React.useState(false);

  const layoutConfig = initialLayout
    ? initialLayout
    : templateId
      ? templateLayoutMap[templateId] || DEFAULT_LAYOUT
      : DEFAULT_LAYOUT;

  const { layout, addComponent, moveComponent, updateComponent, removeComponent } = useLayout(
    layoutConfig,
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DRAG_TYPES.COMPONENT,
    canDrop: () => {
      // Root accepts all component types
      return true;
    },
    drop: (item: any, monitor) => {
      if (monitor.didDrop()) return;

      if (item.id) {
        // Reordering
        moveComponent(item.id, null, layout.length);
      } else {
        // Adding new
        addComponent(item.type, null, layout.length);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
  });

  // If in preview mode, show full page preview without editor UI
  if (isPreviewMode) {
    return (
      <div className="flex flex-col h-[calc(100vh-120px)] bg-white">
        <header className="h-14 border-b bg-white px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-900 tracking-tight">
              {templateId === "online-marketing-conference"
                ? "Online Marketing Conference"
                : "New Page"}
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full font-black uppercase tracking-wider">
              Preview
            </span>
          </div>
          <button
            onClick={() => setIsPreviewMode(false)}
            className="text-sm font-medium px-4 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Back to Editor
          </button>
        </header>
        <div className="flex-1 overflow-y-auto bg-white p-8">
          <div className="max-w-5xl mx-auto min-h-full rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            {layout.map((comp) => (
              <ComponentRenderer
                key={comp.id}
                component={comp}
                onUpdate={() => {}}
                onRemove={() => {}}
                onMove={() => {}}
                onAdd={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-gray-50">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4 flex-1">
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}
          <div className="flex-1 max-w-md">
            <div className="text-sm text-gray-600 mb-1">Landing Page</div>
            <div className="text-lg font-semibold text-gray-900">
              {templateId === "online-marketing-conference"
                ? "Online Marketing Conference"
                : "New Page"}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
              Unsaved changes
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(true)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button
            className="gap-2 bg-valasys-orange hover:bg-valasys-orange/90 text-white"
          >
            <Save className="w-4 h-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* Main Content - Three Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Components Panel */}
        <div className="flex flex-col w-72 bg-white border-r border-gray-200 overflow-y-auto">
          <ComponentsPanel />
        </div>

        {/* Center - Editor Canvas */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div
            ref={drop}
            className={cn(
              "max-w-5xl mx-auto min-h-full transition-all duration-200 ease-in-out p-6 rounded-xl bg-white border border-gray-200",
              isOver && canDrop && "ring-2 ring-valasys-orange ring-dashed bg-orange-50",
              layout.length === 0 && "border-2 border-dashed border-gray-300 flex items-center justify-center",
            )}
          >
            {layout.length > 0 ? (
              <div className="space-y-4">
                {layout.map((comp) => (
                  <ComponentRenderer
                    key={comp.id}
                    component={comp}
                    onUpdate={updateComponent}
                    onRemove={removeComponent}
                    onMove={moveComponent}
                    onAdd={addComponent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4 text-gray-400">
                  <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Start building your page</p>
                  <p className="text-xs">Drag and drop components from the sidebar</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

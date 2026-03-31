import React from "react";
import { LandingPageBlock } from "./types";
import { getBlockStyles } from "./utils";
import { cn } from "@/lib/utils";
export {
  SectionBlockPreview,
  RowBlockPreview,
  ColumnBlockPreview,
} from "./LayoutBlockPreviews";

interface BlockPreviewProps {
  block: LandingPageBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (props: Record<string, any>) => void;
}

export const HeaderBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      className={`border-2 cursor-pointer transition-all ${
        isSelected ? "border-valasys-orange" : "border-gray-200 hover:border-gray-300"
      }`}
      style={{
        ...blockStyles,
        backgroundColor: props.backgroundColor || "#ffffff",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="font-bold" style={{ color: props.textColor || "#1f2937" }}>{props.logoText}</div>
        <div className="flex gap-4 text-sm" style={{ color: props.textColor || "#4b5563" }}>
          {props.navigationLinks?.map((link: any, i: number) => (
            <span key={i}>{link.label}</span>
          ))}
        </div>
        <button className="px-4 py-2 text-white text-sm font-medium rounded hover:opacity-90 transition-opacity" style={{ backgroundColor: props.ctaButtonColor || "#FF6A00" }}>
          {props.ctaButtonText}
        </button>
      </div>
    </div>
  );
};

export const HeroBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={{
        ...blockStyles,
        minHeight: props.minHeight || "300px",
      }}
    >
      <div className="flex flex-col items-center justify-center h-full px-8 py-8 text-center">
        <h1 className="text-5xl font-bold mb-4" style={{ color: props.textColor || "#1f2937" }}>
          {props.headline}
        </h1>
        <p className="text-xl mb-8 max-w-2xl" style={{ color: props.textColor || "#4b5563" }}>
          {props.subheading}
        </p>
        <div className="flex gap-4">
          <button
            style={{ backgroundColor: props.ctaButtonColor }}
            className="px-8 py-3 text-white font-medium rounded hover:opacity-90 transition-opacity"
          >
            {props.ctaButtonText}
          </button>
          {props.secondaryButtonText && (
            <button
              style={{
                backgroundColor: props.secondaryButtonColor,
                color: props.secondaryButtonTextColor,
              }}
              className="px-8 py-3 font-medium rounded hover:opacity-90 transition-opacity border border-gray-300"
            >
              {props.secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const FeaturesBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={blockStyles}
    >
      <div className="px-8 py-8">
        <h2 className="text-3xl font-bold text-center mb-2" style={{ color: props.textColor || "#1f2937" }}>
          {props.heading}
        </h2>
        <p className="text-center mb-8" style={{ color: props.textColor || "#4b5563" }}>{props.description}</p>
        <div
          className="gap-8"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${props.columns || 4}, 1fr)`,
          }}
        >
          {props.features?.map((feature: any) => (
            <div key={feature.id} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TestimonialsBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={blockStyles}
    >
      <div className="px-8 py-8">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: props.textColor || "#1f2937" }}>
          {props.heading}
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {props.testimonials?.map((testimonial: any) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <p className="text-gray-600 mb-4">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                {testimonial.avatarUrl && (
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AboutBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={blockStyles}
    >
      <div className="px-8 py-8">
        <div className="grid grid-cols-2 gap-8 items-center">
          {props.imagePosition === "left" && (
            <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
              {props.imageUrl ? (
                <img
                  src={props.imageUrl}
                  alt="About section image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Image</span>
              )}
            </div>
          )}
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: props.textColor || "#1f2937" }}>
              {props.heading}
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: props.textColor || "#4b5563" }}>
              {props.content}
            </p>
            <button className="px-6 py-2 bg-valasys-orange text-white font-medium rounded hover:bg-orange-600 transition-colors">
              {props.cta?.text}
            </button>
          </div>
          {props.imagePosition === "right" && (
            <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
              {props.imageUrl ? (
                <img
                  src={props.imageUrl}
                  alt="About section image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Image</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ContactFormBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={blockStyles}
    >
      <div className="px-8 py-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-2" style={{ color: props.textColor || "#1f2937" }}>
          {props.heading}
        </h2>
        <p className="mb-6" style={{ color: props.textColor || "#4b5563" }}>{props.description}</p>
        <form className="space-y-4">
          {props.fields?.map((field: any) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-valasys-orange"
                  rows={4}
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-valasys-orange"
                />
              )}
            </div>
          ))}
          <button
            style={{ backgroundColor: props.submitButtonColor }}
            className="w-full py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            {props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export const FooterBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={blockStyles}
    >
      <div className="px-8 py-12">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-2">{props.companyName}</h3>
            <p className="text-sm opacity-75">{props.companyDescription}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {props.quickLinks?.map((link: any, i: number) => (
                <p key={i} className="text-sm opacity-75 hover:opacity-100">
                  {link.label}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm opacity-75 mb-2">
              {props.contactInfo?.email}
            </p>
            <p className="text-sm opacity-75">{props.contactInfo?.phone}</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex items-center justify-between">
          <p className="text-sm opacity-75">
            © 2024 {props.companyName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {props.socialLinks?.map((social: any) => (
              <span key={social.platform} className="text-sm opacity-75">
                {social.platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SpacerBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      style={{ ...blockStyles, height: props.height || "60px" }}
      className={`border-2 border-dashed cursor-pointer transition-all ${
        isSelected
          ? "border-valasys-orange bg-orange-50"
          : "border-gray-300 bg-gray-50"
      }`}
    />
  );
};

export const PricingBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  const [hoveredTierId, setHoveredTierId] = React.useState<string | null>(null);
  const [selectedTierId, setSelectedTierId] = React.useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = React.useState<string | null>(null);
  const [selectedElement, setSelectedElement] = React.useState<string | null>(null);

  const handleTierClick = (e: React.MouseEvent, tierId: string) => {
    e.stopPropagation();
    setSelectedTierId(selectedTierId === tierId ? null : tierId);
  };

  const handleElementClick = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    setSelectedElement(selectedElement === elementId ? null : elementId);
  };

  const handleCopyElement = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const handleDeleteElement = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this element?")) {
      if (elementId === "heading") {
        onUpdate({ heading: "" });
      } else if (elementId === "subheading") {
        onUpdate({ subheading: "" });
      }
      setSelectedElement(null);
    }
  };

  const handleCopyTier = (e: React.MouseEvent, tier: any) => {
    e.stopPropagation();
    const tierText = `${tier.name} - ${tier.price} - ${tier.features?.join(", ")}`;
    navigator.clipboard.writeText(tierText);
    alert("Tier copied to clipboard!");
  };

  const handleDeleteTier = (e: React.MouseEvent, tierId: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this pricing tier?")) {
      const updatedTiers = props.pricingTiers?.filter((t: any) => t.id !== tierId) || [];
      onUpdate({ pricingTiers: updatedTiers });
      setSelectedTierId(null);
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={blockStyles}
    >
      <div className="px-8 py-8">
        <div
          className={cn(
            "cursor-pointer transition-all rounded p-3 mb-2 relative",
            selectedElement === "heading" && "border-2 border-solid border-valasys-orange bg-orange-50",
            hoveredElement === "heading" && selectedElement !== "heading" && "border-2 border-dashed border-valasys-orange bg-gray-50",
            selectedElement !== "heading" && hoveredElement !== "heading" && "border-2 border-gray-200"
          )}
          onMouseEnter={(e) => {
            e.stopPropagation();
            setHoveredElement("heading");
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setHoveredElement(null);
          }}
          onClick={(e) => handleElementClick(e, "heading")}
        >
          <h2 className="text-3xl font-bold text-center" style={{ color: props.textColor || "#1f2937" }}>
            {props.heading}
          </h2>
          {selectedElement === "heading" && (
            <div className="mt-3 flex gap-2 pt-3 border-t border-gray-300">
              <button
                onClick={(e) => handleCopyElement(e, props.heading)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
                title="Copy text"
              >
                <span>📋</span> Copy
              </button>
              <button
                onClick={(e) => handleDeleteElement(e, "heading")}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
                title="Delete this element"
              >
                <span>🗑️</span> Delete
              </button>
            </div>
          )}
        </div>

        <div
          className={cn(
            "cursor-pointer transition-all rounded p-3 mb-8 relative",
            selectedElement === "subheading" && "border-2 border-solid border-valasys-orange bg-orange-50",
            hoveredElement === "subheading" && selectedElement !== "subheading" && "border-2 border-dashed border-valasys-orange bg-gray-50",
            selectedElement !== "subheading" && hoveredElement !== "subheading" && "border-2 border-gray-200"
          )}
          onMouseEnter={(e) => {
            e.stopPropagation();
            setHoveredElement("subheading");
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setHoveredElement(null);
          }}
          onClick={(e) => handleElementClick(e, "subheading")}
        >
          <p className="text-center" style={{ color: props.textColor || "#4b5563" }}>
            {props.subheading}
          </p>
          {selectedElement === "subheading" && (
            <div className="mt-3 flex gap-2 pt-3 border-t border-gray-300">
              <button
                onClick={(e) => handleCopyElement(e, props.subheading)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
                title="Copy text"
              >
                <span>📋</span> Copy
              </button>
              <button
                onClick={(e) => handleDeleteElement(e, "subheading")}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
                title="Delete this element"
              >
                <span>🗑️</span> Delete
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-8">
          {props.pricingTiers?.map((tier: any) => (
            <div
              key={tier.id}
              className={cn(
                "rounded-lg p-8 text-center transition-all relative cursor-pointer",
                tier.isHighlighted ? "bg-gray-900 text-white shadow-lg scale-105" : "bg-white",
                selectedTierId === tier.id && "border-2 border-solid border-valasys-orange",
                hoveredTierId === tier.id && selectedTierId !== tier.id && "border-2 border-dashed border-valasys-orange",
                selectedTierId !== tier.id && hoveredTierId !== tier.id && "border border-gray-200"
              )}
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHoveredTierId(tier.id);
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setHoveredTierId(null);
              }}
              onClick={(e) => handleTierClick(e, tier.id)}
            >
              <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
              <div className="text-4xl font-bold mb-2">{tier.price}</div>
              <p
                className={`text-sm mb-6 ${tier.isHighlighted ? "text-gray-300" : "text-gray-600"}`}
              >
                {tier.description}
              </p>
              <ul
                className={`text-sm mb-8 space-y-2 ${
                  tier.isHighlighted ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {tier.features?.map((feature: string, i: number) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
              <button
                style={{
                  backgroundColor: tier.buttonColor,
                  color: tier.buttonTextColor,
                }}
                className="w-full py-2 rounded font-medium hover:opacity-90 transition-opacity"
              >
                {tier.buttonText}
              </button>

              {selectedTierId === tier.id && (
                <div className="mt-4 flex gap-2 pt-4 border-t border-gray-300">
                  <button
                    onClick={(e) => handleCopyTier(e, tier)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
                    title="Copy tier details"
                  >
                    <span>📋</span> Copy
                  </button>
                  <button
                    onClick={(e) => handleDeleteTier(e, tier.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
                    title="Delete this tier"
                  >
                    <span>🗑️</span> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FaqBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={blockStyles}
    >
      <div className="px-8 py-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: props.textColor || "#1f2937" }}>
          {props.heading}
        </h2>
        <div className="space-y-4">
          {props.faqs?.map((faq: any) => (
            <details
              key={faq.id}
              className="group border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-valasys-orange transition-colors"
            >
              <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-valasys-orange">
                {faq.question}
                <span className="text-xl group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SignupBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={blockStyles}
    >
      <div className="px-8 py-8 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2" style={{ color: props.textColor || "#1f2937" }}>
          {props.heading}
        </h2>
        <p className="mb-6" style={{ color: props.textColor || "#4b5563" }}>{props.subheading}</p>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder={props.inputPlaceholder}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-valasys-orange"
          />
          <button
            style={{
              backgroundColor: props.buttonColor,
              color: props.buttonTextColor,
            }}
            className="px-8 py-3 font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export const PricingFooterBlockPreview: React.FC<BlockPreviewProps> = ({
  block,
  isSelected,
  onSelect,
}) => {
  const props = block.properties;
  const blockStyles = getBlockStyles(props);
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all border-2 ${
        isSelected ? "border-valasys-orange" : "border-gray-200"
      }`}
      style={blockStyles}
    >
      <div className="px-8 py-12">
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(${props.columns?.length || 3}, 1fr)`,
          }}
        >
          {props.columns?.map((column: any) => (
            <div key={column.id}>
              <h4 className="font-semibold text-gray-900 mb-4">
                {column.title}
              </h4>
              <div className="space-y-2">
                {column.links?.map((link: any, i: number) => (
                  <p
                    key={i}
                    className="text-sm text-gray-600 hover:text-valasys-orange transition-colors cursor-pointer"
                  >
                    {link.label}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

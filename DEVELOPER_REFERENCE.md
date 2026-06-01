# Argus PV - Tailwind CSS & Component Reference

## Quick Reference Guide for Developers

### Using Argus Colors
```tsx
// Backgrounds
<div className="bg-argus-bg">           // Main background (#f0f4f8)
<div className="bg-argus-bg-panel">     // White panels
<div className="bg-argus-bg-tab-active"> // Active tabs
<div className="bg-argus-bg-tab-inactive"> // Inactive tabs
<div className="bg-argus-bg-row-alt">   // Alternate table rows

// Text Colors
<div className="text-argus-navy">       // Main headers (#1a3a5c)
<div className="text-argus-text-primary"> // Body text
<div className="text-argus-text-label">  // Form labels
<div className="text-argus-text-muted">  // Secondary text
<div className="text-argus-text-header"> // White on dark bg

// Borders
<div className="border border-argus-border"> // Light border
<div className="border-2 border-argus-border-section"> // Section border
```

## Common Component Patterns

### Page Header
```tsx
<div className="flex justify-between items-center mb-4">
  <div className="text-13 font-bold text-argus-navy uppercase">
    PAGE TITLE
  </div>
  <button className="px-3 py-1 text-10 font-bold bg-argus-blue text-white">
    Action Button
  </button>
</div>
```

### Section Header
```tsx
import SectionHeader from '@/components/SectionHeader';
<SectionHeader title="SECTION TITLE" />
```

### Form Field
```tsx
<div className="mb-4">
  <label className="block text-11 font-bold text-argus-text-label mb-1">
    Label: <span className="text-red-600">*</span>
  </label>
  <input
    className="w-full px-2 py-2 text-11 border border-argus-border focus:border-argus-light focus:outline-none bg-white"
    required
  />
</div>
```

### Status Badge
```tsx
<span className={`px-2 py-1 text-10 font-bold rounded ${
  status === 'SERIOUS' 
    ? 'bg-red-100 text-red-800 border border-red-300'
    : 'bg-green-100 text-green-800 border border-green-300'
}`}>
  {status}
</span>
```

### Action Button
```tsx
<button className="px-3 py-1 bg-argus-blue text-white text-10 font-bold border border-argus-border-dark hover:bg-argus-light transition-colors">
  Submit
</button>
```

### Alert Message
```tsx
import InfoPanel from '@/components/InfoPanel';
<InfoPanel type="warning" title="Alert" message="This is important" />
```

### Data Table
```tsx
<div className="border-2 border-argus-border bg-white">
  <SectionHeader title="TABLE TITLE" />
  <table className="w-full text-10 border-collapse">
    <thead>
      <tr className="bg-argus-blue text-white">
        <th className="border border-argus-border px-2 py-1 text-left font-bold">Header</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, idx) => (
        <tr className={`${idx % 2 === 1 ? 'bg-argus-bg-row-alt' : 'bg-white'}`}>
          <td className="border border-argus-border px-2 py-1">{item}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

## Font Sizes
```
text-9      // 9px - smallest text
text-10     // 10px - fine print
text-11     // 11px - labels, headers
text-12     // 12px - body text
text-13     // 13px - section headers
text-14     // 14px - page titles
text-15     // 15px - large headers
text-16     // 16px - major headers
text-24     // 24px - KPI metrics
```

## Spacing Guide
```
gap-1       // 4px
gap-2       // 8px
gap-3       // 12px
gap-4       // 16px
p-1         // 4px padding
p-2         // 8px padding
p-3         // 12px padding
mb-1        // 4px margin-bottom
mb-2        // 8px margin-bottom
mb-4        // 16px margin-bottom
```

## Borders
```
border          // 1px border
border-2        // 2px border
border-3        // 3px border
rounded         // 4px border-radius
```

## Layout Wrapper
```tsx
import ArgusLayout from '@/components/ArgusLayout';

export default function MyPage() {
  return (
    <ArgusLayout>
      {/* Content automatically gets navbar and footer */}
    </ArgusLayout>
  );
}
```

## Color Palette Reference

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Navy | #1a3a5c | Headers, navbar |
| Blue | #2d6da3 | Section headers, tabs |
| Light Blue | #4a90d9 | Buttons, links |
| Orange | #f5a623 | Warnings, highlights |

### Backgrounds
| Name | Hex | Usage |
|------|-----|-------|
| Main BG | #f0f4f8 | Page background |
| Panel | #ffffff | Cards, panels |
| Tab Active | #ffffff | Active tabs |
| Tab Inactive | #d0dce8 | Inactive tabs |
| Row Alt | #eef3f8 | Alternate rows |

### Text
| Name | Hex | Usage |
|------|-----|-------|
| Primary | #1a1a1a | Body text |
| Label | #333333 | Form labels |
| Muted | #666666 | Secondary text |
| Header | #ffffff | White text |

### Borders
| Name | Hex | Usage |
|------|-----|-------|
| Light | #b0c4d8 | Standard borders |
| Dark | #7a9abb | Dark borders |
| Section | #2d6da3 | Section borders |

## Status Indicators
```tsx
// Critical - Red
🔴 or bg-red-100 text-red-800

// Warning - Yellow  
🟡 or bg-yellow-100 text-yellow-800

// Success - Green
🟢 or bg-green-100 text-green-800

// Info - Blue
🛈 or bg-blue-100 text-blue-800
```

## Do's and Don'ts

### DO ✓
- Use `ArgusLayout` for all dashboard pages
- Apply Argus colors consistently
- Use 11px for most text
- Add hover effects to buttons
- Use icons/emojis for clarity
- Follow spacing conventions
- Test form focus states
- Include status indicators

### DON'T ✗
- Don't mix color palettes
- Don't use Material-UI components
- Don't create custom colors
- Don't use arbitrary border-radius
- Don't forget accessibility
- Don't break the grid system
- Don't use inconsistent spacing
- Don't add unnecessary gradients

## Responsive Behavior
```tsx
// Grid columns
grid-cols-1   // Mobile
grid-cols-2   // Tablet
grid-cols-4   // Desktop

// Hide/Show
hidden md:block  // Hide on mobile, show on desktop
md:text-14       // Increase text on desktop
md:px-4          // More padding on desktop
```

## Icons & Symbols
```
📊 Dashboard    👥 Users         ✓ Success
📋 Cases        ⚙️ Settings       ✕ Cancel
🔐 Security     🔔 Alerts        ⏳ Loading
📥 Export       🔄 Refresh       🛈 Info
❌ Error        ⚠️ Warning        ● Bullet
```

## Examples

### Simple Card
```tsx
<div className="bg-white border-2 border-argus-border rounded p-3">
  <h3 className="text-13 font-bold text-argus-navy mb-2">Title</h3>
  <p className="text-11 text-argus-text-muted">Content</p>
</div>
```

### Button Row
```tsx
<div className="flex gap-2">
  <button className="px-4 py-1 bg-argus-blue text-white text-10 font-bold border border-argus-border-dark hover:bg-argus-light">
    Submit
  </button>
  <button className="px-4 py-1 bg-gray-400 text-white text-10 font-bold border border-gray-600 hover:bg-gray-500">
    Cancel
  </button>
</div>
```

### Status Grid
```tsx
<div className="grid grid-cols-4 gap-3">
  {[
    { label: 'Total', value: 73, color: 'text-argus-blue' },
    { label: 'Serious', value: 8, color: 'text-red-600' },
  ].map(item => (
    <div className="bg-white border-2 border-argus-border p-3">
      <div className="text-10 text-argus-text-muted">{item.label}</div>
      <div className={`text-24 font-bold ${item.color}`}>{item.value}</div>
    </div>
  ))}
</div>
```

---

**Always refer to ARGUS_BRANDING.md for complete design system documentation.**

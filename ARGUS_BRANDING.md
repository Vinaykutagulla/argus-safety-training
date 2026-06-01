# Argus PV Safety Training - Professional Branding Guide

## Overview
The Argus PV Safety Training Application has been professionally branded with a comprehensive design system that reflects Oracle Argus Safety's legacy pharmacovigilance platform. This document outlines the branding standards and styling conventions used throughout the application.

## Color Palette

### Primary Colors
- **Navy Blue (#1a3a5c)**: Used for main headers, navbar, and critical elements
- **Medium Blue (#2d6da3)**: Used for section headers, active tabs, and interactive elements
- **Light Blue (#4a90d9)**: Used for buttons, links, and highlights
- **Orange (#f5a623)**: Used for warnings, highlights, and accent elements

### Secondary Colors
- **Background (#f0f4f8)**: Main page background
- **Panel White (#ffffff)**: Card and panel backgrounds
- **Light Gray (#d0dce8)**: Inactive tabs and borders
- **Dark Border (#7a9abb)**: Section borders and separators

### Text Colors
- **Primary Text (#1a1a1a)**: Main body text
- **Header Text (#ffffff)**: Text on navy/blue backgrounds
- **Muted Text (#666666)**: Secondary information
- **Label Text (#333333)**: Form labels

### Status Colors
- **Critical (Red)**: #dc2626 - For overdue, serious, or error states
- **Warning (Yellow)**: #d97706 - For warnings, due soon, or caution
- **Success (Green)**: #059669 - For approved, on-track, or completed
- **Info (Blue)**: #2d6da3 - For informational messages

## Typography

### Font Family
- Primary: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
- Monospace: `Courier New, monospace`

### Font Sizes
- **24px**: Large metrics/KPIs
- **16px**: Major headers
- **15px**: Large section headers
- **14px**: Page titles (with uppercase styling)
- **13px**: Section subheaders
- **12px**: Standard body text
- **11px**: Form labels, table headers
- **10px**: Fine print, secondary information
- **9px**: Smallest text elements

### Font Weights
- **Bold (700)**: Headers, labels, important text
- **Regular (500)**: Body text, descriptions
- **Normal (400)**: Standard text

## Layout & Spacing

### Page Structure
```
ArgusNavbar (fixed at top)
  └─ Navigation menus
  └─ User menu
  └─ System status

Main Content Area
  └─ Page Header (with breadcrumb/icon)
  └─ Content Sections
     ├─ Metric Cards
     ├─ Data Tables
     ├─ Forms
     └─ Lists

ArgusFooter (at bottom)
  └─ Version info
  └─ Copyright
  └─ Status indicators
```

### Spacing Units (in px)
- **2px**: Minimal spacing
- **4px**: Small gaps
- **8px**: Standard padding
- **12px**: Medium spacing
- **16px**: Large spacing
- **24px**: Section spacing
- **32px**: Major section spacing

## Component Styles

### Headers & Titles
- **Page Title**: 14px, bold, uppercase, navy color
- **Section Header**: 13px, bold, navy on light blue background, with left border

### Cards & Panels
- **Background**: White (#ffffff)
- **Border**: 1-2px solid light border
- **Shadow**: 0 1px 3px rgba(0,0,0,0.05), hover: 0 2px 8px rgba(0,0,0,0.1)
- **Padding**: 12px standard
- **Border Radius**: 2px (minimal rounding)

### Buttons
- **Style**: Bordered buttons with solid backgrounds
- **Primary (Blue)**: bg-argus-blue, text-white, border-argus-border-dark
- **Secondary (Gray)**: bg-gray-400, text-white
- **Danger (Red)**: bg-red-600, text-white
- **Hover**: Darker background, slight shadow
- **Disabled**: 50% opacity, not-allowed cursor
- **Padding**: 8px 12px
- **Font Size**: 10px, bold

### Forms
- **Input Fields**: 
  - Border: 1px solid argus-border
  - Focus: Border becomes argus-light, subtle shadow
  - Padding: 8px
  - Font Size: 11px
  - Background: White
- **Labels**: 
  - Font Size: 10-11px, bold
  - Color: argus-text-label
  - Margin Bottom: 4px
- **Select Boxes**: Same as inputs with cursor-pointer

### Tables
- **Header**: bg-argus-blue, text-white, 11px, bold
- **Rows**: Alternating white / #eef3f8
- **Row Hover**: bg-#d0dce8
- **Borders**: 1px solid argus-border
- **Padding**: 8px
- **Font Size**: 10px

### Badges & Status Indicators
- **Serious**: Red background with white text
- **Due Soon**: Yellow background with darker text
- **On Track**: Green background with white text
- **Pending**: Blue background with white text
- **Padding**: 4px 8px
- **Border Radius**: 2px
- **Font Size**: 9-10px, bold

## Navigation

### Navbar Structure
- **Background**: Navy (#1a3a5c)
- **Height**: 32px
- **Text Color**: White
- **Menu Items**: Hover shows light blue background
- **Dropdown Menus**: White background, dark text, shadow
- **Right Section**: User profile, logout button

### Tabs
- **Active**: White background, navy text, bottom border navy
- **Inactive**: Light gray background, muted text, hover effect
- **Font Size**: 11px, bold
- **Padding**: 8px 12px

## Status & Alert Messages

### Info Panels
- **Info**: Blue background, blue text, info icon
- **Warning**: Yellow background, yellow text, warning icon (⚠️)
- **Error**: Red background, red text, error icon (❌)
- **Success**: Green background, green text, success icon (✓)
- **Padding**: 12px
- **Font Size**: 11px
- **Border**: 1px solid matching border color

## Icons & Symbols
- **Emoji Icons**: Used throughout for visual enhancement
- **Unicode Symbols**: ✓, ✕, ●, ▲, ◀, ▶
- **Common Icons**: 
  - 📊 Dashboard
  - 📋 Cases/Worklist
  - 👥 Users
  - ⚙️ Settings
  - 🔐 Security
  - 🔔 Alerts
  - 📥 Export
  - 🔄 Refresh
  - ⏳ Loading

## Gradients
- **Primary Gradient**: `from-argus-blue to-argus-light` (used on login, buttons)
- **Background Gradient**: `from-argus-navy to-argus-blue` (used on login background)

## Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 for normal text)
- Status indicators use text labels in addition to color
- Links are underlined or otherwise distinguished

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus states are clearly visible
- Tab order is logical

## Animation & Transitions
- **Fade In**: 0.3s ease-in-out
- **Color Transitions**: 0.2s ease
- **Hover Effects**: Smooth color/shadow transitions
- **Button Click**: `translateY(-1px)` on hover, reset on click

## Print Styles
- `.no-print` class hides elements in print
- Background colors removed for printing
- Maintains readability and important information

## Best Practices

### DO
✓ Use consistent spacing between elements
✓ Use Argus colors for primary branding
✓ Apply hover states to interactive elements
✓ Use uppercase for page titles
✓ Include icons/emojis for visual clarity
✓ Maintain 1px or 2px borders for Argus style
✓ Use professional color for status indicators
✓ Include loading states for async operations

### DON'T
✗ Don't use generic Material-UI gray/blue
✗ Don't mix border widths inconsistently
✗ Don't use border-radius > 4px
✗ Don't create colors outside the palette
✗ Don't forget accessibility in designs
✗ Don't use inconsistent spacing
✗ Don't add unnecessary shadows/effects
✗ Don't break the established layout structure

## File Structure

### Key Branding Files
- `src/app/globals.css` - Global styling and utilities
- `tailwind.config.ts` - Tailwind theme configuration
- `src/components/ArgusNavbar.tsx` - Navigation bar
- `src/components/ArgusFooter.tsx` - Footer
- `src/components/PageHeader.tsx` - Page headers
- `src/components/SectionHeader.tsx` - Section headers

### Component Usage
- Use `ArgusLayout` wrapper for all dashboard pages
- Use `PageHeader` for page titles
- Use `SectionHeader` for section titles
- Use `InfoPanel` for alerts/messages
- Use standard HTML inputs with Argus classes

## Migration Guide

### From Old Styling to Argus
1. Replace Material-UI components with standard HTML
2. Apply Argus color classes from Tailwind config
3. Use `ArgusLayout` instead of custom layouts
4. Update button styles to use argus-blue/argus-light
5. Apply consistent spacing using Tailwind's spacing
6. Use SectionHeader component for titles
7. Wrap pages in PageHeader component

## Version History
- **v1.0** (Initial Release): Complete Argus branding system implemented
- Colors, typography, components, and layout standards established
- Professional Oracle Argus Safety visual identity applied throughout

---

**For Questions or Branding Updates**: Review this document and maintain consistency with established patterns.

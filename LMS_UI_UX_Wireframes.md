# UI/UX Wireframes & Screen Designs
## Learning Management System (LMS) Application

**Document Version:** 1.0  
**Date:** December 2024  
**Project:** LMS Application UI/UX Design  
**Prepared by:** Design Team  

---

## Table of Contents
1. [Design System & Guidelines](#design-system--guidelines)
2. [Landing Page](#landing-page)
3. [Authentication Flow](#authentication-flow)
4. [Admin Dashboard](#admin-dashboard)
5. [Admin - Create Course](#admin---create-course)
6. [Admin - Manage Courses](#admin---manage-courses)
7. [Admin - Create Student User](#admin---create-student-user)
8. [Student Dashboard](#student-dashboard)
9. [Student - Browse Courses](#student---browse-courses)
10. [Student - Course Content](#student---course-content)
11. [Profile Page](#profile-page)
12. [Responsive Design Guidelines](#responsive-design-guidelines)

---

## Design System & Guidelines

### Modern Color Palette
- **Primary Gradient:** Linear-gradient(135deg, #667eea 0%, #764ba2 100%) - Sophisticated purple-blue
- **Secondary Gradient:** Linear-gradient(135deg, #f093fb 0%, #f5576c 100%) - Vibrant pink-coral
- **Success Gradient:** Linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) - Fresh cyan-blue
- **Warning Gradient:** Linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%) - Warm peach
- **Dark Mode:** #0f0f23 (Deep navy) - Rich dark background
- **Glass Morphism:** rgba(255, 255, 255, 0.25) - Frosted glass effect
- **Neon Accent:** #00d4ff - Electric blue for highlights
- **Text Primary:** #1a1a2e - Deep charcoal
- **Text Secondary:** #6c757d - Muted gray
- **Surface:** rgba(255, 255, 255, 0.95) - Semi-transparent white

### Advanced Typography
- **Primary Font:** "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont
- **Display Font:** "Poppins", "Inter", sans-serif - For hero sections
- **Monospace:** "JetBrains Mono", "Fira Code", monospace - For code elements
- **Headings:** 700-800 weight, 28px-56px with letter-spacing: -0.02em
- **Body Text:** 400-500 weight, 16px-18px with line-height: 1.6
- **Small Text:** 400 weight, 14px with line-height: 1.5
- **Button Text:** 600 weight, 16px with letter-spacing: 0.01em

### Advanced Spacing System
- **Micro:** 2px
- **XS:** 4px
- **SM:** 8px
- **MD:** 16px
- **LG:** 24px
- **XL:** 32px
- **2XL:** 48px
- **3XL:** 64px
- **4XL:** 96px

### Modern Component Guidelines
- **Border Radius:** 12px for cards, 8px for buttons, 20px for modals
- **Advanced Shadows:** 
  - Soft: 0 4px 20px rgba(0, 0, 0, 0.08)
  - Medium: 0 8px 30px rgba(0, 0, 0, 0.12)
  - Strong: 0 20px 60px rgba(0, 0, 0, 0.15)
- **Glass Morphism:** backdrop-filter: blur(20px), border: 1px solid rgba(255, 255, 255, 0.2)
- **Neumorphism:** Subtle 3D effect with light/dark shadows
- **Gradient Overlays:** Subtle gradients for depth and richness
- **Micro-interactions:** Smooth transitions (300ms cubic-bezier)
- **Icons:** 24px default, 20px small, 32px large with custom stroke weights

---

## Modern UI Elements & Unique Design Patterns

### 1. Glass Morphism Cards
**Usage:** Dashboard stats, course cards, profile sections
```css
.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### 2. Animated Gradient Buttons
**Usage:** Primary actions, course enrollment, form submissions
```css
.gradient-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.gradient-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.gradient-button:hover::before {
  left: 100%;
}
```

### 3. Floating Action Buttons (FAB)
**Usage:** Quick course creation, student enrollment, mobile actions
- **Design:** Circular, elevated, with subtle shadow
- **Animation:** Scale on hover, bounce on click
- **Positioning:** Fixed bottom-right with safe area

### 4. Progress Rings & Circular Progress
**Usage:** Course completion, learning progress, skill levels
```css
.progress-ring {
  width: 120px;
  height: 120px;
  transform: rotate(-90deg);
}

.progress-ring-circle {
  stroke: #e0e0e0;
  stroke-width: 8;
  fill: transparent;
  stroke-dasharray: 314;
  stroke-dashoffset: 314;
  transition: stroke-dashoffset 0.5s ease-in-out;
}
```

### 5. Interactive Course Cards
**Usage:** Course browsing, dashboard displays
- **Hover Effects:** 3D tilt, scale, and shadow changes
- **Content Reveal:** Overlay with course details on hover
- **Micro-animations:** Smooth transitions and state changes

### 6. Neumorphic Elements
**Usage:** Form inputs, toggle switches, control panels
```css
.neumorphic {
  background: #f0f0f0;
  box-shadow: 
    20px 20px 60px #d0d0d0,
    -20px -20px 60px #ffffff;
  border-radius: 20px;
}
```

### 7. Animated Icons & Illustrations
**Usage:** Empty states, loading indicators, success messages
- **Lottie Animations:** Custom animated illustrations
- **SVG Animations:** Scalable vector animations
- **Icon Transitions:** Smooth state changes and morphing

### 8. Advanced Data Visualization
**Usage:** Learning analytics, progress tracking, performance metrics
- **Interactive Charts:** D3.js or Chart.js with custom styling
- **Gradient Charts:** Beautiful gradient-filled data visualizations
- **Animated Counters:** Numbers that count up with easing
- **Heat Maps:** Learning activity patterns and engagement

### 9. Floating Navigation
**Usage:** Mobile navigation, quick access menu
- **Design:** Semi-transparent, rounded corners
- **Animation:** Slide up from bottom with spring physics
- **Blur Effect:** Backdrop filter for depth

### 10. Custom Scrollbars
**Usage:** All scrollable content areas
```css
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 4px;
}
```

### 11. Interactive Notifications
**Usage:** System alerts, course updates, achievements
- **Toast Notifications:** Slide in from top-right
- **Progress Notifications:** Real-time upload/download progress
- **Achievement Badges:** Animated unlock effects

### 12. Advanced Form Elements
**Usage:** Course creation, user registration, settings
- **Floating Labels:** Labels that animate up on focus
- **Gradient Inputs:** Subtle gradient borders on focus
- **File Upload Zones:** Drag-and-drop with visual feedback
- **Multi-step Forms:** Progress indicators and smooth transitions

### 13. Dark Mode Toggle
**Usage:** Theme switching, accessibility
- **Smooth Transition:** 300ms ease-in-out
- **System Preference:** Respects user's OS setting
- **Persistent State:** Remembers user choice

### 14. Skeleton Loading States
**Usage:** Content loading, data fetching
- **Shimmer Effect:** Animated placeholder content
- **Progressive Loading:** Content appears as it loads
- **Smooth Transitions:** Fade in when content is ready

### 15. Interactive Video Player
**Usage:** Course content, tutorials
- **Custom Controls:** Styled play/pause/volume controls
- **Progress Bar:** Animated progress with chapter markers
- **Picture-in-Picture:** Floating video for multitasking
- **Speed Controls:** Variable playback speed

---

## Landing Page

### Modern Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] LMS Platform    [About] [Contact] [🌙 Dark]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    Hero Section                         │
│                                                         │
│              Welcome to LMS Platform                    │
│            Empowering Digital Learning                  │
│                                                         │
│              [Animated Feature Cards]                   │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐│
│  │  🎓 Course      │ │  🔐 Secure      │ │ 📊 Progress ││
│  │  Management     │ │  Authentication │ │  Tracking   ││
│  │  Glass Card     │ │  Glass Card     │ │ Glass Card  ││
│  │  Hover Effect   │ │  Hover Effect   │ │Hover Effect ││
│  └─────────────────┘ └─────────────────┘ └─────────────┘│
│                                                         │
│        [Gradient Login Button with Animation]           │
│                                                         │
│              [Floating Particles Background]            │
├─────────────────────────────────────────────────────────┤
│                    Footer                               │
│        © 2024 LMS Platform. All rights reserved.       │
└─────────────────────────────────────────────────────────┘
```

### Advanced UI Elements
- **Glass Morphism Header:** Semi-transparent navigation with blur effect
- **Animated Hero Text:** Typewriter effect with gradient text
- **Interactive Feature Cards:** 3D tilt on hover with glass morphism
- **Gradient CTA Button:** Animated shimmer effect on hover
- **Particle Background:** Subtle animated particles for depth
- **Dark Mode Toggle:** Smooth theme switching with system preference

### Modern Visual Guidelines
- **Background:** Animated gradient with particle effects
- **Typography:** Gradient text with custom font weights
- **Cards:** Glass morphism with subtle shadows and hover animations
- **Button:** Gradient background with shimmer animation
- **Micro-interactions:** Smooth transitions and state changes
- **Responsive:** Fluid typography and spacing scales

---

## Unique Design Patterns & Advanced Components

### 1. Morphing Navigation
**Concept:** Navigation that transforms based on user role and context
- **Admin Mode:** Full sidebar with analytics and management tools
- **Student Mode:** Simplified navigation focused on learning
- **Mobile:** Floating bottom navigation with haptic feedback
- **Animation:** Smooth morphing between states with spring physics

### 2. Intelligent Course Cards
**Concept:** Smart cards that adapt to user progress and preferences
```css
.course-card {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.course-card:hover::before {
  transform: translateX(100%);
}
```

### 3. Dynamic Progress Visualization
**Concept:** Animated progress indicators that tell a story
- **Circular Progress:** SVG-based with gradient fills
- **Linear Progress:** Animated bars with milestone markers
- **3D Progress:** Isometric progress cubes
- **Particle Progress:** Animated particles forming progress shapes

### 4. Contextual Floating Elements
**Concept:** UI elements that appear based on user actions
- **Smart Tooltips:** Rich tooltips with images and actions
- **Floating Action Menu:** Context-sensitive action buttons
- **Quick Preview:** Hover previews for courses and content
- **Gesture Hints:** Subtle animations guiding user interactions

### 5. Adaptive Dashboard Layouts
**Concept:** Dashboards that reorganize based on user behavior
- **Widget System:** Draggable, resizable dashboard widgets
- **Smart Recommendations:** AI-driven content suggestions
- **Activity Streams:** Real-time updates with smooth animations
- **Personalized Views:** Custom layouts based on user preferences

### 6. Advanced Form Interactions
**Concept:** Forms that guide users through complex processes
```css
.floating-label {
  position: relative;
  margin-bottom: 2rem;
}

.floating-label input {
  width: 100%;
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.floating-label input:focus {
  border-color: #00d4ff;
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
}

.floating-label label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #6c757d;
  transition: all 0.3s ease;
  pointer-events: none;
}

.floating-label input:focus + label,
.floating-label input:not(:placeholder-shown) + label {
  top: -0.5rem;
  left: 0.5rem;
  font-size: 0.75rem;
  color: #00d4ff;
  background: white;
  padding: 0 0.5rem;
}
```

### 7. Interactive Data Visualization
**Concept:** Engaging charts and graphs that respond to user interaction
- **Hover Effects:** Detailed data on hover with smooth transitions
- **Click Interactions:** Drill-down capabilities with animated transitions
- **Real-time Updates:** Live data with smooth value changes
- **Custom Styling:** Branded colors and unique visual styles

### 8. Micro-Interaction Library
**Concept:** Subtle animations that enhance user experience
- **Button Presses:** Satisfying click feedback with scale and shadow
- **Loading States:** Creative loading animations and skeleton screens
- **Success States:** Celebration animations for achievements
- **Error States:** Helpful error animations with recovery suggestions

### 9. Advanced File Upload Experience
**Concept:** Intuitive file handling with visual feedback
```css
.file-upload-zone {
  border: 2px dashed #667eea;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.file-upload-zone::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.file-upload-zone:hover::before {
  left: 100%;
}

.file-upload-zone.dragover {
  border-color: #00d4ff;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(102, 126, 234, 0.1));
  transform: scale(1.02);
}
```

### 10. Smart Notification System
**Concept:** Contextual notifications that don't interrupt workflow
- **Toast Notifications:** Slide in from top-right with custom styling
- **In-app Notifications:** Subtle badges and indicators
- **Progress Notifications:** Real-time progress for long operations
- **Achievement Notifications:** Celebratory animations for milestones

### 11. Advanced Search Experience
**Concept:** Intelligent search with instant results and suggestions
- **Instant Search:** Real-time results as user types
- **Search Suggestions:** Smart autocomplete with categories
- **Search Filters:** Visual filter chips with smooth animations
- **Search History:** Recent searches with quick access

### 12. Immersive Video Experience
**Concept:** Custom video player with advanced features
```css
.video-player {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #000;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.video-player:hover .video-controls {
  transform: translateY(0);
}

.progress-bar {
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  position: relative;
  margin: 0.5rem 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: width 0.1s ease;
}
```

### 13. Dynamic Theme System
**Concept:** Adaptive theming that responds to content and user preferences
- **Content-based Themes:** Colors that adapt to course content
- **Time-based Themes:** Themes that change with time of day
- **Mood Themes:** Themes based on user activity and engagement
- **Accessibility Themes:** High contrast and reduced motion options

### 14. Gesture-based Interactions
**Concept:** Touch and gesture support for mobile devices
- **Swipe Navigation:** Swipe between courses and content
- **Pull to Refresh:** Custom pull-to-refresh animations
- **Pinch to Zoom:** Zoom functionality for content viewing
- **Long Press Actions:** Context menus with haptic feedback

### 15. AI-Powered UI Elements
**Concept:** Intelligent UI components that adapt to user behavior
- **Smart Recommendations:** Course suggestions based on learning patterns
- **Adaptive Layouts:** UI that reorganizes based on usage
- **Predictive Actions:** UI elements that anticipate user needs
- **Personalized Content:** Content that adapts to user preferences

---

## Signature UI Elements & Unique Features

### 1. Liquid Morphing Buttons
**Concept:** Buttons that morph and flow like liquid
```css
.liquid-button {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  color: white;
  font-weight: 600;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.liquid-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.liquid-button:hover::before {
  width: 300px;
  height: 300px;
}
```

### 2. Holographic Course Cards
**Concept:** Cards with holographic effects that change based on viewing angle
```css
.holographic-card {
  background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: holographic 3s ease infinite;
  position: relative;
  overflow: hidden;
}

@keyframes holographic {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.holographic-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.holographic-card:hover::before {
  transform: translateX(100%);
}
```

### 3. Neural Network Progress Visualization
**Concept:** Progress shown as animated neural network connections
- **Animated Nodes:** Pulsing dots representing milestones
- **Connecting Lines:** Animated lines showing progress flow
- **Data Flow:** Particles moving along connections
- **Interactive Nodes:** Clickable nodes for detailed information

### 4. Floating Island Navigation
**Concept:** Navigation that appears as floating islands
- **Island Cards:** Rounded, elevated navigation items
- **Floating Animation:** Subtle floating motion
- **Connection Lines:** Animated lines connecting related items
- **Depth Layers:** Multiple layers creating 3D effect

### 5. Particle System Backgrounds
**Concept:** Dynamic particle systems that respond to user interaction
```css
.particle-container {
  position: relative;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00d4ff;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}
```

### 6. Morphing Icons
**Concept:** Icons that transform based on context and state
- **State Transitions:** Smooth morphing between different states
- **Context Awareness:** Icons change based on user actions
- **Micro-animations:** Subtle movements and color changes
- **Brand Consistency:** Custom icon set with unique style

### 7. Interactive 3D Elements
**Concept:** Subtle 3D elements that enhance depth perception
```css
.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.card-3d:hover {
  transform: rotateY(5deg) rotateX(5deg);
}

.card-3d::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
  transform: translateZ(-1px);
}
```

### 8. Smart Loading States
**Concept:** Creative loading animations that match content type
- **Course Loading:** Book pages turning animation
- **Video Loading:** Film strip animation
- **Profile Loading:** Avatar construction animation
- **Data Loading:** Chart building animation

### 9. Gesture Recognition UI
**Concept:** UI elements that respond to touch gestures
- **Swipe Actions:** Swipe to reveal additional options
- **Pinch Gestures:** Pinch to zoom on content
- **Long Press:** Long press for context menus
- **Haptic Feedback:** Tactile feedback for interactions

### 10. Dynamic Color Palettes
**Concept:** Color schemes that adapt to content and time
```css
:root {
  --primary-hue: 220;
  --secondary-hue: 280;
  --accent-hue: 200;
}

.dynamic-theme {
  --primary: hsl(var(--primary-hue), 70%, 60%);
  --secondary: hsl(var(--secondary-hue), 70%, 60%);
  --accent: hsl(var(--accent-hue), 70%, 60%);
  transition: all 0.3s ease;
}

.time-based {
  --primary-hue: calc(220 + (hour * 5));
}
```

### 11. Magnetic UI Elements
**Concept:** UI elements that attract to cursor/touch
```css
.magnetic {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.magnetic:hover {
  transform: scale(1.05);
}
```

### 12. Liquid Progress Indicators
**Concept:** Progress bars that flow like liquid
- **Wave Animation:** Liquid-like wave motion
- **Color Transitions:** Smooth color changes
- **Particle Effects:** Bubbles and particles in liquid
- **Sound Integration:** Audio feedback for progress

### 13. Holographic Text Effects
**Concept:** Text with holographic and prismatic effects
```css
.holographic-text {
  background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: holographic 3s ease infinite;
}
```

### 14. Interactive Data Sculptures
**Concept:** Data visualization as interactive 3D sculptures
- **Rotating Charts:** 3D charts that can be rotated
- **Interactive Nodes:** Clickable data points
- **Animation Sequences:** Data stories told through animation
- **Immersive Views:** Full-screen data exploration

### 15. Biometric UI Adaptation
**Concept:** UI that adapts based on user biometric data
- **Heart Rate:** UI changes based on stress levels
- **Eye Tracking:** UI elements highlight based on gaze
- **Voice Commands:** Voice-activated UI elements
- **Gesture Control:** Hand gesture recognition

---

## Authentication Flow

### Google Sign-In Modal
```
┌─────────────────────────────────────────────────────────┐
│                    Modal Overlay                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Authentication                     │   │
│  │                                                 │   │
│  │            [Google Logo]                        │   │
│  │                                                 │   │
│  │        Sign in with Google                      │   │
│  │                                                 │   │
│  │        [Continue with Google Button]            │   │
│  │                                                 │   │
│  │        [Cancel]                                 │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Modal Overlay:** Semi-transparent background
- **Google Branding:** Official Google logo and colors
- **Primary Button:** "Continue with Google" (Google's brand guidelines)
- **Cancel Option:** Secondary text link

### Visual Guidelines
- **Modal:** Centered, rounded corners, subtle shadow
- **Google Button:** Follow Google's design guidelines
- **Loading State:** Spinner during authentication process

---

## Admin Dashboard

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] LMS Admin    [Profile] [Notifications] [Logout] │
├─────────────────────────────────────────────────────────┤
│ Sidebar │              Main Content Area                │
│         │                                               │
│ [Dashboard] │  ┌─────────────────────────────────────┐  │
│ [Create     │  │        Dashboard Overview           │  │
│  Course]    │  │                                     │  │
│ [Manage     │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │  │
│  Courses]   │  │  │Total│ │Total│ │Total│ │Active│   │  │
│ [Create     │  │  │Courses│Students│Enroll│Courses│   │  │
│  Student]   │  │  │  25  │  150  │ 300  │  20   │   │  │
│ [Student    │  │  └─────┘ └─────┘ └─────┘ └─────┘   │  │
│  List]      │  │                                     │  │
│             │  │     Recent Activity                 │  │
│             │  │  ┌─────────────────────────────────┐ │  │
│             │  │  │ • Course "React Basics" created │ │  │
│             │  │  │ • 5 new students enrolled      │ │  │
│             │  │  │ • Course "JavaScript" published │ │  │
│             │  │  └─────────────────────────────────┘ │  │
│             │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Header:** Logo, user profile, notifications, logout
- **Sidebar:** Navigation menu with active state indicators
- **Stats Cards:** 4-column grid showing key metrics
- **Activity Feed:** Recent system activity with timestamps
- **Quick Actions:** Prominent buttons for common tasks

### Visual Guidelines
- **Sidebar:** Dark background (#1F2937), white text
- **Stats Cards:** White background, colored icons, subtle shadows
- **Active State:** Highlighted sidebar item with accent color
- **Typography:** Clear hierarchy with appropriate font weights

---

## Admin - Create Course

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] LMS Admin    [Profile] [Notifications] [Logout] │
├─────────────────────────────────────────────────────────┤
│ Sidebar │              Course Creation                  │
│         │                                               │
│ [Dashboard] │  ┌─────────────────────────────────────┐  │
│ [Create     │  │        Create New Course            │  │
│  Course] ←  │  │                                     │  │
│ [Manage     │  │  Course Title:                      │  │
│  Courses]   │  │  [_____________________________]    │  │
│ [Create     │  │                                     │  │
│  Student]   │  │  Description:                       │  │
│ [Student    │  │  [_____________________________]    │  │
│  List]      │  │  [_____________________________]    │  │
│             │  │  [_____________________________]    │  │
│             │  │                                     │  │
│             │  │  Video URL:                         │  │
│             │  │  [_____________________________]    │  │
│             │  │                                     │  │
│             │  │  File Upload:                       │  │
│             │  │  ┌─────────────┐ ┌─────────────┐   │  │
│             │  │  │ Choose PDF  │ │ Choose DOCX │   │  │
│             │  │  │   Files     │ │   Files     │   │  │
│             │  │  └─────────────┘ └─────────────┘   │  │
│             │  │                                     │  │
│             │  │  [Preview] [Save Draft] [Publish]   │  │
│             │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Form Fields:** Clear labels, appropriate input types
- **File Upload:** Drag-and-drop zones with file type indicators
- **Action Buttons:** Three states - Preview, Save Draft, Publish
- **Validation:** Real-time form validation with error messages
- **Progress Indicator:** Show upload progress for files

### Visual Guidelines
- **Form Layout:** Single column, consistent spacing
- **File Upload:** Dashed borders, hover effects
- **Buttons:** Primary for Publish, Secondary for others
- **Validation:** Red text for errors, green for success

---

## Admin - Manage Courses

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] LMS Admin    [Profile] [Notifications] [Logout] │
├─────────────────────────────────────────────────────────┤
│ Sidebar │              Course Management                │
│         │                                               │
│ [Dashboard] │  ┌─────────────────────────────────────┐  │
│ [Create     │  │        Manage Courses               │  │
│  Course]    │  │                                     │  │
│ [Manage     │  │  [Search Courses...] [Filter] [Sort]│  │
│  Courses] ← │  │                                     │  │
│ [Create     │  │  ┌─────────────────────────────────┐ │  │
│  Student]   │  │  │ Course Title    │ Status │Actions│ │  │
│ [Student    │  │  ├─────────────────────────────────┤ │  │
│  List]      │  │  │ React Basics    │Published│[Edit]│ │  │
│             │  │  │ JavaScript      │ Draft  │[Edit]│ │  │
│             │  │  │ Python Intro    │Published│[Edit]│ │  │
│             │  │  │ Web Design      │ Draft  │[Edit]│ │  │
│             │  │  └─────────────────────────────────┘ │  │
│             │  │                                     │  │
│             │  │  [Previous] 1 2 3 4 5 [Next]       │  │
│             │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Search Bar:** Global search with autocomplete
- **Filter Options:** Status, date, category filters
- **Data Table:** Sortable columns, action buttons
- **Status Badges:** Color-coded status indicators
- **Pagination:** Page navigation controls

### Visual Guidelines
- **Table:** Alternating row colors, hover effects
- **Status Badges:** Green for published, yellow for draft
- **Action Buttons:** Icon buttons with tooltips
- **Search:** Prominent search bar with clear placeholder

---

## Admin - Create Student User

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] LMS Admin    [Profile] [Notifications] [Logout] │
├─────────────────────────────────────────────────────────┤
│ Sidebar │              User Creation                    │
│         │                                               │
│ [Dashboard] │  ┌─────────────────────────────────────┐  │
│ [Create     │  │        Create Student User          │  │
│  Course]    │  │                                     │  │
│ [Manage     │  │  Student Name:                      │  │
│  Courses]   │  │  [_____________________________]    │  │
│ [Create     │  │                                     │  │
│  Student] ← │  │  Email Address:                     │  │
│ [Student    │  │  [_____________________________]    │  │
│  List]      │  │                                     │  │
│             │  │  Role:                              │  │
│             │  │  [Student ▼]                       │  │
│             │  │                                     │  │
│             │  │  [Create User] [Cancel]             │  │
│             │  │                                     │  │
│             │  │  Recent Students:                   │  │
│             │  │  • john.doe@email.com               │  │
│             │  │  • jane.smith@email.com             │  │
│             │  │  • mike.wilson@email.com            │  │
│             │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Form Fields:** Name, email, role selection
- **Role Dropdown:** Pre-selected as "Student"
- **Action Buttons:** Create User (primary), Cancel (secondary)
- **Recent List:** Show recently created students
- **Validation:** Email format validation, required field checks

### Visual Guidelines
- **Form:** Clean, minimal design with clear labels
- **Dropdown:** Standard select styling
- **Recent List:** Subtle background, easy to scan
- **Validation:** Inline error messages

---

## Student Dashboard

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] LMS Student   [Profile] [Notifications] [Logout]│
├─────────────────────────────────────────────────────────┤
│ Sidebar │              Learning Dashboard               │
│         │                                               │
│ [My      │  ┌─────────────────────────────────────┐  │
│  Courses]│  │        My Learning Dashboard        │  │
│ [Browse  │  │                                     │  │
│  Courses]│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │  │
│ [Profile]│  │  │Enroll│ │Compl│ │In   │ │Total│   │  │
│          │  │  │ed    │ │eted │ │Prog │ │Prog │   │  │
│          │  │  │  5   │ │  2  │ │  3  │ │ 65% │   │  │
│          │  │  └─────┘ └─────┘ └─────┘ └─────┘   │  │
│          │  │                                     │  │
│          │  │     Enrolled Courses                │  │
│          │  │  ┌─────────────────────────────────┐ │  │
│          │  │  │ React Basics    [60%] [Continue]│ │  │
│          │  │  │ JavaScript      [100%] [Review] │ │  │
│          │  │  │ Python Intro    [30%] [Continue]│ │  │
│          │  │  └─────────────────────────────────┘ │  │
│          │  │                                     │  │
│          │  │     Available Courses               │  │
│          │  │  ┌─────────────────────────────────┐ │  │
│          │  │  │ Web Design      [Enroll]       │ │  │
│          │  │  │ Data Science    [Enroll]       │ │  │
│          │  │  └─────────────────────────────────┘ │  │
│          │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Progress Cards:** Visual progress indicators
- **Course Cards:** Thumbnail, title, progress, action buttons
- **Quick Stats:** Enrolled, completed, in-progress counts
- **Action Buttons:** Continue, Review, Enroll based on status
- **Notifications:** New courses, reminders, achievements

### Visual Guidelines
- **Progress Bars:** Animated, color-coded (green for complete)
- **Course Cards:** Hover effects, clear CTAs
- **Stats:** Large, bold numbers with descriptive labels
- **Color Coding:** Green for completed, blue for in-progress

---

## Student - Browse Courses

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] LMS Student   [Profile] [Notifications] [Logout]│
├─────────────────────────────────────────────────────────┤
│ Sidebar │              Browse Courses                   │
│         │                                               │
│ [My      │  ┌─────────────────────────────────────┐  │
│  Courses]│  │        Browse Available Courses     │  │
│ [Browse  │  │                                     │  │
│  Courses]│  │  [Search Courses...] [Category ▼]   │  │
│ [Profile]│  │                                     │  │
│          │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ │  │
│          │  │  │ React   │ │JavaScript│ │ Python  │ │  │
│          │  │  │ Basics  │ │  Intro   │ │ Intro   │ │  │
│          │  │  │         │ │          │ │         │ │  │
│          │  │  │ Learn   │ │ Master   │ │ Start   │ │  │
│          │  │  │ React   │ │ JavaScript│ │ Python  │ │  │
│          │  │  │ from    │ │ from     │ │ from    │ │  │
│          │  │  │ scratch │ │ scratch  │ │ scratch │ │  │
│          │  │  │         │ │          │ │         │ │  │
│          │  │  │ [Enroll]│ │ [Enroll] │ │ [Enroll]│ │  │
│          │  │  └─────────┘ └─────────┘ └─────────┘ │  │
│          │  │                                     │  │
│          │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ │  │
│          │  │  │ Web     │ │ Data    │ │ Mobile  │ │  │
│          │  │  │ Design  │ │ Science │ │ App Dev │ │  │
│          │  │  │         │ │         │ │         │ │  │
│          │  │  │ Create  │ │ Learn   │ │ Build   │ │  │
│          │  │  │ modern  │ │ data    │ │ mobile  │ │  │
│          │  │  │ websites│ │ analysis│ │ apps    │ │  │
│          │  │  │         │ │         │ │         │ │  │
│          │  │  │ [Enroll]│ │ [Enroll] │ │ [Enroll]│ │  │
│          │  │  └─────────┘ └─────────┘ └─────────┘ │  │
│          │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Search & Filter:** Global search with category filters
- **Course Grid:** 3-column responsive grid layout
- **Course Cards:** Image, title, description, enroll button
- **Pagination:** Load more or page navigation
- **Sort Options:** By popularity, date, difficulty

### Visual Guidelines
- **Grid Layout:** Consistent card sizes, proper spacing
- **Course Images:** Placeholder or actual course thumbnails
- **Enroll Buttons:** Prominent, consistent styling
- **Hover Effects:** Subtle elevation and color changes

---

## Student - Course Content

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] LMS Student   [Profile] [Notifications] [Logout]│
├─────────────────────────────────────────────────────────┤
│ Sidebar │              Course Content                   │
│         │                                               │
│ [My      │  ┌─────────────────────────────────────┐  │
│  Courses]│  │        React Basics                 │  │
│ [Browse  │  │        by John Smith                │  │
│  Courses]│  │                                     │  │
│ [Profile]│  │  ┌─────────────────────────────────┐ │  │
│          │  │  │        Video Player             │ │  │
│          │  │  │                                 │ │  │
│          │  │  │    [Embedded Video Content]     │ │  │
│          │  │  │                                 │ │  │
│          │  │  │    [Play] [Pause] [Fullscreen]  │ │  │
│          │  │  └─────────────────────────────────┘ │  │
│          │  │                                     │  │
│          │  │  Course Description:                │  │
│          │  │  Learn React from the ground up...  │  │
│          │  │                                     │  │
│          │  │  ┌─────────────────────────────────┐ │  │
│          │  │  │ 📄 Course Material.pdf [View]│ │  │
│          │  │  │ 📄 Assignment.docx [View]   │ │  │
│          │  │  │ 📄 Study Guide.pdf [View]   │ │  │
│          │  │  └─────────────────────────────────┘ │  │
│          │  │                                     │  │
│          │  │  Progress: ████████░░ 80%           │  │
│          │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Video Player:** Embedded video with custom controls
- **Course Info:** Title, instructor, description
- **File Views:** PDF and DOCX files with view only
- **Progress Bar:** Visual progress indicator
- **Navigation:** Previous/Next course buttons

### Visual Guidelines
- **Video Player:** Responsive, custom styled controls
- **File List:** Clear icons, hover effects on download buttons
- **Progress Bar:** Animated, color-coded progress
- **Typography:** Clear hierarchy for course information

---

## Profile Page

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] LMS Student   [Profile] [Notifications] [Logout]│
├─────────────────────────────────────────────────────────┤
│ Sidebar │              Profile Settings                 │
│         │                                               │
│ [My      │  ┌─────────────────────────────────────┐  │
│  Courses]│  │        Profile Information          │  │
│ [Browse  │  │                                     │  │
│  Courses]│  │  ┌─────────────────────────────────┐ │  │
│ [Profile]│  │  │        [Profile Picture]       │ │  │
│          │  │  │                                 │ │  │
│          │  │  │        [Change Photo]           │ │  │
│          │  │  └─────────────────────────────────┘ │  │
│          │  │                                     │  │
│          │  │  Name:                              │  │
│          │  │  [John Doe                    ]     │  │
│          │  │                                     │  │
│          │  │  Email:                             │  │
│          │  │  [john.doe@email.com          ]     │  │
│          │  │                                     │  │
│          │  │  Role:                              │  │
│          │  │  [Student ▼]                        │  │
│          │  │                                     │  │
│          │  │  [Save Changes] [Cancel]            │  │
│          │  │                                     │  │
│          │  │  Learning Statistics:               │  │
│          │  │  • Courses Enrolled: 5              │  │
│          │  │  • Courses Completed: 2             │  │
│          │  │  • Total Study Time: 24 hours       │  │
│          │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Profile Picture:** Large, circular image with change option
- **Form Fields:** Editable name, email, role
- **Action Buttons:** Save Changes, Cancel
- **Statistics:** Learning progress and achievements
- **Settings:** Additional account settings

### Visual Guidelines
- **Profile Picture:** Large, prominent display
- **Form Fields:** Clear labels, appropriate input types
- **Statistics:** Bullet points, easy to scan
- **Buttons:** Primary for save, secondary for cancel

---

## Responsive Design Guidelines

### Desktop (1200px+)
- **Sidebar:** Fixed width (250px)
- **Main Content:** Flexible width with max-width
- **Grid Layouts:** 3-4 columns for course cards
- **Typography:** Full-size fonts and spacing

### Tablet (768px - 1199px)
- **Sidebar:** Collapsible, overlay on mobile
- **Main Content:** Full width with padding
- **Grid Layouts:** 2 columns for course cards
- **Typography:** Slightly reduced font sizes

### Mobile (320px - 767px)
- **Sidebar:** Hidden, accessible via hamburger menu
- **Main Content:** Full width, minimal padding
- **Grid Layouts:** Single column for course cards
- **Typography:** Mobile-optimized font sizes
- **Touch Targets:** Minimum 44px for all interactive elements

### Navigation Patterns
- **Desktop:** Always visible sidebar navigation
- **Tablet:** Collapsible sidebar with overlay
- **Mobile:** Hamburger menu with slide-out navigation

### Component Adaptations
- **Tables:** Horizontal scroll on mobile
- **Forms:** Stacked layout on mobile
- **Cards:** Full-width on mobile, grid on larger screens
- **Buttons:** Full-width on mobile for primary actions

---

## Accessibility Guidelines

### Color Contrast
- **Text:** Minimum 4.5:1 contrast ratio
- **Interactive Elements:** Minimum 3:1 contrast ratio
- **Focus States:** Clear, visible focus indicators

### Keyboard Navigation
- **Tab Order:** Logical tab sequence
- **Skip Links:** Skip to main content
- **Focus Management:** Clear focus indicators

### Screen Reader Support
- **Alt Text:** Descriptive alt text for images
- **ARIA Labels:** Proper labeling for interactive elements
- **Semantic HTML:** Use appropriate HTML elements

### Motion and Animation
- **Reduced Motion:** Respect user preferences
- **Animation Duration:** Maximum 300ms for transitions
- **Loading States:** Clear loading indicators

---

**Document Approval:**
- [ ] Design Team Review
- [ ] User Experience Review
- [ ] Accessibility Review
- [ ] Final Approval

**Next Steps:**
1. Create high-fidelity mockups
2. Develop interactive prototypes
3. Conduct user testing
4. Implement responsive design
5. Accessibility testing and validation

---

*This UI/UX wireframe document serves as the foundation for the LMS application design and should be reviewed and updated as design requirements evolve.*

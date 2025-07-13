# 🤖 AI-Friendly Material-UI Component Library

[![Version](https://img.shields.io/npm/v/@dilip-design/mui-components.svg)](https://www.npmjs.com/package/@dilip-design/mui-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-blue.svg)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-v7.0.0--rc.0-blue.svg)](https://mui.com/)

Enterprise-grade Material-UI v7 RC component library optimized for AI/Agentic coding with systematic senior engineer-level thinking processes.

## 🎯 **Features**

- ✅ **Material-UI v7 RC** - Latest features with CSS Variables 2.0
- ✅ **AI-Enhanced Development** - Comprehensive AI workflow automation
- ✅ **TypeScript Strict** - Zero tolerance for type violations
- ✅ **Dark Theme Optimized** - OLED-friendly with enhanced contrast
- ✅ **Gradient Design System** - Performance-optimized gradients
- ✅ **Accessibility First** - WCAG 2.1 AA compliant
- ✅ **Bundle Size Optimized** - Tree-shakeable, <150KB limit
- ✅ **Senior Engineer Patterns** - Systematic thinking processes

## 🚀 **Quick Start**

### Prerequisites
- Node.js ≥18.17.0
- Yarn ≥4.0.0 (mandatory - no npm)

### Installation

```bash
yarn add @dilip-design/mui-components @mui/material @emotion/react @emotion/styled
```

### Basic Usage

```tsx
import { Button, ThemeProvider } from '@dilip-design/mui-components';

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary" size="medium">
        AI-Enhanced Button
      </Button>
    </ThemeProvider>
  );
}
```

## 📁 **Project Structure**

```
mui-design-system/
├── src/
│   ├── components/          # Component library
│   │   ├── core/           # Button, IconButton, Chip
│   │   ├── forms/          # TextField, Select, Checkbox
│   │   ├── layout/         # Container, Grid, Stack
│   │   ├── feedback/       # Alert, Snackbar, Progress
│   │   ├── navigation/     # Tabs, Breadcrumbs, Menu
│   │   ├── data-display/   # Table, Card, List
│   │   └── surfaces/       # Modal, Dialog, Drawer
│   ├── theme/              # Advanced theming system
│   ├── ai-context/         # AI metadata system
│   └── ai-workflow/        # AI workflow engines
├── docs/                   # Comprehensive documentation
├── scripts/                # AI development scripts
└── templates/              # Code generation templates
```

## 🤖 **AI Development**

### Component Generation
```bash
yarn gen:component
# Follow AI-enhanced prompts for comprehensive component creation
```

### AI Workflow Commands
```bash
yarn ai:senior-engineer    # Senior engineer analysis mode
yarn ai:overthink          # Deep analysis for complex decisions
yarn ai:validate           # Validate AI-friendly patterns
yarn ai:docs              # Generate AI documentation
```

## 🛠️ **Development**

### Setup
```bash
yarn setup                # Complete project setup
yarn dev                  # Start development environment
```

### Quality Gates
```bash
yarn typecheck            # TypeScript strict validation
yarn lint                 # ESLint + Prettier
yarn test:coverage        # 95%+ test coverage
yarn ai:validate          # AI pattern validation
```

### Build
```bash
yarn build                # Production build
yarn analyze:bundle       # Bundle size analysis
```

## 📚 **Documentation**

- [Getting Started Guide](./docs/ai-guides/GETTING_STARTED.md)
- [Component Creation](./docs/ai-guides/COMPONENT_CREATION.md)
- [AI Workflow Guide](./docs/ai-guides/WORKFLOW_GUIDE.md)
- [Dark Theme & Gradients](./docs/ai-guides/DARK_THEME_GRADIENTS.md)

## 🎨 **Components**

### Core Components
- [Button](./src/components/core/Button/) - 8 variants with AI documentation
- [IconButton](./src/components/core/IconButton/) - Enhanced accessibility
- [Chip](./src/components/core/Chip/) - Interactive with animations

### Form Components
- [TextField](./src/components/forms/TextField/) - Validation & form integration
- [Select](./src/components/forms/Select/) - Enhanced UX patterns
- [Checkbox](./src/components/forms/Checkbox/) - Accessibility optimized

### Layout Components
- [Container](./src/components/layout/Container/) - Responsive containers
- [Grid](./src/components/layout/Grid/) - 12-column grid system
- [Stack](./src/components/layout/Stack/) - Flexbox-based stacking

## 🔧 **Configuration**

### Theme Customization
```tsx
import { createTheme, ThemeProvider } from '@dilip-design/mui-components';

const customTheme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    mode: 'dark', // OLED-optimized dark mode
  },
  gradients: {
    primary: 'linear-gradient(45deg, #1976d2, #42a5f5)',
  },
});

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

## 📊 **Quality Standards**

- ✅ **TypeScript Strict** - Zero `any` types allowed
- ✅ **Test Coverage** - 95%+ coverage requirement
- ✅ **Bundle Size** - <150KB gzipped
- ✅ **Accessibility** - WCAG 2.1 AA compliant
- ✅ **Performance** - Optimized for mobile devices

## 🤝 **Contributing**

1. Follow the [AI Coding Guide](./.github/AI_CODING_GUIDE.md)
2. Use the component generation tools: `yarn gen:component`
3. Ensure all quality gates pass: `yarn test && yarn lint && yarn typecheck`
4. Create comprehensive AI documentation

## 📄 **License**

MIT © [Dilip Yadav](mailto:dilip.sm.yadav@gmail.com)

## 🔗 **Links**

- [Repository](https://github.com/dilip-yadav/mui-design-system)
- [Documentation](https://dilip-design-system.vercel.app)
- [Issues](https://github.com/dilip-yadav/mui-design-system/issues)
- [Changelog](./CHANGELOG.md)

---

**Built with ❤️ for AI-Enhanced Development**
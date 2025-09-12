import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const ProjectReadme = ({ project }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'prerequisites', label: 'Prerequisites', icon: '🔧' },
    { id: 'setup', label: 'Setup', icon: '⚙️' },
    { id: 'phases', label: 'Phases', icon: '🚀' },
    { id: 'resources', label: 'Resources', icon: '📚' }
  ];

  const readmeContent = project.readmeContent || `# ${project.title}

## Project Overview
${project.description}

## Learning Objectives
- Master modern web development technologies
- Learn best practices and industry standards
- Build a complete, production-ready application
- Understand the full development lifecycle
- Gain hands-on experience with real-world projects

## Prerequisites
- Basic knowledge of JavaScript
- Familiarity with HTML and CSS
- Understanding of web development concepts
- Basic command line experience

## Project Structure
The project is divided into 5 phases, each building upon the previous one:

1. **BRD (Business Requirements Document)** - Define project scope and requirements
2. **UI/UX (User Interface/User Experience)** - Design user interface and experience
3. **Development** - Implement the application
4. **Testing & Quality Assurance** - Test and ensure quality
5. **Deployment & Launch** - Deploy to production

## Getting Started
1. Clone the project repository
2. Install dependencies
3. Follow the phase-by-phase guide
4. Complete each phase before moving to the next

## Resources
- [Project Documentation](./docs)
- [Code Repository](./src)
- [Video Tutorials](./videos)
- [Community Support](./community)

## Support
If you need help or have questions, please reach out to our community or support team.`;

  const markdownSections = {
    overview: readmeContent,
    prerequisites: `## Prerequisites

Before starting this project, you should have:

### Technical Skills
- **JavaScript**: Basic understanding of ES6+ features
- **HTML/CSS**: Ability to create and style web pages
- **Git**: Basic version control knowledge
- **Command Line**: Comfortable using terminal/command prompt

### Tools Required
- **Node.js**: Version 16 or higher
- **Code Editor**: VS Code, WebStorm, or similar
- **Browser**: Chrome, Firefox, or Safari
- **Git**: For version control

### Optional but Helpful
- **React**: Basic understanding of React concepts
- **Database**: Basic SQL knowledge
- **APIs**: Understanding of REST APIs
- **Design**: Basic UI/UX principles`,

    setup: `## Setup Instructions

### 1. Environment Setup
\`\`\`bash
# Install Node.js (if not already installed)
# Download from https://nodejs.org/

# Verify installation
node --version
npm --version
\`\`\`

### 2. Project Setup
\`\`\`bash
# Clone the repository
git clone [repository-url]
cd ${project.title.toLowerCase().replace(/\s+/g, '-')}

# Install dependencies
npm install

# Start development server
npm start
\`\`\`

### 3. Database Setup
\`\`\`bash
# Install PostgreSQL (if not already installed)
# Create database
createdb project_database

# Run migrations
npm run migrate
\`\`\`

### 4. Configuration
\`\`\`bash
# Copy environment file
cp .env.example .env

# Update environment variables
# Edit .env file with your configuration
\`\`\``,

    phases: `## Project Phases

### Phase 1: BRD (Business Requirements Document)
**Duration**: 8 hours
**Objective**: Define project scope and requirements

**Tasks**:
- Identify stakeholders and their needs
- Define functional requirements
- Create technical specifications
- Perform risk assessment
- Create project timeline

**Deliverables**:
- Business Requirements Document
- Stakeholder Analysis
- Technical Specifications
- Risk Assessment Report

### Phase 2: UI/UX (User Interface/User Experience)
**Duration**: 8 hours
**Objective**: Design user interface and experience

**Tasks**:
- Create user personas
- Design wireframes
- Create high-fidelity prototypes
- Develop design system
- Conduct usability testing

**Deliverables**:
- User Personas
- Wireframes
- Prototypes
- Design System
- Usability Test Results

### Phase 3: Development
**Duration**: 16 hours
**Objective**: Implement the application

**Tasks**:
- Set up development environment
- Implement backend API
- Build frontend components
- Integrate database
- Implement authentication

**Deliverables**:
- Working Application
- Source Code
- API Documentation
- Database Schema

### Phase 4: Testing & Quality Assurance
**Duration**: 4 hours
**Objective**: Test and ensure quality

**Tasks**:
- Write unit tests
- Perform integration testing
- Conduct user acceptance testing
- Performance testing
- Security testing

**Deliverables**:
- Test Suite
- Test Results
- Performance Report
- Security Audit

### Phase 5: Deployment & Launch
**Duration**: 4 hours
**Objective**: Deploy to production

**Tasks**:
- Set up production environment
- Configure CI/CD pipeline
- Deploy application
- Monitor performance
- Launch and support

**Deliverables**:
- Production Application
- Deployment Documentation
- Monitoring Setup
- Launch Plan`,

    resources: `## Additional Resources

### Documentation
- [Project Guide](./docs/guide.md)
- [API Reference](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Deployment Guide](./docs/deployment.md)

### Code Examples
- [Sample Code](./examples)
- [Best Practices](./docs/best-practices.md)
- [Code Style Guide](./docs/code-style.md)

### Video Tutorials
- [Project Overview Video](./videos/overview.mp4)
- [Phase 1 Tutorial](./videos/phase1.mp4)
- [Phase 2 Tutorial](./videos/phase2.mp4)
- [Phase 3 Tutorial](./videos/phase3.mp4)
- [Phase 4 Tutorial](./videos/phase4.mp4)
- [Phase 5 Tutorial](./videos/phase5.mp4)

### Community
- [Discord Server](https://discord.gg/project)
- [GitHub Discussions](https://github.com/project/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/project)

### Tools & Libraries
- [React Documentation](https://reactjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [VS Code Extensions](./docs/vscode-extensions.md)`
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Documentation</h3>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 sticky top-4">
            <h4 className="font-semibold text-gray-800 mb-4">Table of Contents</h4>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200
                    ${activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }
                  `}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{markdownSections[activeSection]}</ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectReadme;

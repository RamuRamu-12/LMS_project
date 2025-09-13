import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const BRDPhasePage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for testing - in real app, fetch based on projectId
    const mockProjects = [
      {
        id: 1,
        title: 'E-Commerce Web Application',
        description: 'Build a complete e-commerce platform with modern technologies including React, Node.js, and PostgreSQL.',
        difficulty: 'intermediate',
        estimatedDuration: 40,
        phases: [
          {
            id: 1,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define project scope, requirements, and technical specifications',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 8,
            order: 1
          }
        ]
      },
      {
        id: 2,
        title: 'Data Analytics Dashboard',
        description: 'Create an interactive data analytics dashboard using modern visualization libraries and real-time data processing.',
        difficulty: 'intermediate',
        estimatedDuration: 35,
        phases: [
          {
            id: 6,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define data requirements and analytics objectives',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 7,
            order: 1
          }
        ]
      },
      {
        id: 3,
        title: 'AI-Powered Learning Assistant',
        description: 'Develop an intelligent learning assistant using AI and machine learning technologies.',
        difficulty: 'advanced',
        estimatedDuration: 45,
        phases: [
          {
            id: 11,
            title: 'Phase 1 - BRD (Business Requirements Document)',
            description: 'Define AI requirements and learning objectives',
            phaseNumber: 1,
            phaseType: 'BRD',
            estimatedDuration: 9,
            order: 1
          }
        ]
      }
    ];

    const foundProject = mockProjects.find(p => p.id === parseInt(projectId));
    if (foundProject) {
      setProject(foundProject);
    }
    setLoading(false);
  }, [projectId]);

  const brdTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '📋',
      description: 'Project overview and objectives'
    },
    {
      id: 'functional-requirements',
      label: 'Functional Requirements',
      icon: '⚙️',
      description: 'Core functionality specifications'
    },
    {
      id: 'non-functional-requirements',
      label: 'Non-Functional Requirements',
      icon: '🎯',
      description: 'Performance and quality requirements'
    },
    {
      id: 'user-stories',
      label: 'User Stories',
      icon: '👥',
      description: 'User scenarios and use cases'
    },
    {
      id: 'conclusion',
      label: 'Conclusion',
      icon: '✅',
      description: 'Summary and next steps'
    }
  ];

  const handleBackToProjects = () => {
    navigate('/realtime-projects');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading BRD Phase...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <button
            onClick={handleBackToProjects}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                This phase focuses on creating a comprehensive Business Requirements Document (BRD) for the {project.title}. 
                The BRD serves as the foundation for all subsequent development phases and ensures that all stakeholders 
                have a clear understanding of the project's objectives, scope, and requirements.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Phase Objectives</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Define clear project scope and boundaries</li>
                  <li>Identify key stakeholders and their requirements</li>
                  <li>Document functional and non-functional requirements</li>
                  <li>Create user stories and use cases</li>
                  <li>Establish success criteria and metrics</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Deliverables</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Business Requirements Document</li>
                  <li>Stakeholder Analysis</li>
                  <li>Functional Requirements Specification</li>
                  <li>Non-Functional Requirements Specification</li>
                  <li>User Stories and Acceptance Criteria</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'functional-requirements':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Functional Requirements</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Functional requirements define what the system must do to meet the business objectives. 
                These requirements describe the system's behavior and functionality from the user's perspective.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Core Features</h4>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-medium text-gray-800">User Authentication</h5>
                      <p className="text-gray-600 text-sm">Secure login and registration system with role-based access control</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h5 className="font-medium text-gray-800">Product Management</h5>
                      <p className="text-gray-600 text-sm">Add, edit, delete, and categorize products with inventory tracking</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-medium text-gray-800">Shopping Cart</h5>
                      <p className="text-gray-600 text-sm">Add/remove items, quantity management, and persistent cart storage</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h5 className="font-medium text-gray-800">Order Processing</h5>
                      <p className="text-gray-600 text-sm">Complete checkout flow with payment integration and order tracking</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Business Rules</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Users must be authenticated to make purchases</li>
                    <li>Minimum order value for free shipping</li>
                    <li>Inventory must be checked before order confirmation</li>
                    <li>Payment must be processed before order fulfillment</li>
                    <li>Admin users can manage all products and orders</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'non-functional-requirements':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Non-Functional Requirements</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Non-functional requirements define how the system performs and operates, 
                focusing on quality attributes such as performance, security, and usability.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Page load time: &lt; 3 seconds</li>
                    <li>• Support 1000 concurrent users</li>
                    <li>• Database response time: &lt; 500ms</li>
                    <li>• 99.9% uptime availability</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Security</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• HTTPS encryption for all communications</li>
                    <li>• Password hashing with bcrypt</li>
                    <li>• JWT token-based authentication</li>
                    <li>• Input validation and sanitization</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Usability</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Responsive design for all devices</li>
                    <li>• Intuitive navigation and user flow</li>
                    <li>• Accessibility compliance (WCAG 2.1)</li>
                    <li>• Multi-language support capability</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Scalability</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Horizontal scaling capability</li>
                    <li>• Microservices architecture</li>
                    <li>• Database optimization and indexing</li>
                    <li>• CDN for static assets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'user-stories':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">User Stories</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                User stories capture the requirements from the perspective of different user types. 
                Each story follows the format: "As a [user type], I want [goal] so that [benefit]."
              </p>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Customer Stories</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-gray-800 mb-2">User Registration</h5>
                      <p className="text-gray-600 text-sm mb-2">
                        <strong>As a</strong> new customer, <strong>I want to</strong> create an account <strong>so that</strong> I can save my information and track my orders.
                      </p>
                      <div className="text-xs text-gray-500">
                        <strong>Acceptance Criteria:</strong> User can register with email/password, receive confirmation email, and login successfully.
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-gray-800 mb-2">Product Browsing</h5>
                      <p className="text-gray-600 text-sm mb-2">
                        <strong>As a</strong> customer, <strong>I want to</strong> browse products by category <strong>so that</strong> I can easily find what I'm looking for.
                      </p>
                      <div className="text-xs text-gray-500">
                        <strong>Acceptance Criteria:</strong> Products are categorized, searchable, and display with images, prices, and descriptions.
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-gray-800 mb-2">Shopping Cart</h5>
                      <p className="text-gray-600 text-sm mb-2">
                        <strong>As a</strong> customer, <strong>I want to</strong> add items to my cart <strong>so that</strong> I can purchase multiple items together.
                      </p>
                      <div className="text-xs text-gray-500">
                        <strong>Acceptance Criteria:</strong> Items persist in cart, quantity can be modified, and total is calculated correctly.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Admin Stories</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-gray-800 mb-2">Product Management</h5>
                      <p className="text-gray-600 text-sm mb-2">
                        <strong>As an</strong> admin, <strong>I want to</strong> manage products <strong>so that</strong> I can keep the catalog up to date.
                      </p>
                      <div className="text-xs text-gray-500">
                        <strong>Acceptance Criteria:</strong> Admin can add, edit, delete products with images, descriptions, and inventory.
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-gray-800 mb-2">Order Management</h5>
                      <p className="text-gray-600 text-sm mb-2">
                        <strong>As an</strong> admin, <strong>I want to</strong> view and manage orders <strong>so that</strong> I can fulfill customer requests.
                      </p>
                      <div className="text-xs text-gray-500">
                        <strong>Acceptance Criteria:</strong> Admin can view all orders, update order status, and track fulfillment.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Conclusion & Next Steps</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                The Business Requirements Document (BRD) provides a comprehensive foundation for the {project.title} project. 
                This document serves as the single source of truth for all stakeholders and development team members.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">BRD Summary</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Clear project scope and objectives defined</li>
                  <li>Functional requirements documented with user stories</li>
                  <li>Non-functional requirements specified for performance and quality</li>
                  <li>Stakeholder roles and responsibilities identified</li>
                  <li>Success criteria and acceptance criteria established</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Next Phase: UI/UX Design</h4>
                <p className="text-gray-600 mb-4">
                  With the BRD completed, the next phase will focus on creating intuitive and user-friendly designs 
                  that align with the functional and non-functional requirements outlined in this document.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Wireframing</h5>
                    <p className="text-sm text-gray-600">Create low-fidelity wireframes for all major user flows</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Prototyping</h5>
                    <p className="text-sm text-gray-600">Develop interactive prototypes for user testing</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Visual Design</h5>
                    <p className="text-sm text-gray-600">Create high-fidelity designs with branding and styling</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Usability Testing</h5>
                    <p className="text-sm text-gray-600">Validate designs with target users</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Ready to Proceed?</h4>
                <p className="text-gray-600 mb-4">
                  This BRD phase is now complete. You can proceed to the next phase (UI/UX Design) or review 
                  any section of this document as needed.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Continue to UI/UX Phase
                  </button>
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Download BRD Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-80 bg-white/90 backdrop-blur-sm shadow-xl border-r border-gray-200 overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={handleBackToProjects}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
            >
              <span>←</span>
              <span>Back to Projects</span>
            </button>
            <h1 className="text-xl font-bold text-gray-800 mb-2">BRD Phase</h1>
            <p className="text-sm text-gray-600">{project.title}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="p-4">
            <nav className="space-y-2">
              {brdTabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                    ${selectedTab === tab.id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }
                  `}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{tab.label}</div>
                    <div className="text-xs text-gray-500">{tab.description}</div>
                  </div>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Progress Indicator */}
          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Phase Progress</h4>
              <div className="space-y-2">
                {brdTabs.map((tab) => (
                  <div key={tab.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedTab === tab.id ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-xs ${
                      selectedTab === tab.id ? 'text-blue-600 font-medium' : 'text-gray-500'
                    }`}>
                      {tab.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BRDPhasePage;

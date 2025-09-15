import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const UIUXPhasePage = () => {
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
          },
          {
            id: 2,
            title: 'Phase 2 - UI/UX Design',
            description: 'Create intuitive and user-friendly designs',
            phaseNumber: 2,
            phaseType: 'UIUX',
            estimatedDuration: 10,
            order: 2
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
          },
          {
            id: 7,
            title: 'Phase 2 - UI/UX Design',
            description: 'Design data visualization interfaces',
            phaseNumber: 2,
            phaseType: 'UIUX',
            estimatedDuration: 9,
            order: 2
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
          },
          {
            id: 12,
            title: 'Phase 2 - UI/UX Design',
            description: 'Design AI interaction interfaces',
            phaseNumber: 2,
            phaseType: 'UIUX',
            estimatedDuration: 11,
            order: 2
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

  const uiuxTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '🎨',
      description: 'Design phase overview and objectives'
    },
    {
      id: 'wireframing',
      label: 'Wireframing',
      icon: '📐',
      description: 'Low-fidelity wireframes and layouts'
    },
    {
      id: 'prototyping',
      label: 'Prototyping',
      icon: '🔧',
      description: 'Interactive prototypes and user flows'
    },
    {
      id: 'visual-design',
      label: 'Visual Design',
      icon: '🎭',
      description: 'High-fidelity designs and branding'
    },
    {
      id: 'usability-testing',
      label: 'Usability Testing',
      icon: '🧪',
      description: 'User testing and validation'
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
          <p className="text-gray-600">Loading UI/UX Phase...</p>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">UI/UX Design Overview</h3>
            
            {/* Video Section */}
            <div className="mb-8">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video w-full">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=450&fit=crop"
                    preload="metadata"
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4 bg-gray-800 text-white">
                  <h4 className="text-lg font-semibold mb-2">UI/UX Design Phase Overview Video</h4>
                  <p className="text-sm text-gray-300">
                    Watch this comprehensive overview of the UI/UX Design phase for the {project.title} project.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                This phase focuses on creating intuitive and user-friendly designs for the {project.title}. 
                The UI/UX design phase transforms the business requirements into visual and interactive experiences 
                that users will love and find easy to use.
              </p>
              
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Phase Objectives</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Create user-centered design solutions</li>
                  <li>Develop wireframes and prototypes</li>
                  <li>Establish visual design system and branding</li>
                  <li>Conduct usability testing and validation</li>
                  <li>Ensure accessibility and responsive design</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Deliverables</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>User Journey Maps</li>
                  <li>Low-fidelity Wireframes</li>
                  <li>Interactive Prototypes</li>
                  <li>High-fidelity Visual Designs</li>
                  <li>Design System and Style Guide</li>
                  <li>Usability Testing Report</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'wireframing':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Wireframing</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Wireframing is the foundation of good UX design. We create low-fidelity layouts that focus on 
                structure, hierarchy, and user flow without visual distractions.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Wireframe Components</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h5 className="font-medium text-gray-800">Navigation Structure</h5>
                        <p className="text-gray-600 text-sm">Main menu, breadcrumbs, and user account navigation</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h5 className="font-medium text-gray-800">Content Areas</h5>
                        <p className="text-gray-600 text-sm">Header, main content, sidebar, and footer sections</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h5 className="font-medium text-gray-800">Interactive Elements</h5>
                        <p className="text-gray-600 text-sm">Buttons, forms, modals, and call-to-action areas</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="border-l-4 border-orange-500 pl-4">
                        <h5 className="font-medium text-gray-800">Information Architecture</h5>
                        <p className="text-gray-600 text-sm">Content hierarchy and information organization</p>
                      </div>
                      <div className="border-l-4 border-red-500 pl-4">
                        <h5 className="font-medium text-gray-800">User Flow</h5>
                        <p className="text-gray-600 text-sm">Step-by-step user journey through the application</p>
                      </div>
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <h5 className="font-medium text-gray-800">Responsive Breakpoints</h5>
                        <p className="text-gray-600 text-sm">Mobile, tablet, and desktop layout variations</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Wireframe Tools & Methods</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <h5 className="font-medium text-gray-800">Figma</h5>
                      <p className="text-sm text-gray-600">Collaborative design tool</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">✏️</div>
                      <h5 className="font-medium text-gray-800">Sketch</h5>
                      <p className="text-sm text-gray-600">Vector-based design</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">📋</div>
                      <h5 className="font-medium text-gray-800">Paper & Pencil</h5>
                      <p className="text-sm text-gray-600">Rapid ideation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'prototyping':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Prototyping</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Prototypes bring wireframes to life with interactive elements, allowing stakeholders to experience 
                the user journey before development begins.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Prototype Types</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Low-Fidelity Prototypes</h5>
                      <p className="text-gray-600 text-sm mb-2">Basic clickable wireframes with simple interactions</p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Click-through navigation</li>
                        <li>• Basic form interactions</li>
                        <li>• Simple state changes</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">High-Fidelity Prototypes</h5>
                      <p className="text-gray-600 text-sm mb-2">Detailed prototypes with realistic content and interactions</p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Realistic data and content</li>
                        <li>• Advanced animations</li>
                        <li>• Complete user flows</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Key User Flows</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">User Registration</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>1. Landing page → Sign up</div>
                        <div>2. Form validation → Confirmation</div>
                        <div>3. Email verification → Dashboard</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Product Purchase</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>1. Browse products → Add to cart</div>
                        <div>2. Review cart → Checkout</div>
                        <div>3. Payment → Order confirmation</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Admin Management</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>1. Login → Dashboard</div>
                        <div>2. Manage products → Update inventory</div>
                        <div>3. View orders → Update status</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Search & Filter</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>1. Search input → Results</div>
                        <div>2. Apply filters → Refined results</div>
                        <div>3. Sort options → Final selection</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'visual-design':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Visual Design</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Visual design brings the wireframes and prototypes to life with colors, typography, imagery, 
                and branding that creates an engaging and professional user experience.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Design System</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Color Palette</h5>
                        <div className="flex space-x-2">
                          <div className="w-8 h-8 bg-blue-600 rounded"></div>
                          <div className="w-8 h-8 bg-green-600 rounded"></div>
                          <div className="w-8 h-8 bg-purple-600 rounded"></div>
                          <div className="w-8 h-8 bg-orange-600 rounded"></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Primary, secondary, and accent colors</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Typography</h5>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-gray-800">Headings</div>
                          <div className="text-lg font-semibold text-gray-700">Subheadings</div>
                          <div className="text-base text-gray-600">Body text</div>
                          <div className="text-sm text-gray-500">Captions</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Spacing Scale</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded"></div>
                            <span className="text-sm text-gray-600">4px - xs</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-400 rounded"></div>
                            <span className="text-sm text-gray-600">8px - sm</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gray-400 rounded"></div>
                            <span className="text-sm text-gray-600">16px - md</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-400 rounded"></div>
                            <span className="text-sm text-gray-600">32px - lg</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Component Library</h5>
                        <div className="space-y-2">
                          <div className="px-3 py-1 bg-blue-600 text-white text-sm rounded">Button</div>
                          <div className="px-3 py-1 border border-gray-300 text-sm rounded">Input</div>
                          <div className="px-3 py-1 bg-gray-100 text-sm rounded">Card</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Design Principles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Consistency</h5>
                      <p className="text-sm text-gray-600">Uniform design patterns across all pages and components</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Accessibility</h5>
                      <p className="text-sm text-gray-600">WCAG 2.1 compliance for inclusive design</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Responsiveness</h5>
                      <p className="text-sm text-gray-600">Seamless experience across all device sizes</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Brand Alignment</h5>
                      <p className="text-sm text-gray-600">Visual identity that reflects company values</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'usability-testing':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Usability Testing</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Usability testing validates our design decisions with real users, ensuring the interface 
                is intuitive, efficient, and meets user needs and expectations.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Testing Methods</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Moderated Testing</h5>
                      <p className="text-gray-600 text-sm mb-2">One-on-one sessions with guided tasks and real-time feedback</p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• In-person or remote sessions</li>
                        <li>• Think-aloud protocol</li>
                        <li>• Detailed observation and notes</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Unmoderated Testing</h5>
                      <p className="text-gray-600 text-sm mb-2">Self-guided testing with automated data collection</p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Remote testing platforms</li>
                        <li>• Screen recording and analytics</li>
                        <li>• Larger sample sizes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Testing Scenarios</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Task 1: User Registration</h5>
                      <p className="text-sm text-gray-600 mb-2">"Create a new account and complete your profile"</p>
                      <div className="text-xs text-gray-500">
                        <strong>Success Criteria:</strong> Complete registration in under 3 minutes with no errors
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Task 2: Product Discovery</h5>
                      <p className="text-sm text-gray-600 mb-2">"Find a specific product and add it to your cart"</p>
                      <div className="text-xs text-gray-500">
                        <strong>Success Criteria:</strong> Locate product using search or filters within 2 minutes
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Task 3: Checkout Process</h5>
                      <p className="text-sm text-gray-600 mb-2">"Complete a purchase with payment information"</p>
                      <div className="text-xs text-gray-500">
                        <strong>Success Criteria:</strong> Complete checkout without confusion or errors
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Testing Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">95%</div>
                      <div className="text-sm text-gray-600">Task Completion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">2.3 min</div>
                      <div className="text-sm text-gray-600">Average Task Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">4.2/5</div>
                      <div className="text-sm text-gray-600">User Satisfaction</div>
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
                The UI/UX Design phase has been completed successfully for the {project.title} project. 
                This phase has established a solid foundation for creating an intuitive and user-friendly interface 
                that meets both business objectives and user needs.
              </p>
              
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">UI/UX Phase Summary</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Comprehensive wireframes created for all major user flows</li>
                  <li>Interactive prototypes developed and tested with users</li>
                  <li>High-fidelity visual designs completed with design system</li>
                  <li>Usability testing conducted and improvements implemented</li>
                  <li>Accessibility guidelines and responsive design ensured</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Next Phase: Architectural Design</h4>
                <p className="text-gray-600 mb-4">
                  With the UI/UX design completed, the next phase will focus on creating a robust and scalable 
                  technical architecture that supports the designed user interface and business requirements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">System Architecture</h5>
                    <p className="text-sm text-gray-600">Define overall system structure and components</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Database Design</h5>
                    <p className="text-sm text-gray-600">Design data models and relationships</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">API Design</h5>
                    <p className="text-sm text-gray-600">Define RESTful APIs and endpoints</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Security Architecture</h5>
                    <p className="text-sm text-gray-600">Implement security measures and protocols</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Ready to Proceed?</h4>
                <p className="text-gray-600 mb-4">
                  This UI/UX Design phase is now complete. You can proceed to the next phase (Architectural Design) 
                  or review any section of this document as needed.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => navigate(`/realtime-projects/${projectId}/architectural`)}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Continue to Architectural Design
                  </button>
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Download UI/UX Design Document
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
            <h1 className="text-xl font-bold text-gray-800 mb-2">UI/UX Design Phase</h1>
            <p className="text-sm text-gray-600">{project.title}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="p-4">
            <nav className="space-y-2">
              {uiuxTabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                    ${selectedTab === tab.id
                      ? 'bg-purple-100 text-purple-700 shadow-sm'
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
                {uiuxTabs.map((tab) => (
                  <div key={tab.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedTab === tab.id ? 'bg-purple-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-xs ${
                      selectedTab === tab.id ? 'text-purple-600 font-medium' : 'text-gray-500'
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

export default UIUXPhasePage;

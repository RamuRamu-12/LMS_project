import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PhaseNavigationBar from '../components/projects/PhaseNavigationBar';
import NextButton from '../components/projects/NextButton';
import { useProjectProgress } from '../context/ProjectProgressContext';

const TestingPhasePage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isModuleUnlocked, unlockNextPhase } = useProjectProgress();

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
          },
          {
            id: 3,
            title: 'Phase 3 - Architectural Design',
            description: 'Design system architecture and technical specifications',
            phaseNumber: 3,
            phaseType: 'ARCHITECTURAL',
            estimatedDuration: 12,
            order: 3
          },
          {
            id: 4,
            title: 'Phase 4 - Code Development',
            description: 'Implement the application code based on specifications',
            phaseNumber: 4,
            phaseType: 'CODE_DEVELOPMENT',
            estimatedDuration: 15,
            order: 4
          },
          {
            id: 5,
            title: 'Phase 5 - Testing & Quality Assurance',
            description: 'Comprehensive testing and quality assurance',
            phaseNumber: 5,
            phaseType: 'TESTING',
            estimatedDuration: 8,
            order: 5
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
          },
          {
            id: 8,
            title: 'Phase 3 - Architectural Design',
            description: 'Design data processing and visualization architecture',
            phaseNumber: 3,
            phaseType: 'ARCHITECTURAL',
            estimatedDuration: 11,
            order: 3
          },
          {
            id: 9,
            title: 'Phase 4 - Code Development',
            description: 'Implement analytics dashboard and data processing',
            phaseNumber: 4,
            phaseType: 'CODE_DEVELOPMENT',
            estimatedDuration: 13,
            order: 4
          },
          {
            id: 10,
            title: 'Phase 5 - Testing & Quality Assurance',
            description: 'Test data processing and visualization accuracy',
            phaseNumber: 5,
            phaseType: 'TESTING',
            estimatedDuration: 7,
            order: 5
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
          },
          {
            id: 13,
            title: 'Phase 3 - Architectural Design',
            description: 'Design AI/ML system architecture',
            phaseNumber: 3,
            phaseType: 'ARCHITECTURAL',
            estimatedDuration: 13,
            order: 3
          },
          {
            id: 14,
            title: 'Phase 4 - Code Development',
            description: 'Implement AI models and learning algorithms',
            phaseNumber: 4,
            phaseType: 'CODE_DEVELOPMENT',
            estimatedDuration: 16,
            order: 4
          },
          {
            id: 15,
            title: 'Phase 5 - Testing & Quality Assurance',
            description: 'Test AI model accuracy and performance',
            phaseNumber: 5,
            phaseType: 'TESTING',
            estimatedDuration: 9,
            order: 5
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

  const testingTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '🧪',
      description: 'Testing phase overview and objectives'
    },
    {
      id: 'test-planning',
      label: 'Test Planning',
      icon: '📋',
      description: 'Test strategy and test case development'
    },
    {
      id: 'unit-testing',
      label: 'Unit Testing',
      icon: '🔬',
      description: 'Individual component and function testing'
    },
    {
      id: 'integration-testing',
      label: 'Integration Testing',
      icon: '🔗',
      description: 'System integration and API testing'
    },
    {
      id: 'performance-testing',
      label: 'Performance Testing',
      icon: '⚡',
      description: 'Load testing and performance optimization'
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
          <p className="text-gray-600">Loading Testing Phase...</p>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Testing & Quality Assurance Overview</h3>
            
            {/* Video Section */}
            <div className="mb-8">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video w-full">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"
                    preload="metadata"
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4 bg-gray-800 text-white">
                  <h4 className="text-lg font-semibold mb-2">Testing Phase Overview Video</h4>
                  <p className="text-sm text-gray-300">
                    Watch this comprehensive overview of the Testing & Quality Assurance phase for the {project.title} project.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                This phase focuses on comprehensive testing and quality assurance for the {project.title} to ensure 
                the application meets all functional and non-functional requirements, performs optimally, 
                and provides a reliable user experience.
              </p>
              
              <div className="bg-red-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Phase Objectives</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Develop comprehensive test strategy and test cases</li>
                  <li>Execute unit tests for all components and functions</li>
                  <li>Perform integration testing for system components</li>
                  <li>Conduct performance and load testing</li>
                  <li>Ensure application security and reliability</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Deliverables</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Comprehensive test plan and strategy</li>
                  <li>Test case documentation and execution reports</li>
                  <li>Unit test suite with high coverage</li>
                  <li>Integration test results and bug reports</li>
                  <li>Performance test reports and optimization recommendations</li>
                  <li>Quality assurance sign-off and deployment readiness</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'test-planning':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Test Planning</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Test planning involves developing a comprehensive strategy for testing the application, 
                including test scope, approach, resources, and timeline.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Test Strategy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Test Scope</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Functional testing</li>
                          <li>• Non-functional testing</li>
                          <li>• Security testing</li>
                          <li>• Usability testing</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Test Levels</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Unit testing</li>
                          <li>• Integration testing</li>
                          <li>• System testing</li>
                          <li>• Acceptance testing</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Test Approach</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Manual testing</li>
                          <li>• Automated testing</li>
                          <li>• Black box testing</li>
                          <li>• White box testing</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Test Environment</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Development environment</li>
                          <li>• Staging environment</li>
                          <li>• Production-like environment</li>
                          <li>• Mobile device testing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Test Case Development</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Test Case Template</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Test Case ID:</strong> TC_001</div>
                        <div><strong>Test Case Name:</strong> User Registration with Valid Data</div>
                        <div><strong>Test Objective:</strong> Verify user can register with valid information</div>
                        <div><strong>Preconditions:</strong> Application is accessible, registration page is loaded</div>
                        <div><strong>Test Steps:</strong> Enter valid email, password, confirm password, click register</div>
                        <div><strong>Expected Result:</strong> User account created successfully, confirmation email sent</div>
                        <div><strong>Priority:</strong> High</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Test Categories</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Functional Tests</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• User authentication</li>
                            <li>• Product management</li>
                            <li>• Shopping cart functionality</li>
                            <li>• Order processing</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Non-Functional Tests</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Performance testing</li>
                            <li>• Security testing</li>
                            <li>• Usability testing</li>
                            <li>• Compatibility testing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'unit-testing':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Unit Testing</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Unit testing focuses on testing individual components, functions, and modules in isolation 
                to ensure they work correctly according to their specifications.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Frontend Unit Testing</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">React Component Testing</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Framework:</strong> Jest + React Testing Library</div>
                        <div><strong>Coverage Target:</strong> 90%+ code coverage</div>
                        <div><strong>Test Focus:</strong> Component rendering, user interactions, state changes</div>
                        <div className="mt-2">
                          <strong>Example Test:</strong>
                          <pre className="bg-gray-100 p-2 rounded text-xs mt-1">
{`test('renders login form', () => {
  render(<LoginForm />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});`}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Utility Function Testing</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Functions Tested:</strong> Validation, formatting, calculations</div>
                        <div><strong>Test Cases:</strong> Valid inputs, invalid inputs, edge cases</div>
                        <div><strong>Mocking:</strong> External dependencies and API calls</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Backend Unit Testing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">API Route Testing</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Request validation</li>
                          <li>• Response formatting</li>
                          <li>• Error handling</li>
                          <li>• Authentication checks</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Service Layer Testing</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Business logic validation</li>
                          <li>• Data processing</li>
                          <li>• Database operations</li>
                          <li>• External API integration</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Database Testing</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Model validation</li>
                          <li>• Query testing</li>
                          <li>• Migration testing</li>
                          <li>• Data integrity checks</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Security Testing</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Input sanitization</li>
                          <li>• Authentication logic</li>
                          <li>• Authorization checks</li>
                          <li>• Password hashing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Testing Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">95%</div>
                      <div className="text-sm text-gray-600">Code Coverage</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">150+</div>
                      <div className="text-sm text-gray-600">Test Cases</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">100%</div>
                      <div className="text-sm text-gray-600">Pass Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">0</div>
                      <div className="text-sm text-gray-600">Critical Bugs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integration-testing':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Integration Testing</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Integration testing verifies that different modules and services work together correctly 
                and that data flows properly between system components.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">API Integration Testing</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Frontend-Backend Integration</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Test Scenarios:</strong></div>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>User registration flow (frontend form → API → database)</li>
                          <li>Product listing (API call → data display → pagination)</li>
                          <li>Shopping cart operations (add/remove → API → state update)</li>
                          <li>Order processing (checkout → payment → order creation)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Database Integration</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Test Focus:</strong></div>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Data persistence and retrieval</li>
                          <li>Transaction handling and rollback</li>
                          <li>Database connection pooling</li>
                          <li>Query performance and optimization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Third-Party Integration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Payment Gateway</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Payment processing flow</li>
                          <li>• Error handling and retries</li>
                          <li>• Webhook verification</li>
                          <li>• Refund processing</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Email Service</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Registration confirmations</li>
                          <li>• Password reset emails</li>
                          <li>• Order notifications</li>
                          <li>• Template rendering</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">File Storage</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Image upload and processing</li>
                          <li>• File validation and security</li>
                          <li>• CDN integration</li>
                          <li>• File deletion and cleanup</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Authentication Service</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• JWT token validation</li>
                          <li>• Session management</li>
                          <li>• Role-based access control</li>
                          <li>• Token refresh mechanism</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Integration Test Results</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Test Execution Summary</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold text-green-600">45</div>
                          <div className="text-sm text-gray-600">Passed</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-red-600">2</div>
                          <div className="text-sm text-gray-600">Failed</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-yellow-600">1</div>
                          <div className="text-sm text-gray-600">Skipped</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-blue-600">94%</div>
                          <div className="text-sm text-gray-600">Pass Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'performance-testing':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Performance Testing</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Performance testing evaluates the application's speed, responsiveness, and stability 
                under various load conditions to ensure optimal user experience.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Load Testing</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Test Scenarios</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Normal Load</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 100 concurrent users</li>
                            <li>• Typical user behavior</li>
                            <li>• Expected response times</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Peak Load</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 500 concurrent users</li>
                            <li>• High traffic scenarios</li>
                            <li>• Stress testing limits</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Performance Metrics</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">1.2s</div>
                          <div className="text-sm text-gray-600">Average Response Time</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">99.9%</div>
                          <div className="text-sm text-gray-600">Uptime</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">1000</div>
                          <div className="text-sm text-gray-600">Requests/Second</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Optimization</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Frontend Optimization</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Code splitting and lazy loading</li>
                          <li>• Image optimization and compression</li>
                          <li>• Bundle size reduction</li>
                          <li>• Caching strategies</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Database Optimization</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Query optimization and indexing</li>
                          <li>• Connection pooling</li>
                          <li>• Caching frequently accessed data</li>
                          <li>• Database monitoring</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">API Optimization</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Response compression</li>
                          <li>• Pagination and filtering</li>
                          <li>• Rate limiting</li>
                          <li>• API response caching</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Infrastructure</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• CDN implementation</li>
                          <li>• Load balancing</li>
                          <li>• Auto-scaling configuration</li>
                          <li>• Monitoring and alerting</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Security Performance Testing</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Security Test Results</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Vulnerability Assessment</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>✅ SQL Injection - Protected</li>
                            <li>✅ XSS Attacks - Protected</li>
                            <li>✅ CSRF - Protected</li>
                            <li>✅ Authentication - Secure</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Performance Under Attack</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• DDoS protection active</li>
                            <li>• Rate limiting effective</li>
                            <li>• System stability maintained</li>
                            <li>• Recovery time: &lt; 30 seconds</li>
                          </ul>
                        </div>
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
                The Testing & Quality Assurance phase has been completed successfully for the {project.title} project. 
                This phase has ensured the application meets all quality standards, performs optimally, 
                and is ready for production deployment.
              </p>
              
              <div className="bg-red-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Testing Phase Summary</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Comprehensive test strategy developed and executed</li>
                  <li>Unit testing completed with 95%+ code coverage</li>
                  <li>Integration testing verified all system components work together</li>
                  <li>Performance testing confirmed optimal application performance</li>
                  <li>Security testing validated application security measures</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Next Phase: Deployment</h4>
                <p className="text-gray-600 mb-4">
                  With testing completed successfully, the next phase will focus on deploying the application 
                  to production environments and ensuring smooth operation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Deployment Planning</h5>
                    <p className="text-sm text-gray-600">Infrastructure setup and deployment strategy</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Environment Setup</h5>
                    <p className="text-sm text-gray-600">Production, staging, and development environments</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">CI/CD Pipeline</h5>
                    <p className="text-sm text-gray-600">Automated deployment and continuous integration</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Monitoring & Maintenance</h5>
                    <p className="text-sm text-gray-600">Application monitoring and ongoing maintenance</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Ready to Proceed?</h4>
                <p className="text-gray-600 mb-4">
                  This Testing & Quality Assurance phase is now complete. You can proceed to the next phase (Deployment) 
                  or review any section of this document as needed.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      unlockNextPhase(projectId, 'testing');
                      navigate(`/realtime-projects/${projectId}/deployment`);
                    }}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Continue to Deployment Phase
                  </button>
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Download Testing Report
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
      
      {/* Phase Navigation Bar - Top Level */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-1">
          <PhaseNavigationBar currentPhase="testing" />
        </div>
      </div>
      
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
            <h1 className="text-xl font-bold text-gray-800 mb-2">Testing Phase</h1>
            <p className="text-sm text-gray-600">{project.title}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="p-4">
            <nav className="space-y-2">
              {testingTabs.map((tab, index) => {
                const isUnlocked = isModuleUnlocked(projectId, 'testing', tab.id);
                return (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => isUnlocked && setSelectedTab(tab.id)}
                    disabled={!isUnlocked}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${isUnlocked
                        ? selectedTab === tab.id
                          ? 'bg-orange-100 text-orange-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                        : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                      }
                    `}
                  >
                    <span className="text-lg">
                      {isUnlocked ? tab.icon : '🔒'}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-xs text-gray-500">
                        {isUnlocked ? tab.description : 'Complete previous modules to unlock'}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Progress Indicator */}
          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Phase Progress</h4>
              <div className="space-y-2">
                {testingTabs.map((tab) => (
                  <div key={tab.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedTab === tab.id ? 'bg-red-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-xs ${
                      selectedTab === tab.id ? 'text-red-600 font-medium' : 'text-gray-500'
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
          <div className="max-w-4xl mx-auto p-8 relative">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
            
            {/* Next Button - positioned relative to module content */}
            <NextButton 
              currentPhase="testing" 
              currentModule={selectedTab}
              onNext={() => {
                // Auto-advance to next module
                const testingTabs = [
                  { id: 'overview' },
                  { id: 'unit-testing' },
                  { id: 'integration-testing' },
                  { id: 'end-to-end-testing' },
                  { id: 'performance-testing' },
                  { id: 'conclusion' }
                ];
                const currentIndex = testingTabs.findIndex(tab => tab.id === selectedTab);
                if (currentIndex < testingTabs.length - 1) {
                  setSelectedTab(testingTabs[currentIndex + 1].id);
                }
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestingPhasePage;

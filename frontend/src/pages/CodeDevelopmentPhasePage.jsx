import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const CodeDevelopmentPhasePage = () => {
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

  const codeDevTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '💻',
      description: 'Code development phase overview and objectives'
    },
    {
      id: 'frontend-development',
      label: 'Frontend Development',
      icon: '🎨',
      description: 'React.js components and user interface'
    },
    {
      id: 'backend-development',
      label: 'Backend Development',
      icon: '⚙️',
      description: 'Node.js API server and business logic'
    },
    {
      id: 'database-implementation',
      label: 'Database Implementation',
      icon: '🗄️',
      description: 'PostgreSQL setup and data models'
    },
    {
      id: 'testing',
      label: 'Testing & QA',
      icon: '🧪',
      description: 'Unit testing and quality assurance'
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
          <p className="text-gray-600">Loading Code Development Phase...</p>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Code Development Overview</h3>
            
            {/* Video Section */}
            <div className="mb-8">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video w-full">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop"
                    preload="metadata"
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4 bg-gray-800 text-white">
                  <h4 className="text-lg font-semibold mb-2">Code Development Phase Overview Video</h4>
                  <p className="text-sm text-gray-300">
                    Watch this comprehensive overview of the Code Development phase for the {project.title} project.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                This phase focuses on implementing the actual code for the {project.title} based on the architectural 
                design and UI/UX specifications. This is where the technical blueprint becomes a working application.
              </p>
              
              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Phase Objectives</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Implement frontend components and user interfaces</li>
                  <li>Develop backend API services and business logic</li>
                  <li>Set up database and implement data models</li>
                  <li>Integrate all system components</li>
                  <li>Ensure code quality and testing standards</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Deliverables</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Fully functional frontend application</li>
                  <li>Complete backend API server</li>
                  <li>Database with sample data</li>
                  <li>Unit and integration tests</li>
                  <li>Code documentation and comments</li>
                  <li>Deployment-ready application</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'frontend-development':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Frontend Development</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Frontend development focuses on implementing the user interface using React.js, 
                ensuring responsive design and optimal user experience.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Core Components</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Authentication Components</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Login/Register forms</li>
                          <li>• Protected route wrapper</li>
                          <li>• User context provider</li>
                          <li>• Password reset flow</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Product Components</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Product listing grid</li>
                          <li>• Product detail view</li>
                          <li>• Search and filter</li>
                          <li>• Category navigation</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Shopping Components</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Shopping cart</li>
                          <li>• Checkout process</li>
                          <li>• Order summary</li>
                          <li>• Payment forms</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Admin Components</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Dashboard overview</li>
                          <li>• Product management</li>
                          <li>• Order management</li>
                          <li>• User management</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Technology Stack</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">⚛️</div>
                      <h5 className="font-medium text-gray-800">React.js</h5>
                      <p className="text-sm text-gray-600">Component-based UI library</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🎨</div>
                      <h5 className="font-medium text-gray-800">Tailwind CSS</h5>
                      <p className="text-sm text-gray-600">Utility-first CSS framework</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🔄</div>
                      <h5 className="font-medium text-gray-800">React Router</h5>
                      <p className="text-sm text-gray-600">Client-side routing</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Development Standards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Code Quality</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• ESLint configuration</li>
                        <li>• Prettier formatting</li>
                        <li>• Component documentation</li>
                        <li>• TypeScript integration</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Performance</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Code splitting</li>
                        <li>• Lazy loading</li>
                        <li>• Image optimization</li>
                        <li>• Bundle optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'backend-development':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Backend Development</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Backend development implements the server-side logic, API endpoints, and business rules 
                using Node.js and Express.js framework.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">API Endpoints Implementation</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-3">Authentication Routes</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-mono">POST</span>
                          <span className="font-mono text-gray-600">/api/auth/register</span>
                          <span className="text-gray-500">User registration with validation</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-mono">POST</span>
                          <span className="font-mono text-gray-600">/api/auth/login</span>
                          <span className="text-gray-500">JWT token authentication</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">GET</span>
                          <span className="font-mono text-gray-600">/api/auth/profile</span>
                          <span className="text-gray-500">Protected user profile endpoint</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-3">Product Management</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">GET</span>
                          <span className="font-mono text-gray-600">/api/products</span>
                          <span className="text-gray-500">Paginated product listing</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-mono">POST</span>
                          <span className="font-mono text-gray-600">/api/products</span>
                          <span className="text-gray-500">Admin product creation</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-mono">PUT</span>
                          <span className="font-mono text-gray-600">/api/products/:id</span>
                          <span className="text-gray-500">Product update with validation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Business Logic Implementation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2">User Management</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Registration validation</li>
                          <li>• Password hashing (bcrypt)</li>
                          <li>• JWT token generation</li>
                          <li>• Role-based permissions</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2">Order Processing</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Cart management</li>
                          <li>• Inventory checking</li>
                          <li>• Payment processing</li>
                          <li>• Order status tracking</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2">Data Validation</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Input sanitization</li>
                          <li>• Schema validation</li>
                          <li>• Error handling</li>
                          <li>• Rate limiting</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2">Security Features</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• CORS configuration</li>
                          <li>• Helmet security headers</li>
                          <li>• Request logging</li>
                          <li>• SQL injection prevention</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'database-implementation':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Database Implementation</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Database implementation involves setting up PostgreSQL, creating tables, 
                establishing relationships, and implementing data access patterns.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Database Setup</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Initial Configuration</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• PostgreSQL database creation</div>
                        <div>• User roles and permissions setup</div>
                        <div>• Connection pooling configuration</div>
                        <div>• Environment variables setup</div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Migration System</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• Database migration scripts</div>
                        <div>• Version control for schema changes</div>
                        <div>• Rollback capabilities</div>
                        <div>• Seed data implementation</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Data Models Implementation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">User Model</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Sequelize/Prisma ORM setup</div>
                          <div>• Validation rules</div>
                          <div>• Hooks for password hashing</div>
                          <div>• Association definitions</div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Product Model</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Category relationships</div>
                          <div>• Image handling</div>
                          <div>• Inventory tracking</div>
                          <div>• Search indexing</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Order Model</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Order items relationship</div>
                          <div>• Status management</div>
                          <div>• Payment integration</div>
                          <div>• Shipping tracking</div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Database Queries</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Optimized SELECT queries</div>
                          <div>• JOIN operations</div>
                          <div>• Pagination implementation</div>
                          <div>• Transaction management</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Optimization</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Indexing Strategy</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Primary key indexes</li>
                        <li>• Foreign key indexes</li>
                        <li>• Search field indexes</li>
                        <li>• Composite indexes</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Query Optimization</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Query execution plans</li>
                        <li>• Connection pooling</li>
                        <li>• Caching strategies</li>
                        <li>• Database monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'testing':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Testing & Quality Assurance</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Comprehensive testing ensures code quality, functionality, and reliability 
                through various testing methodologies and quality assurance practices.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Testing Types</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Unit Testing</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Jest testing framework</li>
                          <li>• Component testing (React Testing Library)</li>
                          <li>• Function testing</li>
                          <li>• Mock implementations</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Integration Testing</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• API endpoint testing</li>
                          <li>• Database integration tests</li>
                          <li>• Service layer testing</li>
                          <li>• Third-party integration</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">End-to-End Testing</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Cypress/Playwright testing</li>
                          <li>• User journey testing</li>
                          <li>• Cross-browser testing</li>
                          <li>• Performance testing</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Security Testing</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Authentication testing</li>
                          <li>• Authorization testing</li>
                          <li>• Input validation testing</li>
                          <li>• Vulnerability scanning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Quality Assurance</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Code Quality Tools</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• ESLint for code linting</li>
                          <li>• Prettier for code formatting</li>
                          <li>• SonarQube for code analysis</li>
                        </ul>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Husky for git hooks</li>
                          <li>• Pre-commit checks</li>
                          <li>• Code coverage reporting</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Testing Metrics</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">95%</div>
                          <div className="text-sm text-gray-600">Code Coverage</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">0</div>
                          <div className="text-sm text-gray-600">Critical Bugs</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">100%</div>
                          <div className="text-sm text-gray-600">Test Pass Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Continuous Integration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">CI/CD Pipeline</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Automated testing on commits</li>
                        <li>• Build and deployment automation</li>
                        <li>• Environment management</li>
                        <li>• Rollback capabilities</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Monitoring</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Application performance monitoring</li>
                        <li>• Error tracking and logging</li>
                        <li>• Database performance monitoring</li>
                        <li>• User analytics</li>
                      </ul>
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
                The Code Development phase has been completed successfully for the {project.title} project. 
                This phase has transformed the architectural design into a fully functional application 
                with all core features implemented and tested.
              </p>
              
              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Code Development Summary</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Frontend application built with React.js and modern UI components</li>
                  <li>Backend API server implemented with Node.js and Express.js</li>
                  <li>Database setup completed with PostgreSQL and optimized queries</li>
                  <li>Comprehensive testing suite implemented with high coverage</li>
                  <li>Code quality standards maintained with linting and formatting</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Next Phase: Testing & Quality Assurance</h4>
                <p className="text-gray-600 mb-4">
                  With the code development completed, the next phase will focus on comprehensive testing 
                  and quality assurance to ensure the application meets all requirements and performs optimally.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Test Planning</h5>
                    <p className="text-sm text-gray-600">Comprehensive test strategy and test case development</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Unit Testing</h5>
                    <p className="text-sm text-gray-600">Individual component and function testing</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Integration Testing</h5>
                    <p className="text-sm text-gray-600">System integration and API testing</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Performance Testing</h5>
                    <p className="text-sm text-gray-600">Load testing and performance optimization</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Ready to Proceed?</h4>
                <p className="text-gray-600 mb-4">
                  This Code Development phase is now complete. You can proceed to the next phase (Testing & Quality Assurance) 
                  or review any section of this document as needed.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => navigate(`/realtime-projects/${projectId}/testing`)}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Continue to Testing Phase
                  </button>
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Download Code Documentation
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
            <h1 className="text-xl font-bold text-gray-800 mb-2">Code Development Phase</h1>
            <p className="text-sm text-gray-600">{project.title}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="p-4">
            <nav className="space-y-2">
              {codeDevTabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                    ${selectedTab === tab.id
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm'
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
                {codeDevTabs.map((tab) => (
                  <div key={tab.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedTab === tab.id ? 'bg-emerald-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-xs ${
                      selectedTab === tab.id ? 'text-emerald-600 font-medium' : 'text-gray-500'
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

export default CodeDevelopmentPhasePage;

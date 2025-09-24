import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PhaseNavigationBar from '../components/projects/PhaseNavigationBar';
import NextButton from '../components/projects/NextButton';
import { useProjectProgress } from '../context/ProjectProgressContext';

const ArchitecturalDesignPhasePage = () => {
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

  const architecturalTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '🏗️',
      description: 'Architecture phase overview and objectives'
    },
    {
      id: 'system-architecture',
      label: 'System Architecture',
      icon: '⚙️',
      description: 'Overall system structure and components'
    },
    {
      id: 'database-design',
      label: 'Database Design',
      icon: '🗄️',
      description: 'Data models and relationships'
    },
    {
      id: 'api-design',
      label: 'API Design',
      icon: '🔌',
      description: 'RESTful APIs and endpoints'
    },
    {
      id: 'security-architecture',
      label: 'Security Architecture',
      icon: '🔒',
      description: 'Security measures and protocols'
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
          <p className="text-gray-600">Loading Architectural Design Phase...</p>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Architectural Design Overview</h3>
            
            {/* Video Section */}
            <div className="mb-8">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video w-full">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop"
                    preload="metadata"
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4 bg-gray-800 text-white">
                  <h4 className="text-lg font-semibold mb-2">Architectural Design Phase Overview Video</h4>
                  <p className="text-sm text-gray-300">
                    Watch this comprehensive overview of the Architectural Design phase for the {project.title} project.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                This phase focuses on designing a robust and scalable technical architecture for the {project.title}. 
                The architectural design phase transforms the UI/UX requirements into a comprehensive technical blueprint 
                that ensures system reliability, performance, and maintainability.
              </p>
              
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Phase Objectives</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Define system architecture and component relationships</li>
                  <li>Design database schema and data flow</li>
                  <li>Create API specifications and endpoints</li>
                  <li>Implement security measures and protocols</li>
                  <li>Ensure scalability and performance requirements</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Deliverables</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>System Architecture Diagram</li>
                  <li>Database Schema Design</li>
                  <li>API Documentation</li>
                  <li>Security Architecture Plan</li>
                  <li>Technology Stack Specification</li>
                  <li>Deployment Architecture</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'system-architecture':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">System Architecture</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                The system architecture defines the overall structure of the application, including the relationships 
                between different components, data flow, and communication patterns.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Architecture Overview</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="text-center text-sm text-gray-600 mb-4">3-Tier Architecture</div>
                    <div className="space-y-3">
                      <div className="bg-blue-100 rounded-lg p-3 text-center">
                        <div className="font-medium text-blue-800">Presentation Layer</div>
                        <div className="text-sm text-blue-600">React.js Frontend</div>
                      </div>
                      <div className="bg-green-100 rounded-lg p-3 text-center">
                        <div className="font-medium text-green-800">Business Logic Layer</div>
                        <div className="text-sm text-green-600">Node.js/Express.js API</div>
                      </div>
                      <div className="bg-purple-100 rounded-lg p-3 text-center">
                        <div className="font-medium text-purple-800">Data Layer</div>
                        <div className="text-sm text-purple-600">PostgreSQL Database</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Components</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2">Frontend Components</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• User Interface (React Components)</li>
                          <li>• State Management (Redux/Context)</li>
                          <li>• Routing (React Router)</li>
                          <li>• HTTP Client (Axios)</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2">Backend Services</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• REST API Server</li>
                          <li>• Authentication Service</li>
                          <li>• Business Logic Controllers</li>
                          <li>• Data Access Layer</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2">Database Layer</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• PostgreSQL Database</li>
                          <li>• Data Models & Migrations</li>
                          <li>• Query Optimization</li>
                          <li>• Backup & Recovery</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2">Infrastructure</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Cloud Hosting (AWS/Azure)</li>
                          <li>• CDN for Static Assets</li>
                          <li>• Load Balancing</li>
                          <li>• Monitoring & Logging</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'database-design':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Database Design</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                The database design defines the data structure, relationships, and storage requirements 
                for the {project.title} application.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Core Entities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Users Table</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• id (Primary Key)</li>
                          <li>• email, password_hash</li>
                          <li>• first_name, last_name</li>
                          <li>• role (admin/customer)</li>
                          <li>• created_at, updated_at</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Products Table</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• id (Primary Key)</li>
                          <li>• name, description</li>
                          <li>• price, category_id</li>
                          <li>• inventory_count</li>
                          <li>• image_url, created_at</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Orders Table</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• id (Primary Key)</li>
                          <li>• user_id (Foreign Key)</li>
                          <li>• total_amount</li>
                          <li>• status, payment_status</li>
                          <li>• shipping_address</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Order Items Table</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• id (Primary Key)</li>
                          <li>• order_id (Foreign Key)</li>
                          <li>• product_id (Foreign Key)</li>
                          <li>• quantity, unit_price</li>
                          <li>• total_price</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Database Relationships</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">One-to-Many Relationships</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• User → Orders (1:many)</li>
                        <li>• Order → Order Items (1:many)</li>
                        <li>• Category → Products (1:many)</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Many-to-Many Relationships</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Products ↔ Categories (many:many)</li>
                        <li>• Users ↔ Products (Wishlist) (many:many)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Optimizations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Indexes</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Primary keys (auto-indexed)</li>
                        <li>• Foreign key indexes</li>
                        <li>• Search field indexes</li>
                        <li>• Composite indexes for queries</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Query Optimization</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Efficient JOIN operations</li>
                        <li>• Pagination for large datasets</li>
                        <li>• Caching strategies</li>
                        <li>• Connection pooling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api-design':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">API Design</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                The API design defines the communication interface between the frontend and backend, 
                ensuring consistent and efficient data exchange.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">RESTful API Endpoints</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-3">Authentication Endpoints</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-mono">POST</span>
                          <span className="font-mono text-gray-600">/api/auth/register</span>
                          <span className="text-gray-500">User registration</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-mono">POST</span>
                          <span className="font-mono text-gray-600">/api/auth/login</span>
                          <span className="text-gray-500">User login</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">GET</span>
                          <span className="font-mono text-gray-600">/api/auth/profile</span>
                          <span className="text-gray-500">Get user profile</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-3">Product Endpoints</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">GET</span>
                          <span className="font-mono text-gray-600">/api/products</span>
                          <span className="text-gray-500">Get all products</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">GET</span>
                          <span className="font-mono text-gray-600">/api/products/:id</span>
                          <span className="text-gray-500">Get product by ID</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-mono">POST</span>
                          <span className="font-mono text-gray-600">/api/products</span>
                          <span className="text-gray-500">Create product (Admin)</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-mono">PUT</span>
                          <span className="font-mono text-gray-600">/api/products/:id</span>
                          <span className="text-gray-500">Update product (Admin)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-3">Order Endpoints</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">GET</span>
                          <span className="font-mono text-gray-600">/api/orders</span>
                          <span className="text-gray-500">Get user orders</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-mono">POST</span>
                          <span className="font-mono text-gray-600">/api/orders</span>
                          <span className="text-gray-500">Create new order</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">GET</span>
                          <span className="font-mono text-gray-600">/api/orders/:id</span>
                          <span className="text-gray-500">Get order details</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">API Standards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Request/Response Format</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• JSON data format</li>
                        <li>• Consistent error handling</li>
                        <li>• HTTP status codes</li>
                        <li>• Pagination support</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Security</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• JWT token authentication</li>
                        <li>• Input validation</li>
                        <li>• Rate limiting</li>
                        <li>• CORS configuration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security-architecture':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Security Architecture</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                The security architecture ensures the protection of user data, system integrity, 
                and compliance with security standards.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Authentication & Authorization</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Authentication Methods</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• JWT Token-based auth</li>
                          <li>• Password hashing (bcrypt)</li>
                          <li>• Session management</li>
                          <li>• Multi-factor authentication</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Role-Based Access Control</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Admin privileges</li>
                          <li>• Customer permissions</li>
                          <li>• Resource-level access</li>
                          <li>• API endpoint protection</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Data Protection</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• HTTPS encryption</li>
                          <li>• Database encryption</li>
                          <li>• Sensitive data masking</li>
                          <li>• Secure data transmission</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Input Validation</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• SQL injection prevention</li>
                          <li>• XSS protection</li>
                          <li>• CSRF tokens</li>
                          <li>• Input sanitization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Security Measures</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Network Security</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Firewall configuration</li>
                          <li>• DDoS protection</li>
                          <li>• SSL/TLS certificates</li>
                        </ul>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• VPN access for admin</li>
                          <li>• Network monitoring</li>
                          <li>• Intrusion detection</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Application Security</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Secure coding practices</li>
                          <li>• Regular security audits</li>
                          <li>• Dependency scanning</li>
                        </ul>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Error handling</li>
                          <li>• Logging and monitoring</li>
                          <li>• Backup and recovery</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Compliance & Standards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🔒</div>
                      <div className="font-medium text-gray-800">GDPR Compliance</div>
                      <div className="text-sm text-gray-600">Data protection regulations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-2">🛡️</div>
                      <div className="font-medium text-gray-800">OWASP Standards</div>
                      <div className="text-sm text-gray-600">Web application security</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-2">✅</div>
                      <div className="font-medium text-gray-800">ISO 27001</div>
                      <div className="text-sm text-gray-600">Information security management</div>
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
                The Architectural Design phase has been completed successfully for the {project.title} project. 
                This phase has established a comprehensive technical foundation that ensures scalability, 
                security, and maintainability of the system.
              </p>
              
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Architectural Design Summary</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>System architecture defined with 3-tier structure</li>
                  <li>Database schema designed with optimized relationships</li>
                  <li>RESTful API specifications completed</li>
                  <li>Security measures and protocols established</li>
                  <li>Technology stack and infrastructure planned</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Next Phase: Code Development</h4>
                <p className="text-gray-600 mb-4">
                  With the architectural design completed, the next phase will focus on implementing the actual code 
                  based on the technical specifications and design patterns established.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Frontend Development</h5>
                    <p className="text-sm text-gray-600">React.js components and user interface implementation</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Backend Development</h5>
                    <p className="text-sm text-gray-600">Node.js API server and business logic implementation</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Database Implementation</h5>
                    <p className="text-sm text-gray-600">PostgreSQL database setup and data models</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">Testing & Quality Assurance</h5>
                    <p className="text-sm text-gray-600">Unit testing, integration testing, and code quality</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Ready to Proceed?</h4>
                <p className="text-gray-600 mb-4">
                  This Architectural Design phase is now complete. You can proceed to the next phase (Code Development) 
                  or review any section of this document as needed.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      unlockNextPhase(projectId, 'architectural');
                      navigate(`/realtime-projects/${projectId}/code-development`);
                    }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Continue to Code Development
                  </button>
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Download Architecture Document
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
          <PhaseNavigationBar currentPhase="architectural" />
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
            <h1 className="text-xl font-bold text-gray-800 mb-2">Architectural Design Phase</h1>
            <p className="text-sm text-gray-600">{project.title}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="p-4">
            <nav className="space-y-2">
              {architecturalTabs.map((tab, index) => {
                const isUnlocked = isModuleUnlocked(projectId, 'architectural', tab.id);
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
                          ? 'bg-indigo-100 text-indigo-700 shadow-sm'
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
                {architecturalTabs.map((tab) => (
                  <div key={tab.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedTab === tab.id ? 'bg-indigo-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-xs ${
                      selectedTab === tab.id ? 'text-indigo-600 font-medium' : 'text-gray-500'
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
              currentPhase="architectural" 
              currentModule={selectedTab}
              onNext={() => {
                // Auto-advance to next module
                const architecturalTabs = [
                  { id: 'overview' },
                  { id: 'system-architecture' },
                  { id: 'database-design' },
                  { id: 'api-design' },
                  { id: 'security-considerations' },
                  { id: 'conclusion' }
                ];
                const currentIndex = architecturalTabs.findIndex(tab => tab.id === selectedTab);
                if (currentIndex < architecturalTabs.length - 1) {
                  setSelectedTab(architecturalTabs[currentIndex + 1].id);
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

export default ArchitecturalDesignPhasePage;

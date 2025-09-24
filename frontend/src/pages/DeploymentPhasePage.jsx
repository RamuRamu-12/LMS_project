import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PhaseNavigationBar from '../components/projects/PhaseNavigationBar';
import NextButton from '../components/projects/NextButton';
import { useProjectProgress } from '../context/ProjectProgressContext';

const DeploymentPhasePage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isModuleUnlocked } = useProjectProgress();

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
          },
          {
            id: 6,
            title: 'Phase 6 - Deployment',
            description: 'Deploy application to production and maintain operations',
            phaseNumber: 6,
            phaseType: 'DEPLOYMENT',
            estimatedDuration: 6,
            order: 6
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
          },
          {
            id: 11,
            title: 'Phase 6 - Deployment',
            description: 'Deploy analytics platform and data pipelines',
            phaseNumber: 6,
            phaseType: 'DEPLOYMENT',
            estimatedDuration: 5,
            order: 6
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
          },
          {
            id: 16,
            title: 'Phase 6 - Deployment',
            description: 'Deploy AI models and learning platform',
            phaseNumber: 6,
            phaseType: 'DEPLOYMENT',
            estimatedDuration: 7,
            order: 6
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

  const deploymentTabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '🚀',
      description: 'Deployment phase overview and objectives'
    },
    {
      id: 'deployment-planning',
      label: 'Deployment Planning',
      icon: '📋',
      description: 'Infrastructure setup and deployment strategy'
    },
    {
      id: 'environment-setup',
      label: 'Environment Setup',
      icon: '🏗️',
      description: 'Production, staging, and development environments'
    },
    {
      id: 'cicd-pipeline',
      label: 'CI/CD Pipeline',
      icon: '⚙️',
      description: 'Automated deployment and continuous integration'
    },
    {
      id: 'monitoring',
      label: 'Monitoring & Maintenance',
      icon: '📊',
      description: 'Application monitoring and ongoing maintenance'
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
          <p className="text-gray-600">Loading Deployment Phase...</p>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Deployment Overview</h3>
            
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
                  <h4 className="text-lg font-semibold mb-2">Deployment Phase Overview Video</h4>
                  <p className="text-sm text-gray-300">
                    Watch this comprehensive overview of the Deployment phase for the {project.title} project.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                This phase focuses on deploying the {project.title} to production environments and ensuring 
                smooth operation with proper monitoring, maintenance, and scalability measures in place.
              </p>
              
              <div className="bg-orange-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Phase Objectives</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Deploy application to production environment</li>
                  <li>Set up monitoring and logging systems</li>
                  <li>Implement CI/CD pipeline for automated deployments</li>
                  <li>Configure load balancing and auto-scaling</li>
                  <li>Establish backup and disaster recovery procedures</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Deliverables</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Production-ready application deployment</li>
                  <li>Environment configuration and setup</li>
                  <li>CI/CD pipeline implementation</li>
                  <li>Monitoring and alerting systems</li>
                  <li>Documentation and runbooks</li>
                  <li>Performance optimization and scaling plan</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'deployment-planning':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Deployment Planning</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Deployment planning involves creating a comprehensive strategy for deploying the application 
                to production with minimal downtime and maximum reliability.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Infrastructure Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Server Requirements</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• CPU: 4+ cores, 2.4GHz+</li>
                          <li>• RAM: 8GB+ (16GB recommended)</li>
                          <li>• Storage: 100GB+ SSD</li>
                          <li>• Network: 1Gbps+ bandwidth</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Database Requirements</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• PostgreSQL 13+</li>
                          <li>• 50GB+ storage</li>
                          <li>• Automated backups</li>
                          <li>• Read replicas for scaling</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">CDN & Storage</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• CloudFlare or AWS CloudFront</li>
                          <li>• S3-compatible object storage</li>
                          <li>• Image optimization</li>
                          <li>• Global content delivery</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Security & SSL</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• SSL/TLS certificates</li>
                          <li>• Firewall configuration</li>
                          <li>• DDoS protection</li>
                          <li>• Security headers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Deployment Strategy</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Blue-Green Deployment</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Benefits:</strong> Zero-downtime deployments, instant rollback capability</div>
                        <div><strong>Process:</strong> Deploy to green environment → Test → Switch traffic → Monitor</div>
                        <div><strong>Rollback:</strong> Switch traffic back to blue environment if issues detected</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Canary Deployment</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Benefits:</strong> Gradual rollout, risk mitigation, real-user testing</div>
                        <div><strong>Process:</strong> Deploy to 5% → Monitor → Increase to 25% → Full rollout</div>
                        <div><strong>Monitoring:</strong> Key metrics, error rates, performance indicators</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Deployment Checklist</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Pre-Deployment</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✅ Code review completed</li>
                        <li>✅ All tests passing</li>
                        <li>✅ Database migrations ready</li>
                        <li>✅ Environment variables configured</li>
                        <li>✅ SSL certificates installed</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Post-Deployment</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✅ Health checks passing</li>
                        <li>✅ Monitoring alerts configured</li>
                        <li>✅ Backup procedures tested</li>
                        <li>✅ Performance metrics baseline</li>
                        <li>✅ Documentation updated</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'environment-setup':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Environment Setup</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Environment setup involves configuring development, staging, and production environments 
                with appropriate security, performance, and monitoring configurations.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Environment Configuration</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Development Environment</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Configuration</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Local development server</li>
                            <li>• Debug mode enabled</li>
                            <li>• Hot reloading active</li>
                            <li>• Mock data and services</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Access</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Developer team only</li>
                            <li>• No authentication required</li>
                            <li>• Full debugging access</li>
                            <li>• Test data available</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Staging Environment</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Configuration</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Production-like setup</li>
                            <li>• Performance monitoring</li>
                            <li>• Real database (test data)</li>
                            <li>• Load balancing enabled</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Access</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• QA team and stakeholders</li>
                            <li>• User acceptance testing</li>
                            <li>• Performance testing</li>
                            <li>• Security testing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Production Environment</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Configuration</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• High availability setup</li>
                            <li>• Auto-scaling enabled</li>
                            <li>• CDN integration</li>
                            <li>• Full monitoring suite</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Access</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• End users and customers</li>
                            <li>• Restricted admin access</li>
                            <li>• Audit logging enabled</li>
                            <li>• 24/7 monitoring</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Environment Variables</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Database Configuration</h5>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        <div>DATABASE_URL=postgresql://user:pass@host:5432/dbname</div>
                        <div>DB_POOL_SIZE=20</div>
                        <div>DB_TIMEOUT=30000</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">API Configuration</h5>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        <div>API_BASE_URL=https://api.example.com</div>
                        <div>JWT_SECRET=your-secret-key</div>
                        <div>RATE_LIMIT=1000</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">External Services</h5>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        <div>PAYMENT_API_KEY=sk_live_...</div>
                        <div>EMAIL_SERVICE_URL=https://api.sendgrid.com</div>
                        <div>CDN_URL=https://cdn.example.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cicd-pipeline':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">CI/CD Pipeline</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                CI/CD pipeline automates the process of building, testing, and deploying the application 
                to ensure consistent and reliable deployments.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Pipeline Stages</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">1. Source Control</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Trigger:</strong> Code push to main branch</div>
                        <div><strong>Actions:</strong> Clone repository, checkout latest code</div>
                        <div><strong>Tools:</strong> Git, GitHub Actions / GitLab CI / Jenkins</div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">2. Build & Test</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Actions:</strong> Install dependencies, run tests, build application</div>
                        <div><strong>Tests:</strong> Unit tests, integration tests, linting, security scans</div>
                        <div><strong>Artifacts:</strong> Build packages, test reports, coverage reports</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">3. Staging Deployment</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Actions:</strong> Deploy to staging environment, run smoke tests</div>
                        <div><strong>Validation:</strong> Health checks, performance tests, security scans</div>
                        <div><strong>Approval:</strong> Manual approval for production deployment</div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">4. Production Deployment</h5>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div><strong>Actions:</strong> Blue-green deployment, traffic switching</div>
                        <div><strong>Monitoring:</strong> Real-time monitoring, alert notifications</div>
                        <div><strong>Rollback:</strong> Automatic rollback on failure detection</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Pipeline Configuration</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">GitHub Actions Workflow</h5>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        <div>name: Deploy to Production</div>
                        <div>on:</div>
                        <div>  push:</div>
                        <div>    branches: [main]</div>
                        <div>jobs:</div>
                        <div>  test:</div>
                        <div>    runs-on: ubuntu-latest</div>
                        <div>    steps:</div>
                        <div>      - uses: actions/checkout@v3</div>
                        <div>      - name: Setup Node.js</div>
                        <div>        uses: actions/setup-node@v3</div>
                        <div>      - name: Install dependencies</div>
                        <div>        run: npm ci</div>
                        <div>      - name: Run tests</div>
                        <div>        run: npm test</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Docker Configuration</h5>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        <div>FROM node:18-alpine</div>
                        <div>WORKDIR /app</div>
                        <div>COPY package*.json ./</div>
                        <div>RUN npm ci --only=production</div>
                        <div>COPY . .</div>
                        <div>RUN npm run build</div>
                        <div>EXPOSE 3000</div>
                        <div>CMD ["npm", "start"]</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Deployment Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">5 min</div>
                      <div className="text-sm text-gray-600">Deployment Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">99.9%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">2 min</div>
                      <div className="text-sm text-gray-600">Rollback Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">0</div>
                      <div className="text-sm text-gray-600">Failed Deployments</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'monitoring':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Monitoring & Maintenance</h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Monitoring and maintenance ensure the application runs smoothly in production with 
                proactive issue detection and resolution.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Application Monitoring</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Performance Metrics</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Response time monitoring</li>
                          <li>• Throughput tracking</li>
                          <li>• Error rate monitoring</li>
                          <li>• Resource utilization</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Health Checks</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Database connectivity</li>
                          <li>• API endpoint health</li>
                          <li>• External service status</li>
                          <li>• System resource checks</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Logging & Alerts</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Centralized logging</li>
                          <li>• Error tracking</li>
                          <li>• Alert notifications</li>
                          <li>• Incident management</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2">Security Monitoring</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Intrusion detection</li>
                          <li>• Failed login attempts</li>
                          <li>• Suspicious activity</li>
                          <li>• Vulnerability scanning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Monitoring Tools</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Application Performance Monitoring (APM)</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl mb-2">📊</div>
                          <div className="font-medium text-gray-800">New Relic</div>
                          <div className="text-sm text-gray-600">Real-time performance monitoring</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl mb-2">🔍</div>
                          <div className="font-medium text-gray-800">DataDog</div>
                          <div className="text-sm text-gray-600">Infrastructure monitoring</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl mb-2">⚡</div>
                          <div className="font-medium text-gray-800">Sentry</div>
                          <div className="text-sm text-gray-600">Error tracking and debugging</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Log Management</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">ELK Stack</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Elasticsearch for search</li>
                            <li>• Logstash for processing</li>
                            <li>• Kibana for visualization</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-700 mb-1">Cloud Solutions</h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• AWS CloudWatch</li>
                            <li>• Google Cloud Logging</li>
                            <li>• Azure Monitor</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Maintenance Schedule</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Daily Tasks</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Check system health status</li>
                          <li>• Review error logs</li>
                          <li>• Monitor performance metrics</li>
                        </ul>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Verify backup completion</li>
                          <li>• Check security alerts</li>
                          <li>• Update monitoring dashboards</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Weekly Tasks</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Security patch updates</li>
                          <li>• Performance optimization</li>
                          <li>• Capacity planning review</li>
                        </ul>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Database maintenance</li>
                          <li>• Log rotation and cleanup</li>
                          <li>• Disaster recovery testing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
          <PhaseNavigationBar currentPhase="deployment" />
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
            <h1 className="text-xl font-bold text-gray-800 mb-2">Deployment Phase</h1>
            <p className="text-sm text-gray-600">{project.title}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="p-4">
            <nav className="space-y-2">
              {deploymentTabs.map((tab, index) => {
                const isUnlocked = isModuleUnlocked(projectId, 'deployment', tab.id);
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
                          ? 'bg-red-100 text-red-700 shadow-sm'
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
                {deploymentTabs.map((tab) => (
                  <div key={tab.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedTab === tab.id ? 'bg-orange-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-xs ${
                      selectedTab === tab.id ? 'text-orange-600 font-medium' : 'text-gray-500'
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
              currentPhase="deployment" 
              currentModule={selectedTab}
              onNext={() => {
                // Auto-advance to next module
                const deploymentTabs = [
                  { id: 'overview' },
                  { id: 'deployment-strategy' },
                  { id: 'production-setup' },
                  { id: 'monitoring' },
                  { id: 'maintenance' },
                  { id: 'conclusion' }
                ];
                const currentIndex = deploymentTabs.findIndex(tab => tab.id === selectedTab);
                if (currentIndex < deploymentTabs.length - 1) {
                  setSelectedTab(deploymentTabs[currentIndex + 1].id);
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

export default DeploymentPhasePage;

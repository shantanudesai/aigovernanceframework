'use client';

import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  UserIcon, 
  ClockIcon,
  ShieldCheckIcon,
  DocumentCheckIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  DocumentDuplicateIcon,
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  ArrowPathIcon,
  ComputerDesktopIcon,
  BanknotesIcon,
  HeartIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  ShoppingBagIcon,
  AcademicCapIcon,
  TruckIcon,
  ArrowRightIcon,
  PuzzlePieceIcon,
  CheckCircleIcon,
  ChartBarSquareIcon,
  RocketLaunchIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { blogPosts } from '@/data/blog-data';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface BlogPostContentProps {
  slug: string;
}

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="p-3 bg-sky-50 rounded-lg">
          <Icon className="h-6 w-6 text-sky-600" />
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const StepCard = ({ number, title, description }: { number: number, title: string, description: string }) => (
  <div className="relative">
    <div className="absolute left-0 top-0 -ml-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-white text-sm font-medium">
      {number}
    </div>
    <div className="pl-8">
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const ClauseCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 font-bold">
          {number}
        </div>
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-900 mb-3">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const SectionDivider = ({ title }: { title: string }) => (
  <div className="relative my-16">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-200"></div>
    </div>
    <div className="relative flex justify-center">
      <h2 className="bg-white px-6 py-2 text-3xl font-bold text-gray-900 rounded-full shadow-sm border border-gray-100">
        {title}
      </h2>
    </div>
  </div>
);

const IndustryCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
    <div className="flex flex-col items-center text-center">
      <div className="p-3 bg-sky-50 rounded-xl mb-4">
        <Icon className="h-8 w-8 text-sky-600" />
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const IntegrationCard = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex items-center space-x-4">
    <div className="flex-shrink-0">
      <PuzzlePieceIcon className="h-8 w-8 text-sky-500" />
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const ActionStep = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div className="p-2 bg-sky-50 rounded-lg">
        <Icon className="h-6 w-6 text-sky-600" />
      </div>
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Blog Post Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center text-base font-medium text-sky-600 hover:text-sky-700"
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: "Enhanced Security Posture",
      description: "Build a fortress that adapts and strengthens over time with proven security practices."
    },
    {
      icon: DocumentCheckIcon,
      title: "Regulatory Compliance",
      description: "Meet legal requirements while reducing compliance headaches with GDPR, HIPAA, and more."
    },
    {
      icon: ChartBarIcon,
      title: "Proactive Risk Management",
      description: "Prevent security incidents before they occur, protecting reputation and costs."
    },
    {
      icon: UserGroupIcon,
      title: "Security-Conscious Culture",
      description: "Create a culture where everyone understands their role in protecting information assets."
    }
  ];

  const certificationSteps = [
    {
      title: "Building Your Foundation",
      description: "Establish ISMS framework, develop documentation, and implement processes across your organization."
    },
    {
      title: "Internal Validation",
      description: "Conduct internal audits and management reviews to evaluate system effectiveness."
    },
    {
      title: "External Certification",
      description: "Work with an accredited certification body for formal documentation review and on-site assessment."
    },
    {
      title: "Ongoing Compliance",
      description: "Maintain ISMS with annual surveillance audits and three-year recertification."
    }
  ];

  const clauses = [
    {
      number: "1-3",
      title: "The Foundation",
      description: "Establish the groundwork by defining scope, referencing essential documents, and clarifying terminology—ensuring everyone speaks the same security language."
    },
    {
      number: "4",
      title: "Understanding Your Context",
      description: "Analyze internal and external factors that impact your ISMS. Identify stakeholders and industry challenges to ensure your security approach aligns with reality."
    },
    {
      number: "5",
      title: "Leadership Commitment",
      description: "Security isn't just an IT concern. Top management must be involved in establishing policies and defining clear roles and responsibilities throughout the organization."
    },
    {
      number: "6",
      title: "Strategic Planning",
      description: "Identify risks and opportunities, set information security objectives, and create actionable plans. Move from hoping for the best to deliberate, strategic action."
    },
    {
      number: "7",
      title: "Building Your Support System",
      description: "Ensure you have the right resources, competent people, proper infrastructure, and comprehensive documentation for a successful security program."
    },
    {
      number: "8",
      title: "Operations in Action",
      description: "Put your ISMS into daily operation—conducting risk assessments, implementing treatments, and managing security incidents proactively."
    },
    {
      number: "9-10",
      title: "Monitoring and Improvement",
      description: "Focus on measuring performance, conducting internal audits, reviewing management effectiveness, and continuously improving your security posture."
    }
  ];

  const industries = [
    {
      icon: ComputerDesktopIcon,
      title: "Technology Companies",
      description: "Protect client data and demonstrate your commitment to security in an industry where trust is paramount."
    },
    {
      icon: BanknotesIcon,
      title: "Financial Institutions",
      description: "Safeguard sensitive financial information and meet strict regulatory requirements in the banking sector."
    },
    {
      icon: HeartIcon,
      title: "Healthcare Providers",
      description: "Ensure patient records security and comply with healthcare data protection standards like HIPAA."
    },
    {
      icon: BuildingOffice2Icon,
      title: "Government Agencies",
      description: "Secure public information and maintain citizen trust with robust information security practices."
    },
    {
      icon: GlobeAltIcon,
      title: "Multinational Corporations",
      description: "Implement consistent security standards across global operations and diverse regulatory environments."
    },
    {
      icon: ShoppingBagIcon,
      title: "Retail & E-commerce",
      description: "Protect customer data and payment information while building trust in online transactions."
    },
    {
      icon: AcademicCapIcon,
      title: "Educational Institutions",
      description: "Secure student records and research data while maintaining academic integrity."
    },
    {
      icon: TruckIcon,
      title: "Supply Chain & Logistics",
      description: "Ensure secure data exchange between partners and protect sensitive logistics information."
    }
  ];

  const integrations = [
    {
      title: "ISO 9001 Quality Management",
      description: "Align security practices with quality management processes for better operational excellence."
    },
    {
      title: "ISO 14001 Environmental Management",
      description: "Integrate security controls with environmental management systems for sustainable operations."
    },
    {
      title: "ISO 45001 Health & Safety",
      description: "Combine security measures with health and safety protocols for comprehensive risk management."
    },
    {
      title: "Other Management Systems",
      description: "Seamlessly integrate with various standards while maintaining individual system integrity."
    }
  ];

  const nextSteps = [
    {
      icon: CheckCircleIcon,
      title: "Gap Analysis",
      description: "Conduct an informal assessment of your current security practices against ISO 27001:2022 requirements."
    },
    {
      icon: ChartBarSquareIcon,
      title: "Implementation Planning",
      description: "Build a realistic timeline based on your organization's specific needs and resources."
    },
    {
      icon: RocketLaunchIcon,
      title: "Begin Implementation",
      description: "Start your journey towards a more resilient and secure organization."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50/50">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5" />
              Back to Blog
            </Link>
            <div className="flex space-x-8">
              <Link href="/tools" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">
                Tools
              </Link>
              <Link href="/blog" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-sky-50/50 to-white py-16 mb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <article className="max-w-4xl mx-auto">
            <header className="text-center mb-16">
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-8">
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <UserIcon className="h-4 w-4 mr-2 text-sky-500" />
                  {post.author}
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <CalendarIcon className="h-4 w-4 mr-2 text-sky-500" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <ClockIcon className="h-4 w-4 mr-2 text-sky-500" />
                  {post.readingTime}
                </div>
              </div>
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 font-heading leading-tight">
                  The Complete Guide to
                  <br className="hidden sm:block" />
                  <span className="text-sky-900">ISO 27001:2022</span>
                </h1>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-800 mb-8 font-heading leading-tight">
                  Securing Your Organization's Future
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  {post.description}
                </p>
              </div>
            </header>
          </article>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <article className="max-w-4xl mx-auto">
          <div className="relative w-full aspect-[2/1] mb-16 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          {/* Introduction Section */}
          <div className="prose prose-lg max-w-none mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is ISO 27001:2022?</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Think of ISO 27001:2022 as a comprehensive blueprint for building an Information Security Management System (ISMS) that actually works. This internationally recognized standard creates a robust framework that systematically manages your information security risks.
            </p>
          </div>

          {/* Benefits Grid */}
          <SectionDivider title="Key Benefits" />
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <FeatureCard key={index} {...benefit} />
              ))}
            </div>
          </div>

          {/* ISO Structure Section */}
          <SectionDivider title="Understanding ISO 27001:2022" />
          <div className="mb-16">
            <div className="bg-gradient-to-br from-sky-50 to-white rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                The standard is thoughtfully organized into ten key clauses, each building upon the previous one to create a comprehensive security framework.
              </p>
              <div className="grid grid-cols-1 gap-6">
                {clauses.map((clause, index) => (
                  <ClauseCard key={index} {...clause} />
                ))}
              </div>
            </div>
          </div>

          {/* Certification Journey */}
          <SectionDivider title="Your Certification Journey" />
          <div className="bg-gradient-to-br from-sky-50 to-white rounded-2xl p-8 mb-16">
            <div className="space-y-8">
              {certificationSteps.map((step, index) => (
                <StepCard key={index} number={index + 1} {...step} />
              ))}
            </div>
          </div>

          {/* Documentation Requirements */}
          <SectionDivider title="Essential Documentation" />
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                ISO 27001:2022 requires specific mandatory documents to ensure your ISMS is properly documented and maintained:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0 mb-8">
                <li className="flex items-center gap-3 text-gray-600">
                  <DocumentCheckIcon className="h-5 w-5 text-sky-500 flex-shrink-0" />
                  ISMS Scope Definition
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <DocumentCheckIcon className="h-5 w-5 text-sky-500 flex-shrink-0" />
                  Information Security Policy
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <DocumentCheckIcon className="h-5 w-5 text-sky-500 flex-shrink-0" />
                  Risk Assessment Methodology
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <DocumentCheckIcon className="h-5 w-5 text-sky-500 flex-shrink-0" />
                  Statement of Applicability
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <DocumentCheckIcon className="h-5 w-5 text-sky-500 flex-shrink-0" />
                  Internal Audit Records
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <DocumentCheckIcon className="h-5 w-5 text-sky-500 flex-shrink-0" />
                  Corrective Actions Log
                </li>
              </ul>
              <div className="bg-sky-50 rounded-xl p-6 border border-sky-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      Note: This is a foundational list of required documentation. Depending on your organization's context, scope, and specific requirements, 
                      additional documentation may be necessary to ensure comprehensive coverage of your ISMS. We recommend consulting with certification experts 
                      to determine the complete documentation requirements for your specific case.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Who Should Pursue Section */}
          <SectionDivider title="Who Should Pursue Certification?" />
          <div className="mb-16">
            <div className="bg-gradient-to-br from-sky-50 to-white rounded-2xl p-8">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Is ISO 27001:2022 Right for Your Organization?
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  The short answer? Almost everyone. ISO 27001:2022 is industry-agnostic and scalable, 
                  making it suitable for organizations of all sizes and sectors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {industries.map((industry, index) => (
                  <IndustryCard key={index} {...industry} />
                ))}
              </div>

              <div className="mt-12 bg-sky-50 rounded-xl p-6 border border-sky-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <ShieldCheckIcon className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      No matter your industry, ISO 27001:2022 adapts to your specific context and requirements, 
                      providing a flexible framework that grows with your organization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Capabilities */}
          <SectionDivider title="Integration & Next Steps" />
          <div className="mb-16">
            <div className="bg-gradient-to-br from-sky-50 to-white rounded-2xl p-8">
              {/* Integration Section */}
              <div className="mb-12">
                <div className="max-w-3xl mx-auto text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Seamless Integration with Other Standards
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    One of ISO 27001:2022's greatest strengths is its compatibility with other management system standards, 
                    allowing you to create a unified Integrated Management System (IMS).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {integrations.map((integration, index) => (
                    <IntegrationCard key={index} {...integration} />
                  ))}
                </div>

                <div className="bg-sky-50 rounded-xl p-6 border border-sky-100">
                  <p className="text-gray-600 leading-relaxed">
                    This integration reduces administrative burden, eliminates duplicate processes, and creates 
                    synergies between different management systems while maintaining their individual integrity.
                  </p>
                </div>
              </div>

              {/* Taking the Next Step */}
              <div className="border-t border-gray-200 pt-12">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Taking the Next Step
                  </h3>
                  <div className="space-y-8 mb-8">
                    {nextSteps.map((step, index) => (
                      <ActionStep key={index} {...step} />
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-xl p-8 text-white mt-12">
                    <h4 className="text-xl font-bold mb-4">
                      The Time to Act is Now
                    </h4>
                    <p className="mb-6 leading-relaxed">
                      Remember, ISO 27001:2022 certification isn't just about compliance—it's about building a resilient 
                      organization that can thrive in an increasingly digital and threat-filled world. The question isn't 
                      whether you can afford to pursue certification, but whether you can afford not to.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <a
                        href="mailto:ultimateaigovernanceframework@proton.me"
                        className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-sky-600 transition-colors duration-200 w-full sm:w-auto justify-center"
                      >
                        Start Your Journey
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                      </a>
                      <p className="text-sky-100 text-sm">
                        Email us at ultimateaigovernanceframework@proton.me
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
} 
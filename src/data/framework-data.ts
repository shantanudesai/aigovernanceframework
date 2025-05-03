interface FrameworkControl {
  Domain: string;
  Master: string;
  Topic: string;
  'Control Statement': string;
  ISO42001?: string;
  ISO27001?: string;
  ISO27701?: string;
  'EU AI ACT'?: string | number;
  'NIST RMF'?: string;
  SOC2?: string;
}

export const frameworkData = {
  data: [
    {
      Domain: "Governance & Leadership",
      Master: "GL-1",
      Topic: "Executive Commitment and Accountability",
      "Control Statement": "The organisation's executive leadership shall establish, document, and maintain formal accountability for AI governance through approved policies that align with organisational objectives and values. These policies shall be reviewed at planned intervals by executive leadership to ensure continued effectiveness and relevance. Executive leadership shall demonstrate active engagement in AI risk decisions and maintain ultimate accountability for the organisation's AI systems.",
      ISO42001: "4.1 5.1 5.2 9.3 A.2.2 A.2.3 A.2.4",
      ISO27001: "5.1 5.2 9.3 A.5.1 A.5.2",
      ISO27701: "6.1.1 6.1.2",
      "EU AI ACT": 4.1,
      "NIST RMF": "Govern 1.1 Govern 2.3 Govern 3.1",
      SOC2: "CC.1.1 CC.1.2 CC.1.3 CC.1.4 CC.1.5 CC.5.3"
    },
    {
      Domain: "Governance & Leadership",
      Master: "GL-2",
      Topic: "Roles, Responsibilities & Resources",
      "Control Statement": "The organisation shall define, document, and maintain clear roles and responsibilities for AI governance, ensuring appropriate segregation of duties and allocation of resources. These roles shall be staffed with competent individuals who understand their responsibilities for AI system development, deployment, and oversight. The organisation shall maintain documentation of required resources, including personnel competencies, tools, and infrastructure needed for effective AI governance.",
      ISO42001: "5.3 7.1-7.3 A.3.2 A.4.2",
      ISO27001: "5.3 7.1-7.3 A.6.1 A.6.2 A.7.2",
      ISO27701: "6.2.1 6.2.2 7.2.2 9.2.3",
      "EU AI ACT": "22.1 22.2 26.3",
      "NIST RMF": null,
      SOC2: "CC.1.3 CC.1.4"
    },
    {
      Domain: "Governance & Leadership",
      Master: "GL-3",
      Topic: "Strategic Alignment & Objectives",
      "Control Statement": "The organisation shall document clear objectives for the responsible development and use of AI systems, ensuring alignment between business goals, ethical principles, and regulatory requirements. These objectives shall be integrated into organisational practices and regularly reviewed to maintain effectiveness. The organisation shall foster an environment that promotes critical thinking and safety-first approaches to AI development and deployment.",
      ISO42001: "4.1-4.4 5.2 6.2-6.3 A.2.2-A.2.4 A.6.1.2 A.9.3 A.9.4",
      ISO27001: "4.1-4.4 6.2-6.3",
      ISO27701: "A.7.2.1 A.7.2.2 B.8.2.2",
      "EU AI ACT": null,
      "NIST RMF": "Map 1.3 Map 1.4 Govern 1.1 Govern 1.2 Govern 4.1 Govern 3.1",
      SOC2: null
    },
    {
      Domain: "Risk Management",
      Master: "RM-1",
      Topic: "Risk Management Framework and Governance",
      "Control Statement": "The organisation shall establish, document, and maintain a comprehensive risk management system covering the entire AI lifecycle. This system shall define clear roles, responsibilities, and processes for identifying, assessing, treating, and monitoring AI-related risks. The framework shall incorporate regular reviews by executive leadership and ensure risk management activities align with organisational risk tolerance. Risk management processes shall be transparent, documented, and appropriately resourced to maintain effectiveness.",
      ISO42001: "6.1",
      ISO27001: 6.1,
      ISO27701: "12.2.1 A.7.2.5 A.7.2.8 B.8.2.6",
      "EU AI ACT": "9.1 9.2",
      "NIST RMF": "Govern 1.3 Govern 1.4 Govern 1.5 Map 1.5",
      SOC2: "CC3.1"
    },
    {
      Domain: "Risk Management",
      Master: "RM-2",
      Topic: "Risk Identification and Impact Assessment",
      "Control Statement": "The organisation shall conduct and document comprehensive impact assessments for AI systems, evaluating potential effects on individuals, groups, and society throughout the system lifecycle. These assessments shall consider fundamental rights, safety implications, environmental impacts, and effects on vulnerable populations. The organisation shall maintain a systematic approach to identifying both existing and emerging risks, including those from third-party components and systems.",
      ISO42001: "6.1.1-6.1.2 6.1.4 8.4 A.5.2 A.5.3 A.5.4 A.5.5",
      ISO27001: "6.1.2",
      ISO27701: "A.7.2.5 A.7.3.10 A.7.4.4",
      "EU AI ACT": "9.9 27.1",
      "NIST RMF": "Map 1.1 Map 3.1 Map 3.2 Measure 2.6 Measure 2.7 Measure 2.8 Measure 2.10 Measure 2.12",
      SOC2: "CC3.2"
    },
    {
      Domain: "Risk Management",
      Master: "RM-3",
      Topic: "Risk Treatment and Control Implementation",
      "Control Statement": "The organisation shall implement appropriate technical and organisational measures to address identified risks, ensuring controls are proportionate to risk levels and organisational risk tolerance. Risk treatment strategies shall be documented and prioritised based on impact and likelihood, with clear accountability for implementation. The organisation shall maintain specific protocols for high-risk AI systems, including quality management systems and compliance verification processes.",
      ISO42001: "6.1.3",
      ISO27001: "6.1.3",
      ISO27701: "A.7.4.1 A.7.4.2 A.7.4.4 A.7.4.5",
      "EU AI ACT": "8.1 8.2 17.1 9.3 9.4 9.5",
      "NIST RMF": "Manage 1.2 Manage 1.3 Manage 1.4",
      SOC2: "CC5.1 CC9.1"
    },
    {
      Domain: "Risk Management",
      Master: "RM-4",
      Topic: "Risk Monitoring and Response",
      "Control Statement": "The organisation shall implement continuous monitoring processes to track the effectiveness of risk controls and identify emerging risks throughout the AI lifecycle. This shall include mechanisms for detecting and responding to previously unknown risks, regular evaluation of third-party risk exposure, and processes for incident response and recovery. The organisation shall maintain documentation of monitoring activities and ensure appropriate escalation paths for risk-related issues.",
      ISO42001: "6.1.3 8.1-8.3",
      ISO27001: "6.1.3 8.1-8.3",
      ISO27701: "A.7.4.3 A.7.4.9 B.8.2.4 B.8.2.5 B.8.4.3",
      "EU AI ACT": 9.6,
      "NIST RMF": "Measure 3.1 Measure 3.2 Manage 2.1 Manage 2.2 Manage 2.3 Manage 3.1 Govern 6.1 Govern 6.2",
      SOC2: "CC3.4 CC9.2"
    },
    {
      Domain: "Regulatory Operations",
      Master: "RO-1",
      Topic: "Regulatory Compliance Framework",
      "Control Statement": "The organisation shall establish, document, and maintain a comprehensive framework for ensuring compliance with applicable AI regulations and standards. This framework shall include processes for identifying relevant requirements, assessing applicability, implementing necessary controls, and verifying ongoing compliance. The organisation shall maintain systematic processes for tracking and implementing new regulatory requirements, conducting conformity assessments, maintaining necessary certifications, and ensuring timely renewal of compliance documentation. Special attention shall be given to high-risk AI system requirements and prohibited practices. The organisation shall implement processes to track changes that may affect compliance status and maintain evidence of continued conformity with legal obligations",
      ISO42001: null,
      ISO27001: "A.18.1",
      ISO27701: "18.2.1 A.7.2.1-A.7.2.4 B.8.2.1-B.8.2.2 B.8.2.4-B.8.2.5",
      "EU AI ACT": "5.1 5.2 6.1-6.4 8.1-8.2 40.1 41.1 42.1 43.1-43.4 44.2-44.3 47.1-47.4 49.1-49.3",
      "NIST RMF": "Govern 1.1 Map 4.1",
      SOC2: "CC1.5"
    },
    {
      Domain: "Regulatory Operations",
      Master: "RO-2",
      Topic: "Transparency, Disclosure and Reporting",
      "Control Statement": "The organisation shall implement mechanisms to ensure appropriate transparency regarding AI systems, including clear notification of AI use, disclosure of automated decision-making, and communication of significant system changes. The organisation shall establish and maintain processes for reporting incidents, safety issues, and non-compliance to relevant authorities and affected stakeholders. This shall include clear procedures for incident detection, assessment, notification timelines, and follow-up actions.",
      ISO42001: "A.8.3 A.8.5",
      ISO27001: "A.6.3",
      ISO27701: "6.2.3 A.7.3.2-A.7.3.3 A.7.3.8-A.7.3.9 A.7.5.3-A.7.5.4 B.8.5.3-B.8.5.6",
      "EU AI ACT": "50.1-50.5 86.1-86.3 20.1 20.2 60.7 60.8",
      "NIST RMF": "Govern 6.1 Map 4.1",
      SOC2: "CC2.3 P1.1 P1.2 P1.3"
    },
    {
      Domain: "Regulatory Operations",
      Master: "RO-3",
      Topic: "Record-Keeping",
      "Control Statement": "The organisation shall maintain comprehensive documentation and records demonstrating compliance with AI regulatory requirements. This shall include technical documentation, conformity assessments, impact analyses, test results, and evidence of ongoing monitoring. The organisation shall establish retention periods aligned with regulatory requirements, implement secure storage systems, and ensure documentation remains accessible to authorised parties throughout required retention periods.",
      ISO42001: null,
      ISO27001: "A.7.2",
      ISO27701: "8.2.3 A.7.2.8 A.7.3.1 A.7.4.3 A.7.4.6-A.7.4.8 B.8.2.6 B.8.4.1-B.8.4.2",
      "EU AI ACT": "11.1 11.3 18.1 19.1 19.2 71.2 71.3",
      "NIST RMF": "Map 4.1 Measure 2.12",
      SOC2: "P3.1 P3.2 P3.3"
    },
    {
      Domain: "Regulatory Operations",
      Master: "RO-4",
      Topic: "Post-Market Monitoring",
      "Control Statement": "The organisation shall implement comprehensive post-market monitoring systems for deployed AI systems, including mechanisms for tracking performance, identifying issues, and implementing corrective actions. This shall include processes for reporting incidents to relevant authorities, maintaining required documentation, and conducting periodic reviews of system performance. The organisation shall ensure appropriate escalation paths exist for identified issues and maintain clear procedures for implementing necessary corrective actions.",
      ISO42001: "A.8.3",
      ISO27001: null,
      ISO27701: "6.2.3 A.7.3.6-A.7.3.7 A.7.3.10 A.7.4.3 B.8.3.1 B.8.5.7-B.8.5.8",
      "EU AI ACT": "72.1-72.4 79.4 80.4-80.5",
      "NIST RMF": "Govern 6.1 Measure 2.12",
      SOC2: "CC1.5"
    },
    {
      Domain: "System, Data and Model Lifecycle",
      Master: "LC-1",
      Topic: "Data Quality and Governance",
      "Control Statement": "The organisation shall establish and maintain comprehensive data governance processes ensuring high-quality data throughout the AI system lifecycle. This shall include documented requirements and procedures for data collection, processing, and validation, ensuring datasets are relevant, representative, and statistically suitable for their intended purpose. The organisation shall implement processes for bias detection and mitigation, maintain clear data provenance records, and ensure data reflects the specific geographical, behavioural, and functional settings where AI systems will be used.",
      ISO42001: "A.7.2-A.7.6",
      ISO27001: null,
      ISO27701: "A.7.4.1-A.7.4.2 A.7.4.6-A.7.4.8 B.8.4.1-B.8.4.2",
      "EU AI ACT": "10.1-10.6",
      "NIST RMF": "Map 2.1",
      SOC2: null
    },
    {
      Domain: "System, Data and Model Lifecycle",
      Master: "LC-2",
      Topic: "System Development and Lifecycle Management",
      "Control Statement": "The organisation shall define, document, and maintain processes for responsible AI system development across the entire lifecycle, from requirements specification through deployment and eventual decommissioning. The organisation shall maintain clear records of system objectives, technical implementation decisions, and operational constraints throughout development and deployment phases.",
      ISO42001: "A.6.1.2-A.6.1.3 A.6.2.2-A.6.2.3 A.6.2.5",
      ISO27001: null,
      ISO27701: "A.7.4.1-A.7.4.2 A.7.4.5-A.7.4.8 B.8.4.1-B.8.4.2",
      "EU AI ACT": null,
      "NIST RMF": "Map 1.6 Govern 1.7",
      SOC2: "CC8.1 CC8.2"
    },
    {
      Domain: "System, Data and Model Lifecycle",
      Master: "LC-3",
      Topic: "Resource Management and Infrastructure",
      "Control Statement": "The organisation shall document and maintain inventories of all resources required for AI system development and operation, including data resources, tooling, computing infrastructure, and human competencies. This shall include clear allocation of responsibilities, documentation of system dependencies, and maintenance of resource specifications throughout the system lifecycle.",
      ISO42001: "A.4.3 A.4.5 A.4.6 A.10.2",
      ISO27001: "A.8.1 A.8.2",
      ISO27701: "A.7.2.6 A.7.2.7 B.8.5.6",
      "EU AI ACT": null,
      "NIST RMF": "Govern 1.6",
      SOC2: null
    },
    {
      Domain: "System, Data and Model Lifecycle",
      Master: "LC-4",
      Topic: "Technical Documentation",
      "Control Statement": "The organisation shall maintain comprehensive technical documentation demonstrating compliance throughout the AI system lifecycle. This shall include system characteristics, design specifications, validation results, and operational logs. The organisation shall implement automated logging mechanisms to capture system events, maintain documentation for required retention periods, and ensure documentation remains accessible to relevant stakeholders.",
      ISO42001: "7.5.1-7.5.3 A.6.2.7 A.6.2.8",
      ISO27001: "7.5.1-7.5.3",
      ISO27701: "A.7.2.8 A.7.5.3 A.7.5.4 B.8.2.6 B.8.5.3",
      "EU AI ACT": "11.1-11.3 12.1-12.3 18.1",
      "NIST RMF": "Map 2.2 Map 3.3",
      SOC2: null
    },
    {
      Domain: "System, Data and Model Lifecycle",
      Master: "LC-5",
      Topic: "Change Management & Version Control",
      "Control Statement": "The organisation shall establish and maintain comprehensive processes for managing changes to AI systems throughout their lifecycle. This shall include documented procedures for proposing, evaluating, testing, and implementing changes to models, data, or system components. The organisation shall maintain detailed version control of all system elements, including models, datasets, and software components, with clear records of modifications and their rationale. Changes shall be tested and validated before deployment, with documentation updated to reflect current system state.",
      ISO42001: "A.6.2.5",
      ISO27001: "A.12.2",
      ISO27701: "A.7.3.7 B.8.5.7 B.8.5.8",
      "EU AI ACT": 11.3,
      "NIST RMF": "Map 2.1",
      SOC2: "CC8.1 CC8.2"
    },
    {
      Domain: "Security",
      Master: "SE-1",
      Topic: "Security Governance, Architecture and Engineering",
      "Control Statement": "The organisation shall establish and maintain a comprehensive security governance framework that encompasses security risk management, security policies, standards, and architectures that guide the implementation of security controls across the organisation. The organisation shall ensure continuous monitoring of control effectiveness, manages security incidents, and maintains business continuity capabilities while overseeing third-party security requirements.",
      ISO42001: null,
      ISO27001: "A.5.1-A.5.2 A.6.1-A.6.2 A.6.5 A.7.1-A.7.4 A.12.1-A.12.3 A.17.1-A.17.2 A.18.1-A.18.2",
      ISO27701: "14.2.1 14.2.2",
      "EU AI ACT": null,
      "NIST RMF": null,
      SOC2: "CC2.3 CC3.1 CC3.2 CC5.2 CC7.2 CC7.3 CC9.3"
    },
    {
      Domain: "Security",
      Master: "SE-2",
      Topic: "Identity & Access Management",
      "Control Statement": "The organisation shall implement and maintains comprehensive identity and access management controls governing authentication, authorisation, and access monitoring across all systems and applications. This includes the complete lifecycle of identity management from screening to provisioning through deprovisioning, ensuring appropriate access levels are maintained and regularly reviewed. The organisation shall implement strong authentication mechanisms and maintains detailed access logs for all critical systems.",
      ISO42001: null,
      ISO27001: "A.9.1 A.9.2 A.9.3 A.9.4",
      ISO27701: "9.2.1 9.2.2 9.2.4",
      "EU AI ACT": null,
      "NIST RMF": null,
      SOC2: "CC6.1 CC6.2 CC6.3"
    },
    {
      Domain: "Security",
      Master: "SE-3",
      Topic: "Software Security",
      "Control Statement": "The organisation shall ensure all software development and deployment activities follow secure development practices throughout the system development lifecycle. This includes implementing secure coding standards, conducting security testing, managing secure configurations, and maintaining robust change management procedures for all production systems. The organisation shall regularly assess applications for security vulnerabilities and maintain secure development environments.",
      ISO42001: null,
      ISO27001: "A.14.1 A.14.2 A.12.2",
      ISO27701: "14.2.1 14.2.2",
      "EU AI ACT": null,
      "NIST RMF": null,
      SOC2: "CC5.2 CC7.1"
    },
    {
      Domain: "Security",
      Master: "SE-4",
      Topic: "Data Security",
      "Control Statement": "The organisation shall protect data throughout its lifecycle using appropriate technical and procedural controls, including classification, encryption, and secure handling procedures. This encompasses structured and unstructured data across all storage locations and transmission paths. The organisation shall maintain comprehensive data protection mechanisms, including backup systems, encryption standards, and secure disposal procedures, while ensuring appropriate data classification and handling requirements are enforced.",
      ISO42001: null,
      ISO27001: "A.8.1-A.8.7 A.10.1 A.10.2 A.12.4 A.12.5 A.14.3",
      ISO27701: "8.2.4 8.3.1 8.3.2 8.3.3 10.2.1 10.2.2 11.2.2",
      "EU AI ACT": null,
      "NIST RMF": null,
      SOC2: "CC6.4-CC6.7 C1.1 C1.2 P5.1-P5.4 P5.6"
    },
    {
      Domain: "Security",
      Master: "SE-5",
      Topic: "Network Security",
      "Control Statement": "The organisation shall implement and maintain comprehensive network security controls to protect against unauthorised access, ensure secure communications, and maintain the confidentiality and integrity of data in transit. This includes implementing secure network architectures, maintaining network monitoring capabilities, and ensuring appropriate network segmentation. The organisation shall regularly assess network security controls and maintain comprehensive network logging and monitoring capabilities.",
      ISO42001: null,
      ISO27001: "A.13.1-A.13.3 A.12.4 A.12.6 A.10.1 A.10.2",
      ISO27701: "13.2.1",
      "EU AI ACT": null,
      "NIST RMF": null,
      SOC2: "CC6.1 CC6.2 CC6.3"
    }
  ] as FrameworkControl[]
}; 
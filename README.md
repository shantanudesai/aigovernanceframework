# AI Governance Framework

A comprehensive framework for implementing and managing AI governance controls across twelve key domains. 
This web application provides an interactive interface to explore and understand various aspects of AI governance.
- Huge shout out to James ( https://github.com/The-Company-Ethos/doing-ai-governance ) and his blog at https://www.ethos-ai.org/ for providing well researched and relevant literature and grouping of AI Governance domains + controls.

These are the 12 doamins and there are 44 controls across all domains:
- Governance & Leadership (GL-1 to GL-3)
- Risk Management (RM-1 to RM-4)
- Regulatory Operations (RO-1 to RO-4)
- System, Data and Model Lifecycle (LC-1 to LC-5)
- Security & Engineering (SE-1 to SE-5)
- Safe Responsible AI (RS-1 to RS-5)
- Privacy (PR-1 to PR-4)
- Assurance and Audit (AA-1 to AA-3)
- Operational Monitoring (OM-1 to OM-3)
- Third Party & Supply Chain (TP-1 to TP-2)
- Compliance & Oversight (CO-1 to CO-2)
- Incident Management (IM-1 to IM-3)

In addition to the providing the Control Statements and tagging them with specific requirements in ISO42001, ISO27001, ISO27701, the NIST Risk Management Framework, EU AI Act, and SOC2, this framework provide Implementation Guidance for each control in following three logical steps:
- **Key control activities:** Specific activities and tasks that need to be performed.
- **Required Evidence:** Documentation and records that must be maintained.
- **Control test plan and procedures:** Step-by-step procedures for testing the control.
This additional guidance should help teams sitting in 1st and 2nd Line of Defense as well as provide some pointers for the 3rd LoD (Group Internal Audit) on what could be included in the audit scope.

Made with :heart: in Pune, India

## Features

- Interactive tile-based navigation for 12 key domains
- Detailed information about each governance domain
- Modern, responsive design
- Smooth animations and transitions

## Tech Stack

- Next.js 13+
- React 18+
- Tailwind CSS
- TypeScript
- Framer Motion

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable React components
- `/public` - Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 

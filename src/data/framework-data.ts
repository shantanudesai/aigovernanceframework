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
      "Control Statement": "The organisation's executive leadership shall establish, document, and maintain formal accountability for AI governance through approved policies that align with organisational objectives and values.",
      ISO42001: "4.1 5.1 5.2 9.3",
      ISO27001: "5.1 5.2 9.3",
      ISO27701: "6.1.1 6.1.2",
      "EU AI ACT": "4.1",
      "NIST RMF": "Govern 1.1",
      SOC2: "CC.1.1 CC.1.2"
    }
  ] as FrameworkControl[]
}; 
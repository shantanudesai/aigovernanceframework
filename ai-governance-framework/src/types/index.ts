export interface Control {
  Domain: string;
  Master: string;
  Topic: string;
  "Control Statement": string;
  ISO42001: string | null;
  ISO27001: string | null;
  ISO27701: string | null;
  "EU AI ACT": string | number | null;
  "NIST RMF": string | null;
  SOC2: string | null;
}

export interface FrameworkData {
  data: Control[];
} 
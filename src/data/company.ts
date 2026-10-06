import type { IconName } from '../components/Icon.astro';

export const stages = [
  { num: '01', title: 'Concept & Feasibility', verb: 'Concept', items: ['Project concept', 'Market and feasibility assessment', 'Budget framework'] },
  { num: '02', title: 'Healthcare Planning', verb: 'Plan', items: ['Department planning', 'Space planning', 'Clinical workflow'] },
  { num: '03', title: 'Engineering & Design', verb: 'Design', items: ['MEP', 'HVAC', 'MGPS', 'Electrical', 'Water systems', 'Hospital utilities'] },
  { num: '04', title: 'Biomedical Planning', verb: 'Engineer', items: ['Equipment planning', 'Technical specifications', 'BOQ', 'Vendor evaluation'] },
  { num: '05', title: 'Procurement', verb: 'Equip', items: ['OEM coordination', 'Vendor selection', 'Commercial evaluation', 'Equipment procurement'] },
  { num: '06', title: 'Project Execution', verb: 'Execute', items: ['Site management', 'Installation', 'Engineering coordination', 'Quality control'] },
  { num: '07', title: 'Testing & Commissioning', verb: 'Commission', items: ['Testing', 'Calibration', 'Validation', 'System commissioning', 'Handover'] },
  { num: '08', title: 'Maintenance & Lifecycle Support', verb: 'Maintain', items: ['AMC', 'Preventive maintenance', 'Technical support', 'Equipment lifecycle management'] },
];

export const disciplines = [
  { num: '01', title: 'Healthcare Planning', text: 'Departmental briefs, space planning and clinical workflow translated into buildable drawings.' },
  { num: '02', title: 'Engineering Infrastructure', text: 'MEP, HVAC, MGPS, electrical and utility systems designed for continuous clinical operation.' },
  { num: '03', title: 'Biomedical Technology', text: 'Equipment planning, specifications, procurement, installation, calibration and validation.' },
  { num: '04', title: 'Project & Lifecycle Management', text: 'Cost, schedule and quality control through commissioning, handover and AMC.' },
];

export const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: 'e2e', title: 'End-to-End Capability', text: 'One integrated partner from concept to commissioning.' },
  { icon: 'expert', title: 'Healthcare + Engineering Expertise', text: 'Combining clinical requirements with infrastructure engineering.' },
  { icon: 'neutral', title: 'Vendor-Neutral Procurement', text: 'Technical evaluation focused on project requirements.' },
  { icon: 'single', title: 'Single-Point Accountability', text: 'Simplifying coordination between consultants, engineers, OEMs and contractors.' },
  { icon: 'compliance', title: 'Compliance-Focused Execution', text: 'Documentation, testing, validation and quality assurance built into project delivery.' },
  { icon: 'lifecycle', title: 'Lifecycle Partnership', text: 'Support continues after commissioning through AMC and maintenance.' },
];

export const sectors = {
  private: {
    badge: 'Private Sector',
    title: 'Private Healthcare',
    text: 'Promoter-driven projects where speed, capital efficiency and clinical revenue readiness decide the schedule.',
    items: [
      'Private Hospitals', 'Multispeciality Hospitals', 'Nursing Homes', 'Medical Colleges', 'Diagnostic Centres',
      'Laboratories', 'Fertility Centres', 'Eye Hospitals', 'Trust & Charitable Hospitals', 'Corporate Hospital Chains',
    ],
  },
  government: {
    badge: 'Public Sector',
    title: 'Government & Public Health',
    text: 'Tender-governed projects where DPR quality, technical evaluation and compliance documentation determine outcomes.',
    items: [
      'Government Hospitals', 'District Hospitals', 'PHCs & CHCs', 'Government Medical Colleges',
      'Public Health Infrastructure', 'GeM Supply & Tenders',
    ],
  },
};

export const clients = [
  'Private healthcare promoters', 'Hospital groups', 'Medical colleges', 'Educational institutions',
  'Trusts and charitable organisations', 'Government departments', 'Public healthcare institutions',
];

export const deliverables = [
  'DPR', 'BOQ', 'Tender Documentation', 'Technical Evaluation', 'OEM Coordination', 'Project Monitoring',
  'Quality Assurance', 'Commissioning',
];

export const otSpecs = [
  'HEPA 99.997% @ 0.3µ', '20–25 air changes/hr', '+15 Pa positive', '21 ± 3 °C', '45–55 % RH', 'ISO Class 5–7',
];

export const campusChapters = [
  { tag: 'Stage 01–02', short: 'Concept & Planning', title: 'Concept, feasibility and healthcare planning', text: 'Departmental briefs and clinical workflow set the footprint before a single line is drawn.' },
  { tag: 'Stage 03–04', short: 'Engineering & Design', title: 'Engineering design and biomedical planning', text: 'MEP, HVAC, MGPS and equipment specifications developed as one coordinated package.' },
  { tag: 'Stage 05–06', short: 'Procurement & Execution', title: 'Procurement and project execution', text: 'OEM coordination, site management and quality control against a single programme.' },
  { tag: 'Stage 07–08', short: 'Commissioning & Support', title: 'Commissioning and lifecycle support', text: 'Testing, validation, handover — then AMC and maintenance for the life of the facility.' },
];

export const otChapters = [
  { tag: 'Envelope', title: 'Modular wall and ceiling systems', text: 'Bonded panels, flush surfaces and sealed joints built for cleanability and particle control.' },
  { tag: 'Air & Light', title: 'Laminar flow, HVAC and surgical lighting', text: 'Air-change rates, pressure cascade and illumination coordinated as one engineered system.' },
  { tag: 'Services', title: 'Medical gas, pendants and electrical integration', text: 'MGPS outlets, ceiling pendants, isolated power supply and nurse-call brought into the ceiling grid.' },
  { tag: 'Handover', title: 'ICU infrastructure, testing and validation', text: 'Particle counts, pressure and flow verification, documentation and commissioning sign-off.' },
];

export const projectTypes = [
  'New hospital project', 'Hospital expansion / upgrade', 'Modular OT / ICU', 'MGPS installation or upgrade',
  'Biomedical equipment procurement', 'Medical college / institutional', 'Diagnostic centre / laboratory',
  'Government / tender project', 'AMC & maintenance',
];

export const projectSizes = [
  'Under ₹1 Cr', '₹1 Cr – ₹5 Cr', '₹5 Cr – ₹25 Cr', '₹25 Cr – ₹100 Cr', 'Above ₹100 Cr', 'To be determined',
];

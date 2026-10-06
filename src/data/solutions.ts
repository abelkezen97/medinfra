import type { IconName } from '../components/Icon.astro';

export interface Solution {
  slug: string;
  num: string;
  title: string;
  short: string;
  icon: IconName;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string[];
  scope: string[];
  stages: string[];
  related: string[];
  /** Unsplash photo id (images.unsplash.com/photo-<id>) and its description */
  photo: string;
  photoAlt: string;
}

export const solutions: Solution[] = [
  {
    slug: 'hospital-project-consultancy',
    num: '01',
    title: 'Hospital Project Consultancy',
    short: 'Consultancy',
    icon: 'consult',
    metaTitle: 'Hospital Project Consultancy, Planning & DPR',
    metaDescription:
      'Hospital project consultancy: feasibility, hospital and department planning, DPR preparation, budget estimation, equipment planning and licence roadmaps.',
    summary: 'Feasibility, planning and DPR work that sets the footprint before a single line is drawn.',
    intro: [
      'Every successful healthcare facility starts with a clear brief. MedInfra’s consultancy team turns a promoter’s or institution’s intent into a defensible project definition — feasibility, departmental planning, space programme, budget framework and the licence roadmap that governs the schedule.',
      'Because the same organisation goes on to engineer, equip and commission the facility, consultancy outputs are written to be built from — not filed away. Department plans, equipment lists and DPR cost sheets carry straight through to design and procurement.',
    ],
    scope: [
      'Feasibility studies', 'Hospital planning', 'Department planning', 'Space planning', 'DPR preparation',
      'Budget estimation', 'Equipment planning', 'Licence roadmap', 'Vendor selection', 'Project management consultancy',
    ],
    stages: ['01', '02'],
    related: ['healthcare-project-management', 'biomedical-engineering-equipment', 'government-healthcare-projects'],
    photo: '1503387762-592deb58ef4e',
    photoAlt: 'Architect drafting hospital building plans',
  },
  {
    slug: 'modular-ot-icu',
    num: '02',
    title: 'Modular OT & ICU Solutions',
    short: 'Modular OT & ICU',
    icon: 'ot',
    metaTitle: 'Modular Operation Theatre & ICU Solutions',
    metaDescription:
      'Modular operation theatres, ICUs and clean rooms — wall and ceiling systems, HVAC, lighting, electrical and medical gas integration, testing and commissioning.',
    summary: 'Modular operation theatres, ICUs and clean rooms engineered as one coordinated system.',
    intro: [
      'An operation theatre or ICU is where architecture, air, power, gases and clinical equipment meet in the smallest possible space. MedInfra delivers modular OT and ICU infrastructure as a single engineered package — envelope, HVAC, lighting, electrical and medical gas integration coordinated from the first drawing.',
      'Modular wall and ceiling systems with flush, sealed surfaces support cleanability and particle control, while air-change rates, pressure cascade and illumination are designed together rather than by separate trades. Each room is tested, validated and documented before handover.',
    ],
    scope: [
      'Modular operation theatres', 'ICU infrastructure', 'Clean rooms', 'Wall & ceiling systems', 'HVAC coordination',
      'Lighting', 'Electrical integration', 'Medical gas integration', 'Flooring', 'Testing & commissioning',
    ],
    stages: ['03', '06', '07'],
    related: ['medical-gas-pipeline-systems', 'hospital-engineering-utilities', 'biomedical-engineering-equipment'],
    photo: '1516549655169-df83a0774514',
    photoAlt: 'Modern operation theatre with surgical table, lights and equipment',
  },
  {
    slug: 'medical-gas-pipeline-systems',
    num: '03',
    title: 'Medical Gas Pipeline Systems — MGPS',
    short: 'MGPS',
    icon: 'mgps',
    metaTitle: 'Medical Gas Pipeline Systems (MGPS)',
    metaDescription:
      'MGPS design, installation and maintenance: medical oxygen, vacuum and medical air, gas manifolds, bed-head units, alarm systems, testing and commissioning.',
    summary: 'Medical oxygen, vacuum and medical air — from source plant to bed-head outlet.',
    intro: [
      'Medical gases are life-critical utilities. MedInfra designs, installs and maintains complete medical gas pipeline systems — source equipment and manifolds, distribution pipework, zone valves, alarm systems and bed-head units — sized for current demand and for the risers a facility will need tomorrow.',
      'Every installation is pressure-tested, purity-tested and checked for cross-connection before commissioning, and supported afterwards through preventive maintenance.',
    ],
    scope: [
      'Medical oxygen systems', 'Vacuum systems', 'Medical air', 'Gas manifolds', 'Bed-head units',
      'Pipeline installation', 'Alarm systems', 'Testing', 'Commissioning', 'Preventive maintenance',
    ],
    stages: ['03', '06', '07', '08'],
    related: ['modular-ot-icu', 'hospital-engineering-utilities', 'amc-maintenance'],
    photo: '1766299892693-2370a8d47e23',
    photoAlt: 'Medical gas outlets on a hospital wall',
  },
  {
    slug: 'biomedical-engineering-equipment',
    num: '04',
    title: 'Biomedical Engineering & Equipment',
    short: 'Biomedical Equipment',
    icon: 'bme',
    metaTitle: 'Biomedical Equipment Planning & Supply',
    metaDescription:
      'Biomedical equipment planning, BOQs and vendor-neutral specifications, procurement, supply, installation, calibration, validation and lifecycle management.',
    summary: 'Equipment planning, vendor-neutral specifications, supply, calibration and validation.',
    intro: [
      'Medical equipment is often the largest single line in a healthcare budget — and the one most exposed to poor specification. MedInfra’s biomedical engineers plan equipment by department, prepare BOQs and technical specifications, and run vendor evaluation focused on project requirements.',
      'From supply and installation supervision through testing, calibration and validation, the team stays accountable for each device until it is in clinical use — and then supports it across its working life.',
    ],
    scope: [
      'Equipment planning', 'Equipment BOQ', 'Technical specifications', 'Vendor evaluation', 'Procurement support',
      'Medical equipment supply', 'Installation supervision', 'Testing', 'Calibration', 'Validation', 'Lifecycle management',
    ],
    stages: ['04', '05', '07', '08'],
    related: ['hospital-project-consultancy', 'amc-maintenance', 'cssd-clinical-infrastructure'],
    photo: '1513224502586-d1e602410265',
    photoAlt: 'Patient monitor displaying vital signs',
  },
  {
    slug: 'cssd-clinical-infrastructure',
    num: '05',
    title: 'CSSD & Clinical Infrastructure',
    short: 'CSSD',
    icon: 'cssd',
    metaTitle: 'CSSD Planning & Clinical Infrastructure',
    metaDescription:
      'CSSD planning and sterilisation systems, workflow and equipment integration, clinical utility planning, nurse-call and pneumatic tube systems for hospitals.',
    summary: 'Sterile services and the clinical systems that keep a hospital moving.',
    intro: [
      'A Central Sterile Services Department only works when its workflow, equipment and utilities are planned together. MedInfra plans CSSDs around a clean, one-directional flow and integrates sterilisation equipment with the services it depends on.',
      'The same team plans the clinical infrastructure that connects wards and departments — nurse-call systems, pneumatic tube systems and clinical utilities — so they are coordinated with the building rather than added afterwards.',
    ],
    scope: [
      'CSSD planning', 'Sterilisation systems', 'Workflow planning', 'Equipment integration',
      'Clinical utility planning', 'Nurse-call systems', 'Pneumatic tube systems',
    ],
    stages: ['02', '04', '06'],
    related: ['biomedical-engineering-equipment', 'hospital-engineering-utilities', 'modular-ot-icu'],
    photo: '1688565631957-0306970fdd74',
    photoAlt: 'Tray of sterile surgical instruments',
  },
  {
    slug: 'hospital-engineering-utilities',
    num: '06',
    title: 'Hospital Engineering & Utilities',
    short: 'Engineering & Utilities',
    icon: 'utility',
    metaTitle: 'Hospital HVAC, Electrical & Utility Engineering',
    metaDescription:
      'Hospital utility engineering: HVAC, electrical systems, DG and UPS backup, STP, WTP, RO systems and solar — planned and implemented for continuous operation.',
    summary: 'HVAC, power, water and backup systems designed for continuous clinical operation.',
    intro: [
      'Hospitals never switch off. MedInfra plans and implements the engineering utilities that keep a facility running around the clock — HVAC, electrical distribution, standby generation and UPS, water treatment, RO, sewage treatment and solar.',
      'Utilities are designed alongside clinical planning, so capacities, redundancy and service routes match the departments they support — and leave room for expansion.',
    ],
    scope: [
      'HVAC', 'Electrical systems', 'STP', 'WTP', 'RO systems', 'Solar', 'DG systems', 'UPS',
      'Hospital utility planning & implementation',
    ],
    stages: ['03', '06', '07'],
    related: ['modular-ot-icu', 'medical-gas-pipeline-systems', 'healthcare-project-management'],
    photo: '1563456020159-b74d67e78c26',
    photoAlt: 'Mechanical plant room with piping and valves',
  },
  {
    slug: 'healthcare-project-management',
    num: '07',
    title: 'Healthcare Project Management',
    short: 'Project Management',
    icon: 'pm',
    metaTitle: 'Healthcare Project Management Services',
    metaDescription:
      'Healthcare project management: planning, BOQs, vendor and procurement management, site supervision, QA, cost and schedule control through commissioning.',
    summary: 'One programme, one team controlling cost, schedule and quality to handover.',
    intro: [
      'Healthcare projects bring together architects, engineers, OEMs and contractors whose work must interlock precisely. MedInfra manages that interface — planning the programme, preparing BOQs, coordinating vendors and procurement, and supervising site work against a single schedule.',
      'Quality assurance, cost monitoring and schedule monitoring run continuously through installation, testing and commissioning, with one point of accountability for the client.',
    ],
    scope: [
      'Project planning', 'BOQ preparation', 'Vendor coordination', 'Procurement management', 'Site supervision',
      'Quality assurance', 'Cost monitoring', 'Schedule monitoring', 'Installation coordination', 'Testing & commissioning',
    ],
    stages: ['05', '06', '07'],
    related: ['hospital-project-consultancy', 'government-healthcare-projects', 'hospital-engineering-utilities'],
    photo: '1774600166818-e554a4d4c376',
    photoAlt: 'Engineers in hard hats reviewing project plans',
  },
  {
    slug: 'amc-maintenance',
    num: '08',
    title: 'AMC & Maintenance',
    short: 'AMC & Maintenance',
    icon: 'amc',
    metaTitle: 'Biomedical Equipment AMC & Hospital Maintenance',
    metaDescription:
      'Biomedical equipment AMC, preventive maintenance, breakdown support, MGPS and OT maintenance, calibration, validation and compliance documentation.',
    summary: 'Preventive maintenance, calibration and compliance for the life of the facility.',
    intro: [
      'Commissioning is the start of a facility’s working life, not the end of the project. MedInfra’s AMC and maintenance services keep biomedical equipment, medical gas systems and operation theatres performing to specification.',
      'Planned preventive maintenance, responsive breakdown support, periodic calibration and validation, and up-to-date compliance documentation are delivered under one contract.',
    ],
    scope: [
      'Biomedical equipment AMC', 'Preventive maintenance', 'Breakdown support', 'MGPS maintenance',
      'OT maintenance', 'Calibration', 'Validation', 'Compliance documentation',
    ],
    stages: ['08'],
    related: ['biomedical-engineering-equipment', 'medical-gas-pipeline-systems', 'modular-ot-icu'],
    photo: '1581092919535-7146ff1a590b',
    photoAlt: 'Technician servicing an electrical panel',
  },
  {
    slug: 'government-healthcare-projects',
    num: '09',
    title: 'Government Healthcare Projects',
    short: 'Government Projects',
    icon: 'gov',
    metaTitle: 'Government Healthcare Projects, DPR & GeM',
    metaDescription:
      'Government healthcare projects: DPR preparation, tender support, GeM supply, technical evaluation, medical college upgrades and district hospital modernisation.',
    summary: 'DPRs, tenders, GeM supply and implementation for public health infrastructure.',
    intro: [
      'Public healthcare projects are governed by tenders, technical evaluation and compliance documentation as much as by engineering. MedInfra prepares DPRs, supports tender processes, supplies through GeM and implements healthcare infrastructure for government institutions.',
      'From medical college upgrades to district hospital modernisation, the same engineering standards apply — with the documentation and approval routes each public project demands.',
    ],
    scope: [
      'DPR preparation', 'Government tender support', 'GeM supply', 'Technical evaluation',
      'Healthcare infrastructure implementation', 'Medical college upgrades', 'District hospital modernisation',
      'Public healthcare infrastructure projects',
    ],
    stages: ['01', '05', '06'],
    related: ['hospital-project-consultancy', 'healthcare-project-management', 'biomedical-engineering-equipment'],
    photo: '1573167507387-6b4b98cb7c13',
    photoAlt: 'Project team meeting around a conference table',
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);

/** Unsplash CDN URL for a solution photo, cropped to the given box */
export const photoUrl = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

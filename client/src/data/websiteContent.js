/**
 * Swadeshi Innovators — Weave Kiran Content Data Store
 * All website data is centralized here for easy editing, configuration, and maintenance.
 * Competition: Sanrachna IQTSX 2026
 */

export const BRAND_CONFIG = {
  teamName: 'Swadeshi Innovators',
  teamTagline: 'Innovate • Build • For a Self-Reliant Bharat',
  productName: 'Weave Kiran',
  productSubtitle: 'AI-Powered Fabric Defect Detector',
  competition: 'Sanrachna IQTSX 2026',
  primaryHeadline: {
    start: 'AI for ',
    saffronHighlight: 'Cleaner Fabrics',
    middle: '. A ',
    greenHighlight: 'Stronger Bharat',
    end: '.',
  },
  supportingTagline: 'Detect Defects. Reduce Waste. Build a Sustainable Textile Future.',
  heroDescription:
    'Weave Kiran is an AI-powered fabric inspection prototype developed by Swadeshi Innovators to identify visible fabric defects using computer vision, helping make textile quality inspection more accessible and resource-efficient.',
  heroBadges: [
    'Affordable Innovation',
    'Smart Inspection',
    'Sustainable Textiles',
  ],
  contactEmail: 'contact@swadeshiinnovators.tech',
  competitionVenue: 'Sanrachna IQTSX 2026 Innovation Showcase',
};

// Video Configuration Hook: Replace videoUrl with YouTube/Vimeo embed or MP4 when available
export const DEMO_VIDEO_CONFIG = {
  title: 'Weave Kiran Prototype Demonstration',
  caption: 'Watch the live benchtop prototype scan a 1-meter woven fabric sample under computer vision inspection.',
  videoUrl: '', // e.g., 'https://www.youtube.com/embed/dQw4w9WgXcQ' or local video file
  placeholderPoster: '/assets/image.png',
  durationText: '03:42 Demo',
  available: false, // Set to true once a real video URL or asset is linked
  note: 'Prototype recorded testing at our innovation workbench. Live interactive simulation is also playable below.',
};

export const NAV_LINKS = [
  { id: 'top', label: 'Home' },
  { id: 'initiative', label: 'Our Initiative' },
  { id: 'problem', label: 'The Problem' },
  { id: 'product', label: 'Weave Kiran' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'resources', label: 'Built with Limited Resources' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'demo', label: 'Live Demo' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

export const VALUE_PROPOSITIONS = [
  {
    id: 'accessible',
    title: 'Accessible Textile Technology',
    description:
      'Engineered to empower small-scale powerloom cooperatives and decentralized handloom clusters with intelligent visual quality assistance that does not require specialized industrial engineers to operate.',
    icon: 'Layers',
    tag: 'Empowering MSMEs',
  },
  {
    id: 'affordable',
    title: 'Affordable Innovation',
    description:
      'Eliminating the cost barrier of multi-lakh automated optical inspection systems by using accessible USB optics, standard computing hardware, and edge-optimized open-source AI algorithms.',
    icon: 'Cpu',
    tag: 'Frugal Engineering',
  },
  {
    id: 'sustainable',
    title: 'Sustainable Manufacturing',
    description:
      'Preventing flawed yardage from proceeding to downstream cutting, dyeing, and garment assembly where defect correction becomes environmentally costly and material waste spikes.',
    icon: 'Leaf',
    tag: 'Resource Conservation',
  },
];

export const PROBLEM_CARDS = [
  {
    id: 'time',
    title: 'Time-Consuming Manual Inspection',
    description:
      'Human inspectors review rolling fabric for hours at a time. The continuous visual motion causes severe ocular fatigue, leading to reduced concentration and slower processing speeds.',
    icon: 'Clock',
    impact: 'Operator fatigue & inspection bottlenecks',
  },
  {
    id: 'overlooked',
    title: 'Overlooked Subtle Defects',
    description:
      'Fine yarn defects such as slub misalignments, tension variations, and small oil droplet stains can easily go undetected by the human eye under variable shopfloor lighting.',
    icon: 'EyeOff',
    impact: 'Defective yardage slips to garment cutting',
  },
  {
    id: 'inconsistent',
    title: 'Inconsistent Quality Grading',
    description:
      'Quality evaluation across shifts and individual inspectors often varies significantly, resulting in inconsistent defect scoring, customer disputes, and unexpected batch rejections.',
    icon: 'Sliders',
    impact: 'Lack of repeatable digital quality records',
  },
  {
    id: 'cost-barrier',
    title: 'Prohibitive Industrial System Costs',
    description:
      'Imported industrial automated optical inspection (AOI) machines often cost tens of thousands of dollars, making them unattainable for Indian handloom weavers and micro-enterprises.',
    icon: 'AlertTriangle',
    impact: 'Small enterprises left without automation',
  },
];

export const DEFECT_CATEGORIES = [
  {
    id: 'stain',
    name: 'Stain Defect',
    category: 'Surface Contamination',
    description:
      'Oil droplets, dye splatters, machine grease, or water marks that discolor fabric surfaces during spinning, weaving, or handling.',
    typicalConfidence: '92% - 97%',
    severity: 'High (Immediate rejection or cleaning)',
    color: '#E85D04',
    badgeClass: 'badge-stain',
    image: '/assets/fabric_defect_detection.jpg',
    visualDetail: 'Discolored zone localized with precise bounding box coordinates.',
  },
  {
    id: 'hole',
    name: 'Hole & Tear',
    category: 'Structural Damage',
    description:
      'Mechanical punctures, snagged weft threads, or needle tears that disrupt structural integrity and cause fabric fraying.',
    typicalConfidence: '89% - 95%',
    severity: 'Critical (Flawed section marked for excision)',
    color: '#DC2626',
    badgeClass: 'badge-hole',
    image: '/assets/defect_hole.jpg',
    visualDetail: 'Void perimeter tracked to prevent downstream tearing.',
  },
  {
    id: 'thread-error',
    name: 'Thread / Slub Error',
    category: 'Weaving Inconsistency',
    description:
      'Yarn tension anomalies, broken warp threads, uneven yarn thickness (slub), or missed picks creating visual banding across the weave.',
    typicalConfidence: '86% - 93%',
    severity: 'Medium (Grading downgrade or operator alert)',
    color: '#2563EB',
    badgeClass: 'badge-thread',
    image: '/assets/fabric_defect_detection.jpg',
    visualDetail: 'Linear thread misalignment highlighted along weave direction.',
  },
  {
    id: 'normal',
    name: 'Normal Fabric',
    category: 'Baseline Quality',
    description:
      'Consistent warp and weft weave density with uniform yarn thickness and surface integrity meeting inspection criteria.',
    typicalConfidence: '96% - 99%',
    severity: 'Pass (Approved for packaging or processing)',
    color: '#167344',
    badgeClass: 'badge-normal',
    image: '/assets/fabric_defect_detection.jpg',
    visualDetail: 'Uniform interlacing verified across inspected field-of-view.',
  },
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Capture',
    subtitle: 'Sample Image Acquisition',
    description:
      'A standard high-definition USB camera mounted at a fixed focal distance captures high-resolution imagery of the 1-meter fabric sample under diffused, uniform LED lighting.',
    icon: 'Camera',
    technicalNote: '1080p feed • 30 FPS acquisition • Fixed focal plane',
  },
  {
    step: '02',
    title: 'Analyze',
    subtitle: 'Vision Pipeline Preprocessing',
    description:
      'OpenCV-based algorithms normalize color channels, adjust ambient contrast, and extract Region of Interest (ROI) tiles to prepare raw frames for neural network inference.',
    icon: 'Cpu',
    technicalNote: 'Contrast balancing • Noise reduction • ROI tiling',
  },
  {
    step: '03',
    title: 'Detect',
    subtitle: 'Edge Neural Inference',
    description:
      'A lightweight YOLO-based computer vision model inspects the tiles, identifying supported defect categories (stains, holes, yarn slubs) and calculating confidence probabilities.',
    icon: 'Scan',
    technicalNote: 'YOLO architecture • Multi-label bounding box localization',
  },
  {
    step: '04',
    title: 'Review',
    subtitle: 'Inspection Dashboard & Log',
    description:
      'The inspection interface displays the annotated camera stream with labeled bounding boxes, confidence metrics, quality scoring, and a real-time audit log for the operator.',
    icon: 'LayoutDashboard',
    technicalNote: 'Visual bounding overlays • Confidence readouts • Audit logging',
  },
];

export const HARDWARE_COMPONENTS = [
  {
    name: 'Laptop / PC (HP Core i-Series)',
    status: 'Implemented',
    category: 'Computing Host',
    purpose:
      'Hosts the local FABRIC AI inspection web dashboard and executes real-time computer vision defect classification without cloud dependencies.',
    icon: 'Laptop',
  },
  {
    name: 'Overhead USB Camera',
    status: 'Implemented',
    category: 'Optical Sensor',
    purpose:
      'Captures continuous high-definition optical frames directly above the fabric roller bed, providing affordable surface anomaly inspection.',
    icon: 'Camera',
  },
  {
    name: 'Arduino Uno & L298N Driver',
    status: 'Implemented',
    category: 'Microcontroller & Motor Control',
    purpose:
      'Coordinates the motorized fabric roller conveyor speed, sensor signals, and automated stop/alert triggers upon defect identification.',
    icon: 'Cpu',
  },
  {
    name: 'Ultrasonic Sensor (HC-SR04) & Servo',
    status: 'Implemented',
    category: 'Telemetry & Alignment',
    purpose:
      'Monitors fabric roll tension, feed distance, and positioning over the inspection bed to detect feeding anomalies.',
    icon: 'Eye',
  },
  {
    name: 'OpenCV & YOLO Vision Pipeline',
    status: 'Implemented',
    category: 'Computer Vision & AI',
    purpose:
      'Performs real-time frame acquisition, contrast normalization, multi-class bounding box localization, and defect confidence scoring.',
    icon: 'Network',
  },
  {
    name: 'Python Ecosystem & Web APIs',
    status: 'Implemented',
    category: 'Core Runtime',
    purpose:
      'Powers the backend inspection engine, defect logging pipeline, and local REST/WebSocket communication with the user dashboard.',
    icon: 'Terminal',
  },
  {
    name: 'Inclined Roller Fabric Conveyor Rig',
    status: 'Implemented',
    category: 'Mechanical Testbed',
    purpose:
      'Custom fabricated testbed with dual rolling cylinders that feed fabric smoothly under the optical sensor and overhead illumination.',
    icon: 'Wrench',
  },
  {
    name: 'Focused Overhead LED Spotlight',
    status: 'Implemented',
    category: 'Illumination',
    purpose:
      'Provides consistent, calibrated illumination directly over the fabric inspection zone to highlight stains and structural yarn defects.',
    icon: 'Sun',
  },
];

export const SUSTAINABILITY_PILLARS = [
  {
    title: 'Earlier Defect Identification',
    description:
      'Spotting yarn irregularities and stains at the raw fabric stage prevents defective yardage from advancing into cutting and finishing operations.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Avoidable Waste Reduction',
    description:
      'Cutting off flaws before garment construction saves the substantial water, chemical dyes, and energy required to manufacture garments that would otherwise be discarded.',
    icon: 'Recycle',
  },
  {
    title: 'Support for MSME Clusters',
    description:
      'Democratizes quality assurance for regional weaving centers like Surat, Tiruppur, Ludhiana, and Varanasi, helping small units avoid costly batch rejections.',
    icon: 'Building2',
  },
  {
    title: 'Resource-Conscious Production',
    description:
      'Encourages more sustainable, zero-waste textile practices aligned with circular economy principles and self-reliant Indian manufacturing.',
    icon: 'Sprout',
  },
];

export const SAMPLE_SIMULATIONS = [
  {
    id: 'sample-1',
    name: 'Khadi Cotton — Sample A',
    fabricType: 'Natural Handspun Cotton (1 Meter)',
    status: 'Defects Identified',
    grade: 'Grade B (Rework Needed)',
    overallConfidence: '93.2%',
    defects: [
      { type: 'Stain', confidence: 0.94, x: 20, y: 35, width: 14, height: 28, color: '#E85D04' },
      { type: 'Thread Error', confidence: 0.88, x: 42, y: 28, width: 16, height: 42, color: '#2563EB' },
    ],
    summary: 'Localized grease stain on left warp; slub thread irregularity in center weave.',
    image: '/assets/fabric_defect_detection.jpg',
  },
  {
    id: 'sample-2',
    name: 'Linen Twill — Sample B',
    fabricType: 'Bleached Linen (1 Meter)',
    status: 'Critical Flaw Found',
    grade: 'Grade C (Segment Cut Required)',
    overallConfidence: '91.8%',
    defects: [
      { type: 'Hole', confidence: 0.92, x: 38, y: 25, width: 24, height: 45, color: '#DC2626' },
    ],
    summary: 'Mechanical puncture hole detected; fabric structural integrity compromised.',
    image: '/assets/defect_hole.jpg',
  },
  {
    id: 'sample-3',
    name: 'Organic Cotton — Sample C',
    fabricType: 'Woven Organic Shirting (1 Meter)',
    status: 'Clean Inspection Pass',
    grade: 'Grade A (Export Ready)',
    overallConfidence: '98.5%',
    defects: [
      { type: 'Clean Weave', confidence: 0.98, x: 65, y: 18, width: 30, height: 60, color: '#167344' },
    ],
    summary: 'No visible surface defects; uniform warp and weft density verified.',
    image: '/assets/fabric_defect_detection.jpg',
  },
];

export const TEAM_MEMBERS = [
  {
    name: 'Kartik Agarwal',
    role: 'Team Leader',
    contribution:
      'Led all software development — integrated YOLOv8s for real-time defect detection, trained the fabric defect dataset, built the interactive React dashboard, and developed the FastAPI backend with OpenCV, MongoDB, and Docker.',
    skills: ['Python', 'YOLOv8s', 'OpenCV', 'FastAPI', 'React', 'TailwindCSS', 'MongoDB', 'Docker'],
    initials: 'KA',
  },
  {
    name: 'Ajay Kumar Tamboli',
    role: 'Hardware Engineer',
    contribution:
      'Designed and built the entire physical prototype from scratch — wired the Arduino Uno microcontroller, L298N motor driver, ultrasonic sensors, batteries, and motorized conveyor bed to create the inspection rig.',
    skills: ['Arduino Uno', 'L298N Motor Driver', 'HC-SR04 Ultrasonic', 'Circuit Design', 'Mechanical Fabrication'],
    initials: 'AT',
  },
  {
    name: 'Raghvendra Pandey',
    role: 'Team Presenter',
    contribution:
      'Serves as the primary communicator and spokesperson for Swadeshi Innovators, presenting Weave Kiran to judges, industry professionals, and audiences at Sanrachna IQTSX 2026.',
    skills: ['Public Speaking', 'Project Presentation', 'Communication', 'Stakeholder Engagement'],
    initials: 'RP',
  },
];


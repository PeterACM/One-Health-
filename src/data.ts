/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Testimonial, Partner, ImpactStat, TeamMember } from "./types";

export const PROJECT_LIST: Project[] = [
  {
    id: "keepers",
    title: "ToothKeepers",
    category: "Children & Oral Health",
    tag: "Children",
    shortDesc: "Bringing dental education and free treatment to children in township schools, shelters, and orphanages.",
    longDesc: "Many children in South Africa have never visited a dentist. Tooth decay causes severe pain, missed school days, and long-term systemic health consequences — all of which are entirely preventable. ToothKeepers deploys mobile dental units directly to schools, orphanages, and shelters to perform cleanings, fillings, extractions, and critical preventative hygiene workshops.",
    stats: [
      { label: "Children Treated", value: "2,400+" },
      { label: "Schools Visited", value: "34" },
      { label: "Hygiene Kits Distributed", value: "5,000+" }
    ],
    impactGoal: "Provide free annual dental screens and treatments to over 5,000 kids in under-resourced schools by 2027.",
    iconName: "Smile"
  },
  {
    id: "drivewell",
    title: "DriveWell",
    category: "Community Safety",
    tag: "Road Safety",
    shortDesc: "Road safety education and training designed to reduce pedestrian injuries and save township lives.",
    longDesc: "Road traffic accidents pose a disproportionate risk in rural and township areas where pedestrian infrastructure is scarce. DriveWell focuses on community-centred safety education, reflector vest drives for evening commuters, road crossing safety training at primary schools, and roadside first-aid workshops for local taxi and transport operators.",
    stats: [
      { label: "Safety Seminars Held", value: "85+" },
      { label: "Reflector Vests Distributed", value: "3,200+" },
      { label: "Schools Engaged", value: "18" }
    ],
    impactGoal: "Reduce preventable pedestrian incidents in key high-risk corridors by 30% through defensive advocacy and visibility campaigns.",
    iconName: "ShieldAlert"
  },
  {
    id: "maternal",
    title: "Maternal & Child Health",
    category: "Family Medicine",
    tag: "Maternal",
    shortDesc: "Pre- and post-natal support, education, and nutrition programmes for township mothers and newborns.",
    longDesc: "Infant and maternal mortality rates remain high in underserved areas due to delayed antenatal care and lack of baseline support. This programme provides crucial healthcare counseling, essential vitamins, baby starter packs ('baby boxes' filled with diapers, clothes, and warm blankets), breastfeeding education, and follow-up clinical tracking during the critical first 1,000 days of life.",
    stats: [
      { label: "Mothers Supported", value: "850+" },
      { label: "Healthy Births Logged", value: "98%" },
      { label: "Baby Boxes Gifted", value: "600+" }
    ],
    impactGoal: "Establish 3 localized prenatal clinic support hubs that link expectant mothers directly to transport and professional care.",
    iconName: "HeartPulse"
  },
  {
    id: "zimbabwe",
    title: "Africa Mission",
    category: "Cross-Border Outreach",
    tag: "Africa",
    shortDesc: "Comprehensive cross-border dental, surgical, medical, and gospel outreach in rural communities across Africa.",
    longDesc: "Our annual international outreach goes deep into rural, isolated districts across Africa where medical facilities are practically non-existent. A voluntary force of dentists, doctors, surgeons, and spiritual counselors establishes a intensive pop-up hospital for two weeks, offering life-altering general surgery, heavy dental work, eyesight checks, and primary clinical consults.",
    stats: [
      { label: "Rural Consultation Days", value: "14" },
      { label: "Surgeries Performed", value: "320+" },
      { label: "Spiritual Dialogues", value: "1,500+" }
    ],
    impactGoal: "Secure long-term supply pipelines to keep our partner clinics across Africa stocked with surgical consumables and solar-powered lights.",
    iconName: "Globe"
  },
  {
    id: "dental_outreach",
    title: "Dental Outreach",
    category: "Specialized Care",
    tag: "Dental Outreach",
    shortDesc: "Mobile clinics offering emergency treatments, restorative work, and extractions to remote households.",
    longDesc: "Beyond the school gates, One Health is dedicated to alleviating acute toothache and severe infections for the broader public. Our specialized custom-built dental vans are fully rigged for infection control and minor oral surgeries, traveling into rural communities on bi-weekly loops to provide professional treatments free of charge.",
    stats: [
      { label: "Adult Patients Relieved", value: "4,100+" },
      { label: "Bi-weekly Field Trips", value: "48 / yr" },
      { label: "Vans Operational", value: "2" }
    ],
    impactGoal: "Expand our mobile fleet with a third dental vehicle to service the deep coastal villages of the Eastern Cape.",
    iconName: "Activity"
  },
  {
    id: "pollution",
    title: "Pollution & Recycling",
    category: "Creation Care",
    tag: "Planet",
    shortDesc: "Eco-stewardship initiatives clean toxic plastic blocks and integrate sorting stations in schools.",
    longDesc: "True environmental health is fundamentally linked to human health. Littering, plastic burning, and unmanaged trash heaps trigger environmental toxicity and respiratory ailments in township children. Our creation-care team sets up municipal recycling co-ops, implements eco-clubs at local high schools, and hosts major community cleanup days under a message of Earth stewardship.",
    stats: [
      { label: "Waste Diverted (tons)", value: "42" },
      { label: "Sorting Hubs Spawned", value: "8" },
      { label: "Community Cleanups", value: "24" }
    ],
    impactGoal: "Recycle and extract over 100 tons of plastic waste annually while generating income streams for 15 local youth waste collectors.",
    iconName: "Leaf"
  },
  {
    id: "agri",
    title: "Agricultural Skills Development",
    category: "Food Sovereignty",
    tag: "Food Security",
    shortDesc: "Sustainable crop-growing and farming workshops ensuring solid food lines and self-sustenance.",
    longDesc: "We combat community malnutrition and severe stunting at its root by teaching sustainable farming practices. Through deep-composting, vertical wall gardens, organic pest control, and rainwater collection techniques, families learn to establish highly productive vegetable patches in tiny backyards, restoring connection with the land.",
    stats: [
      { label: "Home Gardens Developed", value: "450+" },
      { label: "Families Self-Sustained", value: "180" },
      { label: "Trainees Certified", value: "95" }
    ],
    impactGoal: "Establish community agro-forestry groves that yield rich seasonal fruits, timber, and shade at 10 local care centres.",
    iconName: "Sprout"
  },
  {
    id: "medical",
    title: "Medical Missions",
    category: "Primary Healthcare",
    tag: "Medical Support",
    shortDesc: "General health screening, chronic illness monitoring, and pharmacy distribution in vulnerable enclaves.",
    longDesc: "For families lacking local primary health clinics or money for taxi fare, health issues compound fast. Our multi-disciplinary clinical outreach teams set up temporary medical wards inside community halls or church facilities. We screen for lifestyle and infectious diseases, perform diagnostic testing, dispense chronic medication, and treat acute infections.",
    stats: [
      { label: "Patients Examined", value: "6,400+" },
      { label: "Prescriptions Filled", value: "3,800+" },
      { label: "Specialist Referrals", value: "210" }
    ],
    impactGoal: "Reduce localized hospital backlogs for common ailments in Durban townships by establishing systematic local follow-up clinics.",
    iconName: "Stethoscope"
  },
  {
    id: "network",
    title: "Professional Health Network",
    category: "Professional Volunteering",
    tag: "Network",
    shortDesc: "An active collective of medical and dental experts volunteering hours for pro-bono restorative care.",
    longDesc: "The Professional Health Network bridges the gap between affluent private medicine and absolute clinical poverty. It enables private dental surgeons, ophthalmologists, cardiologists, and pharmacists to pledge a fraction of their monthly appointment blocks to take patients referred directly from One Health clinic field surveys.",
    stats: [
      { label: "Pledged Clinicians", value: "85+" },
      { label: "Pro-bono Hours Pledged", value: "1,200+" },
      { label: "Major Surgeries Donated", value: "45" }
    ],
    impactGoal: "Enlist 150 accredited healthcare providers into our digital reference registry to support cases nationwide.",
    iconName: "Users"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "The ToothKeepers dental team came to our school and treated 40 children in one day. Some of them had never seen a dentist before in their lives. The children are no longer in agony, and they participate happily in lessons. I cannot thank One Health enough.",
    stars: 5,
    author: "Primary School Teacher",
    role: "Township Primary School, KwaZulu-Natal",
    projectTag: "ToothKeepers"
  },
  {
    id: "2",
    quote: "Volunteering on the Africa Mission was one of the most defining experiences of my career. The raw necessity and pure gratitude of the rural villagers was overwhelmingly humbling. One Health structured the logistics safely, letting us focus on deep healthcare.",
    stars: 5,
    author: "Dr. Martha Nkosi",
    role: "Volunteer Dentist & Oral Surgeon",
    projectTag: "Africa Mission"
  },
  {
    id: "3",
    quote: "Partnering with One Health through CityHill has allowed our congregation to step beyond the church walls and serve. We see the gospel in action when mothers receive food, when orphans receive care, and when spiritual encouragement is shared alongside healthcare.",
    stars: 5,
    author: "Pastor Thabo Cele",
    role: "CityHill Missions Coordinator",
    projectTag: "General Ministries"
  },
  {
    id: "4",
    quote: "My little girl had been crying from tooth nerve pain for three solid months. We could not afford transport to the hospital, let alone treatment. When One Health's mobile clinic visited our township, they treated her for free. She can smile again.",
    stars: 5,
    author: "Lindiwe Dlamini",
    role: "Mother & Local Resident, Durban Township",
    projectTag: "Dental Outreach"
  },
  {
    id: "5",
    quote: "The agricultural skills development was a lifeline for our community center. Before, we paid high prices for spinach and onions. Now, we harvest sweet potatoes, kale, and beets straight from our garden. Our orphans eat organic, nutritious food every single day.",
    stars: 5,
    author: "Sipho Khumalo",
    role: "Director of Philakade Care Home",
    projectTag: "Agricultural Development"
  }
];

export const PARTNERS: Partner[] = [
  { name: "Forward Durban", logoText: "FD", type: "Civic Coalition" },
  { name: "Nation Changers", logoText: "NC", type: "Community Empowerment" },
  { name: "ACFF", logoText: "AF", type: "Global Health Non-Profit" },
  { name: "CityHill Missions", logoText: "CH", type: "Faith Partner" },
  { name: "African Christian Fellowship", logoText: "AC", type: "Network Union" },
  { name: "Lily of the Valley", logoText: "LV", type: "Orphanage Care" },
  { name: "iKhethelo", logoText: "IK", type: "Children's Home" },
  { name: "Philakade Care Home", logoText: "PC", type: "Residential Support" },
  { name: "The Ark", logoText: "TA", type: "Homeless Shelter & Rescue" }
];

export const TEAM: TeamMember[] = [
  {
    name: "Lesley Naidoo",
    role: "Founder & Executive Director (Team Leader)",
    bio: "Experienced healthcare executive and director with a distinguished track record in the dental and broader healthcare sectors. Demonstrates a strong foundation in clinical dentistry alongside extensive expertise in strategic leadership, policy development, and team empowerment.\n\nProfessionally grounded with a Primary Degree in Dental Therapy (UDW), Higher Diploma in Public Administration (Oxbridge), complemented by: Master of Business Administration (MBA), Master of Medical Science in Dentistry (UKZN), and a Master of Public Health (University of the Western Cape). Recently completed a Bachelor of Theology and Counselling degree (2020–2025, SATS) and pursuing a PhD in Public Health Research (UKZN).\n\nRenowned for advancing national and continental health agendas through collaborative policy development, including direct involvement in the Presidential Health Summit (2019–2023) and shaping the pillars of Universal Healthcare - the National Health Insurance (NHI). Committed to primary healthcare transformation, disease burden reduction, and equitable access to care across South Africa, Africa, and the global health community. Passionate about cross-sector leadership, public health innovation, and aligning healthcare systems with the evolving needs of society within the Fourth Industrial Revolution."
  },
  {
    name: "Ocean Naidoo",
    role: "Clinical Neurophysiologist & Diagnostics Lead",
    bio: "Rotations between Private and Public Academic institutions (The Bloemfontein Sleep Laboratory, Universitas Academic Hospital (Free State), Greys Hospital (Pietermaritzburg), Inkosi Albert Luthuli Hospital (Durban).\n\n4 years worth of clinical neurophysiology procedures performed at The Bloemfontein Sleep Laboratory (qualified to perform Nerve Conduction Studies, Evoked Potentials, Electroencephalography, Polysomnography). Currently working Locum for various Neurophysiologists in South Africa within different modalities. In 2026, Ocean started Neurowave, which currently provides Polysomnography and CPAP titration services to referring doctors."
  },
  {
    name: "Laura Naidoo",
    role: "Cardiovascular Perfusionist & Perfusion Lecturer",
    bio: "Distinguished Cardiovascular Perfusionist, HPCSA Ex-Board Member, PASA Vice Chairperson, and Perfusion Lecturer. Laura is a highly esteemed clinical specialist and academic dedicated to standardizing and advancing cardiovascular perfusion sciences across South Africa and the wider African continent.\n\nAs a former board member of the Health Professions Council of South Africa (HPCSA) and Vice Chairperson of the Perfusion Association of South Africa (PASA), she has been instrumental in shaping professional guidelines, clinical policy, and educational standards. Beyond her key leadership positions, Laura serves as a vital clinical lecturer, training and mentoring the next generation of perfusionists. She is passionate about clinical quality, patient safety during cardiopulmonary bypass procedures, and promoting cutting-edge technologies to enhance surgical outcomes in public and private cardiac centers."
  }
];

export const IMPACT_STATS: ImpactStat[] = [
  {
    num: "9+",
    label: "Active Initiatives",
    description: "Covering human health, soil health, and spiritual restoration."
  },
  {
    num: "15,000+",
    label: "Lives Directly Touched",
    description: "Through dental cures, primary healthcare checks, and training workshops."
  },
  {
    num: "10+",
    label: "Alliance Partners",
    description: "Collaborating on resource sharing, land allocation, and volunteer pools."
  },
  {
    num: "5+",
    label: "Countries Served",
    description: "Active outreach operations across South Africa and other African nations."
  },
  {
    num: "42 Tons",
    label: "Litter Extracted",
    description: "Diverted from toxic township sites through pollution campaigns."
  },
  {
    num: "450+",
    label: "Township Crops Sewn",
    description: "Empowering food self-sustenance at residential orphanages."
  }
];

export const BENEFICIARIES_SUMMARY = {
  intro: "One Health serves the most vulnerable members of society across South Africa and other countries in Africa. We don't just visit; we establish trust, build long-term relationships, and bring holistic resources directly to them.",
  categories: [
    {
      title: "Orphanages & Care Homes",
      desc: "Providing routine dental checks, primary pediatric medication, and agricultural food gardens to children's shelters such as Lily of the Valley and Ikethelo."
    },
    {
      title: "Homeless & Restoration Shelters",
      desc: "Delivering basic clean clothing, emergency dental relief, chronic medicine reviews, and spiritual encouragement to shelters like The Ark."
    },
    {
      title: "Under-Resourced Township Schools",
      desc: "Teaching oral hygiene, distributing protective toothbrushing kits, and conducting defensive road safety simulations via ToothKeepers and DriveWell."
    },
    {
      title: "Isolated Rural Communities",
      desc: "Unlocking advanced pediatric, surgical, and dental capabilities for isolated farming communities in KwaZulu-Natal and other nations in Africa with no health centers."
    }
  ]
};

export const PUBLISHED_REPORTS = [
  {
    title: "Annual Impact Report 2024",
    desc: "A fully comprehensive review of clinical interventions, financial accountability, and our environmental stewardship milestones.",
    size: "4.8 MB",
    date: "Dec 2024"
  },
  {
    title: "ToothKeepers Outcomes Analysis",
    desc: "Clinical outcomes mapping the severe decay decline among 1,200 kids monitored over 18 sequential months.",
    size: "2.1 MB",
    date: "Oct 2024"
  },
  {
    title: "Africa Rural Mission Report",
    desc: "A visual and clinical diary of surgical, spiritual, and dental reliefs delivered to rural communities across Africa.",
    size: "3.5 MB",
    date: "July 2024"
  }
];

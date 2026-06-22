/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const EDITS_FILE_PATH = path.join(process.cwd(), "persistent_edits.json");
const HISTORY_FILE_PATH = path.join(process.cwd(), "persistent_history.json");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API to retrieve database persistent edits of One Health text
  app.get("/api/edits", (req, res) => {
    try {
      if (fs.existsSync(EDITS_FILE_PATH)) {
        const fileContent = fs.readFileSync(EDITS_FILE_PATH, "utf8");
        return res.json(JSON.parse(fileContent));
      }
      res.json({});
    } catch (error) {
      console.error("Error reading persistent edits:", error);
      res.status(500).json({ error: "Failed to read edits" });
    }
  });

  // API to persist master edits of One Health text permanently
  app.post("/api/edits", (req, res) => {
    try {
      const edits = req.body || {};
      fs.writeFileSync(EDITS_FILE_PATH, JSON.stringify(edits, null, 2), "utf8");
      res.json({ success: true });
    } catch (error) {
      console.error("Error writing persistent edits:", error);
      res.status(500).json({ error: "Failed to save edits" });
    }
  });

  // API to retrieve database persistent editing history trail
  app.get("/api/history", (req, res) => {
    try {
      if (fs.existsSync(HISTORY_FILE_PATH)) {
        const fileContent = fs.readFileSync(HISTORY_FILE_PATH, "utf8");
        return res.json(JSON.parse(fileContent));
      }
      res.json([]);
    } catch (error) {
      console.error("Error reading persistent history:", error);
      res.status(500).json({ error: "Failed to read history" });
    }
  });

  // API to persist editing history trail permanently for weeks/months
  app.post("/api/history", (req, res) => {
    try {
      const history = req.body || [];
      fs.writeFileSync(HISTORY_FILE_PATH, JSON.stringify(history, null, 2), "utf8");
      res.json({ success: true });
    } catch (error) {
      console.error("Error writing persistent history:", error);
      res.status(500).json({ error: "Failed to save history" });
    }
  });

  // API Route for AI Chatbot - purely using robust high-fidelity local expert intelligence, perfectly offline and friendly.
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      const response = resolveLocalResponse(message);
      res.json(response);
    } catch (error) {
      console.error("AI chat endpoint root error:", error);
      res.status(500).json({
        text: "I apologize, I've had a minor interruption. Try asking me another question, or check out our interactive category tabs!",
        navigateTo: null
      });
    }
  });

  // High-fidelity local expert answering and navigation engine
  function resolveLocalResponse(message: string): { text: string; navigateTo: string | null; project?: string | null } {
    const query = (message || "").toLowerCase().trim();
    let navigateTo: string | null = null;
    let project: string | null = null;
    let text = "";

    // 1. GREETING / WELCOME & GUIDANCE
    if (query === "" || /^(hello|hi|hey|greetings|howdy|good\s+day|good\s+morning|good\s+afternoon|good\s+evening|info)/.test(query)) {
      text = `👋 **Hello! Welcome to the One Health AI Stewardship Companion.**

I run 100% locally on the One Health directory, meaning I answer questions instantly using verified information from our real website.

Here is how I can help you today:
• **🦷 ToothKeepers & Initiatives**: Ask about mobile clinical dental vans, road safety, maternal aid, agricultural gardens, or medical missions.
• **📊 Operations & Impact**: Ask about our 15,000+ lives touched, 42 tons litter recycled, or Section 18C compliance audits.
• **👥 Our Leadership & Team**: Ask about Lesley Naidoo, Ocean Naidoo, or Laura Naidoo.
• **📍 Coordinates**: Ask where we are located or how to send a referral.

*You can also ask me to navigate! For example, say "take me to projects" or "show gallery" and I will automatically slide you there.*`;
      return { text, navigateTo, project };
    }

    // 1.5 DIRECT EXPLICIT NAVIGATION COMMANDS MATCHING
    if (
      query.includes("take me") || 
      query.includes("go to") || 
      query.includes("open") || 
      query.includes("show") || 
      query.includes("view") || 
      query.includes("switch") || 
      query.includes("navigate") || 
      query.includes("display") || 
      query.includes("slide") ||
      query.includes("visit")
    ) {
      if (query.includes("toothkeeper") || query.includes("dental") || query.includes("teeth") || query.includes("dentist")) {
        return { text: "🦷 Opening the ToothKeepers mobile healthcare clinical timeline in Projects.", navigateTo: "projects", project: "keepers" };
      }
      if (query.includes("drivewell") || query.includes("safety") || query.includes("road") || query.includes("traffic")) {
        return { text: "🛡️ Opening the DriveWell community road safety and reflector vest initiative.", navigateTo: "projects", project: "drivewell" };
      }
      if (query.includes("maternal") || query.includes("mother") || query.includes("baby") || query.includes("infant") || query.includes("pregnant")) {
        return { text: "🤰 Opening the Maternal and Infant post-natal care support details.", navigateTo: "projects", project: "maternal" };
      }
      if (query.includes("zimbabwe") || query.includes("africa") || query.includes("surgical mission")) {
        return { text: "🌍 Opening the cross-border Africa pop-up surgical and theological mission portfolio.", navigateTo: "projects", project: "zimbabwe" };
      }
      if (query.includes("adult dental outreach") || query.includes("outreach clinic")) {
        return { text: "🦷 Opening the adult restorative dental outreach van maps under projects.", navigateTo: "projects", project: "dental_outreach" };
      }
      if (query.includes("pollution") || query.includes("recycle") || query.includes("clean") || query.includes("environmental")) {
        return { text: "♻️ Opening our Creation Care, ecosystem cleanup, and plastic diversion dashboard.", navigateTo: "projects", project: "pollution" };
      }
      if (query.includes("agri") || query.includes("farm") || query.includes("garden") || query.includes("crop") || query.includes("food")) {
        return { text: "🌱 Opening the Agricultural wall and vertical composting garden details.", navigateTo: "projects", project: "agri" };
      }
      if (query.includes("medical mission") || query.includes("primary healthcare")) {
        return { text: "🩺 Opening the Primary Healthcare pop-up field clinics under Projects.", navigateTo: "projects", project: "medical" };
      }
      if (query.includes("volunteer network") || query.includes("private doctors") || query.includes("pro-bono")) {
        return { text: "🤝 Opening the Professional Accredited Clinicians Network in projects.", navigateTo: "projects", project: "network" };
      }
      if (query.includes("project") || query.includes("initiative")) {
        return { text: "🗺️ Taking you to our complete catalog of Active Stewardship Initiatives.", navigateTo: "projects", project: null };
      }
      if (query.includes("about") || query.includes("story") || query.includes("philosoph") || query.includes("team") || query.includes("vision") || query.includes("lesley")) {
        return { text: "ℹ️ Slide request accepted! Welcome to our About section, detailing founder biographies, civic alliances, and our six design dimensions.", navigateTo: "about" };
      }
      if (query.includes("gospel") || query.includes("spiritual") || query.includes("pastor") || query.includes("church") || query.includes("faith")) {
        return { text: "📖 Slide request accepted! Welcome to our Gospel section, illustrating the convergences of theological counseling and clinical healthcare.", navigateTo: "gospel" };
      }
      if (query.includes("beneficiar") || query.includes("testimonial") || query.includes("patient") || query.includes("feedback")) {
        return { text: "💌 Slide request accepted! Here is our community testimonial stream, from primary schools and township residents.", navigateTo: "beneficiaries" };
      }
      if (query.includes("gallery") || query.includes("photo") || query.includes("image") || query.includes("video") || query.includes("reel")) {
        return { text: "📸 Slide request accepted! Opening our Immersive Field Media Gallery highlighting active vans and gardens.", navigateTo: "gallery" };
      }
      if (query.includes("impact") || query.includes("stat") || query.includes("metric") || query.includes("report")) {
        return { text: "📊 Slide request accepted! Opening our verified Impact & compliance statistics, along with digital audit downloads.", navigateTo: "impact" };
      }
      if (query.includes("participate") || query.includes("volunteer form") || query.includes("sponsor") || query.includes("donate") || query.includes("join")) {
        return { text: "👥 Slide request accepted! Opening the Participate options, including direct camp material sponsorships and volunteer logs.", navigateTo: "participate" };
      }
      if (query.includes("contact") || query.includes("address") || query.includes("email") || query.includes("location") || query.includes("send")) {
        return { text: "📍 Slide request accepted! Redirecting you directly to the Contact desk and secure triage referral coordinates.", navigateTo: "contact" };
      }
    }

    // 2. LEADERSHIP / LEADERS / LESLEY / OCEAN / LAURA / FOUNDER / TEAM
    if (query.includes("lesley") || query.includes("ocean") || query.includes("laura") || query.includes("founder") || query.includes("team") || query.includes("who runs") || query.includes("leadership") || query.includes("director") || query.includes("people") || query.includes("member")) {
      navigateTo = "about";
      text = `👥 **One Health Pioneer Leadership & Team**

One Health is directed on the ground by clinical experts dedicated to community empowerment:

• **Dr. Lesley Naidoo** *(Founder & Executive Director / Team Leader)*:
  An experienced healthcare executive with dual clinical and administrative groundings. He holds an MBA, Master of Medical Science in Dentistry (UKZN), Master of Public Health (UWC), and a Bachelor of Theology & Counseling (SATS). He is deeply involved in policy creation (such as South Africa's Presidential Health Summits) and Universal Healthcare (NHI).
  
• **Ocean Naidoo** *(Clinical Neurophysiologist & Diagnostics Lead)*:
  Rotates across Greys and Universitas Academic Hospitals. Founder of **Neurowave** in 2026, delivering Nerve Conduction Studies, sleep disorder diagnostics (Polysomnography), and CPAP care.
  
• **Laura Naidoo** *(Cardiovascular Perfusionist & Perfusion Lecturer)*:
  Former board member of the HPCSA, Vice Chairperson of PASA, and clinical lecturer. Dedicated to elevating cardiopulmonary bypass safety and perfusion training standards across the continent.

*I have navigated you to our **About page** so you can read their full, detailed professional biographies!*`;
      return { text, navigateTo, project };
    }

    // 3. TOOTHKEEPERS / DENTAL / TEETH / VAN / TRAILER / DENTIST / SURGERY / ORAL
    if (query.includes("toothkeeper") || query.includes("dental") || query.includes("teeth") || query.includes("dentist") || query.includes("mouth") || query.includes("decay") || query.includes("tooth") || query.includes("surgery") || query.includes("caries")) {
      navigateTo = "projects";
      project = "keepers";
      text = `🦷 **ToothKeepers & Specialized Dental Outreach Initiatives**

One Health deploys state-of-the-art mobile clinical trailers to alleviate acute nerve pain, infections, and tooth decay:

• **ToothKeepers (Children focus)**:
  Visits township schools and children's shelters to provide cleanings, restorations, protective extractions, and preventative hygiene kits.
  *  **2,400+** Children treated to date.
  *  **34** Schools visited.
  *  **5,000+** Preventive hygiene kits distributed.

• **Adult Dental Outreach** (project ID: \`dental_outreach\`):
  Delivers emergency outpatient dental treatments for families unable to access public state hospitals.
  *  **4,100+** Adult patients relieved.
  *  **48** Action-packed field trips annually via 2 active custom mobile vans.

*Directing you to the dynamic **ToothKeepers details** inside the Projects board!*`;
      return { text, navigateTo, project };
    }

    // 4. DRIVEWELL / SAFETY / ROAD / TRAFFIC / PEDESTRIAN / VEHICLE / SHIELD
    if (query.includes("drivewell") || query.includes("safety") || query.includes("road") || query.includes("traffic") || query.includes("pedestrian") || query.includes("accident") || query.includes("vest") || query.includes("transport")) {
      navigateTo = "projects";
      project = "drivewell";
      text = `🛡️ **DriveWell Community Safety Program**

DriveWell is designed to protect vulnerable pedestrian commutes and lower accident indices in townships and rural networks:

• **Core Actions**:
  Reflector vest distributions for high-visibility commuting, pedestrian crossing instruction modules for children, and basic emergency first-aid courses for taxi operators.
• **Real Milestones**:
  *  **85+** Safety seminars hosted in hazardous corridors.
  *  **3,200+** Reflector vests distributed.
  *  **18** Under-resourced schools fully engaged.
• **Future Goal**:
  Reduce preventable pedestrian casualty rates in township transit bottlenecks by 30% through ongoing grassroots education.

*Opening the **DriveWell interactive initiative card** on your viewport!*`;
      return { text, navigateTo, project };
    }

    // 5. MATERNAL / MOTHER / BABY / PRENATAL / BIRTH / NEWBORN / PREGNANT / NUTRITION
    if (query.includes("maternal") || query.includes("mother") || query.includes("baby") || query.includes("prenatal") || query.includes("birth") || query.includes("newborn") || query.includes("pregnant") || query.includes("infant")) {
      navigateTo = "projects";
      project = "maternal";
      text = `🤰 **Maternal & Child Health Program**

Providing supportive, primary clinical counsel and resources during the critical 'first 1,000 days of life' for mothers and newborns:

• **Services Offered**:
  Clinical prenatal tracking, maternal health instruction, distribution of baby starter packs (diapers, infant garments, thermal blankets), and post-natal nutrition logs.
• **Our Milestones**:
  *  **850+** Mothers directly supported.
  *  **98%** Healthy births recorded.
  *  **600+** Premium baby starter boxes delivered.
• **Objective**:
  Establish 3 localized prenatal clinic support hubs that link expectant mothers directly to transport and professional care.

*Opening the **Maternal & Baby program** under your Projects view currently.*`;
      return { text, navigateTo, project };
    }

    // 6. AGRICULTURE / FARM / GARDEN / CROP / FOOD / GROW / MALNUTRITION / STUNTING / SPINACH / VEGETABLE
    if (query.includes("agri") || query.includes("farm") || query.includes("garden") || query.includes("crop") || query.includes("food") || query.includes("grow") || query.includes("nutrition") || query.includes("stunting") || query.includes("soil") || query.includes("spinach") || query.includes("vegetable") || query.includes("sprout")) {
      navigateTo = "projects";
      project = "agri";
      text = `🌱 **Agricultural Skills & Food Security**

To combat childhood malnutrition and systemic physical stunting, One Health teaches families to grow high-yield organic foods on miniature urban plots:

• **Core Methods**:
  Establishing vertical wall planter gardens, utilizing compost recycling loops, organic pest barriers, and smart household rainwater collection tanks.
• **Real Outcomes**:
  *  **450+** Active township crops and home gardens developed.
  *  **180** Community families fully self-sustained with organic greens.
  *  **95** Local trainees certified in smallholder agriculture.
• **Partners**:
  Philakade Care Home and other community orphanages directly benefit from fresh beets, sweet potatoes, and kale daily.

*Our **Agricultural and Food initiatives** are highlighted on both our **About** and **Projects** boards.*`;
      return { text, navigateTo, project };
    }

    // 7. POLLUTION / RECYCLE / TRASH / LITTER / CLEAN / PLASTIC / PLANET / EARTH / CREATION
    if (query.includes("pollut") || query.includes("recycle") || query.includes("trash") || query.includes("litter") || query.includes("clean") || query.includes("plastic") || query.includes("planet") || query.includes("earth") || query.includes("creation") || query.includes("green") || query.includes("leaf")) {
      navigateTo = "projects";
      project = "pollution";
      text = `♻️ **Creation Care, Pollution & Recycling Initiatives**

We believe that environmental integrity directly shapes human wellness. Open refuse heaps and plastic burning trigger toxic asthma and skin issues in nearby homes.

• **What We Do**:
  Organize township ecosystem cleanups, configure waste sorting platforms in rural educational centers, and support youthful recycling co-operatives.
• **Measurable Gains**:
  *  **42 Tons** Of plastic, card, and metal trash safely extracted.
  *  **24** Broad-scale community cleanup operations.
  *  **8** Independent recycling school sorting hubs established.
• **Future Goal**:
  Capture over 100 tons of waste annually while establishing secure, dignified self-employment payouts for 15 collectors.

*Take a look at other Eco-Stewardship milestones on the **Projects page**.*`;
      return { text, navigateTo, project };
    }

    // 8. AFRICA / ZIMBABWE / MISSION / RURAL / SURGICAL / SURGERY / INTERNATIONAL / POP-UP / CROSS-BORDER
    if (query.includes("zimbabwe") || query.includes("africa") || query.includes("mission") || query.includes("rural") || query.includes("surgical") || query.includes("surgery") || query.includes("international") || query.includes("pop-up")) {
      navigateTo = "projects";
      project = "zimbabwe";
      text = `🌍 **Africa Cross-Border Surgical & Spiritual Missions**

Our major international outreach travels deep into rural, highly isolated communities, with a sustained focus on Zimbabwe and adjacent regions:

• **Hospital on Wheels**:
  For two intensive weeks, a voluntary force of dentists, primary care physicians, ophthalmic specialists, and general surgeons establish a pop-up hospital infrastructure.
• **Field Returns**:
  *  **320+** Specialist surgeries successfully completed.
  *  **14** Intensive diagnostic and clinical consultation days.
  *  **1,500+** One-on-one pastoral counseling sessions and spiritual discussions.
• **Impact Goals**: Ensure partner clinics in these remote pockets remain supplied with diagnostic solar power systems and chronic clinical medicines.

*The **Africa Mission** details can be reviewed in the **Projects panel**.*`;
      return { text, navigateTo, project };
    }

    // 9. MEDICAL / STETHOSCOPE / DOCTOR / HEALTH / CLINIC / SICK / DIAGNOSE / PHARMACY / MEDICINE
    if (query.includes("medical") || query.includes("doctor") || query.includes("health") || query.includes("clinic") || query.includes("diagnostic") || query.includes("illness") || query.includes("screen") || query.includes("pharmacy") || query.includes("medicine") || query.includes("prescription") || query.includes("referral")) {
      navigateTo = "projects";
      project = "medical";
      text = `🩺 **Primary Healthcare & Medical Missions**

Bringing diagnostics, medication distribution, and clinical help straight into towns lacking solid public hospitals:

• **Services**:
  Managing temporary healthcare wards in local church centers, conducting chronic disease checks (hypertension, diabetes), running eye screenings, and distributing pharmacy prescriptions.
• **Key Statistics**:
  *  **6,400+** Individual patients examined.
  *  **3,800+** Professional prescriptions filled for free.
  *  **210+** Referrals passed directly to specialized private practitioners.

*Learn how we operate these temporary medical clinics on the active **Projects panel**.*`;
      return { text, navigateTo, project };
    }

    // 10. NETWORK / ACCOUNT / PROFESSIONAL / CLINICIAN / PRO-BONO / DOCTORS / SPECIALIST
    if (query.includes("network") || query.includes("specialist") || query.includes("pro-bono") || query.includes("volunteer") || query.includes("pledge") || query.includes("hours") || query.includes("professional") || query.includes("registry") || query.includes("cardio") || query.includes("ophthal")) {
      navigateTo = "projects";
      project = "network";
      text = `🤝 **Professional Health Volunteer Network**

This network channels private clinical wealth to target extreme public medical poverty, allowing specialists to give back:

• **How It Works**:
  Private dental surgeons, ophthalmologists, cardiologists, and pharmacists pledge a dedicated portion of their monthly clinic schedule. One Health refers verified, acute township patients to receive this premium care inside private practices, absolutely free.
• **Current Force**:
  *  **85+** Pledged accredited clinicians.
  *  **1,200+** Pro-bono surgical and consulting hours pledged annually.
  *  **45** Major life-altering surgeries fully donated by clinical partners.

*Details on joining our **Accredited Network Registry** are found under **Projects**!*`;
      return { text, navigateTo, project };
    }

    // 11. PARTNERS / ALLIANCE / ASSOCIATES / FORWARD DURBAN / CITYHILL / NATION CHANGERS / LILY / THE ARK / IKETHELO
    if (query.includes("partner") || query.includes("alliance") || query.includes("associate") || query.includes("cityhill") || query.includes("durban") || query.includes("nation changers") || query.includes("lily of the valley") || query.includes("ark") || query.includes("ikethelo") || query.includes("philakade")) {
      navigateTo = "about";
      text = `🤝 **Invaluable Civic & Faith Alliances**

One Health believes in collaborative community healing. We work hand-in-hand with civic, corporate, and faith circles:

• **Faith Alliances**:
  *  **CityHill Missions**: Collaborates on community resources, counseling outreach loops, and spiritual mentoring.
  *  **African Christian Fellowship**: Links international clinical volunteers.
• **Empowerment Partnerships**:
  *  **Nation Changers**: Directs township skills development.
  *  **Forward Durban**: Supports municipal-level civic coordination.
• **Shelter & Care Operations**:
  *  **Lily of the Valley** & **Ikethelo**: We construct vegetable walls and provide dental checks for their resident orphans.
  *  **Philakade Care Home**: Supporting continuous nutritional wellness.
  *  **The Ark**: Servicing homeless and drug recovery participants.

*You can inspect our list of partners on the **About page** which is now active on your screen!*`;
      return { text, navigateTo, project };
    }

    // 12. GOSPEL / BIBLE / SPIRITUAL / PASTORS / CHURCH / FAITH / CHRISTIAN / SCRIPTURE / COUNSEL
    if (query.includes("gospel") || query.includes("bible") || query.includes("spiritual") || query.includes("pastor") || query.includes("church") || query.includes("faith") || query.includes("christian") || query.includes("scripture") || query.includes("counsel") || query.includes("jesus") || query.includes("ministry")) {
      navigateTo = "gospel";
      text = `📖 **Spiritual Hope & Gospel Counsel integration**

At One Health, we believe human wellness demands a holistic approach. Addressing clinical pain and physical hunger is critical, but restoring hope, purpose, and faith re-anchors the human spirit.

• **Pastoral Support Partnerships**:
  We partner with CityHill Missions and other community church fellowships to hold voluntary youth scripture circles, open-air faith dialogues, and grief counseling.
• **Dignity & Relief**:
  Our counselors move alongside mobile ToothKeepers and medical vans, standing with township parents to pray, support them through struggles, and offer guidance for family reconciliation.

*I have guided your viewport directly to our **Gospel page** to illustrate the harmony of these physical and spiritual camps.*`;
      return { text, navigateTo, project };
    }

    // 13. CONTACT / ADDRESS / WHERE / HQ / HILLCREST / EMAIL / PHONE / REACH / SEND / TRIAGE / REFERRAL / SUBMIT
    if (query.includes("contact") || query.includes("address") || query.includes("where") || query.includes("hq") || query.includes("located") || query.includes("hillcrest") || query.includes("email") || query.includes("phone") || query.includes("reach") || query.includes("referral") || query.includes("submit") || query.includes("write") || query.includes("message")) {
      navigateTo = "contact";
      text = `📍 **One Health Headquarters & Secure Routing System**

• **Main HQ**:
  One Health operates centrally from **Hillcrest, KwaZulu-Natal, South Africa**.
  
• **Why Triage is Online**:
  Our mobile dental and medical trailers are continuously active across distant townships. To protect operational equipment and remain secure, we manage our referral and sponsorship intake entirely online through direct routing.

• **Direct Routing Forms**:
  On our Contact page, you can access:
  *  *Sponsorship Enquiries*: For corporate associations and donor matching.
  *  *Pro-bono Referrals*: Secure clinical triage requests for township children.
  *  *General Messages*: Directly monitored by our Durban team leaders.

*Please use the **secure contact form** now rendered on your screen to submit a message.*`;
      return { text, navigateTo, project };
    }

    // 14. IMPACT / STATS / METRICS / REPORT / USD / RANDS / 18C / AUDIT / AUDITED / TRANSALATION / COMPLIANCE
    if (query.includes("impact") || query.includes("stat") || query.includes("metric") || query.includes("report") || query.includes("audit") || query.includes("comply") || query.includes("compliance") || query.includes("18c") || query.includes("tax") || query.includes("certificate") || query.includes("outcome") || query.includes("number")) {
      navigateTo = "impact";
      text = `📊 **Verified Impact & Rigid Compliance Metrics**

Transparency is a core value at One Health. All dental, medical, agricultural, and financial records undergo continuous validation:

• **Cumulative Impact Milestones**:
  *  **9+** Active holistic initiatives in action.
  *  **15,000+** Lives directly touched by healthcare and stewardship camps.
  *  **42 Tons** of hazardous plastics diverted at sorting stations.
  *  **450+** Township home and care crops grown.
  *  **10+** Civic and faith collaborative partners.
  *  **5+** Nations in Africa served.

• **Corporate Tax Benefits**:
  One Health is a registered, certified NPO. We issue active **Section 18C Tax Certificates** to corporate sponsors in South Africa, enabling tax deductions on all supportive material funding.

*I have opened our **Impact Dashboard**, where you can browse audited statistics and download our annual outcome PDFs.*`;
      return { text, navigateTo, project };
    }

    // 15. BENEFICIARIES / TESTIMONIALS / SCHOOLS / CLIENTS / TOWNSHIP / DURBAN / PEOPLE / KIDS / TESTIFY
    if (query.includes("beneficiar") || query.includes("testimonial") || query.includes("school") || query.includes("client") || query.includes("township") || query.includes("durban") || query.includes("people") || query.includes("kids") || query.includes("kid") || query.includes("child") || query.includes("testify") || query.includes("story") || query.includes("stories")) {
      navigateTo = "beneficiaries";
      text = `💌 **Community Beneficiaries & Testimonials**

Our focus is centered on marginalized groups across Durban townships, KwaZulu-Natal, and remote borderlands:

• **Orphanages & Care Centres**:
  Lily of the Valley and Ikethelo orphanages receive recurring dental checks and organic farming vertical garden frames.
• **Under-Resourced Schools**:
  Primary school teachers report major class participation increases and zero chronic dental pain after ToothKeepers visits.
• **Township Residents**:
  Mothers like Lindiwe Dlamini testified to our mobile vans resolving months of intense pediatric tooth pain immediately, free of charge.

*I've opened the **Beneficiaries section**, where you can read real, heartwarming quotes from local families and clinicians in our loops.*`;
      return { text, navigateTo, project };
    }

    // 16. GALLERY / PHOTO / IMAGE / REEL / VIDEO / MULTIMEDIA / SHOW / PIC / PICS / LOOK
    if (query.includes("gallery") || query.includes("photo") || query.includes("image") || query.includes("reel") || query.includes("video") || query.includes("multimedia") || query.includes("show") || query.includes("pic") || query.includes("pics") || query.includes("look") || query.includes("visual")) {
      navigateTo = "gallery";
      text = `📸 **Immersive Field Media Gallery**

Explore real visual moments representing One Health's dynamic mobile trailers and community operations:

• **Main Subjects**:
  *  *ToothKeepers Units*: Custom-built dental trailers on location at township schools.
  *  *Active Clinics*: Clinicians and local leaders delivering professional care on sites.
  *  *Agricultural Greenwalls*: Vertical compost gardens flourishing under care.
  *  *Cross-border Africa Missions*: Diagnostic and pop-up stations active.

*Explore these high-resolution operational photographs right now in the **Gallery category**!*`;
      return { text, navigateTo, project };
    }

    // 17. PARTICIPATE / VOLUNTEER / SPONSOR / DONATE / SUPPORT / MONEY / FUNDS / CONTRIBUTE / GIVE / INVOLVED
    if (query.includes("participate") || query.includes("volunteer") || query.includes("sponsor") || query.includes("donate") || query.includes("support") || query.includes("money") || query.includes("funds") || query.includes("contribute") || query.includes("give") || query.includes("involved") || query.includes("help") || query.includes("join")) {
      navigateTo = "participate";
      text = `👥 **Join the stewardship Mission**

There are three direct pipelines to support or get hands-on in our operations:

1. **Become a Camp Sponsor**:
   Fund essential materials like mobile clinic fuel, dental hygiene kits (toothpaste/brushes), organic compost lines, and newborn baby starter packs.
2. **Volunteer Professional Service**:
   Doctors, dental specialists, agricultural growers, or counselors can pledge active field hours or private appointment slots to referred patients.
3. **Register Corporate Collaborations**:
   Avail space or join outreach drives. Your donations directly trigger a Section 18C Tax Certificate to offset corporate tax liability.

*I've navigated you to our **Participate portal** where you can fill in your coordinator preferences or sponsor a campaign!*`;
      return { text, navigateTo, project };
    }

    // 18. NO MATCH / DETAILED GENERAL FALLBACK
    text = `💡 **One Health Stewardship Information Agent**

I am here to answer any specific question about the organization, using real, verified details from our local files. 

For example, ask me about:
• **"Who is Dr. Lesley Naidoo?"** or query our pioneering team leadership bio.
• **"What is the ToothKeepers initiative?"** for mobile clinic dental stats.
• **"Where is One Health located?"** to see our Hillcrest HQ coordinates.
• **"What are the six dimensions of One Health?"** to learn our philosophy and gospel integration.
• **"How do I volunteer?"** to see how professionals can pledge hours.

*Feel free to request any page! Try typing 'go to contact' or 'show impact'.*`;
    return { text, navigateTo, project };
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

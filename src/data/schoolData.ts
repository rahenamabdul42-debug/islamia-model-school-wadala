import {
  AcademicProgram,
  Facility,
  FacultyMember,
  GalleryItem,
  Announcement,
  ActivityHighlight,
} from '../types';

export const SCHOOL_INFO = {
  name: 'Islamia Model School Wadala',
  shortName: 'IMS Wadala',
  initials: 'IMS',
  location: 'Wadala, Punjab, Pakistan',
  address: 'Main Circular Road, Near Post Office, Wadala, District Sialkot / Gujranwala Division, Punjab, Pakistan',
  phone: '+92 3XX XXXXXXX [School Mobile Placeholder]',
  landline: '+92 52 XXXXXXX [School Landline Placeholder]',
  whatsapp: '923000000000',
  whatsappDisplay: '+92 3XX XXXXXXX [WhatsApp Inquiries Placeholder]',
  email: 'info@islamiamodelschoolwadala.edu.pk',
  admissionsEmail: 'admissions@islamiamodelschoolwadala.edu.pk',
  tagline: 'Quality Education with Islamic Values',
  urduTagline: 'اسلامی اقدار کے ساتھ معیاری تعلیم',
  arabicMotto: 'رَّبِّ زِدْنِى عِلْمًا',
  mottoTranslation: 'O My Lord, Increase Me in Knowledge (Surah Taha: 114)',
  officeHours: 'Monday – Saturday: 7:45 AM – 2:00 PM (Friday: 7:45 AM – 12:30 PM)',
  affiliation: 'Board of Intermediate & Secondary Education (BISE) & Punjab Education Department [Official Registration]',
};

export const SCHOOL_STATS = [
  {
    label: 'Board Examination Results',
    value: '100% Pass [Sample]',
    description: 'Matriculation performance record (Editable school metric placeholder)',
  },
  {
    label: 'Student Community',
    value: '1,000+ [Sample]',
    description: 'Enrolled students from Early Childhood to Matric (Editable placeholder)',
  },
  {
    label: 'Teaching Faculty',
    value: '40+ [Sample]',
    description: 'Certified subject specialists & Quranic mentors (Editable placeholder)',
  },
  {
    label: 'Academic Foundation',
    value: '20+ Years [Sample]',
    description: 'Community educational service in Wadala (Editable placeholder)',
  },
];

export const PRINCIPAL_MESSAGE = {
  name: 'Office of the Principal',
  designation: 'Principal & Patron [Sample Profile]',
  qualification: 'M.Phil / Master in Education & Academic Leadership [Placeholder]',
  experience: 'Senior Educational Administrator [Placeholder]',
  image: '/images/principal.jpg',
  quote:
    'True education is neither merely memorizing textbooks nor modern technical skill in isolation. At Islamia Model School Wadala, we fuse academic diligence with the timeless light of Islamic morality, fostering students who excel intellectually while upholding integrity, Akhlaq, and duty toward Allah and humanity.',
  messageParagraphs: [
    'Assalamu Alaikum wa Rahmatullahi wa Barakatuh. Welcome to Islamia Model School Wadala. Our institution was established to deliver modern English-medium schooling firmly anchored in Islamic character and ethical discipline.',
    'Our campus provides modern science and IT laboratories, interactive classrooms, and a safe, respectful environment. Concurrently, our students recite the Holy Quran with Tajweed, memorize daily supplications, and practice the noble Sunnah of our Beloved Prophet (peace and blessings be upon him). We invite parents to visit our administration office in Wadala to discuss student enrollment.',
  ],
};

export const ABOUT_DETAILS = {
  overview:
    'Islamia Model School Wadala is an educational institution situated in Wadala, Punjab, Pakistan. Committed to balanced education, the school prepares students for modern academic and career milestones while instilling Islamic values, humility, respect for elders, and community service.',
  history: [
    {
      year: 'Phase 1',
      title: 'Institutional Foundation',
      text: 'Founded to serve the families of Wadala and surrounding Punjab areas with affordable, high-standard English-medium education infused with Islamic studies.',
    },
    {
      year: 'Phase 2',
      title: 'Secondary Board Affiliation & Science Wing',
      text: 'Establishment of certified Physics, Chemistry, and Biology laboratories and formal affiliation with the regional Punjab Secondary Education Board.',
    },
    {
      year: 'Phase 3',
      title: 'Digital Computer & STEM Lab Upgrade',
      text: 'Commissioning of a modern computer laboratory with desktop workstations, internet research access, and introductory coding curriculum.',
    },
    {
      year: 'Phase 4',
      title: 'Purified RO Water & Sports Complex',
      text: 'Installation of high-capacity Reverse Osmosis drinking water plant and layout of school athletics and cricket grounds.',
    },
    {
      year: 'Current Phase',
      title: 'Smart Multimedia Classrooms & Hifz Track',
      text: 'Integration of multimedia educational aids, audio-visual phonics for early childhood, and personalized Hifz-cum-schooling academic tracks.',
    },
  ],
  pillars: [
    {
      title: 'Mission',
      text: 'To equip students with strong academic capabilities, scientific curiosity, bilingual literacy, and sincere Islamic ethical foundations to become upright citizens.',
    },
    {
      title: 'Vision',
      text: 'To be a benchmark educational institution in Punjab where traditional Islamic manners harmonize with 21st-century science, technology, and leadership skills.',
    },
    {
      title: 'Discipline & Character Building',
      text: 'Cultivating punctuality, neatness in dress, polite speech (Adab), cleanliness (Taharah), and compassionate behavior through daily routines.',
    },
    {
      title: 'Quality & Academic Rigor',
      text: 'Small student-teacher ratios, continuous diagnostic assessments, homework monitoring, and regular parent-teacher collaboration.',
    },
  ],
};

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: 'playgroup',
    name: 'Playgroup',
    urduName: 'پلے گروپ',
    gradeRange: 'Early Childhood Tier 1',
    ageRange: '3.0 – 4.0 Years',
    description:
      'Gentle, joyful introduction to formal schooling through sensory play, gross motor coordination, storytelling, and basic Islamic manners.',
    subjects: ['Sensory Exploration', 'English & Urdu Phonics', 'Number Songs', 'Basic Islamic Duas & Manners', 'Arts & Clay Modeling'],
    highlights: ['Child-safe play areas', 'Nurturing female instructors', 'Zero exam pressure', 'Activity-based social learning'],
    image: '/images/kindergarten.jpg',
    curriculumDetails:
      'Focuses on social skills, language development, basic motor coordination, and fostering a love for coming to school each morning.',
    timing: '8:00 AM – 11:30 AM',
  },
  {
    id: 'nursery',
    name: 'Nursery',
    urduName: 'نرسری',
    gradeRange: 'Early Childhood Tier 2',
    ageRange: '4.0 – 5.0 Years',
    description:
      'Structured literacy and numeracy foundations combined with Islamic stories, oral fluency, and hand-eye dexterity.',
    subjects: ['English Reading & Writing', 'Urdu Haroof-e-Tahajji', 'Mathematics Concepts (1-50)', 'General Knowledge & Science Wonder', 'Quranic Noorani Qaida Basics'],
    highlights: ['Phonics-based reading', 'Interactive audio-visual aids', 'Coloring & shape recognition', 'Gentle behavioral training'],
    image: '/images/kindergarten.jpg',
    curriculumDetails:
      'Expands vocabulary in both English and Urdu, introduces letter-sound associations, and embeds morning greeting and prayer habits.',
    timing: '8:00 AM – 12:00 PM',
  },
  {
    id: 'kindergarten',
    name: 'Kindergarten (KG)',
    urduName: 'کنڈرگارٹن',
    gradeRange: 'Early Childhood Tier 3',
    ageRange: '5.0 – 6.0 Years',
    description:
      'Preparatory year bridging early childhood and primary schooling. Fosters independent reading, sentence building, and elementary mathematics.',
    subjects: ['English Sentences & Composition', 'Urdu Reading & Nazms', 'Elementary Mathematics & Mental Math', 'Science Exploration', 'Nazra Quran & Tajweed rules'],
    highlights: ['Transition readiness for Grade 1', 'Urdu and English speech practice', 'Creative crafts & science discovery', 'Islamic etiquette drills'],
    image: '/images/kindergarten.jpg',
    curriculumDetails:
      'Prepares students for structured classroom routines, reading simple storybooks independently, and performing basic mental addition and subtraction.',
    timing: '8:00 AM – 12:30 PM',
  },
  {
    id: 'primary',
    name: 'Primary Classes (Grade 1 – 5)',
    urduName: 'پرائمری کلاسز (پہلی تا پانچویں)',
    gradeRange: 'Grade 1 to Grade 5',
    ageRange: '6.0 – 11.0 Years',
    description:
      'Robust foundational curriculum covering sciences, mathematics, bilingual fluency, social studies, and comprehensive Quranic Nazra with translation.',
    subjects: ['English Grammar & Literature', 'Urdu Language & Insha', 'Mathematics', 'General Science', 'Social Studies & Pak Geography', 'Islamiat & Quran Translation', 'Computer Studies'],
    highlights: ['Dedicated subject teachers', 'Weekly science experiment demonstrations', 'Annual Quran recitation competitions', 'Spelling bee & speech contests'],
    image: '/images/classroom.jpg',
    curriculumDetails:
      'Aligned with Punjab Single National Curriculum (SNC) enriched with English standards and intensive character-building modules.',
    timing: '7:45 AM – 1:30 PM',
  },
  {
    id: 'middle',
    name: 'Middle Classes (Grade 6 – 8)',
    urduName: 'مڈل کلاسز (چھٹی تا آٹھویں)',
    gradeRange: 'Grade 6 to Grade 8',
    ageRange: '11.0 – 14.0 Years',
    description:
      'Critical transitional stage emphasizing analytical inquiry, laboratory experiments, computer programming basics, and advanced Islamic studies.',
    subjects: ['Advanced English', 'Urdu Adab', 'Mathematics (Algebra & Geometry)', 'General Science (Physics, Chemistry, Biology)', 'Computer Science & ICT', 'History & Geography', 'Tarjuma-tul-Quran & Islamiat'],
    highlights: ['Practical hands-on laboratory sessions', 'Computer lab programming classes', 'Debate and speech society', 'Supervised Zuhr congregation'],
    image: '/images/teacher-mentoring.jpg',
    curriculumDetails:
      'Focuses on problem solving, scientific inquiry, critical reading, and preparing students smoothly for secondary Board examinations.',
    timing: '7:45 AM – 1:45 PM',
  },
  {
    id: 'secondary',
    name: 'Secondary Classes (Grade 9 – 10)',
    urduName: 'سیکنڈری کلاسز (میٹرک نویں اور دسویں)',
    gradeRange: 'Matriculation (BISE Punjab)',
    ageRange: '14.0 – 16.0 Years',
    description:
      'Rigorous secondary Board preparation offering Science Group (Biology / Computer Science) with proven academic mentoring.',
    subjects: ['Physics', 'Chemistry', 'Biology OR Computer Science', 'Mathematics', 'English Compulsory', 'Urdu Compulsory', 'Islamiat & Pakistan Studies', 'Tarjuma-tul-Quran-ul-Majeed'],
    highlights: ['Comprehensive test session & pre-board series', 'Individual past paper mentoring', 'Modern science & computer lab practicals', 'Career counseling guidance'],
    image: '/images/science-lab.jpg',
    curriculumDetails:
      'Follows Board of Intermediate and Secondary Education (BISE) syllabus with supplementary conceptual coaching, past papers workshops, and regular testing.',
    timing: '7:45 AM – 2:00 PM',
  },
];

export const SCHOOL_FACILITIES: Facility[] = [
  {
    id: 'classrooms',
    title: 'Modern Classrooms',
    subtitle: 'Air-Cooled & Ergonomic Spaces',
    description:
      'Spacious, brightly lit classrooms equipped with ergonomic wooden furniture, whiteboards, multimedia projection facilities, and continuous air-cooling and cross-ventilation.',
    image: '/images/classroom.jpg',
    features: ['Comfortable wooden student desks', 'Multimedia audio-visual systems', 'Uninterrupted solar UPS power backup', 'Low student-to-teacher ratio'],
    icon: 'Building2',
  },
  {
    id: 'science-lab',
    title: 'Science Laboratory',
    subtitle: 'Practical Hands-on Physics & Chemistry',
    description:
      'Certified laboratory stocked with precision microscopes, glassware, chemical reagents, biological models, and safety apparatus for Board practicals.',
    image: '/images/science-lab.jpg',
    features: ['High-resolution optical microscopes', 'Safe gas connections & fume control', 'Specimen slides and anatomy models', 'Supervised individual student workstations'],
    icon: 'FlaskConical',
  },
  {
    id: 'computer-lab',
    title: 'Computer & STEM Laboratory',
    subtitle: 'Digital Literacy & High-Speed Workstations',
    description:
      'Modern computer facility with desktop systems, licensed educational software, coding compilers, and filtered internet supervised by IT specialists.',
    image: '/images/computer-lab.jpg',
    features: ['Modern desktop terminals', 'Programming in Python, HTML/CSS & Office tools', 'Safe firewall filtered internet access', 'Robotics and STEM discovery kits'],
    icon: 'Monitor',
  },
  {
    id: 'library',
    title: 'School Library & Reading Hall',
    subtitle: 'Curated Academic & Islamic Collection',
    description:
      'A serene sanctuary of knowledge housing curriculum books, encyclopedias, Islamic history, Urdu literature, English readers, and educational journals.',
    image: '/images/library.jpg',
    features: ['Curated Islamic reference section & Tafseer', 'English & Urdu fiction and non-fiction', 'Quiet study tables with soft task lighting', 'Weekly scheduled library reading period'],
    icon: 'BookOpen',
  },
  {
    id: 'playground',
    title: 'Sports Grounds & Athletic Pitch',
    subtitle: 'Cricket, Football & Track Field',
    description:
      'Spacious green playground dedicated to physical fitness, athletic sprints, cricket matches, badminton courts, and regular physical education drills.',
    image: '/images/sports.jpg',
    features: ['Cricket turf pitch', 'Badminton and athletic track', 'Supervised outdoor games', 'Annual Sports Gala events'],
    icon: 'Trophy',
  },
  {
    id: 'faculty',
    title: 'Qualified & Caring Teachers',
    subtitle: 'Dedicated Subject Mentors',
    description:
      'Experienced educators holding university degrees alongside certified Huffaz and Qaris who act as compassionate moral mentors to every child.',
    image: '/images/teacher-mentoring.jpg',
    features: ['Certified degree-holding teaching staff', 'Continuous pedagogical workshops', 'Empathetic pastoral care', 'Direct parent communication'],
    icon: 'GraduationCap',
  },
  {
    id: 'drinking-water',
    title: 'Clean Drinking Water Facility',
    subtitle: 'Reverse Osmosis (RO) Purification Plant',
    description:
      'On-site multistage Reverse Osmosis (RO) water purification plant with stainless steel chillers, tested regularly for purity, ensuring safe drinking water for all students.',
    image: '/images/drinking-water.jpg',
    features: ['Multi-barrier sediment and carbon filtration', 'Ultraviolet (UV) microbial sterilization', 'Dual temperature chilled/normal taps', 'Regular laboratory quality verification'],
    icon: 'Droplets',
  },
  {
    id: 'safe-environment',
    title: 'Safe & Secure Campus',
    subtitle: 'Guarded Boundary & CCTV Monitoring',
    description:
      'A walled, guarded campus with CCTV surveillance, visitor logging, dedicated female staff for girls, and strict child safety protocols.',
    image: '/images/school-gate.jpg',
    features: ['Enclosed campus with boundary wall', 'CCTV monitoring covering school corridors', 'Security trained guards at gate checkpoints', 'First-aid and health station'],
    icon: 'ShieldCheck',
  },
  {
    id: 'islamic-education',
    title: 'Dedicated Islamic Center & Prayer Hall',
    subtitle: 'Quranic Tajweed & Congregational Salah',
    description:
      'Carpeted prayer hall designed for daily congregational Zuhr prayer, Nazra recitation, and Hifz mentoring.',
    image: '/images/islamic-class.jpg',
    features: ['Wooden Quran rehal stands & prayer carpets', 'Dedicated Wudu (ablution) stations', 'Certified Qari teachers for male and female pupils', 'Daily collective Zuhr prayer'],
    icon: 'Moon',
  },
];

export const ISLAMIC_EDUCATION_PILLARS = [
  {
    title: 'Quran Education & Tajweed',
    urduTitle: 'قرآن مجید تجوید کے ساتھ',
    description:
      'Every student is taught correct Makharij (pronunciation points) and rules of Tajweed from early childhood, progressing from Noorani Qaida to full Nazra completion.',
    details: 'Qualified male and female Qaris guide students step-by-step with patient correction.',
  },
  {
    title: 'Basic Islamic Studies (Diniyat)',
    urduTitle: 'بنیادی دینیات اور فقہ',
    description:
      'Age-appropriate study of Islamic beliefs (Aqeedah), the Five Pillars, life of the Holy Prophet ﷺ (Seerat-un-Nabi), and practical rulings of Taharah (cleanliness).',
    details: 'Structured textbooks that clarify faith simply and inspire love for Allah and His Messenger ﷺ.',
  },
  {
    title: 'Namaz Education & Daily Congregation',
    urduTitle: 'نماز کی عملی تربیت اور باجماعت ادائیگی',
    description:
      'Practical demonstration of Wudu and Salah postures. Middle and secondary students offer Zuhr prayer collectively in the school prayer hall every day.',
    details: 'Memorization of Namaz with Urdu translation, encouraging lifelong punctuality in prayer.',
  },
  {
    title: 'Daily Masnoon Duas',
    urduTitle: 'مسنون دعائیں اور روزمرہ کے اذکار',
    description:
      'Memorization and practice of authentic daily supplications for waking, eating, leaving home, entering mosque, travelling, and studying.',
    details: 'Students recite these supplications naturally during their daily school routines.',
  },
  {
    title: 'Good Manners (Akhlaq & Adab)',
    urduTitle: 'اخلاق و آداب اور کردار سازی',
    description:
      'Instilling respect for parents and teachers, kindness to younger peers, honesty in speech, modesty (Haya), and keeping promises.',
    details: 'Weekly character themes such as Sidq (truthfulness), Sabr (patience), and Shukr (gratitude).',
  },
  {
    title: 'Moral Education & Character Building',
    urduTitle: 'اخلاقی تربیت اور سماجی خدمت',
    description:
      'Fostering civic responsibility, environmental care, charity (Sadaqah), and community service inspired by Islamic teachings.',
    details: 'Annual student community drives and clean school campaigns spearheaded by student prefects.',
  },
];

export const DAILY_DUA_OF_THE_WEEK = {
  arabic: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
  transliteration: 'Rabbi zidni \'ilman, warzuqni fahma',
  english: 'O My Lord, increase me in beneficial knowledge and grant me true understanding.',
  urdu: 'اے میرے رب! میرے علم میں اضافہ فرما اور مجھے صحیح سمجھ عطا فرما۔',
  reference: 'Quran (Surah Taha: 114)',
};

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'principal',
    name: 'Principal / Head of Institution [Sample Profile]',
    role: 'Principal & Chief Administrator',
    department: 'Administration',
    qualification: 'M.Phil / Master in Educational Leadership [Placeholder]',
    experience: 'Senior Educational Leader [Placeholder]',
    image: '/images/principal.jpg',
    bio: 'Oversees academic direction, school administration, and teacher development across Islamia Model School Wadala.',
  },
  {
    id: 'vice-principal',
    name: 'Vice Principal / Academic Coordinator [Sample Profile]',
    role: 'Vice Principal & Academic Coordinator',
    department: 'Administration',
    qualification: 'M.A / M.Sc in Academic Administration [Placeholder]',
    experience: '15+ Years Teaching Experience [Placeholder]',
    image: '/images/teacher-mentoring.jpg',
    bio: 'Coordinates curriculum delivery, examination schedules, and student progress reports.',
  },
  {
    id: 'head-islamic',
    name: 'Head of Islamic Studies & Tajweed [Sample Profile]',
    role: 'Qari & Head of Islamic Studies',
    department: 'Islamic Studies',
    qualification: 'Shahadat-ul-Aalamia / Master in Islamiat, Certified Qari [Placeholder]',
    experience: 'Quranic & Tajweed Educator [Placeholder]',
    image: '/images/qirat-stage.jpg',
    bio: 'Guides Quranic recitation, Tajweed fundamentals, and character-building classes for boys and girls.',
  },
  {
    id: 'head-science',
    name: 'Senior Science & Physics Faculty [Sample Profile]',
    role: 'Senior Science Faculty',
    department: 'Sciences & Mathematics',
    qualification: 'M.Sc Physics / Chemistry [Placeholder]',
    experience: 'Secondary Science Instructor [Placeholder]',
    image: '/images/science-lab.jpg',
    bio: 'Conducts physics, chemistry and biology laboratory experiments and prepares students for Board exams.',
  },
  {
    id: 'it-incharge',
    name: 'Computer Science & ICT Incharge [Sample Profile]',
    role: 'Computer Science & ICT Incharge',
    department: 'Sciences & Mathematics',
    qualification: 'BS Computer Science (BSCS) [Placeholder]',
    experience: 'ICT & Digital Literacy Instructor [Placeholder]',
    image: '/images/computer-lab.jpg',
    bio: 'Leads digital literacy, typing mastery, coding fundamentals, and office productivity tools in the computer lab.',
  },
  {
    id: 'primary-coordinator',
    name: 'Primary & Early Years Coordinator [Sample Profile]',
    role: 'Primary Section Coordinator',
    department: 'Primary & Early Years',
    qualification: 'Master Degree, Montessori Early Years Certified [Placeholder]',
    experience: 'Primary Education Specialist [Placeholder]',
    image: '/images/kindergarten.jpg',
    bio: 'Guides sensory learning, bilingual phonics, and foundational mathematics for young learners.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Main School Campus & Architecture',
    category: 'School Building',
    image: '/images/hero-building.jpg',
    caption: 'Campus exterior and courtyard architecture of Islamia Model School Wadala.',
    date: 'Campus Photo',
  },
  {
    id: 'g2',
    title: 'Active Primary Mathematics Classroom',
    category: 'Classrooms',
    image: '/images/classroom.jpg',
    caption: 'Students in green and white uniform participating in interactive learning.',
    date: 'Classroom Session',
  },
  {
    id: 'g3',
    title: 'Modern Computer Laboratory Workstations',
    category: 'Computer Lab',
    image: '/images/computer-lab.jpg',
    caption: 'Students receiving digital literacy and computer instruction on desktop terminals.',
    date: 'IT Laboratory',
  },
  {
    id: 'g4',
    title: 'Tajweed & Quran Recitation Hall',
    category: 'Islamic Education',
    image: '/images/islamic-class.jpg',
    caption: 'Morning Nazra Quran recitation with wooden rehal stands in our Islamic center.',
    date: 'Quran Studies',
  },
  {
    id: 'g5',
    title: 'Chemistry & Biology Practical Session',
    category: 'Science Lab',
    image: '/images/science-lab.jpg',
    caption: 'Secondary students performing chemical solutions and biology experiments.',
    date: 'Laboratory Practical',
  },
  {
    id: 'g6',
    title: 'Central Library & Reading Area',
    category: 'Educational Events',
    image: '/images/library.jpg',
    caption: 'Quiet reading hall equipped with academic reference texts and literature.',
    date: 'Library Period',
  },
  {
    id: 'g7',
    title: 'School Sports Ground & Cricket Match',
    category: 'Sports',
    image: '/images/sports.jpg',
    caption: 'Outdoor cricket tournament and athletics during annual sports week.',
    date: 'Sports Grounds',
  },
  {
    id: 'g8',
    title: 'Morning Assembly & Supplication',
    category: 'Students Activities',
    image: '/images/assembly.jpg',
    caption: 'Courtyard assembly gathering for Quranic recitation, morning prayer, and national anthem.',
    date: 'Morning Assembly',
  },
  {
    id: 'g9',
    title: 'Annual Prize Distribution Ceremony',
    category: 'Annual Functions',
    image: '/images/annual-function.jpg',
    caption: 'Academic toppers receiving certificates and achievement shields on stage.',
    date: 'Annual Function',
  },
  {
    id: 'g10',
    title: 'Early Childhood & Kindergarten Room',
    category: 'Classrooms',
    image: '/images/kindergarten.jpg',
    caption: 'Young children developing numeracy, alphabet recognition, and fine motor skills.',
    date: 'Early Years Wing',
  },
  {
    id: 'g11',
    title: 'Inter-School Speech & Debate Competition',
    category: 'Students Activities',
    image: '/images/speech.jpg',
    caption: 'Student speaker presenting at the podium during speech and debate contest.',
    date: 'Speech Contest',
  },
  {
    id: 'g12',
    title: 'Annual Science & Innovation Project Exhibition',
    category: 'Science Lab',
    image: '/images/science-fair.jpg',
    caption: 'Interactive student-built science models, solar system diagrams, and volcanoes.',
    date: 'Science Fair',
  },
  {
    id: 'g13',
    title: 'Islamic Calligraphy & Arts Workshop',
    category: 'Islamic Education',
    image: '/images/islamic-art.jpg',
    caption: 'Illuminated Islamic geometric patterns and Arabic calligraphy by art students.',
    date: 'Arts Workshop',
  },
  {
    id: 'g14',
    title: 'Purified RO Clean Drinking Water Plant',
    category: 'School Building',
    image: '/images/drinking-water.jpg',
    caption: 'Stainless steel filtered water cooler taps for all students and faculty.',
    date: 'Health Facility',
  },
  {
    id: 'g15',
    title: 'Individual Teacher Mentorship & Coaching',
    category: 'Classrooms',
    image: '/images/teacher-mentoring.jpg',
    caption: 'Teacher providing patient individual instruction at the classroom blackboard.',
    date: 'Classroom Mentoring',
  },
  {
    id: 'g16',
    title: 'Board Examination Hall Invigilation',
    category: 'Educational Events',
    image: '/images/exam-hall.jpg',
    caption: 'Spacious examination hall arranged with individual student test desks.',
    date: 'Examination Session',
  },
  {
    id: 'g17',
    title: 'Campus Main Gate & Security Checkpoint',
    category: 'School Building',
    image: '/images/school-gate.jpg',
    caption: 'Guarded entrance gate and paved driveway leading into Wadala campus.',
    date: 'Campus Entrance',
  },
  {
    id: 'g18',
    title: 'Annual Qirat & Seerah Recitation Conference',
    category: 'Islamic Education',
    image: '/images/qirat-stage.jpg',
    caption: 'Student reciting the Holy Quran with Tajweed at the annual Seerah conference.',
    date: 'Qirat Conference',
  },
];

export const SCHOOL_ACTIVITIES: ActivityHighlight[] = [
  {
    id: 'assembly',
    title: 'Morning Assembly & Tilawat',
    urduTitle: 'صبح کی اسمبلی اور تلاوت قرآن',
    description:
      'Every morning commences with recitation of the Holy Quran with Urdu translation, Hadith of the day, moral thought, national anthem, and student physical exercises.',
    image: '/images/assembly.jpg',
    schedule: 'Daily at 7:45 AM',
    impact: 'Builds discipline, national pride, and spiritual serenity before morning lessons.',
    category: 'Daily Routine',
  },
  {
    id: 'sports',
    title: 'Sports Gala & Athletics Events',
    urduTitle: 'کھیلوں کا سالانہ میلہ اور کرکٹ کپ',
    description:
      'Annual week-long sports gala featuring inter-house cricket tournaments, football, tug-of-war, badminton, and track sprint events.',
    image: '/images/sports.jpg',
    schedule: 'Annual Winter Sports Week',
    impact: 'Promotes physical fitness, teamwork, sportsmanship, and mental resilience.',
    category: 'Physical Education',
  },
  {
    id: 'speech',
    title: 'Speech & Husn-e-Qirat Competitions',
    urduTitle: 'تقریری مقابلے اور حسن قرات',
    description:
      'Bilingual debate competitions in Urdu and English alongside heartfelt Husn-e-Qirat and Naat recitation contests judged by respected scholars.',
    image: '/images/speech.jpg',
    schedule: 'Termly & Annual Championship',
    impact: 'Sharpens public speaking eloquence, self-confidence, and Islamic cultural heritage.',
    category: 'Co-Curricular',
  },
  {
    id: 'science-projects',
    title: 'Science & STEM Innovation Fair',
    urduTitle: 'سائنس پروجیکٹس اور نمائش',
    description:
      'Students build working scientific models, renewable energy displays, volcanic geology models, and software demonstrations.',
    image: '/images/science-fair.jpg',
    schedule: 'Annual Term Exhibition',
    impact: 'Cultivates empirical scientific temper, ingenuity, and problem-solving.',
    category: 'STEM & Academics',
  },
  {
    id: 'islamic-events',
    title: 'Islamic Commemorative Days & Seerah',
    urduTitle: 'اسلامی ایام اور سیرت النبی ﷺ کانفرنس',
    description:
      'Observance of Milad-un-Nabi ﷺ, Ramadan preparations, Youm-e-Ali, and Iqbal Day with student presentations and poetry recitations.',
    image: '/images/islamic-art.jpg',
    schedule: 'Throughout the Hijri Calendar',
    impact: 'Connects youth with Islamic history and national intellectual figures.',
    category: 'Spiritual & Cultural',
  },
  {
    id: 'annual-function',
    title: 'Annual Prize Distribution Ceremony',
    urduTitle: 'سالانہ تقریب تقسیم انعامات',
    description:
      'Year-end event attended by parents and community members to honor academic position holders and sports champions.',
    image: '/images/annual-function.jpg',
    schedule: 'Annual Term End Event',
    impact: 'Celebrates diligence and motivates every student toward greater heights.',
    category: 'Institutional Event',
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Admissions Open for Academic Session 2026-2027',
    category: 'Admissions',
    date: 'Current Notice',
    urgent: true,
    summary:
      'Admissions are now open for Playgroup, Nursery, Kindergarten, and Grades 1 through 10. Limited seats are available. Apply online or visit our school admissions desk in Wadala.',
    fullDetails:
      'Prospectus and admission test syllabus are available at the administration office. Fee concessions available for orphan students and siblings.',
  },
  {
    id: 'ann-2',
    title: 'Annual Board Examination Registration Notice',
    category: 'Exams',
    date: 'Examination Desk',
    urgent: true,
    summary:
      'Matriculation (Grade 9 & 10) students must verify their registration data and submit required photographs for Board enrollment.',
    fullDetails:
      'Candidates must verify father name spelling, date of birth, and chosen science group before final Board submission.',
  },
  {
    id: 'ann-3',
    title: 'Parent-Teacher Meeting (PTM) for Term Progress',
    category: 'Events',
    date: 'Term Schedule',
    urgent: false,
    summary:
      'Parents are cordially invited to meet respective class in-charges and subject mentors to discuss student progress report cards.',
    fullDetails:
      'Timings: 8:30 AM to 1:00 PM. Parents are requested to adhere to their designated time slots.',
  },
  {
    id: 'ann-4',
    title: 'Summer / Winter Vacation Notice Guidelines',
    category: 'Holidays',
    date: 'Seasonal Notice',
    urgent: false,
    summary:
      'School will observe holidays as per Punjab Government notification. Vacation study packs and daily reading logs will be distributed.',
    fullDetails:
      'Students are encouraged to complete daily Quran recitation, handwriting practice, and science hobby projects during holidays.',
  },
];

export const ADMISSION_CLASSES = [
  'Playgroup',
  'Nursery',
  'Kindergarten (KG)',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9 (Science / Bio)',
  'Grade 9 (Computer Science)',
  'Grade 10 (Science / Bio)',
  'Grade 10 (Computer Science)',
];

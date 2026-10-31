/**
 * Edit this file to maintain the website. Arrays render automatically:
 * projects -> cards + detail pages; posts -> blog + articles;
 * services -> offer cards + galleries; process -> numbered steps.
 * Use a unique slug for each entry. Put new images in public/assets/.
 */
export interface Image { src: string; alt: string }
export interface Project { slug: string; title: string; category: string; cover: Image; paragraphs: string[]; gallery: Image[] }
export interface Post { slug: string; title: string; date: string; readTime: string; image: Image; paragraphs: string[] }
export interface Field { name: string; label: string; type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'textarea'; required?: boolean; min?: number }
const image = (file: string, alt: string): Image => ({
  src: `/assets/${file}`,
  alt,
});
const gallery = (files: string[], title: string): Image[] => files.map((file, i) => image(file, `${title} — view ${i + 1}`));
const heritage = 'Welcome to the 1.5 BHK flat in South Indian Theme Interior, a space that embraces the elegance, colors, and artistry of South India. Step into a world of cultural splendor and experience the captivating charm of a timeless heritage';

export const content = {
  brand: {
    name: 'SHRIGUM INTERIOR', title: 'Shrigum Interior',
    description: 'Residential and commercial interior design in Mumbai.',
    logo: { src: '/assets/shrigum-logo.png', alt: 'Shrigum Interior' },
    heroLogo: { src: '/assets/shrigum-logo.png', alt: 'Shrigum Interior' },
    hero: image('home-hero-interior.webp', 'A calm interior with natural textures and greenery'),
    email: 'shriguminterior99@gmail.com', address: 'Sion East, Sion, Mumbai, Maharashtra, India',
    // The source has a placeholder phone number. Set your real number here to display it.
    phone: '', copyright: '©2023 by SHRIGUM INTERIOR.',
  },
  navigation: [
    { label: 'Home', href: '#/' }, { label: 'Projects', href: '#/projects' },
    { label: 'Blog', href: '#/blog' }, { label: 'Book Appointment', href: '#/appointment' },
    { label: 'Contact', href: '#/contact' },
  ],
  about: {
    title: 'About Us',
    paragraphs: [
      'Welcome to Shrigum Interior, where innovation meets elegance and spaces are brought to life with creativity and flair. With a passion for design and a dedication to excellence, our firm is committed to transforming interiors into stunning and functional masterpieces',
      'With years of experience in the industry, We bring a wealth of knowledge and expertise to every project. We stay at the forefront of the latest trends, and innovative materials, to offer our clients the best solutions for their spaces. From concept development and spatial planning to sourcing the finest materials and overseeing the construction process, we are dedicated to delivering seamless, stress-free experiences from start to finish',
    ],
    gallery: gallery(['dadar-el-mejor-living-kitchen-01.webp', 'one-bhk-living-room-01.webp', 'three-bhk-living-room-01.webp'], 'Shrigum Interior residential design'),
  },
  processTitle: 'Our Process',
  process: [
    { title: 'Appointment Booking', text: "We understand the importance of your time, and we strive to make it easy for you to connect with our team. Whether you're looking to discuss a new project, explore design ideas, or get professional advice, our appointment booking option is designed to simplify the process and get you started on the path to transforming your space." },
    { title: 'Project Briefing', text: "This client briefing serves as a foundation for the interior designer to create a tailored design proposal that aligns with the client's needs and expectations. It's essential for both parties to have a clear understanding of the project scope, budget, and objectives to ensure a successful collaboration." },
    { title: 'Designing', text: 'Translating the brief into the blueprint. 2D drawings are essential tools for communication with clients, contractors, and other stakeholders involved in the project. They provide a clear visual representation of the design and serve as a reference for the implementation phase of the interior design project.' },
    { title: 'Execution', text: "The transition from 2D drawings to execution requires effective project management, communication, and attention to detail. The goal is to ensure that the final result closely aligns with the design vision and meets the client's expectations for aesthetics, functionality, and quality." },
    { title: 'Handover', text: 'From execution to handover is a critical phase that ensures the client receives a fully completed, functional, and aesthetically pleasing space. It is essential to maintain open communication with the client throughout this process to address any final details and ensure their satisfaction with the finished project.' },
  ],
  projectsTitle: 'Our Projects', workTitle: 'Our Work',
  categories: [
    { slug: 'residential', title: 'Residential Projects', image: image('category-residential.webp', 'Residential interior design') },
    { slug: 'commercial', title: 'Commercial Projects', image: image('category-commercial.webp', 'Restaurant interior design') },
  ],
  offerTitle: 'What we can Offer',
  services: [
    { slug: 'living-room', title: 'Living Room', image: image('service-living-room.webp', 'Living room designs'), gallery: gallery(['one-bhk-cover.webp', 'dadar-el-mejor-cover.webp', 'two-bhk-living-room.webp'], 'Living room') },
    { slug: 'kitchen', title: 'Kitchen', image: image('service-kitchen.webp', 'Kitchen designs'), gallery: gallery(['two-bhk-kitchen-03.webp', 'one-bhk-kitchen.webp', 'three-bhk-kitchen-01.webp'], 'Kitchen') },
    { slug: 'bedroom', title: 'Bedroom', image: image('service-bedroom.webp', 'Bedroom interior'), gallery: gallery(['two-bhk-cover.webp', 'dadar-el-mejor-bedroom-01.webp', 'three-bhk-master-bedroom-01.webp'], 'Bedroom') },
  ],
  contact: { title: 'Contact', mapLabel: 'View on Google Maps', fields: [
    { name: 'name', label: 'Name', type: 'text', required: true }, { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel' }, { name: 'address', label: 'Address', type: 'text' },
    { name: 'subject', label: 'Subject', type: 'text' }, { name: 'message', label: 'Message', type: 'textarea' },
  ] satisfies Field[] },
  appointment: { title: 'Appointment Booking Details', fields: [
    { name: 'name', label: 'Name', type: 'text', required: true }, { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'area', label: 'Carpet Area of Place (in sq.ft)', type: 'number', required: true, min: 1 },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'bedrooms', label: 'Number of Bedrooms', type: 'number', required: true, min: 0 },
    { name: 'address', label: 'Site Address', type: 'text', required: true }, { name: 'date', label: 'Appointment Date', type: 'date', required: true },
  ] satisfies Field[] },
  ui: {
    menu: 'Menu', closeMenu: 'Close menu', skip: 'Skip to content', book: 'Book Now',
    allProjects: 'All Projects', allPosts: 'All Posts', blog: 'Blog', viewProject: 'View project',
    readArticle: 'Read article', backProjects: 'Back to projects', backBlog: 'Back to blog',
    previous: 'Previous image', next: 'Next image', close: 'Close gallery', gallery: 'Image gallery',
    emailButton: 'Open email draft', emailHelp: 'This opens your email app with your details. Send the email to complete your enquiry. Appointment dates are requests and need confirmation from our team.',
    emailReady: 'Your email draft is ready. If your email app did not open, use the link below.',
    emailFallback: 'Open draft again', emailSubject: 'Website enquiry', appointmentSubject: 'Appointment request',
    notFound: 'Page not found', returnHome: 'Return home', recentPosts: 'Recent Posts',
  },
};

export const projects: Project[] = [
  {
    slug: 'dadar-el-mejor', title: '1.5 BHK Residency (Dadar El Mejor)', category: 'residential',
    cover: image('dadar-el-mejor-cover.webp', 'Dadar El Mejor living and kitchen design'),
    paragraphs: ['This modern 1.5 BHK flat boasts a contemporary design with a minimalist approach, featuring clean lines and functional furniture that create an elegant yet comfortable ambiance. The neutral color palette of beige, gray, and white enhances the spaciousness while large windows flood the interiors with natural light. Premium materials like sleek countertops, and sophisticated fixtures add a touch of luxury. The open-concept layout seamlessly connects the living, dining, and kitchen areas, promoting a sense of fluidity and relaxation. The master bedroom exudes coziness with ample sunlight, while the additional room is perfect for a home office or kid’s space. The modular kitchen is equipped with high-end appliances for convenience, and the bathroom offers a spa-like experience with modern fixtures and glass partitions. With its excellent ventilation, top-notch finishes, and proximity to essential amenities, this flat is perfect for young professionals, small families, or investors seeking comfort and style.'],
    gallery: gallery(['dadar-el-mejor-living-kitchen-01.webp', 'dadar-el-mejor-living-kitchen-02.webp', 'dadar-el-mejor-living-kitchen-03.webp', 'dadar-el-mejor-living-kitchen-04.webp', 'dadar-el-mejor-bedroom-01.webp', 'dadar-el-mejor-bedroom-02.webp', 'dadar-el-mejor-bedroom-03.webp', 'dadar-el-mejor-bedroom-04.webp', 'dadar-el-mejor-master-bedroom-01.webp', 'dadar-el-mejor-master-bedroom-02.webp', 'dadar-el-mejor-master-bedroom-03.webp'], 'Dadar El Mejor'),
  },
  {
    slug: 'one-bhk-residency', title: '1 BHK Residency', category: 'residential',
    cover: image('one-bhk-cover.webp', '1 BHK living room design'), paragraphs: [heritage],
    gallery: gallery(['one-bhk-living-room-01.webp', 'one-bhk-living-room-02.webp', 'one-bhk-interior-01.webp', 'one-bhk-interior-02.webp', 'one-bhk-kitchen.webp', 'one-bhk-bedroom-01.webp', 'one-bhk-bedroom-02.webp'], '1 BHK Residency'),
  },
  {
    slug: 'two-bhk-residency', title: '2 BHK Residency', category: 'residential',
    cover: image('two-bhk-cover.webp', '2 BHK bedroom design'), paragraphs: [heritage],
    gallery: gallery(['two-bhk-master-bedroom-01.webp', 'two-bhk-interior-01.webp', 'two-bhk-interior-02.webp', 'two-bhk-living-room.webp', 'two-bhk-kitchen-01.webp', 'two-bhk-kitchen-02.webp', 'two-bhk-kitchen-03.webp', 'two-bhk-kitchen-04.webp', 'two-bhk-interior-03.webp', 'two-bhk-interior-04.webp', 'two-bhk-kids-bedroom.webp', 'two-bhk-master-bedroom-02.webp', 'two-bhk-master-bedroom-03.webp'], '2 BHK Residency'),
  },
  {
    slug: 'three-bhk-residency', title: '3 BHK Residency', category: 'residential',
    cover: image('three-bhk-cover.webp', '3 BHK living room design'),
    paragraphs: ['Welcome to a meticulously crafted and thoughtfully designed 3BHK residence, where modern sophistication meets timeless elegance. In this inspiring project, we embark on a journey to transform a living space into a haven of comfort, aesthetics, and entertainment.'],
    gallery: gallery(['three-bhk-living-room-01.webp', 'three-bhk-entertainment-room-01.webp', 'three-bhk-living-room-02.webp', 'three-bhk-entertainment-room-02.webp', 'three-bhk-entertainment-room-03.webp', 'three-bhk-kitchen-01.webp', 'three-bhk-kitchen-02.webp', 'three-bhk-kitchen-03.webp', 'three-bhk-kitchen-04.webp', 'three-bhk-kids-bedroom-01.webp', 'three-bhk-kids-bedroom-02.webp', 'three-bhk-kids-bedroom-03.webp', 'three-bhk-master-bedroom-01.webp', 'three-bhk-master-bedroom-02.webp', 'three-bhk-master-bedroom-03.webp', 'three-bhk-guest-bedroom-01.webp', 'three-bhk-guest-bedroom-02.webp', 'three-bhk-guest-bedroom-03.webp'], '3 BHK Residency'),
  },
  {
    slug: 'mk-sweet-point', title: 'MK SWEET POINT (VASAI)', category: 'commercial',
    cover: image('mk-sweet-point-cover.webp', 'MK Sweet Point interior in Vasai'),
    // This description is repeated on the original Wix site; replace it with the correct project brief.
    paragraphs: [heritage],
    gallery: gallery(['mk-sweet-point-interior-01.webp', 'mk-sweet-point-interior-02.webp', 'mk-sweet-point-interior-03.webp', 'mk-sweet-point-interior-04.webp', 'mk-sweet-point-interior-05.webp'], 'MK Sweet Point'),
  },
];

export const posts: Post[] = [
  {
    slug: 'the-perfect-fusion-theater-room-and-an-entertainment-room', title: 'THE PERFECT FUSION : Theater Room and an Entertainment Room', date: 'Dec 15, 2023', readTime: '2 min read',
    image: image('blog-theater-entertainment-room.webp', 'Theater and entertainment room'),
    paragraphs: [
      'In the world of home design and entertainment, a new trend is emerging: the combination of a theater room and an entertainment room. But what exactly does this mean, and how can you create a space that seamlessly incorporates the best of both worlds? In this blog, we will explore the concept of merging these two distinct spaces and provide insights on designing a versatile, multifunctional room that caters to a wide range of entertainment experiences.',
      '## The Theater Room: Lights, Camera, Action',
      "A theater room traditionally conjures images of a dedicated space for cinematic experiences. It's a place where you can immerse yourself in your favorite movies, TV shows, or even video games. Key features of a theater room typically include:",
      'High-Definition Audio-Visual Setup: A theater room often boasts a large screen or projector and a surround sound system to replicate the immersive experience of a movie theater.',
      'Acoustic Excellence: Soundproofing and acoustic treatments ensure pristine audio quality, allowing you to hear every whisper and explosion with crystal clarity.',
      'Comfortable Seating: Plush, reclining chairs and optimal seating arrangements create a cozy, theater-like atmosphere.',
      'Dimmable Lighting: Adjustable lighting systems allow you to set the mood and focus on the screen.',
      '## The Entertainment Room: Where Fun Knows No Bounds',
      "An entertainment room, on the other hand, is designed to be a versatile space for various forms of enjoyment. It's a hub for socializing, gaming, music, and relaxation. Key features of an entertainment room often include:",
      "Gaming Paradise: Cutting-edge gaming setups with high-performance PCs, consoles, and comfortable gaming chairs make this room a gamer's dream.",
      'Multi-Functional Seating: Flexibility is paramount. You might have a gaming setup, a cozy reading nook, or a space for board games and card games.',
      'Aesthetic Freedom: Entertainment rooms often feature an eclectic mix of decor, including movie posters, gaming memorabilia, and personalized touches that showcase your interests.',
      'Smart Lighting and Sound Systems: These systems can adapt to various activities, enhancing the overall entertainment experience.',
    ],
  },
  {
    slug: 'cooking-up-creativity-tackling-challenges-in-a-small-kitchen', title: 'Cooking Up Creativity : Tackling Challenges in a Small Kitchen', date: 'Dec 15, 2023', readTime: '1 min read',
    image: image('two-bhk-kitchen-03.webp', 'A compact parallel kitchen'),
    paragraphs: [
      "Small parallel kitchens, also known as galley kitchens, are a space-saving marvel for those with limited square footage. They offer a streamlined layout that's both efficient and stylish. In this blog post, we'll explore the unique challenges presented by small parallel kitchens and provide practical solutions for turning them into functional, inviting spaces.",
      "One-Way Traffic: With limited width, it's crucial to manage the flow of people in and out of the kitchen. Designate one side for work and the other for traffic. Ensure that cabinets and appliances don't block the path, creating a clear walkway.",
      'Organizational Accessories: Small kitchens often struggle with storage, but the right accessories can help. Consider pull-out racks, drawer dividers, and vertical storage units to keep items organized and easy to find. Use clear containers for dry goods to maximize cabinet space.',
      'Open Shelving: To create a sense of openness, consider open shelving. Displaying attractive dishes, glassware, or cookware can add a personal touch while making the space feel more spacious. Be selective in what you display to avoid a cluttered look.',
      'Appliance Garages: To keep small appliances off the countertops and out of sight, consider appliance garages. These retractable storage units allow you to access your appliances when needed and keep them hidden when not in use.',
      'Small parallel kitchens might present design challenges, but with creative solutions and a focus on organization, they can become highly functional and visually appealing spaces. Embrace the limitations of your galley kitchen, and transform it into a culinary haven that maximizes every square inch.',
    ],
  },
  {
    slug: 'a-serene-retreat', title: 'A SERENE RETREAT', date: 'Dec 15, 2023', readTime: '1 min read',
    image: image('two-bhk-living-room.webp', 'Scandinavian living room with a pastel green sofa'),
    paragraphs: [
      'Scandinavian design, with its clean lines, natural elements, and a focus on functionality, has captivated design enthusiasts worldwide. Our recent 2BHK project embodies the essence of Scandinavian design, and in this blog post, we take you on a tour through this stunning space while sharing insights from our talented interior designer.',
      "Living Room: As you step into the living room, you'll be greeted by an abundance of natural light streaming through large windows. The walls are adorned with soft, neutral colors like whites and brown, creating an airy and open atmosphere. Comfortable, yet minimalistic furniture pieces take center stage. A sleek, pastel green sofa pairs beautifully with a light wood center table, creating a cozy and functional seating area.",
      "A Scandinavian living room is more than just a well-designed space; it's an experience in serenity and comfort. By embracing the principles of simplicity, functionality, and a connection to nature, you can transform your living room into a cozy haven. It's a place where you can unwind, enjoy the warmth of natural materials, and appreciate the beauty of understated elegance. The Scandinavian living room design experience is an invitation to slow down, relax, and savor the tranquil beauty of your surroundings.",
    ],
  },
  {
    slug: 'dreamy-minimalist-magic-designs', title: 'BEST INTERIOR DESIGN IDEAS - DREAMY MINIMALIST MAGIC DESIGNS', date: 'Dec 3, 2023', readTime: '2 min read',
    image: image('blog-minimalist-living-room.webp', 'Minimalist living room design'),
    paragraphs: [
      "In a world that often feels chaotic and cluttered, the minimalist design philosophy offers a breath of fresh air. Embracing simplicity and functionality, minimalism has the power to transform even the smallest spaces into stylish sanctuaries. If you're the proud owner of a 1BHK apartment and desire a home that exudes serenity and sophistication, this blog is your guide to creating a minimalist masterpiece.",
      '## Decluttering with Purpose',
      'The foundation of minimalism is decluttering. Start by going through your possessions and ask yourself if they serve a purpose or bring you joy. If not, it might be time to let them go. Minimalist living is about quality, not quantity. Focus on the essentials and keep your space free from unnecessary items. Opt for multifunctional furniture pieces that can help maximize your space and eliminate clutter.',
      '## A Monochromatic Palette',
      'One of the key characteristics of minimalist design is the use of a monochromatic color palette. Stick to neutral colors such as whites, grays, and blacks for your walls and major furniture pieces. This creates a sense of unity and simplicity, making your 1BHK apartment appear more spacious and serene. Use small accents of color sparingly to add visual interest.',
      '## Simple Décor',
      'When it comes to décor, less is more. Choose a few key pieces that align with your minimalist theme. Consider incorporating natural elements like potted plants, which not only add a touch of nature but also improve air quality. Select minimalist art or photographs for your walls, and keep surfaces clean and uncluttered.',
      '## Open Spaces',
      'Maximize the sense of space in your 1BHK by creating open, unobstructed areas. Arrange furniture in a way that allows for easy movement and draws attention to the simplicity of the design. Avoid over-accessorizing, and keep countertops and shelves clear of unnecessary items.',
      '## Quality Over Quantity',
      'Embrace the philosophy of "less is more." Invest in high-quality, timeless pieces that will stand the test of time. When you buy fewer items of better quality, you reduce waste and ensure that your home remains stylish for years to come.',
      '## Functional Storage Solutions',
      'In a 1BHK apartment, effective storage solutions are crucial. Opt for built-in cabinets and shelves to keep your belongings organized and out of sight. Storage ottomans and under-bed storage can also be incredibly useful in maximizing your space.',
      '## Mindful Living',
      "Ultimately, the essence of minimalism goes beyond aesthetics. It's a mindset. Embrace a life with intention, where you focus on what truly matters and find joy in the simplicity of your surroundings. Your 1BHK apartment can become a haven of peace and tranquility.",
      'Incorporating minimalist principles into your 1BHK project can result in a space that is not only aesthetically pleasing but also functional and calming. By decluttering, choosing the right colors and furnishings, and adopting a minimalist mindset, you can transform your apartment into a serene and welcoming home. Enjoy the journey towards minimalism, and savor the newfound sense of space and tranquility it brings to your life.',
    ],
  },
];

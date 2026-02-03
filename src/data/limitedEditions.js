const CLOUDINARY_BASE =
  "https://res.cloudinary.com/dafcbp9mu/image/upload";

const cld = (publicId, w = 800) =>
  `${CLOUDINARY_BASE}/f_auto,q_auto,w_${w}/${publicId}`;

export const limitedEditions = [

    {
  id: "78620",
  name: "The Cambridge Diary",
  category: "limited-editions",
  collection: "Limited Edition",
  price: 1500,
  pageQuality: "Canvas Pages",
  pages: "150-200 Pages",
  size: "9*6",
  availability: "Limited",
  description: "The Cambridge Diary – Premium Handmade Journal for Thoughtful Minds & Timeless Writing.\n\nThe Cambridge Diary by Damn Journals is a refined, handcrafted journal inspired by classic academia, intellectual depth, and quiet sophistication. Designed for thinkers, writers, planners, and dreamers, this diary reflects a world where ideas are respected, words are measured, and writing is a lifelong companion.\n\nRooted in a timeless aesthetic, The Cambridge Diary blends vintage charm with modern luxury. If you are searching for a premium handmade diary in India, a luxury journal for writing and planning, or a classic notebook with an intellectual feel, this diary is made for you.\n\nThis is a journal that belongs on your desk, in your bag, and in your life.\n\nWhy You’ll Love This Diary\n\nThe Cambridge Diary is built for clarity and consistency. It encourages focused thinking, structured journaling, and intentional writing. Whether you’re documenting daily thoughts, planning goals, studying, or capturing long-form reflections, this diary supports disciplined creativity.\n\nIts calm, scholarly presence helps reduce mental clutter and brings order to scattered thoughts. Writing in this diary feels grounding, like returning to a familiar library where ideas are allowed to grow without noise.\n\nIt’s ideal for daily journaling, note-taking, self-reflection, and mindful planning.\n\nWhat Makes The Cambridge Diary Special\n\nEvery Cambridge Diary is handcrafted using premium-quality paper that offers a smooth and satisfying writing experience. The pages are suitable for daily use, long writing sessions, and thoughtful documentation.\n\nThe durable handcrafted binding ensures the diary lasts for years, becoming a personal archive of your ideas, growth, and memories. Its minimal, classic design is intentionally understated, allowing your words to take center stage.\n\nThis diary doesn’t chase trends. It respects tradition.\n\nHandcrafted in India with Precision\n\nThe Cambridge Diary is proudly made in India by skilled artisans who value precision, patience, and craftsmanship. Each piece carries subtle individuality, reminding you that no two journals, like no two minds, are the same.\n\nThis diary represents Indian craftsmanship meeting timeless global design.\n\nWho This Diary Is For\n\nThe Cambridge Diary is perfect for writers, thinkers, and lifelong learners; students, professionals, and planners; those who love classic, vintage-style journals; people seeking a premium diary in India; and meaningful gifting for scholars, creatives, and professionals.\n\nExplore More from Damn Journals\n\nPair The Cambridge Diary with other signature Damn Journals like The Oxford Memorial, Dil Ki Dastak, The Black Moon Journal, and 7 Chakras Manifesting Journal, each designed for a different mood and purpose.\n\nThe Cambridge Diary is where thoughts mature, ideas settle, and writing becomes a habit.\n\nNot Just a Journal. It’s a Damn Legacy.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: true,
  limitedEdition: true,
  serialNumber: "78620",
  images: [
    cld("journals/thecambridgediary1.jpg"),
    cld("journals/thecambridgediary2.jpg"),
    cld("journals/thecambridgediary3.jpg"),
    cld("journals/canvaspages.jpg")
  ]
}

]
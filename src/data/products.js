const CLOUDINARY_BASE =
  "https://res.cloudinary.com/dafcbp9mu/image/upload";

const cld = (publicId, w = 800) =>
  `${CLOUDINARY_BASE}/f_auto,q_auto,w_${w}/${publicId}`;

export const products = [
  { 
    id: "78602", 
    name: "Dil Ki Dastak", 
    category: "journals", 
    price: 600, 
    pageQuality: "Vintage Pages",
    pages: "150-200 Pages",
    size: "7*5",
    journalType: "Leather Journal",
    description: "Dil Ki Dastak Journal by Damn Journals is a handcrafted luxury journal created for heartfelt writing and emotional expression. Thoughtfully made in India with premium-quality paper and a soulful, vintage-inspired design, this journal is ideal for journaling, poetry, letters, gratitude, and self-reflection. Its smooth, durable pages offer a rich writing experience, making it perfect for daily use or meaningful gifting. Designed for those who listen to their inner voice and write from the heart.",
    tagline: "Not Just a Journal, It’s a Damn Legacy",
    featured: true,
    images: [
     cld("journals/dilkidastak1.jpg"),
     cld("journals/dilkidastak2.jpg"),
      cld("journals/vintagepages.jpg"),
    ]
  },
  { 
    id: "78603", 
    name: "The Black Moon", 
    category: "journals", 
    price: 800, 
    pageQuality: "Vintage Pages",
    pages: "150-200 Pages",
    size: "7*5",
    journalType: "Leather Journal",
    description: "The Black Moon Journal by Damn Journals is a premium handcrafted luxury journal designed for deep journaling, writing, and self-reflection. Made in India by skilled artisans, this handmade journal features high-quality paper and a bold, minimal black aesthetic that appeals to writers, creatives, and thinkers. Ideal for daily journaling, poetry, manifestation, planning, and personal notes, The Black Moon Journal offers a smooth writing experience with pens and ink.",
    tagline: "Not Just a Journal, It’s a Damn Legacy",
    featured: true,
    images: [
      cld("journals/theblackmoon1.jpg"),
      cld("journals/vintagepages.jpg"),
    ]
  },
  { 
    id: "78601", 
    name: "XO Diary", 
    category: "journals", 
    price: 600, 
    pageQuality: "Vintage Pages",
    pages: "100-150 Pages",
    size: "7*5",
    description: "XO Diary by Damn Journals is a handcrafted luxury journal designed for meaningful writing and everyday reflection. Made in India with premium-quality paper and a minimal, elegant cover, this diary is perfect for journaling, poetry, gratitude, manifestation, and personal notes. Smooth, durable pages ensure a comfortable writing experience with pens and ink. Ideal for daily use or gifting.",
    tagline: "Not Just a Journal, It’s a Damn Legacy",
    featured: false,
    images: [
      cld("journals/xodiary1.jpg"),
      cld("journals/xodiary2.jpg"),
      cld("journals/xodiary3.jpg"),
      cld("journals/vintagepages.jpg"),
    ]
  },
  { 
    id: "78604", 
    name: "Surkh Rooh Journal", 
    category: "journals", 
    price: 750, 
    pageQuality: "Vintage Pages",
    pages: "150-200 Pages",
    size: "7*5",
    journalType: "Leather Journal",
    description: "Surkh Rooh Journal by Damn Journals is a handcrafted luxury black journal created for intense thoughts, deep emotions, and powerful writing. Made in India using premium-quality paper and a bold black aesthetic, this handmade journal is ideal for journaling, poetry, manifestation, planning, and self-reflection. Designed for writers and creatives who prefer depth over noise.",
    tagline: "Not Just a Journal, It’s a Damn Legacy",
    featured: true,
    images: [
      cld("journals/surkhrooh1.jpg"),
      cld("journals/surkhrooh2.jpg"),
      cld("journals/surkhrooh3.jpg"),
      cld("journals/vintagepages.jpg"),
    ]

  },
  { 
    id: "78605", 
    name: "The Red Moon", 
    category: "journals", 
    price: 700, 
    pageQuality: "Vintage Pages",
    pages: "150-200 Pages",
    size: "7*5",
    description: "The Red Moon Journal by Damn Journals is a handcrafted luxury journal designed for bold thoughts, passion, and expressive writing. Made in India with premium-quality paper and a striking aesthetic, this handmade journal is perfect for journaling, poetry, manifestation, planning, and personal reflection. Its smooth, durable pages provide an excellent writing experience.",
    tagline: "Not Just a Journal, It’s a Damn Legacy",
    featured: false,
    images: [
  cld("journals/theredmoon1.jpg"),
  cld("journals/theredmoon2.jpg"),
  cld("journals/theredmoon3.jpg"),
  cld("journals/vintagepages.jpg"),
]
  },
  {
  id: "78606",
  name: "The Dusty Moon",
  category: "journals",
  price: 850,
  pageQuality: "Vintage Pages",
  pages: "150-200 Pages",
  size: "7*5",
  journalType: "Leather Journal",
  description: "The Dusty Moon Journal by Damn Journals is a handcrafted luxury journal designed for bold thoughts, passion, and expressive writing. Made in India with premium-quality paper and a striking aesthetic, this handmade journal is perfect for journaling, poetry, manifestation, planning, and personal reflection. Its smooth, durable pages provide an excellent writing experience, making it ideal for daily use by writers, creatives, and dreamers. This luxury handmade journal is perfect for anyone searching for a premium journal in India, a high-quality diary for writing, or a thoughtfully crafted notebook for self-growth. With its timeless design and artisanal finish, The Dusty Moon Journal also makes a meaningful gift. Created to hold emotions, ideas, and stories that matter, it is more than just a journal.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: false,
  images: [
  cld("journals/thedustymoon1.jpg"),
  cld("journals/thedustymoon2.jpg"),
  cld("journals/thedustymoon3.jpg"),
  cld("journals/vintagepages.jpg"),
]

}
,
{
  id: "78607",
  name: "Dil Ki Dastak (Green)",
  category: "journals",
  price: 600,
  pageQuality: "Vintage Pages",
  pages: "150-200 Pages",
  size: "7*5",
  description: "Dil Ki Dastak is a handcrafted luxury journal inspired by calm, growth, and heartfelt expression. Made in India with premium-quality paper and a soothing green aesthetic, this handmade journal is ideal for journaling, poetry, gratitude, manifestation, and self-reflection. Its smooth and durable pages offer a comfortable writing experience, perfect for daily use. This luxury green journal is perfect for those searching for a premium handmade journal in India, an aesthetic diary for writing, or a high-quality notebook for personal growth. Thoughtfully crafted with a timeless design, Dil Ki Dastak (Green) also makes a meaningful gift for writers, creatives, and mindful souls. A journal designed to listen when your heart speaks.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: false,
  images: [
  cld("journals/dilkidastakgreen1.jpg"),
  cld("journals/dilkidastakgreen2.jpg"),
  cld("journals/dilkidastakgreen3.jpg"),
  cld("journals/vintagepages.jpg"),
]

}
,
{
  id: "78608",
  name: "The EarthBound",
  category: "journals",
  price: 600,
  pageQuality: "Vintage Pages",
  pages: "150-200 Pages",
  size: "7*5",
  journalType: "Leather Journal",
  description: "The EarthBound Journal by Damn Journals is a handcrafted luxury journal inspired by nature, grounding, and mindful living. Made in India with premium-quality paper and an earthy, minimal aesthetic, this handmade journal is perfect for journaling, writing, gratitude, manifestation, planning, and self-reflection. Designed for writers and creatives who seek calm and clarity, it offers a smooth and durable writing experience for everyday use. This luxury handmade journal is ideal for anyone searching for a premium journal in India, an eco-inspired diary, or a high-quality notebook for personal growth and mindful journaling. With its timeless design and natural tones, The EarthBound Journal also makes a thoughtful gift for those who value slow living and intentional writing.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: false,
  images: [
  cld("journals/earthbound1.jpg"),
  cld("journals/earthbound2.jpg"),
  cld("journals/earthbound3.jpg"),
  cld("journals/vintagepages.jpg"),
]

}
,
{
  id: "78609",
  name: "Dil Ki Dastak (Black)",
  category: "journals",
  price: 700,
  pageQuality: "Vintage Pages",
  pages: "150-200 Pages",
  size: "7*5",
  description: "Dil Ki Dastak Journal by Damn Journals is a handcrafted luxury journal created for heartfelt writing and emotional expression. Thoughtfully made in India with premium-quality paper and a soulful, vintage-inspired design, this journal is ideal for journaling, poetry, letters, gratitude, and self-reflection. Its smooth, durable pages offer a rich writing experience, making it perfect for daily use or meaningful gifting. Designed for those who listen to their inner voice and write from the heart.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: false,
  images: [
  cld("journals/dilkidastakblack1.jpg"),
  cld("journals/dilkidastakblack2.jpg"),
  cld("journals/dilkidastakblack3.jpg"),
  cld("journals/vintagepages.jpg"),
]

}
,
{
  id: "78610",
  name: "The Journey Journal",
  category: "journals",
  price: 500,
  pageQuality: "Canvas Pages",
  pages: "100-150 Pages",
  size: "7*5",
  description: "The Journey Journal by Damn Journals is a handcrafted luxury journal created to capture growth, experiences, and stories along the way. Made in India with premium-quality paper and a timeless, minimal aesthetic, this handmade journal is perfect for travel journaling, daily writing, planning, gratitude, and self-reflection. Its smooth, durable pages make writing effortless, whether at home or on the move. This luxury handmade journal is ideal for anyone searching for a premium journal in India, a travel diary, or a high-quality notebook for writing and personal development. Thoughtfully designed for dreamers, explorers, and mindful souls, The Journey Journal is also a meaningful gift for those who believe every path has a story worth writing.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: false,
  images: [
  cld("journals/thejourneyjournal1.jpg"),
  cld("journals/thejourneyjournal2.jpg"),
  cld("journals/thejourneyjournal3.jpg"),
]

}
,
{
  id: "78611",
  name: "The Inner Forest",
  category: "journals",
  price: 650,
  pageQuality: "Vintage Pages",
  pages: "150-200 Pages",
  size: "7*5",
  description: "The Inner Forest Journal by Damn Journals is a handcrafted luxury journal inspired by nature, introspection, and inner growth. Made in India with premium-quality paper and a calming, earthy aesthetic, this handmade journal is perfect for journaling, writing, mindfulness, gratitude, manifestation, and self-reflection. Designed for those who seek clarity and balance, it offers a smooth and durable writing experience for daily use. This luxury handmade journal is ideal for anyone searching for a premium journal in India, a nature-inspired diary, or a high-quality notebook for personal growth and mindful living. Thoughtfully crafted with a timeless design, The Inner Forest Journal also makes a meaningful gift for writers, creatives, and seekers of calm.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: false,
  images: [
  cld("journals/theinnerforest1.jpg"),
  cld("journals/theinnerforest2.jpg"),
  cld("journals/theinnerforest3.jpg"),
  cld("journals/vintagepages.jpg"),
]

}
,{
  id: "78612",
  name: "Raah Ki Khoj",
  category: "journals",
  price: 600,
  pageQuality: "Canvas Pages",
  pages: "150-200 Pages",
  size: "7*5",
  description: "Raah Ki Khoj Journal by Damn Journals is a handcrafted luxury journal created for self-discovery, clarity, and finding direction. Made in India with premium-quality paper and a soulful, minimal aesthetic, this handmade journal is perfect for journaling, planning, reflection, goal setting, and mindful writing. Its smooth and durable pages offer a comfortable writing experience, ideal for everyday use. This luxury handmade journal is perfect for anyone searching for a premium journal in India, a self-discovery diary, or a high-quality notebook for personal growth and intentional living. Thoughtfully designed for thinkers, dreamers, and seekers, Raah Ki Khoj is more than just a journal—it is a companion for every path you choose.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: false,
  images: [
  cld("journals/raahkikhoj1.jpg"),
  cld("journals/raahkikhoj2.jpg"),
  cld("journals/raahkikhoj3.jpg"),
]

}
,
{
  id: "78613",
  name: "The Unicorn World",
  category: "journals",
  price: 750,
  pageQuality: "Vintage Pages",
  pages: "150-200 Pages",
  size: "7*5",
  description: "The Unicorn World Journal by Damn Journals is a handcrafted luxury journal designed to celebrate imagination, creativity, and limitless thinking. Made in India with premium-quality paper and a playful yet elegant aesthetic, this handmade journal is perfect for journaling, creative writing, sketching ideas, affirmations, and daily notes. Its smooth and durable pages provide a delightful writing experience for creatives of all ages. This luxury handmade journal is ideal for anyone searching for a premium journal in India, a creative diary, or a high-quality notebook for writing and self-expression. Thoughtfully crafted to inspire wonder and originality, The Unicorn World Journal also makes a meaningful gift for dreamers, artists, and imaginative minds.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: true,
  images: [
  cld("journals/theunicornworld1.jpg"),
  cld("journals/theunicornworld2.jpg"),
  cld("journals/theunicornworld3.jpg"),
  cld("journals/vintagepages.jpg"),
]
}
,
{
  id: "78614",
  name: "The Glowy Nights",
  category: "journals",
  price: 500,
  pageQuality: "Vintage Pages",
  pages: "150-200 Pages",
  size: "6*5",
  description: "The Glowy Nights Journal by Damn Journals is a handcrafted luxury journal created for late-night thoughts, quiet reflections, and moments of clarity that arrive after dark. Made in India with premium-quality paper and a sleek, aesthetic design, this handmade journal is perfect for journaling, writing, gratitude, manifestation, and self-reflection. Its smooth, durable pages make writing effortless, even during long midnight sessions. This luxury handmade journal is ideal for anyone searching for a premium journal in India, an aesthetic diary for night journaling, or a high-quality notebook for personal growth and mindful writing. Thoughtfully designed for thinkers, dreamers, and overthinkers alike, The Glowy Nights Journal is also a beautiful gifting choice.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: true,
  images: [
  cld("journals/theglowynights1.jpg"),
  cld("journals/theglowynights2.jpg"),
  cld("journals/theglowynights3.jpg"),
  cld("journals/vintagepages.jpg"),
]

}
,
{
  id: "78616",
  name: "The Oxford Memorial",
  category: "journals",
  price: 1499,
  pageQuality: "Canvas Pages",
  pages: "150-200 Pages",
  size: "9*5",
  description: "The Oxford Memorial Journal by Damn Journals is a handcrafted luxury journal designed for timeless writing, intellectual reflection, and meaningful expression. Made in India with premium-quality paper and a classic, elegant aesthetic, this handmade journal is perfect for journaling, note-taking, planning, poetry, and personal growth. Its smooth, durable pages provide a refined writing experience for daily use. This luxury handmade journal is ideal for anyone searching for a premium journal in India, a vintage-inspired diary, or a high-quality notebook for thoughtful writing and self-reflection. Crafted with care and sophistication, The Oxford Memorial Journal is also a perfect gift for writers, students, thinkers, and creatives who value quality and legacy.",
  tagline: "Not Just a Journal, It’s a Damn Legacy",
  featured: true,
  images: [
  cld("journals/theoxfordmemorial1.jpg"),
  cld("journals/theoxfordmemorial2.jpg"),
  cld("journals/theoxfordmemorial3.jpg"),
]

}
,
];
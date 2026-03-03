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
    description:
      "The Cambridge Diary by Damn Journals is a premium handcrafted journal inspired by classic academia and timeless design. Made in India with high-quality canvas pages, it is ideal for focused writing, planning, and deep reflection.",
    tagline: "Not Just a Journal, It’s a Damn Legacy",
    featured: true,
    limitedEdition: true,
    serialNumber: "78620",
    images: [
      cld("journals/thecambridgediary1.jpg"),
      cld("journals/cambridgejournal1.jpg"),
      cld("journals/canvasall.jpg"),
    ],
  },

  {
    id: "78621",
    name: "Evil’s Eye Journal",
    category: "limited-editions",
    collection: "Limited Edition",
    price: 2000,
    pageQuality: "Canvas Pages",
    pages: "150-200 Pages",
    size: "9*6",
    availability: "Limited",
    description:
      "The Evil’s Eye Journal by Damn Journals is a bold handcrafted journal symbolizing protection, awareness, and inner strength. Designed with premium canvas pages, it is perfect for expressive writing, manifestation, and personal reflection.",
    tagline: "Not Just a Journal, It’s a Damn Legacy",
    featured: false,
    limitedEdition: true,
    serialNumber: "78621",
    images: [
      cld("journals/theevilseye1.jpg"),
      cld("journals/theevilseye2.jpg"),
      // cld("journals/evil_seyejournal2.jpg"),
      cld("journals/vintageall.jpg"),
    ],
  },

  {
    id: "78622",
    name: "7 Chakras Journal",
    category: "limited-editions",
    collection: "Limited Edition",
    price: 2500,
    pageQuality: "Canvas Pages",
    pages: "150-200 Pages",
    size: "9*6",
    availability: "Limited",
    description:
      "The 7 Chakras Journal by Damn Journals is a thoughtfully crafted journal designed for balance, mindfulness, and manifestation. With premium canvas pages, it supports intentional writing, self-growth, and spiritual clarity.",
    tagline: "Not Just a Journal, It’s a Damn Legacy",
    featured: false,
    limitedEdition: true,
    serialNumber: "78622",
    images: [
      cld("journals/7chakras1.jpg"),
      cld("journals/7chakras2.jpg"),
      cld("journals/canvasall.jpg"),
    ],
  },

];

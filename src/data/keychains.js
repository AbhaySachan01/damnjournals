const CLOUDINARY_BASE =
  "https://res.cloudinary.com/dafcbp9mu/image/upload";

const cld = (publicId, w = 800) =>
  `${CLOUDINARY_BASE}/f_auto,q_auto,w_${w}/${publicId}`;

export const keychains = [
  {
    id: "78621",
    name: "SAFAR Keychain (Brown)",
    category: "Keychains",
    price: 150,
    material: "Canvas Pages",
    size: "Mini Journal",
    weight: "Lightweight",
    pages: "50-70 Pages",
    tagline: "Not Just a Journal, It’s a Damn Legacy.",
    description:
      "SAFAR Keychain is a handcrafted mini journal keychain designed in a vintage luxury style. Inspired by travel and self-expression, it’s a meaningful everyday accessory for writers, creators, and explorers. Lightweight, durable, and thoughtfully detailed, it works as both a symbolic keepsake and a unique gifting option for people who carry stories wherever they go.",
    images: [
      cld("journals/safarbrown1.jpg"),
      cld("journals/safarbrown2.jpg"),
    
      // "/images/keychains/safar-brown-3.jpg",
    ],
  },
  {
    id: "78622",
    name: "SAFAR Keychain (Black)",
    category: "Keychains",
    price: 150,
    material: "Canvas Pages",
    size: "Mini Journal",
    weight: "Lightweight",
    pages: "50-70 Pages",
    tagline: "Not Just a Journal, It’s a Damn Legacy.",
    description:
      "SAFAR Keychain is a handcrafted mini journal keychain designed in a vintage luxury style. Inspired by travel and self-expression, it’s a meaningful everyday accessory for writers, creators, and explorers. Lightweight, durable, and thoughtfully detailed, it works as both a symbolic keepsake and a unique gifting option for people who carry stories wherever they go.",
    images: [
      cld("journals/safarblack1.jpg"),
      cld("journals/safarblack2.jpg"),
      // "/images/keychains/safar-black-3.jpg",
    ],
  },
];

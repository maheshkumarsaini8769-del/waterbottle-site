export const PRODUCTS = [
  {
    id: '200ml-case',
    title: '200ml Case (24 Pack)',
    subtitle: 'Events, Airlines & Hospitality Mini Bottles',
    description: 'Compact 200ml bottles in a master carton of 24. The ideal serving size for conferences, weddings, flights, hotels, and premium hospitality experiences.',
    pricePerCase: 180.00,
    price: 180.00,
    unitPrice: 7.50,
    packSize: '24 Bottles / Case',
    unitsPerCase: 24,
    volume: '200 ml × 24 (4.8 Liters Total)',
    moq: 10,
    badge: 'Event Pack',
    rating: 4.8,
    reviews: 96,
    image: '/bottle.png',
    tierDiscounts: [
      { min: 10, label: '10 - 49 Cases', price: 180.00, discount: 'Standard B2B' },
      { min: 50, label: '50 - 149 Cases', price: 162.00, discount: '10% OFF' },
      { min: 150, label: '150+ Cases (Pallet)', price: 144.00, discount: '20% OFF' }
    ],
    specs: {
      packaging: 'Heavy-Duty Corrugated Master Carton (24 Units)',
      totalVolume: '4.8 Liters per Case',
      grossWeight: '6.2 kg / Case',
      moq: '10 Cases (240 Bottles Minimum)',
      ph: '7.2 - Neutral',
      tds: '120 ppm Balanced',
      certifications: 'BIS / FSSAI / ISO 22000 Certified'
    }
  },
  {
    id: '500ml-case',
    title: '500ml Case (24 Pack)',
    subtitle: 'Event & Hospitality Wholesale Pack',
    description: 'Master carton containing 24 shrink-wrapped 500ml bottles. Ideal for corporate conferences, events, hotels, catering, and retail redistribution.',
    pricePerCase: 240.00,
    price: 240.00,
    unitPrice: 10.00,
    packSize: '24 Bottles / Case',
    unitsPerCase: 24,
    volume: '500 ml × 24 (12 Liters Total)',
    moq: 5,
    badge: 'Popular B2B',
    rating: 4.9,
    reviews: 184,
    image: '/bottle.png',
    tierDiscounts: [
      { min: 5, label: '5 - 19 Cases', price: 240.00, discount: 'Standard B2B' },
      { min: 20, label: '20 - 49 Cases', price: 216.00, discount: '10% OFF' },
      { min: 50, label: '50+ Cases (Pallet)', price: 192.00, discount: '20% OFF' }
    ],
    specs: {
      packaging: 'Heavy-Duty Corrugated Master Carton (24 Units)',
      totalVolume: '12 Liters per Case',
      grossWeight: '12.8 kg / Case',
      moq: '5 Cases (120 Bottles Minimum)',
      ph: '7.2 - Neutral',
      tds: '120 ppm Balanced',
      certifications: 'BIS / FSSAI / ISO 22000 Certified'
    }
  },
  {
    id: '750ml-case',
    title: '750ml Case (12 Pack)',
    subtitle: 'Fitness & Corporate Desk Supply',
    description: 'Master carton containing 12 premium 750ml bottles. Preferred by premium fitness centers, sports academies, executive offices, and luxury retreats.',
    pricePerCase: 300.00,
    price: 300.00,
    unitPrice: 25.00,
    packSize: '12 Bottles / Case',
    unitsPerCase: 12,
    volume: '750 ml × 12 (9 Liters Total)',
    moq: 5,
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 328,
    image: '/bottle.png',
    tierDiscounts: [
      { min: 5, label: '5 - 19 Cases', price: 300.00, discount: 'Standard B2B' },
      { min: 20, label: '20 - 49 Cases', price: 270.00, discount: '10% OFF' },
      { min: 50, label: '50+ Cases (Pallet)', price: 240.00, discount: '20% OFF' }
    ],
    specs: {
      packaging: 'Heavy-Duty Corrugated Master Carton (12 Units)',
      totalVolume: '9 Liters per Case',
      grossWeight: '9.6 kg / Case',
      moq: '5 Cases (60 Bottles Minimum)',
      ph: '7.2 - Neutral',
      tds: '120 ppm Balanced',
      certifications: 'BIS / FSSAI / ISO 22000 Certified'
    }
  },
  {
    id: '1000ml-case',
    title: '1 Liter Case (12 Pack)',
    subtitle: 'Hotels, Catering & Institution Supply',
    description: 'Master carton of 12 flagship 1-Liter pure spring water bottles. Specially packaged for fine dining, hotels, corporate headquarters, and institutional consumption.',
    pricePerCase: 360.00,
    price: 360.00,
    unitPrice: 30.00,
    packSize: '12 Bottles / Case',
    unitsPerCase: 12,
    volume: '1 Liter × 12 (12 Liters Total)',
    moq: 5,
    badge: 'Enterprise Choice',
    rating: 5.0,
    reviews: 580,
    image: '/bottle.png',
    tierDiscounts: [
      { min: 5, label: '5 - 19 Cases', price: 360.00, discount: 'Standard B2B' },
      { min: 20, label: '20 - 49 Cases', price: 324.00, discount: '10% OFF' },
      { min: 50, label: '50+ Cases (Pallet)', price: 288.00, discount: '20% OFF' }
    ],
    specs: {
      packaging: 'Reinforced Export-Grade Carton (12 Units)',
      totalVolume: '12 Liters per Case',
      grossWeight: '12.9 kg / Case',
      moq: '5 Cases (60 Bottles Minimum)',
      ph: '7.2 - Perfectly Neutral',
      tds: '120 ppm Balanced',
      certifications: 'BIS / FSSAI / ISO 22000 Certified'
    }
  }
];

export const IMAGES = {
  heroBottle: '/bottle.png',
  detailBottle: '/bottle.png',
  rootScreen: '/screen.png',
  sustainability: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPphJJtJ-2pl1K9sOiIYHEeLkX5abLgci1jfjT_me7t6UlJg7E3tkMp5LNEPFjvDq-BudayzWGPfz-X8Ot1RwV-RyRl3dfMzbvkKjHgJ3uba3VwXda01RRE0Szl73paPyLhJcLRfOKTU6j5YPmRxr7z-CwI42m-3i6hbwzEztGZ6x7gxAb95jj3vS33ep9GHmekfHp8ChfW0QmbTvJqengY9oO8aRnNDfxr8e059Jdxh0BFuPCLzu-MQ',
  officeBuilding: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCFqGxbYw7Tta6bKKFY5HyuH35WS_v0wmRc_Uewn33VOnbgMSGee1SHra3hsNWr1WFUg0hNzfAgHmp0Q3pyjEs-j9rlcEK_nXerWYSNasy5clWI-nDyMZCsMqpMIIsgWYQ2tHXomK6T_huh2O0TkgreeTS8QxQorTiTo_BG3xNxUkZCiVceto3U5kQ6J_cig51nTk9gtZfotA6xPywV-K5B4e5ZhagVGvpn6nK8JI2V-mGtwqYZq1Ug',
  waterDrops: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUTXSlGCy52GgOW06n8AHWNL0-EU-FszdB8Q2eOeA_3bindsKKU8E8q6DXkWwES40lcrGdSnzwalWkVS4oZWdWVm2SaeX4bVlZokVBqkYfENiz2_yjJAi2FbTsVSxXkGWNuDHmn0e3QeiG-DaUvnsc7ZUFrSB7kBLrfdIh4H7UyyzpAMYMs1NRO1CB4UcYDbEiMMZklcfSu2dsu1v74-1_0Y6ZJ-Mo_nrHt0FgQdKa-vI9P2G1EkHmVA',
  bkcMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd-9TH6YYtmmLw35_ci3-lI32aX2r7Ew-9BbSAbR_MeLRQyUAiSbq8w2spG3FAEqiaKz5V8NTQYpgTHURgPUYiV-8otvhOPygLiovFJub602uzzosCQ7UMBqFyWvjxXPpbfdduphtBFp--O3sUuvbIp7pm_-QlY7YbtCpn1hSdy1KC4iklxgo2f43vJOLxQJz_cRsBHXfzwPvlwRwFX19cXwZH-Cw86d1VkmOURjtp2HwxefotDmAm5A'
};
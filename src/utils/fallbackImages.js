// High-resolution, high-fashion fallback imagery matching the categories in KrishnLeela Dresses
export const categoryFallbacks = {
  Streetwear: [
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
  ],
  "Formal Wear": [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1000&q=80"
  ],
  Activewear: [
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1483721074574-8b065a044d57?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80"
  ],
  "Winter Collection": [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80"
  ],
  "Summer Casuals": [
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=80"
  ]
};

export function getFallbackImage(category, id) {
  const list = categoryFallbacks[category] || categoryFallbacks["Streetwear"];
  const index = Math.abs((Number(id) || 1) - 1) % list.length;
  return list[index];
}


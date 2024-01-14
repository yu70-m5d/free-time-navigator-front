// utils/translationUtils.js

const translations = {
  aquarium: '水族館',
  art_gallery: '美術館',
  bakery: 'ベーカリー',
  bar: 'バー',
  book_store: '書店',
  cafe: 'カフェ',
  clothing_store: '衣料品店',
  department_store: 'デパート',
  electronics_store: '家電店',
  food: '食料品店',
  furniture_store: '家具店',
  grocery_or_supermarket: 'スーパーマーケット',
  library: '図書館',
  meal_takeaway: 'テイクアウト',
  movie_theater: '映画館',
  museum: '博物館',
  park: '公園',
  pet_store: 'ペットショップ',
  pharmacy: '薬局',
  restaurant: 'レストラン',
  shoe_store: '靴屋',
  shopping_mall: 'ショッピングモール',
  spa: 'スパ',
  tourist_attraction: '観光名所',
  place_of_worship: '宗教施設',
};

const reverseTranslations = {};
Object.keys(translations).forEach((key) => {
  reverseTranslations[translations[key]] = key;
});

export const translateToJapanese = (word) => {
  return translations[word] || word;
};

export const translateToEnglish = (word) => {
  return reverseTranslations[word] || word;
};

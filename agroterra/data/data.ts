import imgOfeAkwu from '@/public/ofe-akwu.png'
// import imgOfeAkwu from '@/public/egusi.svg'
import imgAkaraOgi from '@/public/akara & ogi.jpeg'
// import imgAkaraOgi from '@/public/breakfast.svg'
import imgSuya from '@/public/Suya.jpg'
// import imgSuya from '@/public/ham.svg'
import imgPuffPuff from '@/public/puff puff2.png'
// import imgPuffPuff from '@/public/egusi.svg'
import imgYamEgg from '@/public/yam and egg.jpg'
// import imgYamEgg from '@/public/egusi.svg'
import imgOhaSoup from '@/public/oha-soup.jpg'
// import imgOhaSoup from '@/public/egusi.svg'
import imgKunu from '@/public/Kunu.png'
// import imgKunu from '@/public/wine.jpg'
import imgChinChin from '@/public/chin chin.jpg'
// import imgChinChin from '@/public/lunch.svg'
import imgBangaSoup from '@/public/banga soup.jpg'
// import imgBangaSoup from '@/public/egusi.svg'
import rappetizer from '@/public/rappetizer.svg'
import dinner from '@/public/egusi.svg'
import breakfast from '@/public/breakfast.svg'
import dessert from '@/public/lunch.svg'
import drinks from '@/public/wine.jpg'
import ham from '@/public/ham.svg'
import jollof from '@/public/jollof.svg'
import puff from '@/public/puffpuff.svg'

// ── Meal data ─────────────────────────────────────────────────────
export type MealItem = { name: string; desc: string; cat: string }

export const MEALS: { section: string; items: MealItem[] }[] = [
  {
    section: 'Breakfast',
    items: [
      { name: 'Agroterra Full Breakfast', desc: 'Eggs, toast, grilled tomato, local produce', cat: 'Breakfast' },
      { name: 'Akara & Ogi', desc: 'Bean fritters with warm pap — a morning classic', cat: 'Breakfast' },
    ],
  },
  {
    section: 'Lunch',
    items: [
      { name: 'Jollof Rice & Grilled Chicken', desc: 'Party-style jollof with smoky grilled chicken', cat: 'Lunch' },
      { name: 'Egusi Soup & Eba', desc: 'Rich melon seed soup, slow-cooked to perfection', cat: 'Lunch' },
    ],
  },
  {
    section: 'Dinner',
    items: [
      { name: 'Pepper Soup', desc: 'Spiced goat meat broth — warming and aromatic', cat: 'Dinner' },
      { name: 'Ofada Rice & Ayamase Stew', desc: 'Local brown rice with green pepper stew', cat: 'Dinner' },
    ],
  },
  {
    section: 'Dessert & Drinks',
    items: [
      { name: 'Puff Puff & Chin Chin', desc: 'Hand-pressed dough, lightly sweetened', cat: 'Dessert' },
      { name: 'Soft Drinks & Palm wine', desc: 'Chilled drinks', cat: 'Drinks' },
    ],
  },
]

// ── All Recipes data ──────────────────────────────────────────────
export type Recipe = {
  label: string
  title: string
  desc: string
  time: string
  img: any
  cat: 'Main course' | 'Soups & stews' | 'Breakfast' | 'Small chops' | 'Sides' | 'Desserts' | 'Drinks'
  gradientFrom: string
  gradientTo: string
}

export const ALL_RECIPES: Recipe[] = [
  {
    label: 'MAIN COURSE', title: 'Ofe Akwu — Palm Nut Soup',
    desc: 'Rich palm extract simmered with goat meat, crayfish & uziza. Served with pounded yam.',
    time: '90 min', img: imgOfeAkwu, cat: 'Main course',
    gradientFrom: '#1a3a1a', gradientTo: '#2d5a1a',
  },
  {
    label: 'MAIN COURSE', title: 'Ofada Stew with Ayamase Sauce',
    desc: 'Bold green pepper sauce with assorted offal over locally grown Ofada rice.',
    time: '75 min', img: jollof, cat: 'Main course',
    gradientFrom: '#3a1a0a', gradientTo: '#5a2a0a',
  },
  {
    label: 'MAIN COURSE', title: 'Banga Soup with Catfish',
    desc: 'Delta-style palm nut soup fragrant with orotor spice and fresh river catfish.',
    time: '80 min', img: imgBangaSoup, cat: 'Main course',
    gradientFrom: '#4a1a0a', gradientTo: '#6a2a1a',
  },
  {
    label: 'SOUPS & STEWS', title: 'Egusi Soup',
    desc: 'Ground melon seed soup with stockfish, smoked prawns & bitter leaf from our garden.',
    time: '60 min', img: dinner, cat: 'Soups & stews',
    gradientFrom: '#1a2a0a', gradientTo: '#2a4a1a',
  },
  {
    label: 'SOUPS & STEWS', title: 'Oha Soup',
    desc: 'Ora leaves in a cocoyam-thickened broth with assorted meat. A true eastern classic.',
    time: '55 min', img: imgOhaSoup, cat: 'Soups & stews',
    gradientFrom: '#1a3a2a', gradientTo: '#2a5a3a',
  },
  {
    label: 'SOUPS & STEWS', title: 'Groundnut Soup',
    desc: 'West-African peanut slow-cooked with chicken, tomatoes & farm-fresh spices.',
    time: '65 min', img: dinner, cat: 'Soups & stews',
    gradientFrom: '#2a2a0a', gradientTo: '#4a3a1a',
  },
  {
    label: 'BREAKFAST', title: 'Akara & Ogi',
    desc: 'Crispy bean fritters paired with smooth fermented corn porridge. A breakfast morning duo.',
    time: '30 min', img: imgAkaraOgi, cat: 'Breakfast',
    gradientFrom: '#3a1a0a', gradientTo: '#5a2a0a',
  },
  {
    label: 'BREAKFAST', title: 'Yam & Egg Sauce',
    desc: 'Pan-fried yam slices with a spiced tomato and egg sauce, finished with scent leaf.',
    time: '25 min', img: imgYamEgg, cat: 'Breakfast',
    gradientFrom: '#1a2a3a', gradientTo: '#1a3a5a',
  },
  {
    label: 'SMALL CHOPS', title: 'Suya Skewers',
    desc: 'Hausa-spiced beef skewers with groundnut crust, served with sliced onion & tomatoes.',
    time: '40 min', img: imgSuya, cat: 'Small chops',
    gradientFrom: '#3a1a1a', gradientTo: '#5a2a2a',
  },
  {
    label: 'SMALL CHOPS', title: 'Puff Puff',
    desc: 'Light fried dough balls, golden and airy — dusted with sugar or served with pepper dip.',
    time: '20 min', img: imgPuffPuff, cat: 'Small chops',
    gradientFrom: '#3a2a0a', gradientTo: '#5a3a1a',
  },
  {
    label: 'SIDES', title: 'Fried Plantain (Dodo)',
    desc: 'Ripe plantain sliced and pan-fried to caramelised perfection. The perfect companion.',
    time: '15 min', img: jollof, cat: 'Sides',
    gradientFrom: '#2a3a0a', gradientTo: '#3a5a1a',
  },
  {
    label: 'DESSERTS', title: 'Chin Chin',
    desc: 'Crunchy fried pastry snacks lightly sweetened with coconut and nutmeg. Farm-made.',
    time: '40 min', img: imgChinChin, cat: 'Desserts',
    gradientFrom: '#3a1a2a', gradientTo: '#5a2a3a',
  },
  {
    label: 'DRINKS', title: 'Zobo Hibiscus Cooler',
    desc: 'Dried hibiscus tea steeped with ginger, cloves & pineapple. Refreshing and bold.',
    time: '20 min', img: drinks, cat: 'Drinks',
    gradientFrom: '#2a1a3a', gradientTo: '#3a2a5a',
  },
  {
    label: 'DRINKS', title: 'Kunu Zaki',
    desc: 'Spiced millet drink with a nod of ginger — a northern Nigerian staple, lightly sweetened.',
    time: '30 min', img: imgKunu, cat: 'Drinks',
    gradientFrom: '#1a3a3a', gradientTo: '#2a5a5a',
  },
]

export const ALL_FILTER_TABS = ['All', 'Main course', 'Soups & stews', 'Breakfast', 'Small chops', 'Sides', 'Desserts', 'Drinks'] as const

// ── Featured + side recipes ───────────────────────────────────────
export const featuredRecipe = {
  label: 'MAIN COURSE',
  title: 'Ofe Akwu — Rich Palm Nut Soup',
  description: 'Slow-simmered palm nut extract with tender goat meat, crayfish, and fresh uziza leaves — a dish that carries the warmth of every Nigerian kitchen. Served with pounded yam from our farm.',
  img: imgOfeAkwu,
  gradientFrom: '#1a3a1a',
  gradientTo: '#2d5a1a',
}

export const sideRecipes = [
  {
    label: 'BREAKFAST',
    title: 'Akara & Ogi — Bean Fritters with Fermented Porridge',
    img: imgAkaraOgi,
    gradientFrom: '#3a1a0a',
    gradientTo: '#5a2a0a',
  },
  {
    label: 'SMALL CHOPS',
    title: 'Suya Skewers with Groundnut Spice Crust',
    img: imgSuya,
    gradientFrom: '#1a2a0a',
    gradientTo: '#2a4a1a',
  },
]

// ── Dining / category data ────────────────────────────────────────
export const categories = [
  { label: 'DINNER', title: 'Really Quick Traditional Dishes', img: dinner },
  { label: 'BREAKFAST', title: 'Announcing The Spring Bucket List', img: breakfast },
  { label: 'DESSERT', title: 'Favorite Snacks', img: dessert },
  { label: 'DRINKS', title: 'Refreshing Drinks', img: drinks },
]

export const topCategories = [
  { label: 'BREAKFAST', img: ham },
  { label: 'DESSERT', img: dessert },
  { label: 'LUNCH', img: jollof },
  { label: 'APPETIZER', img: puff },
  { label: 'DINNER', img: dinner },
]

export const weeklyFeatured = {
  label: 'BREAKFAST',
  title: 'Have The Best Delicacies At Your Door Step',
  img: dinner,
}

export const weeklySide = [
  { label: 'LUNCH', title: 'Exploring The Potential Of Cooking International Cuisines', img: jollof },
  { label: 'DESSERT', title: 'Favorite Browned Butter Chocolate Cookies Daily Breakfast', img: dessert },
  { label: 'APPETIZER', title: 'The Potentially Dangerous Non Sibility Of Cookie Notices', img: rappetizer },
]

// ── Wellness data ─────────────────────────────────────────────────
export type WellnessArticle = {
  id: number
  cat: 'Nutrition' | 'Wellness' | 'Detox' | 'Immunity' | 'Energy' | 'Lifestyle'
  title: string
  excerpt: string
  readTime: string
  img: any
  hero?: boolean
}

export const WELLNESS_ARTICLES: WellnessArticle[] = [
  {
    id: 0, cat: 'Nutrition', hero: true,
    title: '7 Healthy Reasons Why You Should Eat More Vegetables Every Day',
    excerpt: "From sharper immunity to glowing skin, vegetables are nature's most powerful medicine. Our head nutritionist breaks down why your plate needs more colour.",
    readTime: '5 min read', img: imgOfeAkwu,
  },
  {
    id: 1, cat: 'Wellness',
    title: 'Why a Morning Fruit Bowl Can Transform Your Entire Day',
    excerpt: 'Starting your day with whole fruits sets the tone for better choices all day long.',
    readTime: '3 min read', img: imgAkaraOgi,
  },
  {
    id: 2, cat: 'Detox',
    title: 'The 3-Day Green Cleanse Our Guests Swear By',
    excerpt: 'Simple, resort-approved detox habits that reset your digestion and leave you feeling lighter.',
    readTime: '4 min read', img: imgOhaSoup,
  },
  {
    id: 3, cat: 'Immunity',
    title: '10 Foods That Naturally Strengthen Your Immune System',
    excerpt: 'Ginger, turmeric, citrus — discover the superfoods stocked in our resort kitchen every single day.',
    readTime: '6 min read', img: imgBangaSoup,
  },
  {
    id: 4, cat: 'Energy',
    title: 'Eat for Energy: The Foods That Keep You Going All Day',
    excerpt: 'Ditch the caffeine crash. These whole foods deliver sustained energy without the slump.',
    readTime: '4 min read', img: imgSuya,
  },
  {
    id: 5, cat: 'Lifestyle',
    title: 'How Mindful Eating Changed the Lives of Our Resort Guests',
    excerpt: "Slowing down at the table isn't just polite — it's one of the most powerful wellness habits you can build.",
    readTime: '5 min read', img: imgChinChin,
  },
]

export const WELLNESS_TABS = ['All', 'Nutrition', 'Wellness', 'Detox', 'Immunity', 'Energy', 'Lifestyle'] as const
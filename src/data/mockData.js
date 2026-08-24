import { rugPatternDataUri } from "../utils/rugPattern.js";

export const CURRENT_USERNAME = "lenavolna";

export const seedUsers = [
  {
    username: "lenavolna",
    name: "Лена Волна",
    bio: "Продуктовый дизайнер. Собираю закаты и плохие каламбуры.",
    location: "Калининград",
    joined: "март 2023",
    followers: 1284,
    following: 312,
  },
  {
    username: "mark.tikhonov",
    name: "Марк Тихонов",
    bio: "Пишу бэкенд, бегаю по утрам, сплю по остаточному принципу.",
    location: "Москва",
    joined: "июль 2022",
    followers: 5390,
    following: 214,
  },
  {
    username: "anya_koval",
    name: "Аня Коваль",
    bio: "Студентка биофака. Кофе, плёночная камера и вечные дедлайны.",
    location: "Казань",
    joined: "январь 2024",
    followers: 812,
    following: 396,
  },
  {
    username: "ilya.severov",
    name: "Илья Северов",
    bio: "Фотограф. Снимаю город, когда в нём почти никого нет.",
    location: "Санкт-Петербург",
    joined: "май 2021",
    followers: 9021,
    following: 128,
  },
  {
    username: "dasha_moroz",
    name: "Даша Мороз",
    bio: "Живу между рюкзаком и поездом. Иду туда, где связь ловит через раз.",
    location: "где-то в пути",
    joined: "октябрь 2023",
    followers: 2044,
    following: 610,
  },
];

export function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ago(hoursAgoFromNow) {
  return new Date(Date.now() - hoursAgoFromNow * 3600 * 1000).toISOString();
}

const rawPosts = [
  {
    id: "p1",
    username: "lenavolna",
    text: "Переставила стол к окну — и внезапно снова хочется работать по утрам. Иногда для перезагрузки хватает двух метров и одной розетки. #дом #утро",
    image: rugPatternDataUri("p1", { variant: "diamond" }),
    hoursAgo: 2,
    likes: 214,
    comments: 3,
    nsfw: false,
  },
  {
    id: "p2",
    username: "mark.tikhonov",
    text: "Три часа искал баг, оказалось — лишняя запятая в конфиге. Иду за кофе, вернусь другим человеком. #код #работа",
    image: rugPatternDataUri("p2", { variant: "stripe" }),
    hoursAgo: 4,
    likes: 998,
    comments: 5,
    nsfw: false,
  },
  {
    id: "p3",
    username: "ilya.severov",
    text: "Пришёл снимать рассвет на набережную в полшестого — а там уже стоят четверо таких же. Кадр всё равно вышел мой. #фото #питер",
    image: rugPatternDataUri("p3", { variant: "chevron" }),
    hoursAgo: 7,
    likes: 3021,
    comments: 4,
    nsfw: false,
  },
  {
    id: "p4",
    username: "anya_koval",
    text: "Сдала последний зачёт, впереди целых два свободных дня. План: выспаться, напечь сырников и ничего не планировать.",
    image: rugPatternDataUri("p4", { variant: "grid" }),
    hoursAgo: 9,
    likes: 431,
    comments: 2,
    nsfw: false,
  },
  {
    id: "p5",
    username: "dasha_moroz",
    text: "Палатка, минус два градуса и вид, который не влезает ни в один экран. Взрослая жизнь подождёт до понедельника. #путешествия",
    image: rugPatternDataUri("p5", { variant: "diamond" }),
    hoursAgo: 13,
    likes: 1522,
    comments: 3,
    nsfw: false,
  },
  {
    id: "p6",
    username: "ilya.severov",
    text: "Серия со съёмки для галереи: свет жёсткий, кадры на любителя. Спрятал под предупреждение, чтобы никого не смущать в ленте. #фото",
    image: rugPatternDataUri("p6-nsfw", { variant: "chevron" }),
    hoursAgo: 15,
    likes: 742,
    comments: 2,
    nsfw: true,
  },
  {
    id: "p7",
    username: "mark.tikhonov",
    text: "Кто-то разогрел рыбу в опенспейсе. Второй час обсуждаем это вместо релиза. #работа",
    image: rugPatternDataUri("p7", { variant: "stripe" }),
    hoursAgo: 20,
    likes: 1890,
    comments: 3,
    nsfw: false,
  },
  {
    id: "p8",
    username: "lenavolna",
    text: "Три года веду список кофеен, где хорошо работается. Пока лидирует та, где нет вайфая. #кофе",
    image: rugPatternDataUri("p8", { variant: "grid" }),
    hoursAgo: 30,
    likes: 356,
    comments: 2,
    nsfw: false,
  },
  {
    id: "p9",
    username: "anya_koval",
    text: "Бабушка завела аккаунт и уже поставила мне пятнадцать лайков подряд. Спасибо, @lenavolna, что по телефону объяснила ей, куда нажимать!",
    image: rugPatternDataUri("p9", { variant: "diamond" }),
    hoursAgo: 40,
    likes: 677,
    comments: 1,
    nsfw: false,
  },
];

export const initialPosts = rawPosts.map((p) => ({
  ...p,
  createdAt: ago(p.hoursAgo),
  liked: false,
}));

const rawComments = {
  p1: [
    { username: "mark.tikhonov", text: "А монитор не бликует от окна?", hoursAgo: 1.5 },
    { username: "ilya.severov", text: "Утренний свет там наверняка отличный, покажи потом фото", hoursAgo: 1 },
    { username: "anya_koval", text: "Всё, тоже двигаю стол сегодня вечером", hoursAgo: 0.5 },
  ],
  p2: [
    { username: "lenavolna", text: "Классика, сочувствую", hoursAgo: 3.5 },
    { username: "dasha_moroz", text: "Линтер бы это поймал за секунду", hoursAgo: 3 },
    { username: "anya_koval", text: "У меня так было с точкой с запятой, потеряла вечер", hoursAgo: 2.7 },
    { username: "ilya.severov", text: "Держись, кофе поможет", hoursAgo: 2 },
    { username: "lenavolna", text: "☕", hoursAgo: 1 },
  ],
  p3: [
    { username: "lenavolna", text: "Свет невероятный, конечно", hoursAgo: 6 },
    { username: "dasha_moroz", text: "На что снимал?", hoursAgo: 5 },
    { username: "mark.tikhonov", text: "В полшестого я ещё сплю, снимаю шляпу", hoursAgo: 4 },
    { username: "anya_koval", text: "Хочу такой кадр на стену", hoursAgo: 3 },
  ],
  p4: [
    { username: "ilya.severov", text: "Заслужила, отдыхай", hoursAgo: 8 },
    { username: "lenavolna", text: "Сырники по рецепту или на глаз?", hoursAgo: 7 },
  ],
  p5: [
    { username: "lenavolna", text: "Обзавидовалась, серьёзно", hoursAgo: 12 },
    { username: "mark.tikhonov", text: "А спальник на какую температуру?", hoursAgo: 11 },
    { username: "anya_koval", text: "Не замёрзни там, одевайся теплее", hoursAgo: 10 },
  ],
  p6: [
    { username: "lenavolna", text: "Контраст жёсткий, но мне нравится", hoursAgo: 14 },
    { username: "dasha_moroz", text: "Ждём серию целиком", hoursAgo: 13 },
  ],
  p7: [
    { username: "anya_koval", text: "В общаге такое каждый день, привыкайте", hoursAgo: 19 },
    { username: "lenavolna", text: "Офис в прямом эфире 😂", hoursAgo: 18 },
    { username: "ilya.severov", text: "Релиз подождёт, рыба важнее", hoursAgo: 17 },
  ],
  p8: [
    { username: "dasha_moroz", text: "Без вайфая и правда лучше всего работается", hoursAgo: 29 },
    { username: "mark.tikhonov", text: "Скинь список, очень надо", hoursAgo: 28 },
  ],
  p9: [{ username: "lenavolna", text: "Она умница, передавай привет!", hoursAgo: 39 }],
};

export function commentsFor(postId) {
  return (rawComments[postId] || []).map((c, i) => ({
    id: `${postId}-c${i}`,
    ...c,
    createdAt: ago(c.hoursAgo),
  }));
}

// Canned reactions used to simulate other people commenting on a freshly
// published post (see StoreContext#simulateEngagement) — not real user input.
export const fakeReactionComments = {
  ru: [
    "🔥🔥🔥",
    "Красиво!",
    "Как это сделано?",
    "Согласна на все 100",
    "Сохранила себе",
    "Обожаю!",
    "Автор жжёт",
    "Где это было?",
    "+1",
    "Ору, идеально",
  ],
  en: [
    "🔥🔥🔥",
    "Love this!",
    "How did you do that?",
    "100% agree",
    "Saving this",
    "Amazing!",
    "So good",
    "Where was this?",
    "+1",
    "Incredible",
  ],
};

import { rugPatternDataUri, avatarDataUri } from "../utils/rugPattern.js";

export const CURRENT_USERNAME = "lenavolna";

export const users = [
  {
    username: "lenavolna",
    name: "Лена Волна",
    bio: "Собираю закаты и плохие каламбуры. Коврик — мой дневник вслух.",
    location: "Калининград",
    joined: "март 2023",
    followers: 1284,
    following: 312,
  },
  {
    username: "dvorovoy_kot",
    name: "Дворовый Кот",
    bio: "Живу под лавкой у подъезда. Веду хронику голубей.",
    location: "Подъезд №3",
    joined: "июль 2022",
    followers: 5390,
    following: 4,
  },
  {
    username: "baba_zina",
    name: "Баба Зина",
    bio: "62 года, варю варенье и правду-матку.",
    location: "дер. Ольховка",
    joined: "январь 2024",
    followers: 812,
    following: 96,
  },
  {
    username: "m.rugmaster",
    name: "Мастер Коврового Дела",
    bio: "Тку с 2011 года. Учу набивать паттерн, а не только ковры.",
    location: "Мастерская №4",
    joined: "май 2021",
    followers: 9021,
    following: 128,
  },
  {
    username: "sever_veter",
    name: "Северный Ветер",
    bio: "Турист. Иду туда, где связь ловит через раз.",
    location: "где-то в пути",
    joined: "октябрь 2023",
    followers: 2044,
    following: 610,
  },
];

const userMap = Object.fromEntries(users.map((u) => [u.username, u]));

export function getUser(username) {
  return userMap[username];
}

export function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function avatarFor(username) {
  const u = getUser(username);
  return avatarDataUri(username, initials(u?.name || username));
}

function ago(hoursAgoFromNow) {
  return new Date(Date.now() - hoursAgoFromNow * 3600 * 1000).toISOString();
}

const rawPosts = [
  {
    id: "p1",
    username: "lenavolna",
    text: "Постелила новый коврик у балкона — теперь кофе по утрам пьётся совершенно иначе. Кто-то вообще замечает разницу между хорошим и просто ковром?",
    image: rugPatternDataUri("p1", { variant: "diamond" }),
    hoursAgo: 2,
    likes: 214,
    comments: 3,
    nsfw: false,
  },
  {
    id: "p2",
    username: "dvorovoy_kot",
    text: "Сегодня насчитал семь голубей и одного подозрительного кота с другого двора. Веду протокол.",
    image: rugPatternDataUri("p2", { variant: "stripe" }),
    hoursAgo: 4,
    likes: 998,
    comments: 5,
    nsfw: false,
  },
  {
    id: "p3",
    username: "m.rugmaster",
    text: "Новая работа — 40 часов узловязания, три испорченных пальца, один готовый ковёр. Детали техники в комментариях, спрашивайте.",
    image: rugPatternDataUri("p3", { variant: "chevron" }),
    hoursAgo: 7,
    likes: 3021,
    comments: 4,
    nsfw: false,
  },
  {
    id: "p4",
    username: "baba_zina",
    text: "Сварила варенье из крыжовника, а Витька опять не зашёл попробовать. Ну и ладно, самой больше достанется.",
    image: rugPatternDataUri("p4", { variant: "grid" }),
    hoursAgo: 9,
    likes: 431,
    comments: 2,
    nsfw: false,
  },
  {
    id: "p5",
    username: "sever_veter",
    text: "Палатка, минус два градуса и вид, который не влезает ни в один экран. Взрослая жизнь подождёт до понедельника.",
    image: rugPatternDataUri("p5", { variant: "diamond" }),
    hoursAgo: 13,
    likes: 1522,
    comments: 3,
    nsfw: false,
  },
  {
    id: "p6",
    username: "m.rugmaster",
    text: "Эскиз для взрослой коллекции — острые формы, спорная палитра. Не всем зайдёт, но я предупредил.",
    image: rugPatternDataUri("p6-nsfw", { variant: "chevron" }),
    hoursAgo: 15,
    likes: 742,
    comments: 2,
    nsfw: true,
  },
  {
    id: "p7",
    username: "dvorovoy_kot",
    text: "Кто-то оставил открытую банку кильки на подоконнике. Двор гудит третий час.",
    image: rugPatternDataUri("p7", { variant: "stripe" }),
    hoursAgo: 20,
    likes: 1890,
    comments: 3,
    nsfw: false,
  },
  {
    id: "p8",
    username: "lenavolna",
    text: "Три года веду список городов, где искала идеальный коврик у двери. Пока лидирует Тбилиси.",
    image: rugPatternDataUri("p8", { variant: "grid" }),
    hoursAgo: 30,
    likes: 356,
    comments: 2,
    nsfw: false,
  },
  {
    id: "p9",
    username: "baba_zina",
    text: "Внучка научила меня делать сторис. Кажется, я нажала не туда десять раз, но горжусь собой.",
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
    { username: "dvorovoy_kot", text: "А ворс густой? Спать можно?", hoursAgo: 1.5 },
    { username: "m.rugmaster", text: "Держите фото изнанки, интересно кто ткал", hoursAgo: 1 },
    { username: "baba_zina", text: "У меня такой же был в 1994, носкость супер", hoursAgo: 0.5 },
  ],
  p2: [
    { username: "lenavolna", text: "Протокол в студию, не томи", hoursAgo: 3.5 },
    { username: "sever_veter", text: "Голубь-разведчик или обычный?", hoursAgo: 3 },
    { username: "baba_zina", text: "Гони его от подъезда, гадит", hoursAgo: 2.7 },
    { username: "m.rugmaster", text: "Котик, ты держишься", hoursAgo: 2 },
    { username: "lenavolna", text: "🐈", hoursAgo: 1 },
  ],
  p3: [
    { username: "lenavolna", text: "Пальцы жалко, но результат огонь", hoursAgo: 6 },
    { username: "sever_veter", text: "Сколько нитки ушло примерно?", hoursAgo: 5 },
    { username: "dvorovoy_kot", text: "Мур", hoursAgo: 4 },
    { username: "baba_zina", text: "Внучке бы такой на подарок", hoursAgo: 3 },
  ],
  p4: [
    { username: "m.rugmaster", text: "Витька не ценит, а мы ценим", hoursAgo: 8 },
    { username: "lenavolna", text: "Рецепт будет?", hoursAgo: 7 },
  ],
  p5: [
    { username: "lenavolna", text: "Обзавидовалась, серьёзно", hoursAgo: 12 },
    { username: "dvorovoy_kot", text: "А кот там есть у костра?", hoursAgo: 11 },
    { username: "baba_zina", text: "Не замёрзни там, одевайся теплее", hoursAgo: 10 },
  ],
  p6: [
    { username: "lenavolna", text: "Палитра спорная но я в деле", hoursAgo: 14 },
    { username: "sever_veter", text: "Ждём коллекцию целиком", hoursAgo: 13 },
  ],
  p7: [
    { username: "baba_zina", text: "Килька это святое, не трогайте", hoursAgo: 19 },
    { username: "lenavolna", text: "Двор в прямом эфире 😂", hoursAgo: 18 },
    { username: "m.rugmaster", text: "Классика жанра", hoursAgo: 17 },
  ],
  p8: [
    { username: "sever_veter", text: "Тбилисские коврики топ, подтверждаю", hoursAgo: 29 },
    { username: "dvorovoy_kot", text: "А у нас во дворе есть коврик, между прочим", hoursAgo: 28 },
  ],
  p9: [{ username: "lenavolna", text: "Ты справилась, горжусь!", hoursAgo: 39 }],
};

export function commentsFor(postId) {
  return (rawComments[postId] || []).map((c, i) => ({
    id: `${postId}-c${i}`,
    ...c,
    createdAt: ago(c.hoursAgo),
  }));
}

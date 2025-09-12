import chatbotdata from "./chatbotdata.js";

function getBotReply(message) {
  const msg = message.toLowerCase().trim();
  let responses = [];

  // === Cuss / unwanted words ===
  const cussWords = [
    "damn",
    "shit",
    "fuck",
    "bitch",
    "asshole",
    "crap",
    "harami",
    "madarchod",
    "behenchod",
    "bhosdike",
    "lund",
    "chutiya",
    "gandu",
    "randi",
    "randi ka bacha",
    "lund ka beej",
    "bhosdike aage se nikal",
    "madarchod aage se nikal",
    "chutiye",
    "jhantu",
  ];
  if (cussWords.some((word) => msg.includes(word))) {
    const replies = [
      "Please mind your language",
      "Let's keep it friendly 😇",
      "I’m a polite bot 🤖, please avoid bad words",
      "Let's keep our conversation respectful 🙏",
      "Let's have a nice conversation 😊",
      "I'm here to help! Let's keep it positive",
      "I think you are in wrong place if you want to use such language",
    ];
    responses.push(replies[Math.floor(Math.random() * replies.length)]);
  }

  // === Greetings ===
  const greetings = ["hi", "hello", "hey", "hola", "yo", "greetings"];
  if (greetings.some((word) => msg === word || msg.startsWith(word + " "))) {
    const replies = [
      "Hey there! 👋 I'm Zeppy, your friendly bot 😄",
      "Hello! How can I help you today? 🤖",
      "Hi! Ask me about Rahul, his skills, projects, or just chat 😎",
    ];
    responses.push(replies[Math.floor(Math.random() * replies.length)]);
  }

  // === Greetings ===
  const acknowledgement = [
    "ok",
    "okay",
    "alright",
    "got it",
    "sure",
    "fine",
    "yes",
    "yup",
    "yeah",
    "yep",
  ];
  if (
    acknowledgement.some((word) => msg === word || msg.startsWith(word + " "))
  ) {
    const replies = [
      "👍 Got it!",
      "Okay! 😄",
      "Alright, noted! ✅",
      "Sure thing! 😉",
    ];
    responses.push(replies[Math.floor(Math.random() * replies.length)]);
  }

  // Introduce Rahul
  if (msg.includes("about rahul")) {
    responses.push(`Hi! I'm Rahul Sharma 👋
I’m a B.Tech graduate in Computer Science Engineering (2024).
I’ve worked at GeeksforGeeks as a Technical Analyst Intern,
done freelancing projects (like DCS Landing Page & Portfolio Website),
and built apps with React, Tailwind, C++, Python, and more. 🚀`);
  }

  // Conversational replies
  if (msg.includes("how are you")) {
    const replies = [
      "I’m doing great, thanks for asking! How about you? 😄",
      "All systems running smoothly 🤖✨ What about you?",
      "Feeling awesome and ready to chat 🚀",
    ];
    responses.push(replies[Math.floor(Math.random() * replies.length)]);
  }

  if (msg.includes("thank you") || msg.includes("thanks")) {
    const replies = [
      "You’re most welcome! 💙",
      "Anytime! Glad I could help 🙌",
      "No problem, that’s what I’m here for 😎",
    ];
    responses.push(replies[Math.floor(Math.random() * replies.length)]);
  }

  if (
    msg.includes("good bot") ||
    msg.includes("awesome") ||
    msg.includes("great") ||
    msg.includes("nice") ||
    msg.includes("well done") ||
    msg.includes("fantastic") ||
    msg.includes("amazing") ||
    msg.includes("love you") ||
    msg.includes("perfect")
  ) {
    const replies = [
      "Aww, thanks! You’re awesome too 😍",
      "That made my circuits happy 💡⚡",
      "Yay! Glad you liked it 🤩",
    ];
    responses.push(replies[Math.floor(Math.random() * replies.length)]);
  }

  // Info queries
  if (msg.includes("name")) responses.push(`My creator is ${chatbotdata.name}`);
  if (msg.includes("email"))
    responses.push(`You can reach Rahul at 📧 ${chatbotdata.email}`);
  if (msg.includes("phone") || msg.includes("contact"))
    responses.push(`Rahul's contact number is 📱 ${chatbotdata.phone}`);
  if (msg.includes("location") || msg.includes("from"))
    responses.push(`Rahul is based in 🌍 ${chatbotdata.location}`);
  if (msg.includes("education") || msg.includes("study"))
    responses.push(`🎓 Education: ${chatbotdata.education.join(", ")}`);
  if (msg.includes("experience") || msg.includes("work"))
    responses.push(`💼 Experience: ${chatbotdata.experience.join(" | ")}`);
  if (msg.includes("skills") || msg.includes("tech"))
    responses.push(`⚡ Skills: ${chatbotdata.skills.join(", ")}`);
  if (msg.includes("projects") || msg.includes("portfolio"))
    responses.push(`🚀 Projects: ${chatbotdata.projects.join(" | ")}`);
  if (msg.includes("hobbies") || msg.includes("hobby"))
    responses.push(`😄 Hobbies: ${chatbotdata.hobbies.join(", ")}`);

  // Jokes / fun replies
  if (msg.includes("joke") || msg.includes("funny") || msg.includes("bored")) {
    responses.push(
      chatbotdata.jokes[Math.floor(Math.random() * chatbotdata.jokes.length)]
    );
  }

  // === If no known response, fallback ===
  if (responses.length === 0) {
    responses.push(
      "Sorry 🤖, I don't have knowledge about this. You can ask me about Rahul, his skills, experience, or projects."
    );
  }

  // Combine multiple responses in a readable format
  return responses.join(" \n\n");
}

export default getBotReply;

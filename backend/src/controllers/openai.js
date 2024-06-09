const OpenAI = require("openai");
const { readMailByid, extractEmailDetails } = require("../utils");
require("dotenv").config();

async function classifyEmail(emails, openai) {
  const prompt = `
 You will be given an array of emails. Please categorize each email into one of these categories: Important, Promotional, Social, Marketing, or Spam. Return ONLY the array of updated emails in JSON format with the added category field, without any other explanation or text.
    Emails: ${JSON.stringify(emails)},
    `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
  });

  const classifiedEmails = JSON.parse(response.choices[0].message.content);
  return classifiedEmails;
}

async function classify(req, res) {
  const emails = req.body.emails;
  const accessToken = req.headers.authorization?.split(" ")[1];
  const openAIKey = req.body.openAIKey;

  const openai = new OpenAI({
    apiKey: openAIKey,
  });

  const extractedMails = [];
  for (const email of emails) {
    const mail = await readMailByid(email.id, req, accessToken);
    const em = extractEmailDetails(mail);
    extractedMails.push(em);
  }
  const result = await classifyEmail(extractedMails, openai);
  res.json(result);
}

module.exports = {
  classify,
};

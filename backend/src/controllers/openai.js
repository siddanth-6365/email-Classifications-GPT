const OpenAI = require("openai");
const { readMailByid } = require("../utils");
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

  console.log("response :", response.choices[0].message);
  const classifiedEmails = JSON.parse(response.choices[0].message.content);
  console.log("classifiedEmails :", classifiedEmails)
  return classifiedEmails;
}

async function classify(req, res) {
  const emails = req.body.emails;
  const accessToken = req.headers.authorization?.split(" ")[1];
  const openAIKey = req.body.openAIKey

  const openai = new OpenAI({
    apiKey: openAIKey,
  });

  const extractedMails = [];
  for (const email of emails) {
    const mail = await readMailByid(email.id, req, accessToken);
    const em = {};
    em.snippet = mail.snippet;
    em.id = mail.id;
    let subject = "";
    let from = "";
    for (const header of mail.payload.headers) {
      if (header.name === "Subject") {
        subject = header.value;
      } else if (header.name === "From") {
        from = header.value;
      }
      if (subject && from) {
        break;
      }
    }
    em.subject = subject;
    em.from = from;
    extractedMails.push(em);
  }
  console.log("extractedMails :", extractedMails);
  const result = await classifyEmail(extractedMails, openai);
  console.log("result :",result)
   res.json(result);
}

module.exports = {
  classify,
};

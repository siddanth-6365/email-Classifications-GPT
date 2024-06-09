const axios = require("axios");
const { createConfig, readMailByid, extractEmailDetails } = require("../utils");
const { classify } = require("./openai.js");

require("dotenv").config();

async function getProfile(req, res) {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const url = `https://gmail.googleapis.com/gmail/v1/users/me/profile`;
    const config = createConfig(url, accessToken);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log("error while fetching profile data");
    console.error(
      "Error in getProfile, Details:",
      error.response ? error.response.data : error.message
    );
    res
      .status(error.response ? error.response.status : 500)
      .send(error.message);
  }
}

async function getMails(req, res) {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const maxResults = req.query.maxResults
      ? parseInt(req.query.maxResults, 10)
      : 15;
    const url = `https://gmail.googleapis.com/gmail/v1/users/me/threads?maxResults=${maxResults}`;
    const config = createConfig(url, accessToken);
    const response = await axios(config);
    const emails = response.data.threads;
    res.json(emails);
  } catch (error) {
    console.error(
      "Error in getMails, Details:",
      error.response ? error.response.data : error.message
    );
    res
      .status(error.response ? error.response.status : 500)
      .send(error.message);
  }
}

async function readMail(req, res) {
  try {
    const messageId = req.params.messageId;
    const accessToken = req.headers.authorization?.split(" ")[1];
    const mail = await readMailByid(messageId, req, accessToken);
    if (req.body.isFilter) {
      const em = extractEmailDetails(mail);
      res.json(em);
    } else {
      res.json(mail);
    }
  } catch (error) {
    console.error(
      "Error in readMail,  Details:",
      error.response ? error.response.data : error.message
    );
    res
      .status(error.response ? error.response.status : 500)
      .send(error.message);
  }
}

module.exports = {
  getProfile,
  getMails,
  readMail,
};

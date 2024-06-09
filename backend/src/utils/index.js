  const { google } = require('googleapis');
  const axios = require('axios');
  require('dotenv').config();

  const createConfig = (url, accessToken) => {
    return {
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json'
      },
    };
  };

  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

  async function readMailByid(messageId, req,accessToken) {
    try {
      const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`;
      const config = createConfig(url, accessToken);
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(
        "Errors in ReadMailByid, Details:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  }

  module.exports = {
    createConfig,
    oAuth2Client,
    SCOPES,
    readMailByid
  };
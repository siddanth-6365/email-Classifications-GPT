import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// import { Auth } from "googleapis"
// import axios  from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const createConfig = (url, accessToken) => {
//   return {
//     method: 'get',
//     url: url,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'Content-type': 'application/json'
//     },
//   };
// };

// export const oAuth2Client = new Auth.OAuth2Client(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// export const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

// export async function readMailByid(messageId, req) {
//   try {
//     const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`;
//     const { access_token } = req.session.tokens;
//     const config = createConfig(url, access_token);
//     const response = await axios(config);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Errors in ReadMailByid, Details:",
//       error
//     );
//     return null;
//   }
// }
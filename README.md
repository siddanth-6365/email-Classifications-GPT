# Email Classifier with OpenAI GPT-4

This web application empowers users to seamlessly manage their Gmail inbox by classifying emails into various categories using the power of OpenAI's GPT language models.

## Key Features

- **Google OAuth Integration:** Securely authenticate with your Google account for access to your Gmail data.
- **Gmail API Integration:**  Retrieved emails directly from your Gmail inbox.
- ** Email Classification:**  Leverage the advanced language understanding of OpenAI GPT to automatically categorize emails into:
    - Important
    - Promotional
    - Social
    - Marketing
    - Spam
- **User-Friendly Interface:**  Intuitive UI for viewing classified emails and adjusting settings.

## Project Structure

- **`apps/frontend`:**  The Next.js-powered frontend provides the user interface for interacting with the application. It uses Shadcn UI for component styling.
- **`apps/backend`:** The Express.js backend handles communication with the Gmail API and OpenAI API. It securely manages authentication tokens and performs email classification logic.

## Technologies Used

- **Frontend:** Next.js, Shadcn UI
- **Backend:** Express.js, Google APIs, OpenAI Node.js Library
- **Styling:** Tailwind CSS

## Prerequisites

1. **Node.js and npm/yarn:** Ensure you have Node.js and a package manager (npm or yarn) installed.
2. **Google Cloud Project:**
   - Create a project in the Google Cloud Console.
   - Enable the Gmail API.
   - Set up OAuth credentials with the following scopes:
      - `https://www.googleapis.com/auth/userinfo.email`
      - `https://www.googleapis.com/auth/userinfo.profile`
      - `https://www.googleapis.com/auth/gmail.readonly`
   - Note down your Client ID and Client Secret.
3. **OpenAI API Key:** Obtain an API key from OpenAI.

## Local Setup

1. **Clone the Repository:**
   ```bash
   git clone https://your-repository-url.git
   ```
2. **Install Dependencies:**
   ```bash
   npm i
   ```
3.**Environment Variables:**
Create .env files in both the root directory and add google credentails
4. **Start the Development Servers:**
- In separate terminal windows/tabs, run the following commands:
Frontend:
 ```bash
   cd apps/frontend
   npm run dev
   ```
backend:
 ```bash
   cd apps/backend
   npm run dev
   ```


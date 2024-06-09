# Email Classifier with OpenAI GPT-4

This web application allows users to seamlessly manage their Gmail inbox by classifying emails into various categories using the power of OpenAI's GPT.

## Technologies Used

- **Frontend:** Next.js, Shadcn UI
- **Backend:** Express.js, Google APIs, OpenAI Node.js Library
- **Styling:** Tailwind CSS

## Project Structure

- **`apps/frontend`:**  The Next.js-powered frontend provides the user interface for interacting with the application. It uses Shadcn UI for component styling.
- **`apps/backend`:** The Express.js backend handles communication with the Gmail API and OpenAI API. It securely manages authentication tokens and performs email classification logic.

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


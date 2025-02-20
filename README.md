# Phone Authentication with Appwrite

A simple React application demonstrating phone authentication using Appwrite's authentication services.

![Demo of phone verification](src/data/images/verify.png)

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (v14 or higher)
-   npm or yarn
-   An Appwrite instance (cloud or self-hosted)

## Setup

1. Clone the repository

```bash
git clone <repository-url>
cd cd appwrite-otp
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory using the example template:

```bash
cp .env.example .env
```

Then update the values in `.env`:

```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID>
```

4. Set up Appwrite:

    - Create a new project in your Appwrite console
    - Enable phone authentication in your project settings
    - Copy your project ID to the `.env` file

5. Start the development server

```bash
npm run dev
```

The application should now be running at `http://localhost:5173`

## Project Structure

```
src/
├── components/
├── lib/
│   └── appwriteConfig.js    # Appwrite client configuration
├── pages/
│   ├── Home.jsx            # Home page with user info
│   ├── Signin.jsx          # Phone number input page
│   └── Verify.jsx          # OTP verification page
└── data/
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Implementing SSO in React with GitHub OAuth2

**Seamless Single Sign-On (SSO) for React Apps using GitHub Authentication (Sample Code)**

This repository showcases a sample implementation of Single Sign-On (SSO) with GitHub authentication for React applications. It demonstrates the essential components for integrating SSO functionality using a backend server and GitHub's OAuth flow.

**Why SSO with GitHub?**

-   **Simplified Login:** Streamline the user login process, eliminating separate account creation within your application.
-   **Enhanced Security:** Leverage GitHub's robust security measures to reduce the risk of unauthorized access.
-   **Improved User Experience:** Offer a familiar and convenient login option for users who already have a GitHub account.

**This Repository Provides:**

-   **Sample React Frontend:** Demonstrates integrating GitHub login button and handling redirect logic.
-   **Python Backend Server:** Illustrates backend handling of authorization code exchange and user data retrieval from GitHub API.
-   **Clear Code Structure:** Easy-to-follow code examples for both frontend and backend.

**Getting Started (Frontend):**

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/sr-ssh/sso-react-with-github.git
    ```

2.  **Install Dependencies:**

    ```bash
    cd login
    yarn
    ```

3.  **Configure GitHub App:**

    -   Create a GitHub application: [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).
    -   Note down the `client_id` and `client_secret`.
    -   Set the `redirect_uri` to your application's URL (e.g., `http://localhost:3000/callback`).

4.  **Run the Application:**

    ```
    yarn dev
    ```

Open `http://localhost:3000` in your browser to see the sample login page.

**Getting Started (Backend):**

1. **Follow Frontend Setup Steps (1-3).**
2. **Run the Backend Server :**
    ```
    cd server
    pip3 install fastapi
    pip3 install uvicorn
    pip3 install requests
    python3 server.py
    ```

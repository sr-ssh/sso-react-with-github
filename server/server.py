import uvicorn
from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()

CLIENT_ID = "e48aa4546bef3e3ede25"
CLIENT_SECRET = "38b24e6096fc5ab757a27d3e55487929a3afdf29"


@app.get("/oauth/redirect")
def oauth_redirect(code: str):
    # Exchange code for access token
    token_response = requests.post(
        "https://github.com/login/oauth/access_token",
        headers={"Accept": "application/json"},
        data={
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "code": code
        }
    )

    if token_response.status_code != 200:
        raise HTTPException(
            status_code=400, detail="Error fetching access token from GitHub.")

    # Extract the access token
    token_data = token_response.json()
    print(token_data)
    access_token = token_data["access_token"]
    token_type = token_data["token_type"]

    # Fetch user profile with the access token
    user_response = requests.get(
        "https://api.github.com/user",
        headers={"Authorization": f"{token_type} {access_token}"}
    )

    if user_response.status_code != 200:
        raise HTTPException(
            status_code=400, detail="Error fetching user data from GitHub.")

    user_data = user_response.json()
    print(f'Github profile: {user_data}')

    return {"userData": user_data, "token": access_token, "tokenType": token_type}


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8589)

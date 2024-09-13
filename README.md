# Project Setup

## Install Dependencies

If you have just cloned this template, you should install the project dependencies using the command:

```bash
npm install
```

## Scripts

This project contains the following scripts:

- `dev`: Runs the application in development mode.
- `build`: Builds the application for production.
- `lint`: Runs [eslint](https://eslint.org/) to ensure the code quality meets the required standards.

To run a script, use the `npm run` command:

```bash
npm run {script}
# Example: npm run build
```

## Configuring

Copy `.env.development.example` to `.env.development` in the app root directory for VITE:

## Run

Once the application is created successfully, run it using the `dev` script:

```bash
npm run dev
```

After this, you will see a similar message in your terminal:

```bash
VITE ready in 275 ms

➜  Local:   https://localhost:5173
➜  Network: https://192.168.0.1:5173
➜  press h + enter to show help
```

From here, u can use the app with mock user locally. Otherwise, you need to make a tunnel to your app and pass it to telegram bot.

## Tunnel Setup for Development

You must be member of the organization (ask admin) to setup CF tunnel on `*.tonstarsdao.xyz`.
Or you can use your own tunnel provider(but you must ask backend developer to include your domain in CORS)

### 1. Install Cloudflare CLI

Install the Cloudflare CLI using Homebrew:

```bash
brew install cloudflared
```

### 2. Authenticate to Cloudflare

Authenticate to your Cloudflare account:

```bash
cloudflared tunnel login
```

### 3. Create a Tunnel

Create a tunnel and give it a name:

```bash
cloudflared tunnel create frontend_tunnel
```

This will respond with a configuration ID:

```bash
Tunnel credentials written to /Users/**/.cloudflared/52879019-f747-4703-b865-1e71b5a9309d.json. cloudflared chose this file based on where your origin certificate was found. Keep this file secret. To revoke these credentials, delete the tunnel.
Created tunnel frontend_tunnel with id 52879019-f747-4703-b865-1e71b5a9309d
```

### 4. Create a Configuration File

#### 4.1 Run the provided script:

```bash
./setup.sh
```

This script will automatically:

- Retrieve the ID and name of your most recently created tunnel
- Create a configuration file at `~/.cloudflared/config_frontend.yml`
- Use the correct paths for your user account
- Display information about the tunnel being used

The output will look something like this:

```
Cloudflared config file created at /Users/yourusername/.cloudflared/config_frontend.yml
Using tunnel: yourtunnelname (ID: your-tunnel-id)
```

If you need to use a specific tunnel instead of the most recent one, you can manually edit the generated configuration file or contact the development team for assistance.

#### 4.2 Assign a CNAME record that points traffic to your tunnel subdomain:

```bash
# cloudflared tunnel route dns <UUID or NAME> <hostname>
cloudflared tunnel route dns tunnel_id custom_subdomain
```

### 5. Run the Tunnel

Replace `tunnel_id` with your actual tunnel ID, for example `60ebbc4b-337d-46a7-b824-fd18c917551b`.
Replace `**` with your mac username(user folder name)

```bash
cloudflared tunnel --config /Users/**/.cloudflared/config_frontend.yml run tunnel_id
```

For more details, refer to the [Cloudflare documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/).

## Create Bot and Mini App

Here is the [comprehensive guide](https://docs.telegram-mini-apps.com/platform/creating-new-app) on how to do it.
After this, change your VITE_APP_URL in .env.development to your telegram app url.
Pass your tunnel url to mini app web url like on the picture below

<img width="528" alt="Screenshot 2024-06-07 at 20 44 50" src="https://github.com/adimov-eth/tonstars_frontend/assets/17579509/ef31eaab-e2c2-4ee6-be16-6691859b0f39">

(you must send your actual tunnel url not `clicker.42.works`)

## Deploy

- production - Automated from the `production` branch in Cloudflare Actions
- staging - Automated from the `staging` branch in Cloudflare Actions

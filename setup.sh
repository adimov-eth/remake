#!/bin/bash

# Get the last created tunnel ID and name
TUNNEL_INFO=$(cloudflared tunnel list | awk '
    NR>2 { 
        split($3, dt, "T");
        split(dt[1], d, "-");
        split(dt[2], t, ":");
        timestamp = d[1]*10000+d[2]*100+d[3] t[1]*10000+t[2]*100+t[3];
        if(timestamp > max) {
            max = timestamp;
            id = $1;
            name = $2;
        }
    }
    END {
        print id, name
    }
')
TUNNEL_ID=$(echo $TUNNEL_INFO | cut -d' ' -f1)
TUNNEL_NAME=$(echo $TUNNEL_INFO | cut -d' ' -f2)

# Check if we got a valid tunnel ID
if [ -z "$TUNNEL_ID" ]; then
    echo "Error: Unable to retrieve tunnel ID. Please check if you have any tunnels created."
    exit 1
fi

# Create the config file
cat <<EOL > $HOME/.cloudflared/config_frontend.yml
tunnel: $TUNNEL_ID
url: http://localhost:5173
credentials-file: $HOME/.cloudflared/${TUNNEL_ID}.json
logfile: $HOME/.cloudflared/${TUNNEL_ID}.log
EOL

echo "Cloudflared config file created at $HOME/.cloudflared/config_frontend.yml"
echo "Using tunnel: $TUNNEL_NAME (ID: $TUNNEL_ID)"

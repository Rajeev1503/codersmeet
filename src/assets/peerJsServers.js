const peerJsServerConfig = {
    config: {
      iceServers: [
        { url: "stun:stun.l.google.com:19302" },
        {
          urls: "stun:a.relay.metered.ca:80",
        },
        {
          urls: "turn:a.relay.metered.ca:80",
          username: "80f2af5598002ac9a80cc167",
          credential: "jo5Km/7SHDPnJ/0S",
        },
        {
          urls: "turn:a.relay.metered.ca:80?transport=tcp",
          username: "80f2af5598002ac9a80cc167",
          credential: "jo5Km/7SHDPnJ/0S",
        },
        {
          urls: "turn:a.relay.metered.ca:443",
          username: "80f2af5598002ac9a80cc167",
          credential: "jo5Km/7SHDPnJ/0S",
        },
        {
          urls: "turn:a.relay.metered.ca:443?transport=tcp",
          username: "80f2af5598002ac9a80cc167",
          credential: "jo5Km/7SHDPnJ/0S",
        },
      ],
    },
  };

  export default peerJsServerConfig;
const peerJsServerConfig = {
    config: {
      iceServers: [
        {
          urls: "stun:a.relay.metered.ca:80",
        },
        {
          urls: "turn:a.relay.metered.ca:80",
          username: "80f2af5598002ac9a80cc167",
          credential: "jo5Km/7SHDPnJ/0S",
        },
      ],
    },
  };

  export default peerJsServerConfig;
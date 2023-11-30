import * as signalR from "@microsoft/signalr";

export const createHubConnection = (apiKey: string, hubaddress: string) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${hubaddress}`, {
            headers: { ApiKey: `${apiKey}` }
        })
        .withAutomaticReconnect()
        .build();

    connection.on("ConnectionStatus", (message) => {
        // just confirm the connection
        console.log(message);
    });

    connection.start().catch((error) => {
        return console.error(error.toString());
    });

    return connection;
};

class Connector {
  public connection: signalR.HubConnection;
  //public events: (onMessageReceived: (username: string, message: string) => void) => void;
  static instance: Connector;
  constructor(apiKey: string, hubUrl: string) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        headers: { ApiKey: apiKey }
      })
      .withAutomaticReconnect()
      .build();

    this.connection.on("ConnectionStatus", (message) => {
      // just confirm the connection
      //console.log(message);
    });
    //this.connection.start().catch(err => document.write(err));
    this.connection.start().catch((error) => {
      return console.error(error.toString());
    });
    // this.events = (onMessageReceived) => {
    //     this.connection.on("messageReceived", (username, message) => {
    //         onMessageReceived(username, message);
    //     });
    // };
  }
  // public newMessage = (messages: string) => {
  //     this.connection.send("newMessage", "foo", messages).then(x => console.log("sent"))
  // }

  public static getHubConnection(apiKey: string, hubUrl: string): Connector {
    if (!Connector.instance) Connector.instance = new Connector(apiKey, hubUrl);
    return Connector.instance;
  }
}
export default Connector.getHubConnection;

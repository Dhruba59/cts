import * as signalR from "@microsoft/signalr";

const URL: string = `${process.env.NEXT_PUBLIC_HUB_ADDRESS}`;
const apiKey: string = `${process.env.NEXT_PUBLIC_API_KEY}`;

class Connector {
    public connection: signalR.HubConnection;
    //public events: (onMessageReceived: (username: string, message: string) => void) => void;
    static instance: Connector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL, {
                headers: { ApiKey: apiKey }
              })
            .withAutomaticReconnect()
            .build();
        
        this.connection.on("ConnectionStatus", (message) => {
        // just confirm the connection
        console.log(message);
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

    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}
export default Connector.getInstance;
"use client";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Checkbox, { CheckboxGroup } from "@/components/ui/checkbox";
import Textarea from "@/components/ui/textarea";
import CardDataStats from "@/components/CardDataStats";
import signalR, {
  DefaultHttpClient,
  HttpRequest,
  HttpResponse,
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder
} from "@microsoft/signalr";
import { useEffect, useMemo, useState } from "react";
import { USERS, USER_COLUMN } from "@/components/table/mockData";

class CustomHttpClient extends DefaultHttpClient {
  public send(request: HttpRequest): Promise<HttpResponse> {
    request.headers = { ...request.headers, ApiKey: "test@123" };
    return super.send(request);
  }
}

export default function Dashboard() {
  const options = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" }
  ];

  const [totalUser, setTotalUser] = useState<number>(0);
  const columns = useMemo(() => USER_COLUMN, []);
  const data = useMemo(() => USERS, []);
  const URL = process.env.HUB_ADDRESS ?? "https://localhost:7148/hub"; //or whatever your backend port is
  const [connection, setConnection] = useState<null | HubConnection>(null);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(URL, {
        headers: { ApiKey: "test@123" }
      })
      .withAutomaticReconnect()
      .build();

    connection.on("ConnectionStatus", (message) => {
      console.log(message);
    });

    connection.on("OnlineUsersCount", (message) => {
      setTotalUser(message);
      console.log(`Total User connected: ${message}`);
    });

    connection.start();
    setConnection(connection);
  }, []);

  const sendMessage = async () => {
    if (connection) await connection.send("GetOnlineUsersCount");
  };

  return (
    <main className="p-16">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total views"
          total="$3.456K"
          rate="0.43%"
          levelUp
        ></CardDataStats>
        <CardDataStats
          title="Total Profit"
          total="$45,2K"
          rate="4.35%"
          levelUp
        ></CardDataStats>
        <CardDataStats
          title="Total Product"
          total="2.450"
          rate="2.59%"
          levelUp
        ></CardDataStats>
        <CardDataStats
          title="Total Users"
          total="3.456"
          rate={totalUser.toString()}
          levelDown
        ></CardDataStats>
      </div>

      <p className="mb-5 border-b text-lg text-primary"> Typography</p>
      <h1 className="text-orange-500">Hello World h1 !!</h1>
      <h2 className="text-primary">Hello World h2 !!</h2>
      <h3 className="text-secondary">Hello World h3 !!</h3>
      <h4 className="text-warning">Hello World h4 !!</h4>
      <h5 className="text-neutral-black">Hello World h5 !!</h5>
      <p className="my-5 border-b text-lg text-primary">Buttons</p>
      <Button onClick={sendMessage}>Primary</Button>
      <Button variant="secondary" size="small" className="mx-4 outline-primary">
        Small Button
      </Button>
      <Button variant="outline" loading>
        Outline
      </Button>

      <p className="my-5 border-b text-lg text-primary"> Inputs</p>
      <Input placeholder="Enter your first name" />
      <div className="grid grid-cols-3 items-end gap-4 my-5">
        <Input placeholder="abc@gamil.com" label="Email" />
        <Input placeholder="18" label="Age" type="number" />
        <Select options={options} />
      </div>
      <Textarea />
      <Checkbox id="terms">Accept terms and condition</Checkbox>
      <CheckboxGroup options={options} className="flex gap-3 my-4" />
      <CheckboxGroup options={options} className="flex gap-3 my-4" />
    </main>
  );
}

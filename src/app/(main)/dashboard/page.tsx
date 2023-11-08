"use client";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Checkbox, { CheckboxGroup } from "@/components/ui/checkbox";
import Textarea from "@/components/ui/textarea";

export default function Dashboard() {

  const options = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" }
  ];

  return (
    <main className="p-16">
      <p className="mb-5 border-b text-lg text-primary"> Typography</p>
      <h1 className="text-orange-500">Hello World h1 !!</h1>
      <h2 className="text-primary">Hello World h2 !!</h2>
      <h3 className="text-secondary">Hello World h3 !!</h3>
      <h4 className="text-warning">Hello World h4 !!</h4>
      <h5 className="text-neutral-black">Hello World h5 !!</h5>
      <p className="my-5 border-b text-lg text-primary">Buttons</p>
      <Button>Primary</Button>
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

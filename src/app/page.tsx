"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { RadioButton, RadioGroup } from "@/components/ui/radio";
import { useState } from "react";
import Checkbox, { CheckboxGroup } from "@/components/ui/checkbox";
import Toggle from "@/components/ui/toggle";
import Textarea from "@/components/ui/textarea";
import Select from "@/components/ui/select";

export default function Home() {
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
        <Select id="1" options={options} />
      </div>
      <Textarea />

      <p className="my-5 border-b text-lg text-primary"> Selection</p>
      <Radio />
      <br />
      <Checkbox id="terms">Accept terms and condition</Checkbox>
      <CheckboxGroup options={options} className="flex gap-3 my-4" />
      <Toggle onChange={() => { }} />
      {/* <SimpleTable columns={columns} data={data} /> */}
    </main>
  );
}

// Example
const Radio = () => {
  const [selectedValue, setSelectedValue] = useState("Banana");

  function handleFruitSelection(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value);
  }

  return (
    <RadioGroup
      name="fruits"
      selectedValue={selectedValue}
      onChange={handleFruitSelection}
    >
      <RadioButton value="Apple" id="apple">
        Apple
      </RadioButton>
      <RadioButton value="Banana" id="banana">
        Banana
      </RadioButton>
      <RadioButton value="Orange" id="orange">
        Orange
      </RadioButton>
    </RadioGroup>
  );
};

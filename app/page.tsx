import ECommerce from "@/components/Dashboard/E-commerce";

export default function Home() {
  console.log(process.env.API_KEY);
  return (
    <>
      <ECommerce />
    </>
  );
}

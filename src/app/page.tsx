"use client";

import { Typography } from "antd";

export default function Home() {
  // const [code, setCode] = useState("6818dce6c0abab26e430ad80");

  // const queryProductList = useGetProductList();
  // const mutateInfo = useGetProductInformation();

  // useEffect(() => {
  //   mutateInfo.mutate(
  //     { id: code },
  //     {
  //       onSuccess: () => {
  //         console.log("1");
  //       },
  //       onError: ({ message: msg }) => {
  //         console.log("2", msg);
  //       },
  //     }
  //   );
  // }, [code]);

  return (
    <div>
      <h1 className="text-red-500">Hello !!</h1>
      <Typography.Text className="text-red-500">123</Typography.Text>
      <br />
      <Typography.Text>456</Typography.Text>
    </div>
  );
}

import Image from "next/image";
import {Button, Flex} from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <Flex className={"w-full h-screen"} justify={"center"} align={"center"} vertical="horizontal">
      {/*"/"是根目录，即app/文件夹，对应app/page.tsx；"/home"是app/home/文件夹，对应app/home/page.tsx*/}
      <Link href={"/home"}>测试数据库</Link>
    </Flex>
  );
}

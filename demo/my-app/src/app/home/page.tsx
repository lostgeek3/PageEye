'use client';
import Image from "next/image";
import {Button, Flex, Space} from "antd";
import Link from "next/link";
import {useState} from "react";

export default function Home() {
  const [count, setCount] = useState<number>(0);

  return (
    <Flex className={"w-full h-screen"} justify={"center"} align={"center"} vertical="horizontal">
      <Button onClick={() => {setCount(count + 1)}} type={"primary"}>{`点击${count}次`}</Button>
    </Flex>
  );
}

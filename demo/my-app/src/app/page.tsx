import Image from "next/image";
import {Button} from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div className={"w-full h-full"}>
      {/*"/"是根目录，即app/文件夹，对应app/page.tsx；"/home"是app/home/文件夹，对应app/home/page.tsx*/}
      <Link href={"/home"}>aaa</Link>
    </div>
  );
}

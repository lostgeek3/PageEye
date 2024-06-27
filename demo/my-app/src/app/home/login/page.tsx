'use client';

import { useState } from 'react';
import {Button, Flex} from "antd";

export default function Page() {
  const [name, setName] = useState('crh');
  const [email, setEmail] = useState('114514');

  const handleSubmit = async (e: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('User created:', result);
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Flex className={"w-full h-screen"} justify={"center"} align={"center"} vertical="horizontal">
      <Button onClick={handleSubmit}>注册新用户</Button>
    </Flex>
  );
}

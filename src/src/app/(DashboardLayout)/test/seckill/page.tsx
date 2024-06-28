'use client'
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../modules/seckill.module.css';

const SeckillTest: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(10);  // 秒杀开始倒计时 (s)
  const [activeTime, setActiveTime] = useState(0);  // 秒杀开始的时刻
  const [isSaleActive, setIsSaleActive] = useState(false);  // 秒杀是否开始
  const [isOver, setIsOver] = useState(false);  // 秒杀是否结束
  const [message, setMessage] = useState('');  // 提示信息
  const timeOut = 1;  // 秒杀持续时间

  const products = [
    {
        name: "美国脐橙 9粒装",
        price: 15,
        image: "https://m.360buyimg.com/mobilecms/s750x750_jfs/t8200/240/411226068/368252/26def771/59a76b27Nd4ae751a.jpg%21q80.jpg",
    },
    {
        name: "樱花花瓣沐浴露浴液 500ml",
        price: 7,
        image: "https://m.360buyimg.com/seckillcms/s250x250_jfs/t20270425/225490/22/5193/60534/662a1376F6ad0721a/fd1da4311bc52827.jpg",
    },
    {
        name: "蓝牙耳机 迷你隐藏",
        price: 125,
        image: "https://m.360buyimg.com/seckillcms/s250x250_jfs/t1/52347/2/18202/57533/62887c51E03e202eb/034c94474a4a8693.jpg",
    },
    {
        name: "蓝带啤酒 300ml*12罐",
        price: 20,
        image: "https://m.360buyimg.com/seckillcms/s250x250_jfs/t1/149581/18/29403/80737/63fc823dF1ddf1b34/f90c4d6e212dd3e8.jpg",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          setActiveTime(Date.now());
          setIsSaleActive(true);
          setTimeout(() => {
            setIsSaleActive(false);
            setIsOver(true);
          }, timeOut * 1000);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = () => {
    const now = new Date().getTime();
    const diff = now - activeTime;
    if (message === '') {
      setMessage(`成功抢购！您用了: ${diff} ms`);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>京西秒杀-正品保证，大牌促销</title>
      </Head>
      <h1>京西秒杀</h1>
      <div className={styles.countdown}>
        {isOver ? '秒杀已结束' : `秒杀即将开始 倒计时: ${formatTime(timeLeft)}`}
      </div>
      <div className={styles.products}>
        {products.map((product, index) => (
          <div key={index} className={styles.product}>
            <img src={product.image} alt={"产品封面"} className={styles.productImage} />
            <h2>{product.name}</h2>
            <div className={styles.price}>¥{product.price}.00</div>
            <button
              className={`${styles.buyButton} ${isSaleActive ? styles.activeButton : styles.disabledButton}`}
              disabled={!isSaleActive}
              onClick={handleButtonClick}
            >
              {isOver ? '已经结束' : isSaleActive ? '立即抢购' : '即将开始'}
            </button>
          </div>
        ))}
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default SeckillTest;

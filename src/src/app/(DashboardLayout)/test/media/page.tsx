 'use client'
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../modules/media.module.css';

interface Comment {
  id: number;
  username: string;
  content: string;
  likes: number;
}

const Media: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);

  useEffect(() => {
    const commentInterval = setInterval(() => {
      const newComment: Comment = {
        id: comments.length + 1,
        username: `用户${comments.length + 1}`,
        content: `这是一条评论${comments.length + 1}`,
        likes: 0,
      };
      setComments((prevComments) => [...prevComments, newComment]);
    }, Math.random() * 10000 + 10000);  // 10~20秒发送一条评论

    const likeInterval = setInterval(() => {
      setLikes((prevLikes) => prevLikes + 1);
    }, Math.random() * 3000 + 1000); // 1~4秒有一个赞

    const followInterval = setInterval(() => {
      setFollowers((prevFollowers) => prevFollowers + 1);
    }, Math.random() * 20000 + 20000); // 20~40秒有一个关注

    const coinInterval = setInterval(() => {
        setCoins((prevCoins) => prevCoins + 1);
    }, Math.random() * 5000 + 5000); // 5~10秒有一个投币

    const starInterval = setInterval(() => {
        setStars((prevStars) => prevStars + 1);
    }, Math.random() * 10000 + 10000); // 10~20秒有一个收藏

    return () => {
      clearInterval(commentInterval);
      clearInterval(likeInterval);
      clearInterval(followInterval);
      clearInterval(coinInterval);
      clearInterval(starInterval);
    };
  }, [comments.length]);

  return (
    <div className={styles.container}>
      <Head>
        <title>DiliDili视频网</title>
      </Head>
      <h1>Dilidili视频网站</h1>
      <div className={styles.post}>
        <h2>假装这是一个视频</h2>
        <div className={styles.productImageContainer}>
            <img src='https://web2.xmyeditor.com/sucai-png/20220909/8b091fa22e18e7878849901ae1433a5a.png' alt='视频封面' className={styles.productImage} />
        </div>
        <div className={styles.interactions}>
          <span>赞同: {likes}</span>
          <span>投币: {coins}</span>
          <span>收藏: {stars}</span>
          <span>关注: {followers}</span>
        </div>
      </div>
      <div className={styles.comments}>
        <h3>评论区</h3>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <strong>{comment.username}</strong>
            <p>{comment.content}</p>
            <span>赞同: {comment.likes}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;

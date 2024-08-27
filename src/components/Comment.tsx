import React, { useState } from 'react';
import CommentInput from './CommentInput';
import styles from './comment.module.scss';

const Comment = ({ id, content, createdAt, score: initialScore, user, replies, onReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };
  const [score, setScore] = useState(initialScore);

  const incrementScore = () => setScore(score + 1);
  const decrementScore = () => setScore(score - 1);

  return (
    <>
      <article className={styles.comment}>
        <aside className={styles.commentScore}>
          <button onClick={incrementScore}>
            <img src="../assets/images/icon-plus.svg" alt="icon plus" />
          </button>
          <span>{score}</span>
          <button onClick={decrementScore}>
            <img src="../assets/images/icon-minus.svg" alt="icon minus" />
          </button>
        </aside>
        <section className={styles.commentBody}>
          <header className={styles.commentHeader}>
            <section>
              <img src={user.image.png} alt={user.username} />
              <h4>{user.username}</h4>
              <p>{createdAt}</p>
            </section>
            <section>
              <button onClick={handleReplyClick}>
                <img src="../assets/images/icon-reply.svg" alt="icon reply" />
                Reply
              </button>
            </section>
          </header>
          <p>{content}</p>
        </section>
      </article>

      {showReplyInput && (
        <CommentInput onSend={(replyText) => onReply(replyText, id)} />
      )}

      {replies && replies.length > 0 && (
        <div className={styles.repliesContainer}>
          <div className={styles.verticalLine}></div>
          <article className={styles.replies}>
            {replies.map(reply => (
              <Comment
                key={reply.id}
                {...reply}
                onReply={onReply} // Pasamos onReply para manejar respuestas anidadas
              />
            ))}
          </article>
        </div>
      )}
    </>
  );
};

export default Comment;

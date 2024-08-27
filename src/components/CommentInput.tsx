import React, { useState } from 'react';
import styles from './commentInput.module.scss';

const CommentInput = ({ onSend }) => {
  const [commentText, setCommentText] = useState('');

  const handleSendClick = () => {
    if (commentText.trim()) {
      onSend(commentText); 
      setCommentText('');
    }
  };

  return (
    <section className={styles.commentInput}>
      <div>
        <img src='../../interactive-comments-section-main/images/avatars/image-juliusomo.png' alt="user avatar" />
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </div>
      <button onClick={handleSendClick}>Send</button>
    </section>
  );
};

export default CommentInput;

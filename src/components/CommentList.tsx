import React, { useState } from 'react';
import Comment from './Comment';
import CommentInput from './CommentInput';
import data from '../../interactive-comments-section-main/data.json';
import styles from './commentList.module.scss';

// Interfaces
interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Comment[];
}

const transformData = (data: any[]): Comment[] => {
  return data.map(comment => ({
    id: comment.id.toString(),
    content: comment.content,
    createdAt: comment.createdAt,
    score: comment.score,
    user: {
      username: comment.user.username,
      image: {
        png: comment.user.image.png,
        webp: comment.user.image.webp,
      },
    },
    replies: comment.replies || [],
  }));
};

const CommentList = () => {
  const [comments, setComments] = useState<Comment[]>(transformData(data.comments));

  const sortCommentsByScore = (commentsArray: Comment[]): Comment[] => {
    return commentsArray.slice().sort((a, b) => b.score - a.score);
  };

  const handleAddComment = (newCommentText: string, parentId: string | null = null) => {
    const currentUser: User = data.currentUser;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      content: newCommentText,
      createdAt: 'Just now',
      score: 0,
      user: currentUser,
      replies: [],
    };

    let updatedComments: Comment[];

    if (parentId) {
      updatedComments = comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newComment],
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: handleNestedReplies(comment.replies, parentId, newComment),
          };
        }
        return comment;
      });
    } else {
      updatedComments = [...comments, newComment];
    }

    setComments(sortCommentsByScore(updatedComments));
  };

  const handleNestedReplies = (replies: Comment[], parentId: string, newComment: Comment): Comment[] => {
    return replies.map(reply => {
      if (reply.id === parentId) {
        return {
          ...reply,
          replies: [...(reply.replies || []), newComment], // Asegúrate de que `reply.replies` esté definido como un array
        };
      }
      if (reply.replies && reply.replies.length > 0) {
        return {
          ...reply,
          replies: handleNestedReplies(reply.replies, parentId, newComment),
        };
      }
      return reply;
    });
  };

  return (
    <div className={styles.commentList}>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          {...comment}
          onReply={(replyText, parentId) => handleAddComment(replyText, parentId)}
        />
      ))}
      <CommentInput onSend={(newCommentText) => handleAddComment(newCommentText)} />
    </div>
  );
};

export default CommentList;

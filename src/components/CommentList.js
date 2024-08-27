import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Comment from './Comment';
import CommentInput from './CommentInput';
import data from '../../interactive-comments-section-main/data.json';
import styles from './commentList.module.scss';
const transformData = (data) => {
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
    const [comments, setComments] = useState(transformData(data.comments));
    const sortCommentsByScore = (commentsArray) => {
        return commentsArray.slice().sort((a, b) => b.score - a.score);
    };
    const handleAddComment = (newCommentText, parentId = null) => {
        const currentUser = data.currentUser;
        const newComment = {
            id: Math.random().toString(36).substr(2, 9),
            content: newCommentText,
            createdAt: 'Just now',
            score: 0,
            user: currentUser,
            replies: [],
        };
        let updatedComments;
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
        }
        else {
            updatedComments = [...comments, newComment];
        }
        setComments(sortCommentsByScore(updatedComments));
    };
    const handleNestedReplies = (replies, parentId, newComment) => {
        return replies.map(reply => {
            if (reply.id === parentId) {
                return {
                    ...reply,
                    replies: [...(reply.replies || []), newComment],
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
    return (_jsxs("div", { className: styles.commentList, children: [comments.map(comment => (_jsx(Comment, { ...comment, onReply: (replyText, parentId) => handleAddComment(replyText, parentId) }, comment.id))), _jsx(CommentInput, { onSend: (newCommentText) => handleAddComment(newCommentText) })] }));
};
export default CommentList;

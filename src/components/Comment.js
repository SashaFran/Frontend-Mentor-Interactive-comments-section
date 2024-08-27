import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
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
    return (_jsxs(_Fragment, { children: [_jsxs("article", { className: styles.comment, children: [_jsxs("aside", { className: styles.commentScore, children: [_jsx("button", { onClick: incrementScore, children: _jsx("img", { src: "assets/images/icon-plus.svg", alt: "icon plus" }) }), _jsx("span", { children: score }), _jsx("button", { onClick: decrementScore, children: _jsx("img", { src: "assets/images/icon-minus.svg", alt: "icon minus" }) })] }), _jsxs("section", { className: styles.commentBody, children: [_jsxs("header", { className: styles.commentHeader, children: [_jsxs("section", { children: [_jsx("img", { src: user.image.png, alt: user.username }), _jsx("h4", { children: user.username }), _jsx("p", { children: createdAt })] }), _jsx("section", { children: _jsxs("button", { onClick: handleReplyClick, children: [_jsx("img", { src: "assets/images/icon-reply.svg", alt: "icon reply" }), "Reply"] }) })] }), _jsx("p", { children: content })] })] }), showReplyInput && (_jsx(CommentInput, { onSend: (replyText) => onReply(replyText, id) })), replies && replies.length > 0 && (_jsxs("div", { className: styles.repliesContainer, children: [_jsx("div", { className: styles.verticalLine }), _jsx("article", { className: styles.replies, children: replies.map(reply => (_jsx(Comment, { ...reply, onReply: onReply }, reply.id))) })] }))] }));
};
export default Comment;

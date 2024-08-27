import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './commentInput.module.scss';
const CommentInput = ({ onSend }) => {
    const [commentText, setCommentText] = useState('');
    const handleSendClick = () => {
        if (commentText.trim()) {
            onSend(commentText);
            setCommentText('');
        }
    };
    return (_jsxs("section", { className: styles.commentInput, children: [_jsxs("div", { children: [_jsx("img", { src: '../../interactive-comments-section-main/images/avatars/image-juliusomo.png', alt: "user avatar" }), _jsx("input", { type: "text", placeholder: "Add a comment...", value: commentText, onChange: (e) => setCommentText(e.target.value) })] }), _jsx("button", { onClick: handleSendClick, children: "Send" })] }));
};
export default CommentInput;

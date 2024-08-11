import styles from './Post.module.css';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
    sName: string;
    sRole: string;
    sAvatarUrl: string;
}

interface Content {
    sType: 'paragraph' | 'link';
    sContent: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
    const [aComments, setComments] = useState([
        'Post muito bacana!!'
    ]);

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' hh:mm'h'", {
        locale: ptBR
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        setComments([...aComments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent) {
        event.target.setCustomValidity('Este campo é obrigatório.');
    }

    function deleteComment(sCommentToDelete: string) {
        const commentsWithoutDeletedOne = aComments.filter(sComment => {
            return sComment !== sCommentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.sAvatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.sName}</strong>
                        <span>{author.sRole}</span>
                    </div>
                </div>

                <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(oLine => {
                    if(oLine.sType === 'paragraph') {
                        return <p key={oLine.sContent}>{oLine.sContent}</p>
                    }
                    else if(oLine.sType === 'link') {
                        return <p key={oLine.sContent}><a href='#'>{oLine.sContent}</a></p>
                    } 
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                
                <textarea 
                    name='comment' 
                    placeholder='Deixe um comentário' 
                    value={newCommentText} 
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required 
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {aComments.map(oComment => {
                    return (
                        <Comment
                            key={oComment}
                            content={oComment}
                            onDeleteComment={deleteComment} 
                        />
                    );
                })}
            </div>
        </article>
    );
}
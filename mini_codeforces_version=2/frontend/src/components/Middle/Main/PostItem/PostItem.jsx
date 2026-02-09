import React from 'react';
import voteup from "../../../../assets/img/voteup.png";
import votedown from "../../../../assets/img/votedown.png";
import comments from "../../../../assets/img/comments_16x16.png";


const PostItem = ({post}) => {



    return (

        <div>
                <article>

                    <div class="title">{post.title}</div>
                    <div class="information">By {post.id}</div>

                    <div class="body">{post.text}</div>
                    <ul class="attachment">
                        <li>Announcement of <a href="">Codeforces Round #510 (Div. 1)</a></li>
                        <li>Announcement of <a href="">Codeforces Round #510 (Div. 2)</a></li>
                    </ul>
                    <div class="footer">
                        <div class="left">
                            <img src={voteup} title="Vote Up" alt="Vote Up"/>
                            <span class="positive-score">+173</span>
                            <img src={votedown} title="Vote Down" alt="Vote Down"/>
                        </div>
                        <div class="right">

                            <img src={comments} title="Comments" alt="Comments"/>
                            <a href="">67</a>
                        </div>
                    </div>
                </article>
        </div>
    );
};

export default PostItem;
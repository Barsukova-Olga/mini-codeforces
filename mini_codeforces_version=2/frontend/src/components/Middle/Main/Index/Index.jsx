import React, {useMemo} from 'react';
import PostItem from "../PostItem/PostItem";
import cl from "../../Aside/Aside.module.css";
import Section from "../../Aside/Section/Section";

const Index = ({posts}) => {
    const sortedPosts = useMemo(() => {
        if (!posts)
            return []
        return posts.sort((a, b) => b.id - a.id)
    }, [posts])


    return (
        <article >
            {sortedPosts.map((post) =>
                <PostItem post={post} key={post.title}/>
            )}
        </article>
    );
};

export default Index;
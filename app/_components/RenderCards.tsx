import { Post } from '@prisma/client';
import React from 'react';
import Card from './Card';

const RenderCards = ({data}:{data:any}) => {
    return (
        data?.map((post:Post) =>(
        <Card key={post.id} data={post} />)
        )
    );
}

export default RenderCards;

import { NextPage } from 'next';
import React, { useState } from 'react';

interface Podcasts {
    name: string;
    host: string;
    photo: string;
};

interface Podstars {
    photo: string;
    name: string;
}

const Home: NextPage<{ authStatus: boolean }> = ({ authStatus }) => {
    const [trending, setTrending] = useState<null | Array<Podcasts>>(null);
    const [live, setLive] = useState<null | Array<Podcasts>>(null);
    const [topStars, setTopStars] = useState<null | Array<Podstars>>(null);

    return (
        <React.Fragment>
            
        </React.Fragment>
    )
};

export default Home;
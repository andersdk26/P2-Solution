import React, { JSX } from 'react';

const About = (): JSX.Element => (
    <div>
        <h1>About</h1>
        <p className="ml-8">
            JamFest is a group project made by Aalborg University Software
            students on second semester. <br />
            The focus of the project is to create a web-application that
            provides movie-recommendations for groups. In our research, we found
            that majority of people watch movies and TV-shows with other people.
            This is because connecting over a shared piece of media is
            inherently a social activity. However, due to the rise in streaming
            services, which profits off an individual user, the platforms do not
            promote sharing accounts. <br />
            This platform will <b>not</b> be offering embedded streaming, but
            merely a service to statistically find the optimal movie/TV-show to
            watch in a group. <br />
        </p>
        <h2>How it works</h2>
        <p className="ml-8">
            The users will be able to create groups with other users, where
            their individual preferences and watch-history will then be analysed
            by our algorithm to find a recommendation for a movie that suits
            everyone's taste.
        </p>
    </div>
);

export default About;

import React, { JSX } from 'react';
import Image from 'next/image';

const About = (): JSX.Element => (
    <div>
        <h1 className="ml-8">About</h1>
        <p className="ml-8 text-3xl">
            Ever had trouble finding a movie to watch with your family, friends,
            or partner? <br />
            <b>
                Then JamFest is for <i>you</i>!
            </b>
            <br /> <br />
        </p>
        <p className="ml-8 text-xl">
            JamFest lets you create and manage your watchparty as a Group, where
            our algorithm will combine the individual user profiles under a
            shared group-profile, which will then be analysed to find movies
            with shared interests. <br /> <br />
            For example, if you like action movies but your partner loves
            romance, then the algorithm will find romantic-action movies, such
            as <cite>Mr. &amp; Mrs. Smith</cite>. <br />
            <br />
            Our goal is to minimize the time you spend on discussing and
            deciding on a movie, which can instead be spent on watching the
            movie and being present with the company.
            <br /> <br />
        </p>

        <p className="ml-8 text-xl">
            <b>So, lean back, relax and enjoy the show!</b>
        </p>

        <section className="centerMyDivPlease content-center justify-center text-center m-auto">
            <Image
                src={'/img/Jamfest logo.png'}
                alt={'JamFest Logo'}
                width={500}
                height={500}
            />
        </section>
        <h2 className="ml-8">The Creators of JamFest</h2>
        <p className="ml-8 text-xl">
            We are a group of seven Software students from
            <cite>Aalborg University</cite> and this is our semester project.
            <br />
            The name <cite>JamFest</cite> is an anagram derived from the first
            letters of each of the groupmembers first names. Moreover, we wanted
            to highlight the social aspect of a watching movies with others. A
            watchparty is a form of &quot;fest&quot; and it should be a jamming
            good time!
        </p>
        <h2 className="ml-8">Motivation</h2>
        <p className="ml-8 text-xl">
            Nowadays, with the rise in individualism, watching movies is often
            associated with unwinding after a long day or cuddling up on your
            couch at home. However, historically, it started as a social event,
            where people lined the streets to go to the cinema. Initially,
            movies were not available to watch at home and only much later
            became accessible for the average household. As times changed, more
            people got the means to watch movies and TV shows on their personal
            televisions, so they no longer needed to venture outside the home
            for entertainment. In recent years, cinema prices have also
            skyrocket, now becoming an expensive and inaccesssible passtime for
            many. <br />
            But connecting over a common interest or shared experience is
            inherently human and watching along with others has persisted,
            albeit in smaller and more private settings.
            <br /> <br />
            Most streaming services, prevent and discourage users from sharing
            accounts, so the watch-history and preferences are stored on a
            single user profile. This is often circumvented by creating a joint
            profile, but can be a hassle and does not cater to the individuals
            overall preferences. Only the genres you watch in that specific
            setting. <br />
            There is also the issue of having access to enourmous content
            libraries with thousands of movies and TV-shows. It is overwhelming
            and quickly gets confusing. Therefore, our interface is also aimed
            to be minimal and straight to the point, so you do not end up
            scrolling over all the endless opportunities.
            <br />
            <br />
            Lastly, it can be hard to keep track of all the movies you watch.
            Not only for yourself, but which movies you have seen with who and
            when. For example, if you started a series with someone and do not
            remember what part you made it to. Therefore, this web-application
            is also a platform where you can keep an overview of the movies seen
            in that group, as well as find recommendations for movies none of
            you have watched before. <br />
            We are aware the movies you watch with your family can be vastly
            different from what you watch with friends. The interest can even
            vary greatly between friend groups. Therefore, the group
            organisation will help you get an overview.
        </p>
    </div>
);

export default About;

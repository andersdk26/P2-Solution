import { JSX } from 'react';

type titleProps = {
    title: string;
};

export default function GetMovieTitle({ title }: titleProps): JSX.Element {
    return <p>{title}</p>;
}

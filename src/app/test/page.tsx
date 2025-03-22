import { JSX } from 'react';
import Footer from '@/components/footer';
import NavBar from '@/components/navBar';
import Carousel from '@/components/carousel';

import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';
import img3 from '../../img/img3.jpg';
import img4 from '../../img/img4.jpg';

const IMAGES = [img1, img2, img3, img4];

export default function Test(): JSX.Element {
    return (
        <>
            <div className="min-h-screen">
                <NavBar></NavBar>
            </div>
            <div className="block top-20 items-center justify-center">
                <Carousel imageUrls={IMAGES}></Carousel>
            </div>

            <Footer></Footer>
        </>
    );
}

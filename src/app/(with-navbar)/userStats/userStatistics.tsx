export default function UserDetails(genre: string) {
    switch (genre) {
        case 'horror':
            return 1;
        case 'comedy':
            return 2;
        case 'action':
            return 3;
    }
}

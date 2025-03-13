//log-in page

/* consists of:
 *  log-in title
 *  email or username
 *      should be transparent text --> will dissapear once someone writes in it
 *  password
 *      =||=
 *  log-in button
 *      will redirect to main-page
 *  sign up-button
 *      will redirect to sign-up page
 *
 *  everything should be in the middle
 * */

import { JSX } from 'react';

//login title
export function Title(): JSX.Element {
    return (
        <>
            <Title textColor="blue">Log-in</Title>
        </>
    );
}

//username block
//function usernameBlock() {}

//password block
//function passwordBlock() {}

//login button
function loginButton() {
    return (
        //trying to redirect button to main-page
        <a href="">
            <input type="button" value="Login" />
        </a>
        //<a href="create-student" class="btn btn-default">Login</a>
    );
}

//button that will redirect to sign-in page
//function sig_inBlock() {}

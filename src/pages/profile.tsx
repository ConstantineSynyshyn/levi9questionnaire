import React from "react";

import Container from "@material-ui/core/Container";
import { Page } from "@lq-types/page";
import ProfileForm from "@components/ProfileForm";
import useOnWindowLeave from "@hooks/useOnWindowLeave";
import { Profile } from "@lq-types/profile";

const ProfilePage: Page = () => {
    useOnWindowLeave();
    const handleProfileSubmit = (profile: Partial<Profile>) => {
        console.log('Save additional profile info', profile);
    }
    return (<>
        <ProfileForm onSubmit={handleProfileSubmit}></ProfileForm>
    </>);
};

ProfilePage.getLayout = (page) => (
    <Container maxWidth="md" disableGutters>
        {page}
    </Container>
);

export default ProfilePage;
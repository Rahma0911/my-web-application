import React from 'react';
import {  Avatar, Box, Card, Grid, Tab, Tabs, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import MyAnnonces from './MyAnnonces';
import { Link } from 'react-router-dom';


const Profile = () => {
    
    const user = useSelector(state => state.userReducer.user);
    const isLoad = useSelector(state => state.userReducer.isLoad);


    return (
        <Box position="relative" mb={5}>
        <Box
            display="flex"
            alignItems="center"
            position="relative"
            minHeight="18.75rem"
            borderRadius="xl"
            className="bg_profile"
        />
        <Card
            sx={{
            position: "relative",
            mt: -8,
            mx: 3,
            py: 2,
            px: 2,
            }}
        >
            <Grid className='profil'>
                <Grid container spacing={1} alignItems="center">
                <Grid item>
                    <Avatar sx={{ bgcolor: grey[900] }} size="xl" shadow="sm" />
                </Grid>
                <Grid item>
                    <Box height="100%" mt={0.5} lineHeight={1}>
                        { isLoad ? (null) 
                        : user ? (<div>
                                <Typography variant="h5" fontWeight="medium">
                                    {user.name}
                                </Typography>
                                <Typography color="text" fontWeight="regular">
                                    {user.email}
                                </Typography>
                                </div>)
                        : null }
                    </Box>
                </Grid>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ ml: "70%" }}>

                <Tabs>
                    <Tab
                    label="paramètres"
                    icon={
                        <Link to = {{ pathname:"/settings", state:{user} }} >
                            <SettingsIcon fontSize="small" sx={{ mt: -0.25 }}>
                            paramètres
                            </SettingsIcon>
                        </Link>
                    }
                    />
                </Tabs>
                </Grid>
            </Grid>
        <Grid>
            <MyAnnonces />
        </Grid>
        </Card>
    </Box>
    )
}

export default Profile;

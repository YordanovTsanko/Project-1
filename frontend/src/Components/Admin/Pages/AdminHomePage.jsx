import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material';

const AdminHomePage = () => {

    const [isAdmin, setAdmin] = useState(false);

    useEffect(()=>{
        setAdmin(true)
    },[setAdmin])

    return (
        <>
            {isAdmin && (
                <Container maxWidth="100%">
                    <h1 style={{ textAlign: "center", margin: "20px 0", color: "#1976d2" }}>Dashboard </h1>
                </Container>)}

        </>
    )
}

export default AdminHomePage
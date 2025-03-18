import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Alert, IconButton, InputAdornment, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UserService from "../services/UserService.js";
import { Link, useNavigate } from 'react-router-dom';

const RealEstateLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        // Client-side validation for empty fields
        if (email === '' || password === '') {
            setError("Please fill in all fields");
            return;
        }

        try {
            // Attempt to authenticate with the provided credentials
            const result = await UserService.authenticate({ email, password });
            
            if (result?.status === 200) {
                localStorage.setItem("user", JSON.stringify(result.data.user));
                localStorage.setItem("token", result.data.token);
                navigate("/Dashboard");
            } else {
                // Handle the case where the backend returns an error (e.g., wrong credentials)
                setError(result?.data?.message || "Wrong username/password");
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            // Handle network errors or other unexpected issues
            console.error('Login error:', error);

            // Display an error message based on the type of error
            if (error.response && error.response.status === 400) {
                setError("Invalid username or password. Please try again.");
            } else if (error.response && error.response.status === 500) {
                setError("Server error. Please try again later.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundImage: 'url("https://your-real-estate-background-image-url.com")',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={6} md={3}> {/* Reduced the width of the card */}
                    <Paper elevation={5} sx={{ padding: 4, borderRadius: '12px', textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Log in</Typography>
                        <Typography variant="body2" sx={{ mb: 3, color: 'gray' }}>Enter your credentials to continue</Typography>
                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                placeholder="Your Email"
                                variant="standard"
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{
                                    '& .MuiInput-underline:before': {
                                        borderBottomColor: 'rgba(0, 0, 0, 0.42)',
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: '#3B82F6', // Highlight color
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                placeholder="Your Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="standard"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                sx={{
                                                    padding: 0, // Removes the padding
                                                    '&:focus': {
                                                        outline: 'none', // Removes the outline on focus
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'transparent', // Removes background on hover
                                                    }
                                                }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />} {/* Inverted icon */}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiInput-underline:before': {
                                        borderBottomColor: 'rgba(0, 0, 0, 0.42)',
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: '#3B82F6', // Highlight color
                                    },
                                }}
                            />
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: '#3B82F6', fontWeight: 'bold' }}>
                                Login
                            </Button>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Don't have an account? <Link to="/signup" style={{ color: '#3B82F6' }}>Sign up</Link>
                            </Typography>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RealEstateLoginPage;

import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useState, useEffect } from 'react';
import StaticImage from 'next/image';
import Banner from '../assets/logo.jpg';

Logo.propTypes = {
    sx: PropTypes.object
};

const CoverImgStyle = styled('img')({
    zIndex: 8,
    width: '60px',
    height: '50px'
});

interface LogoProps {
    sx?: object;
}

export default function Logo({ sx }: LogoProps) {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Box sx={{ width: 120, height: 90, zIndex: 8, ...sx }}>
            {showLoader ? (
                    <StaticImage src={Banner} alt="Lojiper" />

            ) : (
                <StaticImage src={Banner} alt="Lojiper" />
            )}
        </Box>
    );
}
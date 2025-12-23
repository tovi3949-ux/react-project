
"use client"

import { Box, Typography, useTheme } from "@mui/material"
import { motion, type Variants } from "motion/react"

function Loader() {
    const theme = useTheme();
    const dotVariants: Variants = {
        pulse: {
            scale: [1, 1.5, 1],
            transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    gap: 2
                }}
            >

                <motion.div
                    animate="pulse"
                    transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
                    className="container"
                >
                    <motion.div className="dot" variants={dotVariants} />
                    <motion.div className="dot" variants={dotVariants} />
                    <motion.div className="dot" variants={dotVariants} />
                    <StyleSheet color={theme.palette.secondary.main} />

                </motion.div>
                <Typography variant="h6" color="secondary">טוען נתונים...</Typography>
            </Box>
        </>
    )
}


function StyleSheet({ color }: { color: string }) {
    return (
        <>
            <style>
                {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
            }

            .dot {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: ${color};
                will-change: transform;
            }
            `}
            </style>
        </>
    )
}

export default Loader




import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    id?: string;
    duration?: number;
    delay?: number;
}

export const ScrollReveal = ({ 
    children, 
    direction = 'up', 
    id,
    duration = 0.7,
    delay = 0
}: Props) => {
    const directions = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { x: 50, y: 0 },
        right: { x: -50, y: 0 },
    };

    return (
        <motion.div
            id={id}
            initial={{
                opacity: 0,
                scale: 0.92,
                ...directions[direction]
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: false, amount: 0.25, margin: "0px 0px -50px 0px" }}
            transition={{
                duration,
                delay,
                ease: [0.34, 1.56, 0.64, 1],  // Custom ease curve for elasticity
                type: "spring",
                stiffness: 46,
                damping: 13
            }}
        >
            {children}
        </motion.div>
    );
};
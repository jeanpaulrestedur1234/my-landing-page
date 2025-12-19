import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    id?: string;
}

export const ScrollReveal = ({ children, direction = 'up', id }: Props) => {
    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
    };

    return (
        <motion.div
            id={id}
            initial={{
                opacity: 0,
                scale: 0.95,
                ...directions[direction]
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0
            }}

            viewport={{ once: false, amount: 0.2 }}
            transition={{
                duration: 0.6,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
};
// Main App entry point for JNDPS Attendance
import { auth } from '../firebase/firebase-config.js';

// GSAP Initialization for common elements
export const initAnimations = () => {
    gsap.from(".fade-in", {
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });

    gsap.from(".slide-up", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });
};

// Handle Bottom Nav clicks
export const setupNavigation = () => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
};

// Global app state and checks
document.addEventListener('DOMContentLoaded', () => {
    console.log("JNDPS System Initialized.");
});

import React from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particleConfig from '../config/Particle-config';

const Particle = () => {

    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={particleConfig}
        />
    )
}

export default Particle
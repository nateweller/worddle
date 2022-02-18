import { useCallback, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import CSS from 'csstype';

const Confetti: React.FC = () => {
	const refConfettiInstance = useRef<Function>();

	const getConfettiInstance = useCallback((instance) => {
		refConfettiInstance.current = instance;
	}, []);

	const canvasStyles: CSS.Properties = {
		position: 'fixed',
		pointerEvents: 'none',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
	};

	const makeShot = useCallback((particleRatio, opts) => {
		refConfettiInstance.current &&
			refConfettiInstance.current({
				...opts,
				origin: { y: 0.7 },
				particleCount: Math.floor(200 * particleRatio),
			});
	}, []);

	useEffect(() => {
		makeShot(0.25, {
			spread: 26,
			startVelocity: 55,
		});

		makeShot(0.2, {
			spread: 60,
		});

		makeShot(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8,
		});

		makeShot(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2,
		});

		makeShot(0.1, {
			spread: 120,
			startVelocity: 45,
		});
	}, [makeShot]);

	return <ReactCanvasConfetti refConfetti={getConfettiInstance} style={canvasStyles} />;
};

export default Confetti;

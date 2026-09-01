
const getAnimationDuration = (element : HTMLElement) : number => {

    const animationDuration : number = Number(getComputedStyle(element).animationDuration.slice(0, -1)) * 1000;

    if (isNaN(animationDuration) || animationDuration <= 0)
        throw new Error('Incorrect animation duration');

    return animationDuration;
};

const shakeAnimation = (

        element : HTMLElement,
        baseClassName : string,
        stateClassName : string,
        animationClassName : string,

    ) : Promise<void> =>

        new Promise((resolve) => {

            try {

                element.classList.add(`${baseClassName}--${stateClassName}`);

                const animationDuration : number = getAnimationDuration(element);

                setTimeout(() : void => {

                    element.classList.add(`${baseClassName}--${animationClassName}`);

                    setTimeout(() : void => {

                        element.classList.remove(`${baseClassName}--${animationClassName}`);
                        element.classList.remove(`${baseClassName}--${stateClassName}`);

                        resolve();

                    }, animationDuration);

                }, 150);

            } catch (error) {

                console.error(error);

                element.classList.remove(`${baseClassName}--${animationClassName}`);
                element.classList.remove(`${baseClassName}--${stateClassName}`);

                resolve();
            }
        });

const fieldShakeAnimation = (element : HTMLElement, baseClassName : string) : Promise<void> =>
    shakeAnimation(element, baseClassName, 'incorrect', 'shakeHorizontally');

const buttonShakeAnimation = (element : HTMLElement, type : string) : Promise<void> =>
    shakeAnimation(element, type, 'disabled', 'shakeHorizontally');

export { fieldShakeAnimation, buttonShakeAnimation };

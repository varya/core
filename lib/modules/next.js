export default shower => {
    const { stepSelector, activeSlideClass, shownSlideClass } = shower.options;

    let innerSteps;
    let innerAt;

    const getInnerSteps = () => {
        const { element } = shower.activeSlide;
        return [...element.querySelectorAll(stepSelector)];
    };

    const getInnerAt = () => {
        return innerSteps.filter(step => {
            return step.classList.contains(activeSlideClass);
        }).length;
    };

    const toggleActive = () => {
        innerSteps.forEach((step, index) => {
            step.classList.toggle(shownSlideClass, index < innerAt);
            step.classList.toggle(activeSlideClass, index === innerAt);
        });
    };

    shower.addEventListener('slidechange', () => {
        innerSteps = getInnerSteps();
        innerAt = getInnerAt();

        const slide = shower.activeSlide;
        slide.state.innerStepsCount = innerSteps.length;
    });

    shower.addEventListener('next', event => {
        if (event.defaultPrevented || !event.cancelable) return;
        if (shower.isListMode || innerAt === innerSteps.length) return;

        event.preventDefault();
        innerAt++;
        toggleActive();
    });

    shower.addEventListener('prev', event => {
        if (event.defaultPrevented || !event.cancelable) return;
        if (shower.isListMode || innerAt === innerSteps.length || !innerAt) return;

        event.preventDefault();
        innerAt--;
        toggleActive();
    });
};

export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach(elementName => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            }));
        });
    };

    const applyFiltering = (query, state, action) => {
        if (action && action.name === 'clear') {
            const input = action.parentElement.querySelector('input');
            input.value = '';
        }

        const filters = {};
        Object.values(elements).forEach(element => {
            if (['INPUT', 'SELECT'].includes(element.tagName) && element.value) {
                filters[`filter[${element.name}]`] = element.value;
            }
        });

        return Object.assign({}, query, filters);
    };

    return {updateIndexes, applyFiltering};
}

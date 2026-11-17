import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.replaceChildren();
    let pageCount = 1;

    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = Math.max(1, Math.min(state.page, pageCount));

        if (action) switch (action.name) {
            case 'prev': page = Math.max(1, page - 1); break;
            case 'next': page = Math.min(pageCount, page + 1); break;
            case 'first': page = 1; break;
            case 'last': page = pageCount; break;
        }
        page = Math.max(1, page);

        return Object.assign({}, query, {limit, page});
    };

    const updatePagination = (total, {page, limit}) => {
        pageCount = Math.ceil(total / limit);
        const visiblePages = getPages(page, pageCount, 5);
        pages.replaceChildren(...visiblePages.map(pageNumber => {
            const el = pageTemplate.cloneNode(true);
            return createPage(el, pageNumber, pageNumber === page);
        }));

        const skip = (page - 1) * limit;
        fromRow.textContent = total ? skip + 1 : 0;
        toRow.textContent = Math.min(page * limit, total);
        totalRows.textContent = total;
    };

    return {applyPagination, updatePagination};
};

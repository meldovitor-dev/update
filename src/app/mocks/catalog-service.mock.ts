export class MockCatalogService {
    page;
    history = [];
    constructor() {

    }
    resetHistory() {

    }
    getPageLayout() {
        return this.page;
    }
    setPageLayout(page) {
        this.page = page;
    }
}

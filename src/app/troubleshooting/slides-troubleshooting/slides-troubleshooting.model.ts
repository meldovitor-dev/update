export class SlidesTroubleshootingModel {
    public slide;
    constructor(slide) {
        this.slide = slide;
    }
    private delimiterBreadcrumb = '#breadcrumbs#';

    public getTitle() {
        if (this.slide && this.slide.top && this.slide.top.title) {
            return this.slide.top.title;
        }
        return '';
    }
    public getParagraph(idx = 0) {
        if (this.slide && this.slide.top && this.slide.top.paragraph) {
            return this.slide.top.paragraph.split(this.delimiterBreadcrumb)[idx];
        }
        return '';
    }
    public getTopImage() {
        if (this.slide && this.slide.top && this.slide.top.img) {
            return this.slide.top.img;
        }
        return '';
    }
    public getBottomImages() {
        if (this.slide && this.slide.bottom && this.slide.bottom.length) {
            return this.slide.bottom;
        }
        return [];
    }
    public getGa() {
        return this.slide ? this.slide.ga : '';
    }   
    public hasBreadcrumbs() {
        return (this.slide && this.slide.top && this.slide.top.breadcrumbs);
    }
    public getBreadcrumbsTitle() {
        if (this.hasBreadcrumbs()) {
            return this.slide.top.breadcrumbs.title || '';
        }
        return ''
    }
    public getBreadcrumbsElements() {
        if (this.hasBreadcrumbs()) {
            return this.slide.top.breadcrumbs.elements || [];
        }
        return [];
    }
    public isFullSlideMode() {
        return (this.slide && this.slide.top && this.slide.top.img && !this.getParagraph() && !this.getTitle())
    }

}
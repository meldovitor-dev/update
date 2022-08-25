export class SubContent {
    public subtitle: string;
    public subtext: string;
}

export class Terms {
    public version: string;
    public title: string;
    public subcontent: SubContent[] = [];
    constructor(version: string, title: string) {
        this.version = version;
        this.title = title;
    }
    public addSubcontent(subtitle: string, subtext: string): void {
        this.subcontent.push({
        subtitle,
        subtext,
        });
    }
}

import { AccordionCatalog } from './../../../../troubleshooting-interface';
export const CALL_GUIDE_ACCORDION_CONTENT: AccordionCatalog[] = [
    {
        title: 'Ligação Local',
        subtitle: '(mesmo DDD)',
        gaAction: 'ligacao_local',
        action: 'ligacao_local',
        paragraphs: ['Digite <span>apenas o número do telefone</span>'],
        image: 'ligacao_local',
    },
    {
        title: 'Ligação Local a cobrar',
        subtitle: '(mesmo DDD)',
        action: 'ligacao_local_a_cobrar',
        paragraphs: [
            'Digite <span>9090</span>',
            '<span>+ Número do telefone</span>'
        ],
        image: 'ligacao_local_a_cobrar',
    },
    {
        title: 'Ligação Interurbana Nacional',
        subtitle: '(outro DDD)',
        gaAction: 'ligacao_interurbana_nacional',
        action: 'ligacao_interurbana',
        paragraphs: [
            'Digite <span>0</span>',
            '<span>+ Código da operadora </span>(ex: 14 ou 31)',
            '<span>+ Código da cidade</span> (DDD)',
            '<span>+ Número do telefone</span>',
        ],
        image: 'ligacao_interurbana',
    },
    {
        title: 'Ligação Interurbana Nacional<br>a cobrar',
        subtitle: '(outro DDD)',
        gaAction: 'ligacao_interurbana_nacional_cobrar',
        action: 'ligacao_interurbana_a_cobrar',
        paragraphs: [
            'Digite <span>90</span>',
            '<span>+ Código da operadora </span>(ex: 14 ou 31)',
            '<span>+ Código da cidade</span> (DDD)',
            '<span>+ Número do telefone</span>',
        ],
        image: 'ligacao_interurbana_a_cobrar',
    },
    {
        title: 'Ligação Internacional',
        subtitle: '(DDI)',
        gaAction: 'ligacao_internacional',
        action: 'ligacao_internacional',
        paragraphs: [
            'Digite <span>00</span>',
            '<span>+ Código da operadora </span>(ex: 14 ou 31)',
            '<span>+ Código do país</span> (DDI)',
            '<span>+ Código da cidade</span> (DDD)',
            '<span>+ Número do telefone</span>',
        ],
        image: 'ligacao_internacional',
    }];

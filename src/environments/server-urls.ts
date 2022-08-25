import { environment } from './environment';

export const TECNICO_VIRTUAL_API = {
    api: `${environment.TECNICO_VIRTUAL_API}`,
    loginMinhaOi: `${environment.TECNICO_VIRTUAL_API}/usuarios/loginMinhaOi`,
    login: `${environment.TECNICO_VIRTUAL_API}/usuarios/login`,
    logout: `${environment.TECNICO_VIRTUAL_API}/usuarios/logout`,
    protocolo: `${environment.TECNICO_VIRTUAL_API}/usuarios/{id}/protocolo`,
    config: `${environment.TECNICO_VIRTUAL_API}/configuracao`,
    socketTicket: `http://localhost:3000`,
    resetDsl: `${environment.TECNICO_VIRTUAL_API}/terminal/{id}/resetDsl`,
    consultaStatusFinanceiro: `${environment.TECNICO_VIRTUAL_API}/terminal/{id}/consultaStatusFinanceiro`,
    consultaStatusTerminal: `${environment.TECNICO_VIRTUAL_API}/terminal/{id}/consultaStatusTerminal`,
    consultaEventosVulto: `${environment.TECNICO_VIRTUAL_API}/terminal/{id}/consultaEventosVulto`,
    consultaStatus: `${environment.TECNICO_VIRTUAL_API}/tv/{id}/consultaStatus`,
    diagnosticoCompleto: `${environment.TECNICO_VIRTUAL_API}/fibra/{id}/modem/diagnosticoCompleto`,
    wifiInfo: `${environment.TECNICO_VIRTUAL_API}/usuarios/{id}/wifiInfo`,
    healthStatus: `${environment.TECNICO_VIRTUAL_API}/server/status`,
    falhaMassivaInfo: `${environment.TECNICO_VIRTUAL_API}/usuarios/{idModel}/falhaMassiva/{idFalhaMassiva}`,
    checkMundoNovo: `${environment.TECNICO_VIRTUAL_API}/usuarios/produtosFibra`,
    checaProdutos: `${environment.TECNICO_VIRTUAL_API}/usuarios/produtos`,
    tokenDeeplink: `${environment.TECNICO_VIRTUAL_API}/deeplink/minha-oi`,
    tokenProdutoLogin: `${environment.TECNICO_VIRTUAL_API}/deeplink/deeplink-produto`,
};

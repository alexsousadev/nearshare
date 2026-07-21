# Nearshare

Este projeto é uma espécie de clone do Snapdrop, criado para fins de aprendizado para demonstrar a transferência direta de arquivos ponto a ponto (P2P) usando **WebRTC Data Channel** e sinalização de rede local (LAN) via **WebSockets**.

# Checklist de Evolução do Projeto

### 1. Servidor de Sinalização (Backend)
- [x ] Configurar servidor HTTP
- [x] Integrar comunicação WebSocket
- [x] Descobrir e agrupar dispositivos pelo endereço IP externo (separar salas por rede local)
- [x] Roteamento de mensagens de negociação (Offers, Answers e ICE Candidates)
- [x] Limpeza e desconexão de peers ao fechar a conexão

### 2. Interface e Conexões (Frontend)
- [x] Gerenciar a conexão WebSocket de sinalização no ciclo de vida
- [x] Persistir o socket e as conexões ativas
- [x] Renderizar lista de dispositivos ativos na rede local
- [ ] Implementar fluxo de upload ao clicar em um dispositivo alvo

### 3. Conexão Direta (WebRTC P2P)
- [ ] Inicializar instâncias usando servidores STUN públicos da Google
- [ ] Implementar troca automatizada de ICE Candidates via servidor de sinalização
- [ ] Tratar handshake completo (envio de Oferta, recebimento e aplicação de Resposta)

### 4. Canal de Dados e Transferência
- [ ] Criar canal de dados bidirecional para envio de dados binários
- [ ] Implementar partição do arquivo em pequenos pedaços (Chunks)
- [ ] Implementar **Controle de Fluxo (Flow Control)** para evitar estouro de buffer (Buffer Overflow)
- [ ] Tratar recebimento no destino (reconstruir os pedaços binários)
- [ ] Disparar download automático do arquivo utilizando `Blob` e URL virtual após recepção completa
- [ ] Adicionar indicadores visuais de progresso de envio e recebimento (%) na interface

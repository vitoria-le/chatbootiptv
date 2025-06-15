const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from?.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname || 'cliente';
        await client.sendMessage(msg.from, `Olá ${name.split(" ")[0]}! 👋\n\nSou o assistente virtual da *Connect Streaming*.\nComo posso te ajudar hoje?\n\n1️⃣ - Como funciona\n2️⃣ - Quais são os planos\n3️⃣ - Suporte técnico\n4️⃣ - Ativação de TV`);
    }

    // Opção 1 - Como funciona
    if (msg.body === '1' && msg.from?.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `📺 Nossa lista de reprodução inclui canais abertos e fechados, filmes e séries.\n\nVocê pode realizar um teste grátis para conferir melhor!`);
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `📲 Baixe um aplicativo da sua preferência. Recomendamos:\n- IPTV Player\n- Quick Player\n- IPTV Smarters Player\n- Bob Player\n\nAdicione a URL M3U enviada no teste.\n\n💡 A ativação do app custa R$10 para assinantes e R$20 para não-assinantes. Renovação anual.`);
    }

    // Opção 2 - Quais são os planos
    if (msg.body === '2' && msg.from?.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `💳 *Planos Connect Streaming (pré-pago):*\n\n📅 1 mês: R$30,00\n📅 3 meses: R$75,00\n📅 6 meses: R$150,00\n📅 12 meses: R$240,00 (ativação da TV gratuita)\n\n⚠️ Não fazemos reembolso. Realize o teste grátis antes da contratação definitiva.\n\n🔧 Ativação do app:\nR$10,00 para assinantes\nR$20,00 para não-assinantes\n*Renovação anual*`);
    }

    // Opção 3 - Suporte técnico
    if (msg.body === '3' && msg.from?.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `⚙️ Suporte Técnico:\n\nJá irei retornar sua mensagem, por favor *não faça ligações*.\nAguarde, responderei de baixo para cima.\n\nEvite enviar muitas mensagens para não perder sua posição na fila.\n\nDeixe sua dúvida ou problema detalhado aqui. Obrigado! 🙏`);

        // Enviar alerta para o número do suporte
        const numeroSuporte = '55970707070@c.us'; // <-- troque por seu número real com DDI + DDD
        await client.sendMessage(numeroSuporte, `🚨 Alerta: Um cliente acaba de solicitar *suporte técnico*! Dá uma olhada lá 👀`);
    }



    // Opção 5 - Ativação de TV
    if (msg.body === '4' && msg.from?.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `📺 *Ativação de TV – O que é?*\n\nVendemos a lista de reprodução, mas a maioria dos aplicativos exige uma *licença* para funcionar.\n\nRealizamos a ativação do aplicativo para você, sendo cliente ou não:\n\n💰 R$10,00 para assinantes\n💰 R$20,00 para não-assinantes\n\n⏳ Validade: 1 ano (renovação anual)\n\nPara ativar, envie o MAC da sua TV ou uma foto. Ele aparece normalmente no canto da tela.\n\n⚠️ Valor não reembolsável. Nossa lista funciona em diferentes aplicativos.`);
    }
});

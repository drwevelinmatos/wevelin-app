// ====== CONFIGURAÇÕES ======
window.APP_CONFIG = {
  doctorName: "Dr. Wevelin Matos - CRM-SP 196372",
  aboutMe:
    "Pediatria Integrativa, Nutrologia e Cardiologia Pediátrica. Acompanhamento individualizado, com foco em prevenção, orientação familiar e decisões compartilhadas.",
  whatsappNumber: "5516997832383",
  email: "dr.wevelin.cardioped@gmail.com",
  schedulingWhatsappNumber: "5516997832383",
  adminPin: "0502",
};

// ====== CONTEÚDOS PADRÃO ======
window.DEFAULT_CONTENT = {
  temas: [
    {
      id: "amamentacao",
      title: "Amamentação: dúvidas comuns",
      tags: ["lactente", "nutrição"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> A amamentação é recomendada de forma exclusiva até 6 meses e mantida com alimentação complementar até 2 anos ou mais.</p>
        <ul>
          <li>Pega correta e dor: observe posicionamento.</li>
          <li>Ganho de peso e número de fraldas ajudam a acompanhar.</li>
          <li>Procure avaliação se houver dificuldade persistente.</li>
        </ul>
        <p class="muted small">Este conteúdo é educativo e não substitui consulta.</p>
      `,
    },
    {
      id: "febre",
      title: "Febre: quando se preocupar",
      tags: ["febre", "infecção"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> febre é um mecanismo de defesa do organismo. Mais importante que o número é como a criança está.</p>
        <h3>Sinais de alerta</h3>
        <ul>
          <li>Prostração importante</li>
          <li>Dificuldade respiratória</li>
          <li>Convulsão</li>
          <li>Manchas roxas que não desaparecem à pressão</li>
        </ul>
        <h3>O que fazer</h3>
        <ul>
          <li>Oferecer líquidos</li>
          <li>Ambiente ventilado e roupas leves</li>
          <li>Antitérmico apenas para conforto</li>
        </ul>
        <p class="muted small">Conteúdo educativo. Em caso de urgência, procure pronto atendimento.</p>
      `,
    },
    {
      id: "tosse-resfriado",
      title: "Tosse e resfriado",
      tags: ["tosse", "resfriado"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> resfriados são comuns na infância e geralmente melhoram em 7 a 10 dias.</p>
        <h3>Sinais de alerta</h3>
        <ul>
          <li>Respiração rápida ou com esforço</li>
          <li>Lábios arroxeados</li>
          <li>Febre persistente</li>
        </ul>
        <h3>Cuidados em casa</h3>
        <ul>
          <li>Lavagem nasal com soro fisiológico</li>
          <li>Boa hidratação</li>
          <li>Evitar automedicação</li>
        </ul>
      `,
    },
    {
      id: "bronquiolite",
      title: "Bronquiolite: sinais importantes",
      tags: ["bronquiolite", "lactente"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> infecção respiratória comum em bebês, causada geralmente por vírus.</p>
        <h3>Sinais de gravidade</h3>
        <ul>
          <li>Respiração acelerada</li>
          <li>Batimento das asas do nariz</li>
          <li>Dificuldade para mamar</li>
        </ul>
        <h3>Conduta</h3>
        <ul>
          <li>Lavagem nasal frequente</li>
          <li>Manter alimentação e hidratação</li>
          <li>Procurar avaliação se piora</li>
        </ul>
      `,
    },
    {
      id: "asma",
      title: "Chiado no peito e asma",
      tags: ["asma", "chiado"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> chiado recorrente pode indicar asma. O acompanhamento regular é fundamental.</p>
        <h3>Sinais de alerta</h3>
        <ul>
          <li>Fala entrecortada</li>
          <li>Uso da musculatura do pescoço</li>
          <li>Falta de resposta à medicação habitual</li>
        </ul>
        <h3>Importante</h3>
        <ul>
          <li>Usar medicações conforme prescrição</li>
          <li>Não suspender preventivos sem orientação</li>
        </ul>
      `,
    },
    {
      id: "otite",
      title: "Dor de ouvido (Otite)",
      tags: ["otite", "dor"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> dor de ouvido é comum após resfriados.</p>
        <h3>Quando procurar atendimento</h3>
        <ul>
          <li>Dor intensa ou persistente</li>
          <li>Febre associada</li>
          <li>Saída de secreção pelo ouvido</li>
        </ul>
        <h3>Orientações</h3>
        <ul>
          <li>Não pingar nada no ouvido sem orientação</li>
          <li>Analgésicos podem ajudar no conforto</li>
        </ul>
      `,
    },
    {
      id: "gastroenterite",
      title: "Vômitos e diarreia",
      tags: ["diarreia", "vomitos"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> o maior risco é desidratação.</p>
        <h3>Sinais de alerta</h3>
        <ul>
          <li>Redução da urina</li>
          <li>Sonolência excessiva</li>
          <li>Sangue nas fezes</li>
        </ul>
        <h3>Conduta</h3>
        <ul>
          <li>Oferecer soro de reidratação oral</li>
          <li>Pequenas quantidades com frequência</li>
        </ul>
      `,
    },
    {
      id: "constipacao",
      title: "Intestino preso (constipação)",
      tags: ["constipacao", "intestino"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> é comum na infância e geralmente relacionada a hábitos.</p>
        <h3>Medidas importantes</h3>
        <ul>
          <li>Boa ingestão de água</li>
          <li>Alimentação rica em fibras</li>
          <li>Rotina para evacuar</li>
        </ul>
        <p class="muted small">Uso de laxantes só com orientação médica.</p>
      `,
    },
    {
      id: "colica",
      title: "Cólica do bebê",
      tags: ["colica", "lactente"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> comum nos primeiros meses e tende a melhorar espontaneamente.</p>
        <h3>O que pode ajudar</h3>
        <ul>
          <li>Contato pele a pele</li>
          <li>Movimentos suaves</li>
          <li>Rotina previsível</li>
        </ul>
        <p class="muted small">Choro inconsolável ou associado a outros sintomas deve ser avaliado.</p>
      `,
    },
    {
      id: "dermatite",
      title: "Dermatite atópica",
      tags: ["pele", "alergia"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> condição crônica da pele, com períodos de melhora e piora.</p>
        <h3>Cuidados diários</h3>
        <ul>
          <li>Hidratação frequente da pele</li>
          <li>Banhos rápidos e mornos</li>
          <li>Evitar sabonetes agressivos</li>
        </ul>
      `,
    },
    {
      id: "conjuntivite",
      title: "Conjuntivite",
      tags: ["olho", "conjuntivite"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> inflamação dos olhos, geralmente viral.</p>
        <h3>Quando procurar avaliação</h3>
        <ul>
          <li>Dor ocular</li>
          <li>Secreção purulenta</li>
          <li>Inchaço importante</li>
        </ul>
      `,
    },
    {
      id: "amigdalite",
      title: "Dor de garganta (Amigdalite)",
      tags: ["garganta", "amigdalite"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> pode ser viral ou bacteriana.</p>
        <h3>Sinais de alerta</h3>
        <ul>
          <li>Dificuldade para engolir</li>
          <li>Febre alta persistente</li>
          <li>Recusa alimentar importante</li>
        </ul>
      `,
    },
    {
      id: "refluxo",
      title: "Refluxo no bebê",
      tags: ["refluxo", "lactente"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> regurgitações são comuns e geralmente benignas.</p>
        <h3>Sinais de alerta</h3>
        <ul>
          <li>Perda de peso</li>
          <li>Vômitos frequentes e intensos</li>
          <li>Dificuldade alimentar</li>
        </ul>
      `,
    },
    {
      id: "alergia-alimentar",
      title: "Alergia alimentar",
      tags: ["alergia", "alimentacao"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> reação do organismo a determinado alimento.</p>
        <h3>Sinais importantes</h3>
        <ul>
          <li>Urticária</li>
          <li>Inchaço de lábios ou olhos</li>
          <li>Dificuldade respiratória</li>
        </ul>
      `,
    },
    {
      id: "crescimento",
      title: "Crescimento infantil",
      tags: ["crescimento", "desenvolvimento"],
      updatedAt: "2026-02-06",
      html: `
        <p><strong>Resumo:</strong> acompanhar crescimento ajuda a detectar precocemente problemas de saúde.</p>
        <h3>Importante</h3>
        <ul>
          <li>Avaliação regular com pediatra</li>
          <li>Comparação com curvas de crescimento</li>
        </ul>
      `,
    },
    {
      id: "urgencia",
      title: "Quando procurar pronto atendimento",
      tags: ["urgencia", "alerta"],
      updatedAt: "2026-02-06",
      html: `
        <ul>
          <li>Dificuldade para respirar</li>
          <li>Convulsão</li>
          <li>Prostração importante</li>
          <li>Manchas roxas que não somem à pressão</li>
          <li>Desidratação</li>
        </ul>
        <p class="muted small">Na dúvida, procure atendimento presencial.</p>
      `,
    },
  ],

  tabelas: [
    {
      id: "antitermicos",
      title: "Antitérmicos: referência rápida",
      tags: ["febre", "medicação"],
      updatedAt: "2026-02-07",
      html: `
        <table>
          <thead>
            <tr><th>Medicamento</th><th>Dose</th><th>Intervalo</th><th>Observações</th></tr>
          </thead>
          <tbody>
            <tr><td>Paracetamol</td><td>10–15 mg/kg/dose</td><td>6/6h</td><td>Usar para conforto; respeitar dose máxima orientada</td></tr>
            <tr><td>Ibuprofeno</td><td>5–10 mg/kg/dose</td><td>6–8/8h</td><td>Evitar em desidratação importante; seguir orientação do pediatra</td></tr>
          </tbody>
        </table>
        <p class="muted small">Doses e intervalos podem variar por idade/condição clínica.</p>
      `,
    },
    {
      id: "sinais-alerta",
      title: "Sinais de alerta: quando procurar urgência",
      tags: ["urgência", "alerta", "triagem"],
      updatedAt: "2026-02-07",
      html: `
        <table>
          <thead>
            <tr><th>Sinal</th><th>Exemplos</th><th>Conduta</th></tr>
          </thead>
          <tbody>
            <tr><td>Respiração difícil</td><td>Costelas marcando, respiração rápida, lábios arroxeados</td><td>Pronto atendimento</td></tr>
            <tr><td>Prostração importante</td><td>Muito sonolento, difícil de acordar, “muito molinho”</td><td>Pronto atendimento</td></tr>
            <tr><td>Desidratação</td><td>Sem urinar, boca seca, choro sem lágrima</td><td>Avaliação médica</td></tr>
            <tr><td>Manchas que não somem à pressão</td><td>Pontinhos/manchas roxas que não clareiam</td><td>Urgência</td></tr>
            <tr><td>Convulsão</td><td>Crise convulsiva, olhar parado, abalos</td><td>Urgência</td></tr>
          </tbody>
        </table>
        <p class="muted small">Na dúvida sobre gravidade, procure avaliação presencial.</p>
      `,
    },
    {
      id: "lavagem-nasal",
      title: "Lavagem nasal: passo a passo",
      tags: ["nariz", "soro", "resfriado"],
      updatedAt: "2026-02-07",
      html: `
        <table>
          <thead>
            <tr><th>Etapa</th><th>Como fazer</th><th>Dica</th></tr>
          </thead>
          <tbody>
            <tr><td>1) Preparar</td><td>Soro fisiológico 0,9% e seringa (sem agulha)</td><td>Higiene das mãos</td></tr>
            <tr><td>2) Posição</td><td>Criança levemente inclinada para frente/lado</td><td>Evite deitar totalmente</td></tr>
            <tr><td>3) Aplicar</td><td>Aplicar soro em uma narina e deixar sair pela outra</td><td>Repetir conforme necessidade</td></tr>
          </tbody>
        </table>
        <p class="muted small">Se piora respiratória, dor intensa ou sangramento importante, procure avaliação.</p>
      `,
    },
    {
      id: "hidratar-diarreia",
      title: "Diarreia/vômitos: como hidratar (guia rápido)",
      tags: ["diarreia", "vomitos", "hidratação"],
      updatedAt: "2026-02-07",
      html: `
        <table>
          <thead>
            <tr><th>Situação</th><th>O que fazer</th><th>Evitar</th></tr>
          </thead>
          <tbody>
            <tr><td>Vômitos</td><td>Pequenas quantidades frequentes</td><td>Grandes volumes de uma vez</td></tr>
            <tr><td>Diarreia</td><td>Preferir soro de reidratação oral</td><td>Refrigerantes e sucos muito açucarados</td></tr>
            <tr><td>Alimentação</td><td>Manter conforme tolerância</td><td>Jejum prolongado</td></tr>
          </tbody>
        </table>
        <p class="muted small">Sinais de desidratação (pouca urina, prostração) exigem avaliação.</p>
      `,
    },
    {
      id: "hidratar-febre",
      title: "Febre: hidratação e conforto",
      tags: ["febre", "cuidados"],
      updatedAt: "2026-02-07",
      html: `
        <table>
          <thead>
            <tr><th>Objetivo</th><th>Como fazer</th><th>Dica</th></tr>
          </thead>
          <tbody>
            <tr><td>Hidratar</td><td>Água/leite conforme idade, em pequenas ofertas</td><td>Observe urina e aceitação</td></tr>
            <tr><td>Conforto</td><td>Roupas leves e ambiente ventilado</td><td>Evite excesso de cobertas</td></tr>
            <tr><td>Antitérmico</td><td>Usar se desconforto</td><td>Não é obrigatório “zerar” a febre</td></tr>
          </tbody>
        </table>
      `,
    },
    {
      id: "retorno-escola",
      title: "Retorno à escola/creche: critérios práticos",
      tags: ["escola", "infecção", "rotina"],
      updatedAt: "2026-02-07",
      html: `
        <table>
          <thead>
            <tr><th>Pode retornar se…</th><th>Melhor aguardar se…</th><th>Observação</th></tr>
          </thead>
          <tbody>
            <tr><td>Está bem-disposto e alimentando</td><td>Prostração importante</td><td>Estado geral é o principal</td></tr>
            <tr><td>Sem febre e com bom conforto</td><td>Febre persistente</td><td>Regras podem variar por escola</td></tr>
            <tr><td>Sem vômitos/diarreia ativos</td><td>Vômitos/diarreia frequentes</td><td>Risco de desidratação/contágio</td></tr>
          </tbody>
        </table>
        <p class="muted small">Quando houver dúvida, converse com o pediatra.</p>
      `,
    },
    {
      id: "sono-seguro",
      title: "Sono seguro do bebê (resumo)",
      tags: ["bebê", "sono", "segurança"],
      updatedAt: "2026-02-07",
      html: `
        <table>
          <thead>
            <tr><th>Recomendado</th><th>Evitar</th><th>Por quê</th></tr>
          </thead>
          <tbody>
            <tr><td>Dormir de barriga para cima</td><td>Barriga para baixo/ lado</td><td>Reduz risco de acidentes</td></tr>
            <tr><td>Superfície firme</td><td>Travesseiros/almofadas/objetos soltos</td><td>Menor risco de sufocação</td></tr>
            <tr><td>Ambiente sem fumaça</td><td>Fumo passivo</td><td>Melhora saúde respiratória</td></tr>
          </tbody>
        </table>
        <p class="muted small">Orientação geral. Recomendações podem variar por faixa etária e contexto.</p>
      `,
    },
    {
      id: "alimentacao-6m",
      title: "Introdução alimentar (após 6 meses): guia rápido",
      tags: ["nutrição", "6 meses", "alimentação"],
      updatedAt: "2026-02-07",
      html: `
        <table>
          <thead>
            <tr><th>Ponto-chave</th><th>Como fazer</th><th>Dica</th></tr>
          </thead>
          <tbody>
            <tr><td>Frequência</td><td>Começar com pequenas ofertas e aumentar gradualmente</td><td>Sem pressa; observar sinais de fome/saciedade</td></tr>
            <tr><td>Textura</td><td>Evoluir consistência conforme aceitação</td><td>Variedade ajuda a aceitação</td></tr>
            <tr><td>Alérgenos</td><td>Introduzir com orientação do pediatra se necessário</td><td>Monitorar reações</td></tr>
          </tbody>
        </table>
        <p class="muted small">Orientação geral. Ajustes dependem do desenvolvimento e da história clínica.</p>
      `,
    },
    {
      id: "vacinas-rotina",
      title: "Vacinas: por que manter em dia (resumo)",
      tags: ["vacinas", "prevenção"],
      updatedAt: "2026-02-07",
      html: `
        <table>
          <thead>
            <tr><th>Benefício</th><th>Impacto</th><th>Observação</th></tr>
          </thead>
          <tbody>
            <tr><td>Proteção individual</td><td>Reduz risco de formas graves</td><td>Cada vacina tem sua indicação</td></tr>
            <tr><td>Proteção coletiva</td><td>Diminui circulação de doenças</td><td>Ajuda a proteger vulneráveis</td></tr>
            <tr><td>Seguimento</td><td>Evita atrasos no calendário</td><td>Levar carteira às consultas</td></tr>
          </tbody>
        </table>
        <p class="muted small">Para o calendário exato, siga a carteira e as orientações do seu pediatra.</p>
      `,
    },
    {
      id: "medicacao-segura",
      title: "Medicação segura: regras de ouro",
      tags: ["medicação", "segurança"],
      updatedAt: "2026-02-07",
      html: `
        <table>
          <thead>
            <tr><th>Regra</th><th>Exemplo</th><th>Por quê</th></tr>
          </thead>
          <tbody>
            <tr><td>Evitar automedicação</td><td>Antibiótico “sobrando”</td><td>Risco de erros e resistência</td></tr>
            <tr><td>Conferir dose</td><td>Dose por peso</td><td>Segurança e eficácia</td></tr>
            <tr><td>Conferir medida</td><td>Seringa dosadora</td><td>Evita “colheradas” imprecisas</td></tr>
            <tr><td>Armazenar correto</td><td>Temperatura/validade</td><td>Evita perda de efeito</td></tr>
          </tbody>
        </table>
        <p class="muted small">Em caso de dúvida, confirme com o pediatra.</p>
      `,
    },
  ],
};

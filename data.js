/* ============================================================
   DATA.JS — Conteúdo estruturado dos 5 módulos de Terapia Intensiva
   Fonte: slides da disciplina (Profª. Enilce Moreira) — Faculdade de
   Saúde Santa Casa BH. Reorganizado para fins de revisão de prova.
   ============================================================ */

const STUDY_DATA = {

  bia: {
    title: "Balão Intra-aórtico",
    short: "BIA",
    accent: "#7500AF",
    intro: "Dispositivo de assistência ventricular temporário que faz contrapulsação na aorta descendente, sincronizado ao ciclo cardíaco.",
    sections: [
      {
        type: "concept",
        title: "O que é o BIA",
        body: "É um cateter-balão que insufla e desinsufla de forma dinâmica durante a diástole ventricular. Em uso desde 1968, é amplamente utilizado por sua facilidade de passagem (pode ser à beira-leito) e manuseio relativamente simples.",
        highlight: {
          label: "3 objetivos fundamentais",
          items: [
            "Reduzir o consumo de O₂ miocárdico",
            "Aumentar a pressão de perfusão coronariana",
            "Diminuir a pós-carga ventricular"
          ]
        }
      },
      {
        type: "team",
        title: "Quem faz o quê",
        body: "Procedimento realizado na Hemodinâmica.",
        roles: [
          { role: "Hemodinamicista (médico)", desc: "Realiza o procedimento de implante" },
          { role: "Enfermeiro especializado", desc: "Atua na equipe da Hemodinâmica" },
          { role: "Técnico de enfermagem", desc: "Treinado especificamente em Hemodinâmica" }
        ],
        note: "O cateter é conectado a um equipamento chamado Console, ao monitor e a um esquema de heparina."
      },
      {
        type: "diagram",
        title: "Onde fica posicionado",
        body: "Introduzido pela artéria femoral. A ponta distal fica na aorta descendente, cerca de 1 cm abaixo da origem da artéria subclávia.",
        diagramType: "bia-position"
      },
      {
        type: "mechanism",
        title: "Como funciona — contrapulsação",
        body: "O balão trabalha em oposição ao ciclo cardíaco: insufla quando o coração relaxa e desinsufla quando o coração contrai.",
        steps: [
          { phase: "Diástole", trigger: "logo após o fechamento da valva aórtica", action: "Balão INSUFLA", effect: "↑ pressão de perfusão coronariana · ↑ oferta de O₂ · ↑ pressão diastólica aórtica" },
          { phase: "Sístole", trigger: "imediatamente antes da abertura da valva aórtica", action: "Balão DESINSUFLA", effect: "Efeito vácuo → ↓ demanda de O₂ · ↓ pressão sistólica" }
        ],
        result: "Efeito final: melhora do débito cardíaco — aumento estimado de 20% ou 0,5 a 1 L/min com suporte do BIA."
      },
      {
        type: "list",
        title: "Indicações",
        icon: "clipboard",
        items: [
          "Angina instável",
          "Infarto iminente",
          "IAM e suas complicações",
          "Falha ventricular",
          "Choque cardiogênico",
          "Suporte para procedimentos percutâneos ou de revascularização",
          "Choque séptico",
          "Disfunção miocárdica"
        ]
      },
      {
        type: "care",
        title: "Cuidados de enfermagem",
        groups: [
          {
            label: "Durante o procedimento",
            items: [
              "Minimizar o estresse psicológico do paciente/família, buscando colaboração",
              "Disponibilizar material organizado ao médico para agilizar o procedimento",
              "Aplicar medidas de prevenção de infecção",
              "Verificar o posicionamento do balão após inserção"
            ]
          },
          {
            label: "Vigilância contínua",
            items: [
              "Avaliar sinais vitais e hemodinâmicos — comunicar qualquer alteração",
              "Palpar pulsos tibial e pedioso; verificar temperatura e coloração da extremidade",
              "Avaliar permanentemente o nível de consciência",
              "Orientar o paciente a manter-se quieto, com a perna do BIA estirada"
            ]
          },
          {
            label: "Controle de infecção",
            items: [
              "Técnica asséptica no implante do cateter-balão",
              "Higienizar as mãos antes e após manipular o BIA e conexões",
              "Antibioticoterapia prescrita antes e após a passagem do cateter",
              "Trocar curativo a cada 24h ou se houver umidade (enfermeiro)",
              "Controlar temperatura — atenção a picos febris e coleta de hemocultura"
            ]
          }
        ]
      }
    ]
  },

  piapic: {
    title: "PIA & PIC",
    short: "PIA/PIC",
    accent: "#1888E2",
    intro: "Duas pressões, dois compartimentos diferentes: o abdome e o crânio. Ambas tornaram-se padrão de monitorização em UTI por seu impacto direto na morbimortalidade.",
    sections: [
      {
        type: "subheader",
        label: "Parte 1",
        title: "Pressão Intra-Abdominal (PIA)"
      },
      {
        type: "concept",
        title: "O que é a PIA",
        body: "É a pressão de estado estável oculta na cavidade abdominal. Pode ser medida diretamente (cateter no compartimento abdominal) ou indiretamente — a mais comum é pela pressão vesical (PIV), mas também pode ser gástrica ou de outras cavidades."
      },
      {
        type: "vitals",
        title: "Valores de referência — PIA",
        items: [
          { label: "PIA normal", value: "5–7", unit: "mmHg", tone: "normal" },
          { label: "Limite aceitável (paciente crítico)", value: "até 10", unit: "mmHg", tone: "normal" },
          { label: "Hipertensão intra-abdominal (HIA)", value: "> 12", unit: "mmHg", tone: "alert" },
          { label: "Síndrome compartimental abdominal", value: "> 20", unit: "mmHg", tone: "critical", extra: "+ disfunção de novos órgãos" }
        ]
      },
      {
        type: "concept",
        title: "Síndrome Compartimental do Abdome (SCA)",
        body: "Conjunto de disfunções orgânicas — deterioração respiratória, cardiovascular, renal, esplâncnica e/ou do SNC — decorrente do aumento da PIA. É revertida pela descompressão da cavidade abdominal.",
        highlight: {
          label: "Sinais clínicos",
          items: ["Abdome distendido e tenso", "Aumento da pressão inspiratória", "Hipercapnia refratária à administração de O₂", "Oligúria"]
        }
      },
      {
        type: "twocol",
        title: "Quando suspeitar / medir",
        colA: { label: "Indicações de mensuração", items: ["Trauma abdominal", "Distensão abdominal", "Dificuldade respiratória com distensão", "Hipercapnia", "Oligúria", "Redução do débito cardíaco", "Hipóxia"] },
        colB: { label: "Situações que elevam a PIA", items: ["Grandes queimados", "Trauma abdominal extenso", "Sangramento intra-abdominal", "Coagulopatias", "Reanimação volêmica (colóides/cristalóides)"] }
      },
      {
        type: "competence",
        title: "Quem realiza",
        body: "A indicação é médica, mas a realização da monitoração da PIA é de competência privativa do enfermeiro, respaldada em protocolo institucional."
      },
      {
        type: "steps",
        title: "Técnica de aferição (via vesical)",
        steps: [
          "Manter o paciente em posição supina",
          "Injetar 100 mL de SF 0,9% diretamente na bexiga, via sonda (seringa de 60 mL)",
          "Pinçar o tubo conectado à bolsa coletora de urina",
          "Conectar um manômetro de pressão a um equipo e uma agulha 40x12",
          "Introduzir a agulha na parte de silicone do tubo (local de coleta de amostra)",
          "Zerar o manômetro na sínfise púbica do paciente",
          "Aguardar a expiração do paciente",
          "Abrir o equipo e anotar a pressão verificada"
        ]
      },
      {
        type: "care",
        title: "Cuidados de enfermagem — PIA",
        groups: [
          {
            label: "Rotina de medição",
            items: [
              "Verificar a PIA a cada 4–8h, sempre na mesma posição (0–30°, idealmente grau zero)",
              "Esvaziar a bexiga antes do procedimento",
              "Manter a bolsa coletora sempre abaixo da linha da cintura"
            ]
          },
          {
            label: "Manuseio do sistema",
            items: [
              "Não desconectar o sistema na junção sonda–conector da bolsa coletora",
              "Se precisar trocar a bolsa coletora, realizar nova sondagem vesical"
            ]
          }
        ]
      },

      { type: "divider" },

      {
        type: "subheader",
        label: "Parte 2",
        title: "Pressão Intracraniana (PIC)"
      },
      {
        type: "concept",
        title: "O que é a PIC",
        body: "Reflete a pressão dentro do crânio, relacionada aos componentes intracranianos. A monitorização precede o aparecimento de sinais e sintomas de descompensação no paciente neurocrítico, permitindo ações precoces."
      },
      {
        type: "composition",
        title: "Composição do crânio (doutrina de Monro-Kellie)",
        body: "Qualquer aumento de volume de um componente eleva a PIC, a menos que outro componente reduza compensatoriamente.",
        parts: [
          { label: "Parênquima cerebral", pct: 85, color: "#7500AF" },
          { label: "Líquido cefalorraquidiano (LCR)", pct: 10, color: "#1888E2" },
          { label: "Sangue arterial e venoso", pct: 5, color: "#E8553D" }
        ]
      },
      {
        type: "vitals",
        title: "Valores de referência — PIC",
        items: [
          { label: "PIC normal", value: "0–15", unit: "mmHg", tone: "normal" },
          { label: "HIC — critério diagnóstico", value: "> 20", unit: "mmHg por > 10s sem estímulo", tone: "alert" },
          { label: "HIC moderada", value: "até 40", unit: "mmHg", tone: "alert" },
          { label: "HIC grave", value: "> 41", unit: "mmHg", tone: "critical" },
          { label: "Geralmente fatal sem reversão", value: "> 60", unit: "mmHg", tone: "critical" }
        ]
      },
      {
        type: "formula",
        title: "Pressão de Perfusão Cerebral (PPC)",
        formula: "PPC = PAM − PIC",
        body: "Quando a PIC sobe, a PPC cai. Por isso, ao controlar a PIC, é essencial monitorar e manter a PPC adequada."
      },
      {
        type: "list",
        title: "Métodos de monitorização invasiva da PIC",
        icon: "target",
        items: [
          "Intraventricular — método mais utilizado, cateter DVE; permite drenagem do LCR e coleta de material para exame",
          "Intraparenquimatosa",
          "Epidural",
          "Subdural",
          "Subaracnóidea"
        ],
        note: "Inserção feita pelo neurocirurgião. Ao enfermeiro compete a montagem do circuito de monitorização; enfermeiro e técnico mantêm o sistema e registram os valores."
      },
      {
        type: "care",
        title: "Cuidados de enfermagem — PIC / DVE",
        groups: [
          {
            label: "Posicionamento e sistema",
            items: [
              "Cabeceira elevada entre 30° e 45°",
              "Manter a cabeça em posição neutra (facilita drenagem venosa jugular)",
              "Sistema DVE/PIC em suporte exclusivo",
              "Checagem do sistema a cada 6 horas",
              "Zerar o cateter de DVE no conduto auditivo externo, sem tracionar",
              "Em obstrução: NÃO desobstruir nem reposicionar por conta própria",
              "Nivelar a DVE conforme orientação médica/neurocirúrgica",
              "Bolsa de drenagem no nível zero, fixada à altura do forame de Monro"
            ]
          },
          {
            label: "Nunca fazer",
            items: [
              "Nunca aspirar ou ejetar solução no cateter",
              "Não esquecer de reabrir o cateter de DVE após qualquer procedimento"
            ]
          },
          {
            label: "Vigilância clínica",
            items: [
              "Avaliação pupilar constante",
              "Aferição de sinais vitais a cada 2h",
              "Temperatura é prioridade: febre ↑ metabolismo cerebral → ↑ fluxo sanguíneo → pode elevar a PIC",
              "Drenagem excessiva: comunicar imediatamente e registrar volume, aspecto e coloração do LCR",
              "Curativo conforme protocolo"
            ]
          }
        ]
      }
    ]
  },

  hemo: {
    title: "Monitorização Hemodinâmica Invasiva",
    short: "Hemodinâmica",
    accent: "#B0247A",
    intro: "Engloba PAI (pressão arterial invasiva), PVC (pressão venosa central), além de PIC e pressão intravesical — aqui o foco é PAI e PVC.",
    sections: [
      {
        type: "subheader",
        label: "Parte 1",
        title: "Pressão Arterial Invasiva (PAI / PIA)"
      },
      {
        type: "concept",
        title: "O que é e para que serve",
        body: "O cateterismo arterial permite monitorizar a pressão arterial de forma contínua e precisa em pacientes instáveis, além de avaliar a dinâmica circulatória e oferecer acesso ao sangue arterial para exames frequentes."
      },
      {
        type: "list",
        title: "Indicações",
        icon: "clipboard",
        items: ["Hipertensão maligna", "IAM complicado", "Traumatismos múltiplos", "Cirurgia cardiovascular", "Necessidade de exames de sangue arterial frequentes"]
      },
      {
        type: "ranked",
        title: "Locais de punção",
        items: [
          { rank: "1ª opção", label: "Artéria radial" },
          { rank: "", label: "Artéria femoral" },
          { rank: "", label: "Artéria pediosa" },
          { rank: "", label: "Artéria braquial" },
          { rank: "", label: "Artéria axilar" }
        ]
      },
      {
        type: "vitals",
        title: "Valores de referência — PAI / PAM",
        items: [
          { label: "Alarme PAI — mínimo", value: "70", unit: "mmHg", tone: "normal" },
          { label: "Alarme PAI — máximo", value: "105", unit: "mmHg", tone: "normal" },
          { label: "PAM normal", value: "70–105", unit: "mmHg", tone: "normal" }
        ]
      },
      {
        type: "formula",
        title: "Pressão Arterial Média (PAM)",
        formula: "PAM = [PAS + 2 × PAD] ÷ 3",
        body: "Obtida através da monitoração da PAI. É um dos parâmetros mais importantes para avaliar o estado hemodinâmico do paciente crítico."
      },
      {
        type: "procedure",
        title: "Teste de Allen",
        body: "Antes de puncionar a artéria radial, é preciso confirmar a circulação colateral.",
        steps: [
          "Comprimir simultaneamente as artérias radial e ulnar",
          "Pedir ao paciente para abrir e fechar a mão",
          "Liberar a pressão em uma das artérias",
          "A mão deve voltar à coloração normal em segundos — isso confirma a circulação colateral"
        ]
      },
      {
        type: "concept",
        title: "Material necessário",
        body: "Cateter oco (Jelco), sistema de monitoração preenchido com solução salina, equipo com câmara de gotejamento, equipo não complacente, torneiras, dispositivo de lavagem, transdutores e monitor que amplifica e demonstra pressões e ondas."
      },
      {
        type: "team",
        title: "Atribuições da equipe",
        roles: [
          { role: "Enfermeiro", desc: "Reunir material · montar o sistema · realizar a punção (se qualificado) · curativo · manutenção e vigilância · coleta de sangue · remoção" },
          { role: "Técnico de enfermagem", desc: "Reunir material · manutenção e vigilância · mensuração" }
        ]
      },
      {
        type: "list",
        title: "Complicações mais comuns",
        icon: "alert",
        tone: "critical",
        items: ["Necrose isquêmica da mão e antebraço", "Infecção", "Embolia", "Trombose"]
      },
      {
        type: "care",
        title: "Cuidados de enfermagem — PAI",
        groups: [
          {
            label: "Punção e curativo",
            items: [
              "Auxiliar o médico na punção (procedimento estéril)",
              "Lavar as mãos antes/depois; técnica asséptica no manuseio",
              "Curativo: gaze + fita hipoalergênica nas primeiras 24h; depois filme transparente estéril (até 7 dias, ou antes se sujidade/secreção/sangue)",
              "Transdutor de pressão na altura da linha axilar média, 4º espaço intercostal"
            ]
          },
          {
            label: "Zeragem e vigilância",
            items: [
              "Zerar a PIA no monitor após a punção, a cada 24h e sempre que houver valores duvidosos",
              "Observar valores e curva da PIA; comunicar alterações",
              "Verificar permeabilidade do cateter; infusão contínua salinizada sob pressão de 300 mmHg (bolsa pressórica)"
            ]
          },
          {
            label: "Segurança do sistema",
            items: [
              "Trocar solução de PIA a cada 24h; identificar e manter na bolsa pressórica",
              "Nunca permitir entrada de ar no sistema (risco de embolia gasosa)",
              "Anotar valores de PIA no Balanço Hídrico (BH) a cada 2h"
            ]
          }
        ]
      },

      { type: "divider" },

      {
        type: "subheader",
        label: "Parte 2",
        title: "Pressão Venosa Central (PVC)"
      },
      {
        type: "concept",
        title: "O que é a PVC",
        body: "Mede a pressão média do átrio direito (AD) e a pressão final diastólica do ventrículo direito (VD). É monitorizada por cateter em acesso venoso central (subclávia, jugular interna ou femoral), com extremidade na porção superior da veia cava superior."
      },
      {
        type: "twocol",
        title: "Finalidade e indicações",
        colA: { label: "Finalidade", items: ["Avaliar o grau de hidratação através da volemia"] },
        colB: { label: "Indicações", items: ["Insuficiência renal aguda", "Choque séptico", "Cirurgia de grande porte"] }
      },
      {
        type: "vitals",
        title: "Valores de referência — PVC",
        items: [
          { label: "Via transdutor eletrônico", value: "3–6", unit: "mmHg", tone: "normal" },
          { label: "Via coluna d'água", value: "6–10", unit: "cmH₂O", tone: "normal" }
        ]
      },
      {
        type: "competence",
        title: "Quem realiza",
        body: "A verificação da PVC NÃO é privativa do enfermeiro — pode ser feita pelo técnico de enfermagem após treinamento e supervisão, desde que o profissional reconheça seus limites de conhecimento e habilidade. Já a instalação e a retirada são privativas do enfermeiro.",
        source: "Secretaria Geral Coren-RO, 2022"
      },
      {
        type: "care",
        title: "Cuidados de enfermagem — PVC",
        groups: [
          {
            label: "Durante a mensuração",
            items: [
              "Lavar as mãos antes/depois; técnica asséptica no manuseio",
              "Transdutor de pressão na altura da linha axilar média, 4º espaço intercostal",
              "Acesso exclusivo para mensuração — pausar todas as medicações da via no momento da aferição",
              "Manter curativo estéril",
              "Bolsa pressurizada a 300 mmHg (pressões menores não garantem irrigação contínua adequada)"
            ]
          },
          {
            label: "Registro e troca de material",
            items: [
              "Anotar valores de PVC no BH a cada 2h",
              "Atentar para a forma correta da curva de PVC",
              "Trocar equipos/extensões/torneirinhas a cada 72h",
              "Em refluxo de sangue (infusões intermitentes, antimicrobianos, hemoderivados): trocar o sistema imediatamente ou no máx. em 24h",
              "Antissepsia com álcool 70% antes e após manipular conexões"
            ]
          }
        ]
      }
    ]
  },

  marcapasso: {
    title: "Marcapasso",
    short: "Marcapasso",
    accent: "#E8553D",
    intro: "Terapêutica elétrica: equipamento que inicia o batimento cardíaco quando o sistema elétrico intrínseco do coração não consegue manter um débito cardíaco adequado.",
    sections: [
      {
        type: "concept",
        title: "Conceito",
        body: "O marca-passo é um equipamento eletrônico utilizado para iniciar o batimento, quando o sistema elétrico intrínseco do coração é incapaz de gerar uma frequência adequada à manutenção do débito cardíaco.",
        source: "Oliveira; Mendonça, 2006"
      },
      {
        type: "concept",
        title: "Quando é necessário",
        body: "O paciente que precisa de marca-passo tem um coração lento e desregulado — quadro chamado bradiarritmia."
      },
      {
        type: "tabs-compare",
        title: "Tipos de marcapasso",
        tabs: [
          {
            label: "Definitivo",
            badge: "Cirúrgico",
            body: "O mais conhecido pela população. Implantado no tórax por procedimento cirúrgico, com fios no átrio e no ventrículo do coração.",
            details: [
              "Impulsos elétricos transmitidos ao miocárdio por eletrodos transvenosos, a partir do gerador de pulsos",
              "Bateria dura geralmente de 10 a 15 anos — ainda assim requer monitoramento regular"
            ]
          },
          {
            label: "Transcutâneo",
            badge: "Emergência",
            body: "Usado em emergências médicas. Duas pás de eletrodos são colocadas no tórax do paciente e conectadas a um desfibrilador, fazendo o coração voltar a bater.",
            details: ["Também chamado de transtorácico", "Solução rápida enquanto se decide a conduta definitiva"]
          },
          {
            label: "Transvenoso",
            badge: "Temporário",
            body: "Também usado em emergências, porém em meio hospitalar. Uma incisão é feita em uma veia e um cabo-eletrodo é conduzido até o coração.",
            details: ["Composto por gerador de impulsos elétricos, eletrodos e fio/cateter de derivação", "Usado temporariamente"]
          }
        ]
      },
      {
        type: "list",
        title: "Quando indicar o marcapasso temporário",
        icon: "clipboard",
        items: [
          "Causa temporária — ex: bloqueios após cirurgia cardíaca ou IAM",
          "Resguardar o paciente de complicações até a conduta definitiva",
          "Avaliar o resultado da estimulação artificial antes de indicar o MP definitivo (especialmente em chagásicos, ateroscleróticos e em ICC)"
        ]
      },
      {
        type: "care",
        title: "Assistência de enfermagem — Definitivo",
        groups: [
          {
            label: "Pré-operatório",
            items: ["Manter o paciente em jejum", "Realizar tricotomia, se necessário", "Atentar para uma escuta afetiva"]
          },
          {
            label: "Pós-operatório",
            items: [
              "Monitorização rigorosa e contínua dos parâmetros vitais",
              "Troca de curativos de forma asséptica",
              "Administrar medicação prescrita",
              "Atentar para uma escuta contínua"
            ]
          }
        ]
      },
      {
        type: "care",
        title: "Assistência de enfermagem — Transcutâneo",
        groups: [
          {
            label: "Preparo e procedimento",
            items: [
              "Orientar o paciente sobre os procedimentos a serem realizados",
              "Conectar os eletrodos (pás adesivas) ao cabo e ao desfibrilador",
              "Tricotomia do tórax se necessário, para boa aderência das pás",
              "Limpar a pele com álcool ou água e sabão (remover gordura da pele)",
              "Auxiliar o médico na condução do procedimento",
              "Manter o paciente constantemente monitorado (FC, FR, oximetria)"
            ]
          }
        ]
      },
      {
        type: "care",
        title: "Assistência de enfermagem — Transvenoso",
        groups: [
          {
            label: "Antes e durante o implante",
            items: [
              "Checar se a bateria do equipamento está funcionando; ter pilhas reserva",
              "Orientar o paciente sobre os procedimentos a serem realizados",
              "Manter o paciente em monitorização constante",
              "Auxiliar o médico na passagem do marcapasso transvenoso",
              "Ficar atento a possíveis arritmias durante o implante"
            ]
          },
          {
            label: "Após o implante",
            items: [
              "Curativo da inserção conforme protocolo do CCIH (enfermeiro)",
              "Registrar em prontuário os parâmetros selecionados pelo médico (frequência cardíaca, amplitude de pulso)"
            ]
          }
        ]
      }
    ]
  },

  vm: {
    title: "Ventilação Mecânica",
    short: "VM",
    accent: "#2D9D78",
    intro: "Suporte ventilatório para insuficiência respiratória aguda ou crônica agudizada — modalidade essencial em emergência e medicina intensiva.",
    sections: [
      {
        type: "concept",
        title: "Conceito",
        body: "A ventilação mecânica (VM), ou mais propriamente 'suporte ventilatório', é um método de suporte para tratamento de pacientes com insuficiência respiratória aguda ou crônica agudizada."
      },
      {
        type: "list",
        title: "Objetivos da VM",
        icon: "target",
        items: [
          "Manter as trocas gasosas — corrigir hipoxemia e acidose respiratória/hipercapnia",
          "Aliviar o trabalho da musculatura respiratória em situações de alta demanda metabólica",
          "Reverter ou evitar a fadiga da musculatura respiratória",
          "Diminuir o consumo de oxigênio, reduzindo o desconforto respiratório",
          "Permitir a aplicação de terapêuticas específicas"
        ]
      },
      {
        type: "glossary",
        title: "Conceitos básicos",
        items: [
          { term: "FiO₂", def: "Fração inspirada de oxigênio — proporção de oxigênio no ar inspirado." },
          { term: "Volume corrente", def: "Quantidade de ar ofertada pelo ventilador a cada ciclo ventilatório." },
          { term: "PEEP", def: "Pressão positiva ao final da expiração. Fisiologicamente já existe (2–4 cmH₂O), causada pelo fechamento da epiglote — impede atelectasias." },
          { term: "Pressão de platô (PPlatô)", def: "Pressão medida em pausa inspiratória, relacionada à complacência pulmonar." },
          { term: "Relação I:E", def: "Relação entre o tempo inspiratório e o tempo expiratório fisiológico." }
        ]
      },
      {
        type: "vitals",
        title: "Valor de referência — PEEP fisiológica",
        items: [
          { label: "PEEP fisiológica", value: "2–4", unit: "cmH₂O", tone: "normal" }
        ]
      },
      {
        type: "competence",
        title: "Obtenção de via aérea — intubação",
        body: "A intubação é decisão médica. O procedimento é realizado por médico e enfermeiro devidamente habilitado."
      },
      {
        type: "team",
        title: "Atribuições na montagem e checagem da VM",
        roles: [
          { role: "Enfermeiro ou técnico de enfermagem", desc: "Montagem do circuito do ventilador" },
          { role: "Enfermeiro", desc: "Verificação de componentes — limpeza, desinfecção e prontidão do ventilador" },
          { role: "Enfermeiro e fisioterapeuta", desc: "Testes iniciais e calibração" }
        ]
      },
      {
        type: "modes",
        title: "Modalidades de VM",
        items: [
          { n: 1, name: "Ventilação Controlada por Volume", desc: "Entrega um volume corrente fixo a cada respiração. Usado principalmente em pacientes com respiração completamente ausente." },
          { n: 2, name: "Ventilação Controlada por Pressão", desc: "Entrega uma pressão inspiratória fixa; o volume corrente pode variar. Ideal para pulmões comprometidos (ex: SDRA)." },
          { n: 3, name: "Ventilação Assistida/Controlada", desc: "Combina respirações controladas e assistidas. Permite o paciente iniciar suas próprias respirações; se não respirar, o ventilador assume. Usado na transição da VM para respiração espontânea." },
          { n: 4, name: "Ventilação Intermitente com Suporte", desc: "Durante a inspiração assistida, o ventilador oferece volume ou pressão. Na respiração espontânea, o paciente é responsável. Usado no desmame da VM." },
          { n: 5, name: "Ventilação de Suporte de Pressão", desc: "Oferece suporte de pressão a cada respiração espontânea. Para pacientes que já respiram sozinhos, mas precisam de ajuda contra a resistência das vias aéreas." },
          { n: 6, name: "Controle de Fluxo ou de Volume", desc: "Forma avançada que se adapta automaticamente às necessidades de ventilação e oxigenação do paciente." },
          { n: 7, name: "Alta Frequência", desc: "Frequências respiratórias muito altas com volumes correntes muito baixos, minimizando o risco de lesão pulmonar associada à ventilação." }
        ]
      },
      {
        type: "concept",
        title: "Desmame da VM",
        body: "É o processo gradual de retirada do suporte ventilatório mecânico, com objetivo de permitir que o paciente respire espontaneamente, assumindo progressivamente o controle da respiração. Deve ser feito de forma cuidadosa e monitorada."
      },
      {
        type: "care",
        title: "Atribuições do técnico de enfermagem no desmame",
        groups: [
          {
            label: "Parâmetros a verificar",
            items: [
              "SpO₂: a cada 5–10 min durante a transição — atenção a sinais de hipoxemia",
              "Frequência respiratória: deve se manter dentro dos parâmetros normais",
              "Esforço respiratório: observar dispneia, uso de musculatura acessória ou dificuldade — comunicar imediatamente"
            ]
          },
          {
            label: "Ações diretas",
            items: [
              "Aspirar secreções das vias aéreas quando necessário",
              "Registrar tudo claramente no prontuário: mudanças nas configurações do ventilador, evolução do desmame e sinais observados"
            ]
          }
        ]
      }
    ]
  }
};

/* ============================================================
   QUIZ_DATA — Banco de flashcards/perguntas de revisão rápida
   Cada item: { mod, q, a, type: 'flip' | 'mc', options?, correct? }
   ============================================================ */

const QUIZ_DATA = [
  // ---------- BIA ----------
  { mod: "bia", type: "flip", q: "Quais os 3 objetivos fundamentais do BIA?", a: "Reduzir consumo de O₂ miocárdico, aumentar a pressão de perfusão coronariana e diminuir a pós-carga ventricular." },
  { mod: "bia", type: "mc", q: "Por qual artéria o cateter do BIA é introduzido?", options: ["Artéria radial", "Artéria femoral", "Artéria axilar", "Artéria braquial"], correct: 1 },
  { mod: "bia", type: "flip", q: "Onde fica posicionada a ponta distal do BIA?", a: "Na aorta descendente, cerca de 1 cm abaixo da origem da artéria subclávia." },
  { mod: "bia", type: "mc", q: "Em que fase do ciclo cardíaco o balão do BIA INSUFLA?", options: ["Na sístole, antes da abertura da valva aórtica", "Na diástole, após o fechamento da valva aórtica", "Durante toda a sístole", "No início da inspiração"], correct: 1 },
  { mod: "bia", type: "mc", q: "Em que fase o balão do BIA DESINSUFLA?", options: ["Na diástole tardia", "Imediatamente antes da abertura da valva aórtica (sístole)", "Após o fechamento da valva mitral", "Durante a pausa isovolumétrica"], correct: 1 },
  { mod: "bia", type: "flip", q: "Qual o aumento estimado de débito cardíaco com o suporte do BIA?", a: "Cerca de 20%, ou 0,5 a 1 L/min." },
  { mod: "bia", type: "mc", q: "O BIA é utilizado desde que ano?", options: ["1958", "1968", "1978", "1988"], correct: 1 },
  { mod: "bia", type: "flip", q: "Cite 3 indicações para uso do BIA.", a: "Choque cardiogênico, IAM com complicações, angina instável (ou: falha ventricular, infarto iminente, choque séptico)." },
  { mod: "bia", type: "mc", q: "Quem é o profissional médico especializado que realiza a passagem do BIA?", options: ["Cardiologista clínico", "Hemodinamicista", "Intensivista", "Cirurgião vascular"], correct: 1 },
  { mod: "bia", type: "flip", q: "Que orientação postural deve ser dada ao paciente com BIA?", a: "Manter-se quieto e tranquilo, com a perna do BIA estirada (não flexionar)." },
  { mod: "bia", type: "flip", q: "Com que frequência se troca o curativo do local de inserção do BIA?", a: "A cada 24 horas, ou antes se houver umidade (realizado pelo enfermeiro)." },

  // ---------- PIA ----------
  { mod: "piapic", type: "mc", q: "Qual o valor normal da PIA?", options: ["1–3 mmHg", "5–7 mmHg", "10–15 mmHg", "15–20 mmHg"], correct: 1 },
  { mod: "piapic", type: "flip", q: "A partir de qual valor a PIA é considerada Hipertensão Intra-abdominal (HIA)?", a: "PIA maior que 12 mmHg." },
  { mod: "piapic", type: "mc", q: "A Síndrome Compartimental Abdominal ocorre quando a PIA excede:", options: ["10 mmHg", "12 mmHg", "20 mmHg, com disfunção de órgãos", "30 mmHg sempre"], correct: 2 },
  { mod: "piapic", type: "flip", q: "Qual é o método indireto mais comum de medir a PIA?", a: "Pressão vesical (PIV), através de sonda vesical." },
  { mod: "piapic", type: "mc", q: "Antes de aferir a PIA, quantos mL de SF 0,9% devem ser injetados na bexiga?", options: ["50 mL", "100 mL", "150 mL", "200 mL"], correct: 1 },
  { mod: "piapic", type: "flip", q: "Quem tem competência privativa para realizar a monitoração da PIA?", a: "O enfermeiro (a indicação é médica, mas a realização é privativa do enfermeiro)." },
  { mod: "piapic", type: "flip", q: "Com que frequência a PIA deve ser verificada?", a: "A cada 4 a 8 horas, sempre na mesma posição do paciente (idealmente grau zero, 0°)." },
  // ---------- PIC ----------
  { mod: "piapic", type: "mc", q: "Qual o valor normal da PIC?", options: ["0–15 mmHg", "15–25 mmHg", "20–30 mmHg", "30–40 mmHg"], correct: 0 },
  { mod: "piapic", type: "flip", q: "Quais são os 3 componentes do crânio e seus percentuais (doutrina de Monro-Kellie)?", a: "Parênquima cerebral (85%), LCR (10%), sangue arterial e venoso (5%)." },
  { mod: "piapic", type: "flip", q: "Qual é a fórmula da Pressão de Perfusão Cerebral (PPC)?", a: "PPC = PAM − PIC" },
  { mod: "piapic", type: "mc", q: "Qual o método mais utilizado para monitorização invasiva da PIC?", options: ["Subaracnóideo", "Epidural", "Intraventricular (cateter DVE)", "Subdural"], correct: 2 },
  { mod: "piapic", type: "mc", q: "A partir de que valor de PIC sustentado (sem estímulo) se considera Hipertensão Intracraniana (HIC)?", options: ["> 10 mmHg", "> 15 mmHg", "> 20 mmHg por mais de 10s", "> 30 mmHg"], correct: 2 },
  { mod: "piapic", type: "flip", q: "Em qual ponto anatômico se zera o cateter de DVE?", a: "No conduto auditivo externo, evitando o tracionamento do cateter." },
  { mod: "piapic", type: "flip", q: "Em qual ângulo deve ficar a cabeceira do leito de um paciente com monitorização de PIC?", a: "Entre 30° e 45°, com a cabeça em posição neutra." },
  { mod: "piapic", type: "mc", q: "Por que a febre é especialmente perigosa em paciente com PIC monitorizada?", options: ["Causa desidratação rápida", "Aumenta o metabolismo cerebral, podendo elevar a PIC", "Reduz a pressão arterial", "Não tem relação com a PIC"], correct: 1 },
  { mod: "piapic", type: "flip", q: "O que NUNCA se deve fazer com um cateter de DVE?", a: "Nunca aspirar ou ejetar solução no cateter." },
  { mod: "piapic", type: "flip", q: "Quem insere o cateter intracraniano para monitorização da PIC?", a: "O neurocirurgião." },

  // ---------- Hemodinâmica ----------
  { mod: "hemo", type: "mc", q: "Qual é a 1ª opção de local de punção para PAI?", options: ["Artéria femoral", "Artéria radial", "Artéria braquial", "Artéria axilar"], correct: 1 },
  { mod: "hemo", type: "flip", q: "Qual a fórmula da Pressão Arterial Média (PAM)?", a: "PAM = [PAS + 2 × PAD] ÷ 3" },
  { mod: "hemo", type: "mc", q: "Qual o valor normal de PAM?", options: ["50–70 mmHg", "70–105 mmHg", "100–130 mmHg", "60–90 mmHg"], correct: 1 },
  { mod: "hemo", type: "flip", q: "Para que serve o Teste de Allen?", a: "Para confirmar a circulação colateral antes de puncionar a artéria radial." },
  { mod: "hemo", type: "flip", q: "Descreva resumidamente o Teste de Allen.", a: "Comprime-se simultaneamente as artérias radial e ulnar; o paciente abre e fecha a mão; libera-se uma das artérias e observa-se o retorno da coloração normal em segundos." },
  { mod: "hemo", type: "mc", q: "A que pressão deve ficar a bolsa pressórica do sistema de PAI/PVC?", options: ["100 mmHg", "200 mmHg", "300 mmHg", "400 mmHg"], correct: 2 },
  { mod: "hemo", type: "flip", q: "Em que altura anatômica deve ficar o transdutor de pressão (PAI e PVC)?", a: "Na altura da linha axilar média, no 4º espaço intercostal." },
  { mod: "hemo", type: "flip", q: "Cite 3 complicações comuns da monitorização de PAI.", a: "Necrose isquêmica da mão/antebraço, infecção, embolia (ou trombose)." },
  { mod: "hemo", type: "mc", q: "A que mede a PVC?", options: ["Pressão na artéria pulmonar", "Pressão média do átrio direito e diastólica final do VD", "Pressão na aorta", "Pressão no ventrículo esquerdo"], correct: 1 },
  { mod: "hemo", type: "mc", q: "Qual o valor de referência da PVC pelo transdutor eletrônico?", options: ["0–3 mmHg", "3–6 mmHg", "6–10 mmHg", "10–15 mmHg"], correct: 1 },
  { mod: "hemo", type: "flip", q: "A verificação da PVC é procedimento privativo do enfermeiro?", a: "Não. A verificação pode ser feita por técnico de enfermagem treinado e supervisionado. Já a instalação e retirada são privativas do enfermeiro." },
  { mod: "hemo", type: "flip", q: "Com que frequência se troca a solução de PIA?", a: "A cada 24 horas." },
  { mod: "hemo", type: "flip", q: "Com que frequência se anotam os valores de PIA/PVC no Balanço Hídrico?", a: "A cada 2 horas." },

  // ---------- Marcapasso ----------
  { mod: "marcapasso", type: "flip", q: "O que é bradiarritmia, no contexto de indicação de marcapasso?", a: "Um coração lento e desregulado — condição que leva à necessidade de marca-passo." },
  { mod: "marcapasso", type: "mc", q: "Qual tipo de marcapasso é implantado cirurgicamente no tórax, com fios no átrio e ventrículo?", options: ["Transcutâneo", "Transvenoso", "Definitivo", "Epicárdico externo"], correct: 2 },
  { mod: "marcapasso", type: "flip", q: "Quanto tempo dura, em média, a bateria de um marca-passo definitivo?", a: "De 10 a 15 anos, com monitoramento regular." },
  { mod: "marcapasso", type: "mc", q: "Qual tipo de marcapasso usa pás de eletrodos conectadas a um desfibrilador?", options: ["Definitivo", "Transcutâneo (transtorácico)", "Transvenoso", "Epicárdico"], correct: 1 },
  { mod: "marcapasso", type: "flip", q: "Como é instalado o marcapasso transvenoso?", a: "Por incisão em uma veia, com um cabo-eletrodo conduzido até o coração — usado temporariamente em ambiente hospitalar." },
  { mod: "marcapasso", type: "flip", q: "Cite 2 situações que indicam marcapasso temporário.", a: "Bloqueios após cirurgia cardíaca; infarto agudo do miocárdio (ou: avaliação antes do MP definitivo em chagásicos/ateroscleróticos/ICC)." },
  { mod: "marcapasso", type: "mc", q: "No cuidado pré-operatório do marcapasso definitivo, o paciente deve ficar:", options: ["Hidratado e alimentado normalmente", "Em jejum", "Sedado previamente", "Sem necessidade de preparo"], correct: 1 },
  { mod: "marcapasso", type: "flip", q: "O que se deve fazer na pele antes de aplicar as pás do marcapasso transcutâneo?", a: "Limpar com álcool ou água e sabão para retirar a camada de gordura, e fazer tricotomia se necessário." },
  { mod: "marcapasso", type: "flip", q: "Que parâmetros devem ser registrados em prontuário após implante de marcapasso transvenoso?", a: "Frequência cardíaca e amplitude de pulso, selecionados pelo médico." },

  // ---------- VM ----------
  { mod: "vm", type: "mc", q: "O que significa FiO₂?", options: ["Fluxo inspiratório de oxigênio", "Fração inspirada de oxigênio", "Frequência inspiratória de oxigênio", "Fluxo intermitente de O₂"], correct: 1 },
  { mod: "vm", type: "flip", q: "O que é PEEP?", a: "Pressão positiva ao final da expiração — fisiologicamente entre 2 e 4 cmH₂O, impede atelectasias." },
  { mod: "vm", type: "flip", q: "O que é volume corrente?", a: "A quantidade de ar ofertada pelo ventilador a cada ciclo ventilatório." },
  { mod: "vm", type: "mc", q: "Quem pode realizar a intubação orotraqueal?", options: ["Qualquer enfermeiro", "Médico e enfermeiro devidamente habilitado", "Apenas o médico intensivista", "Técnico de enfermagem treinado"], correct: 1 },
  { mod: "vm", type: "mc", q: "Qual modalidade de VM é ideal para pacientes com pulmões comprometidos, como na SDRA?", options: ["Ventilação Controlada por Volume", "Ventilação Controlada por Pressão", "Ventilação de Alta Frequência", "Ventilação Espontânea"], correct: 1 },
  { mod: "vm", type: "mc", q: "Qual modalidade de VM é usada principalmente em pacientes com respiração completamente ausente?", options: ["Ventilação Controlada por Volume", "Ventilação de Suporte de Pressão", "Ventilação Assistida/Controlada", "Ventilação Intermitente com Suporte"], correct: 0 },
  { mod: "vm", type: "flip", q: "Qual modalidade de VM é tipicamente usada no processo de desmame?", a: "Ventilação Intermitente com Suporte (o paciente assume a respiração espontânea, e o ventilador intervém só na inspiração assistida)." },
  { mod: "vm", type: "flip", q: "O que é o desmame da VM?", a: "O processo gradual de retirada do suporte ventilatório mecânico, permitindo que o paciente retome o controle da respiração espontânea." },
  { mod: "vm", type: "flip", q: "Com que frequência se verifica a SpO₂ durante a transição do desmame?", a: "Idealmente a cada 5 a 10 minutos." },
  { mod: "vm", type: "mc", q: "Quem é responsável pela montagem do circuito do ventilador?", options: ["Apenas o fisioterapeuta", "Enfermeiro ou técnico de enfermagem", "Apenas o médico", "Apenas o enfermeiro"], correct: 1 },
  { mod: "vm", type: "flip", q: "Quais sinais de esforço respiratório o técnico deve monitorar no desmame?", a: "Dispneia, uso de musculatura acessória e dificuldade respiratória — comunicar alterações imediatamente." }
];
